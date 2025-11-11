#!/usr/bin/env node

/**
 * AI Friday Session Generator
 *
 * Creates a complete session folder structure with all templates populated
 * and ready for use.
 */

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { format, addDays } = require('date-fns');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../..');
const TEMPLATES_DIR = path.join(PROJECT_ROOT, 'meetings/templates');
const SESSIONS_DIR = path.join(PROJECT_ROOT, 'meetings/sessions');
const BASELINE_TOPICS_DIR = path.join(PROJECT_ROOT, 'content/baseline-topics');

class SessionGenerator {
  constructor() {
    this.sessionData = {};
  }

  async run() {
    console.log(chalk.blue.bold('\n🤖 AI Friday Session Generator\n'));

    try {
      await this.gatherSessionInfo();
      await this.createSessionStructure();
      await this.populateTemplates();
      await this.updateSessionIndex();

      console.log(chalk.green.bold('\n✅ Session created successfully!'));
      console.log(chalk.gray(`📁 Session folder: ${this.sessionData.folderPath}`));
      console.log(chalk.gray(`📋 Ready for planning and speaker coordination\n`));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ Error creating session:'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  }

  async gatherSessionInfo() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'date',
        message: 'Session date (YYYY-MM-DD):',
        default: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
        validate: (input) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(input)) {
            return 'Please enter date in YYYY-MM-DD format';
          }
          const date = new Date(input);
          if (isNaN(date.getTime())) {
            return 'Please enter a valid date';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'weekNumber',
        message: 'Week number (e.g., 1, 2, 3...):',
        validate: (input) => {
          const num = parseInt(input);
          if (isNaN(num) || num < 1) {
            return 'Please enter a valid week number';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'host',
        message: 'Host name:',
        default: 'UX Manager'
      },
      {
        type: 'input',
        name: 'speakers',
        message: 'Confirmed speakers (comma-separated, or leave empty):',
        default: ''
      },
      {
        type: 'list',
        name: 'sessionType',
        message: 'Session type:',
        choices: [
          { name: 'Regular session (need speakers)', value: 'regular' },
          { name: 'Baseline topic (Sessions A-F)', value: 'baseline' },
          { name: 'Special theme session', value: 'special' }
        ]
      }
    ]);

    // If baseline topic, ask which one
    if (answers.sessionType === 'baseline') {
      const baselineChoice = await inquirer.prompt([
        {
          type: 'list',
          name: 'baselineTopic',
          message: 'Which baseline topic?',
          choices: [
            { name: 'Session A - Figma → Code: Tokens to Components', value: 'session-a-figma-tokens' },
            { name: 'Session B - Agents in the Frontend (OpenAI Agents SDK)', value: 'session-b-frontend-agents' },
            { name: 'Session C - Prompt Engineering Playbook for ICs', value: 'session-c-prompt-engineering' },
            { name: 'Session D - Claude: Zero‑to‑Docs with AI', value: 'session-d-claude-docs' },
            { name: 'Session E - Storybook v9: Zero‑to‑Docs with AI', value: 'session-e-storybook-ai' },
            { name: 'Session F - Figma MCP & Code Generation', value: 'session-f-figma-mcp' }
          ]
        }
      ]);
      answers.baselineTopic = baselineChoice.baselineTopic;
    }

    this.sessionData = {
      ...answers,
      folderName: `${answers.date}-week-${answers.weekNumber}`,
      folderPath: path.join(SESSIONS_DIR, `${answers.date}-week-${answers.weekNumber}`),
      speakerList: answers.speakers ? answers.speakers.split(',').map(s => s.trim()).filter(s => s) : []
    };
  }

  async createSessionStructure() {
    console.log(chalk.yellow('📁 Creating session folder structure...'));

    const folders = [
      this.sessionData.folderPath,
      path.join(this.sessionData.folderPath, 'submissions'),
      path.join(this.sessionData.folderPath, 'demos'),
      path.join(this.sessionData.folderPath, 'artifacts')
    ];

    for (const folder of folders) {
      await fs.ensureDir(folder);
    }
  }

  async populateTemplates() {
    console.log(chalk.yellow('📝 Populating templates...'));

    // Generate agenda
    await this.createAgenda();

    // Generate notes template
    await this.createNotesTemplate();

    // Generate follow-ups template
    await this.createFollowUpsTemplate();

    // Create session README
    await this.createSessionReadme();
  }

  async createAgenda() {
    const template = await fs.readFile(path.join(TEMPLATES_DIR, 'agenda-template.md'), 'utf8');

    let populatedAgenda = template
      .replace(/{WEEK_NUMBER}/g, this.sessionData.weekNumber)
      .replace(/{DATE}/g, this.sessionData.date)
      .replace(/{HOST_NAME}/g, this.sessionData.host)
      .replace(/{SIGNUP_LINK}/g, 'https://confluence.company.com/ai-friday-signup')
      .replace(/{NEXT_SESSION_DATE}/g, format(addDays(new Date(this.sessionData.date), 14), 'dd MMM yyyy'));

    // Handle different session types
    if (this.sessionData.sessionType === 'baseline' && this.sessionData.baselineTopic) {
      const baselineContent = await this.getBaselineTopicContent(this.sessionData.baselineTopic);
      populatedAgenda = this.populateWithBaselineContent(populatedAgenda, baselineContent);
    } else if (this.sessionData.speakerList.length > 0) {
      populatedAgenda = this.populateWithSpeakers(populatedAgenda);
    } else {
      populatedAgenda = this.populateWithPlaceholders(populatedAgenda);
    }

    await fs.writeFile(
      path.join(this.sessionData.folderPath, 'agenda.md'),
      populatedAgenda
    );
  }

  async getBaselineTopicContent(topicFile) {
    const topicPath = path.join(BASELINE_TOPICS_DIR, `${topicFile}.md`);
    const content = await fs.readFile(topicPath, 'utf8');

    // Extract key information from the baseline topic
    const titleMatch = content.match(/# (.+)/);
    const objectiveMatch = content.match(/\*\*Objective:\*\* (.+)/);

    return {
      title: titleMatch ? titleMatch[1] : 'Baseline Topic Session',
      objective: objectiveMatch ? objectiveMatch[1] : 'Educational session with live demo'
    };
  }

  populateWithBaselineContent(template, baselineContent) {
    return template
      .replace(/{TALK_1_TITLE}/g, baselineContent.title + ' (Lightning Talk)')
      .replace(/{SPEAKER_1}/g, this.sessionData.host)
      .replace(/{TALK_1_DESCRIPTION}/g, 'Educational overview and framework explanation')
      .replace(/{TALK_1_LINKS}/g, 'Links will be shared during session')
      .replace(/{TALK_2_TITLE}/g, 'Community Q&A')
      .replace(/{SPEAKER_2}/g, 'Open Floor')
      .replace(/{TALK_2_DESCRIPTION}/g, 'Questions and experience sharing')
      .replace(/{TALK_2_LINKS}/g, '')
      .replace(/{DEMO_TITLE}/g, baselineContent.title + ' (Live Demo)')
      .replace(/{DEMO_PRESENTER}/g, this.sessionData.host)
      .replace(/{DEMO_DESCRIPTION}/g, baselineContent.objective)
      .replace(/{DEMO_LINKS}/g, 'Demo materials will be shared');
  }

  populateWithSpeakers(template) {
    const speakers = this.sessionData.speakerList;

    return template
      .replace(/{TALK_1_TITLE}/g, speakers[0] ? `${speakers[0]}'s Topic` : 'Lightning Talk 1')
      .replace(/{SPEAKER_1}/g, speakers[0] || 'TBD')
      .replace(/{TALK_1_DESCRIPTION}/g, 'Description to be added by speaker')
      .replace(/{TALK_1_LINKS}/g, 'Links will be shared during session')
      .replace(/{TALK_2_TITLE}/g, speakers[1] ? `${speakers[1]}'s Topic` : 'Lightning Talk 2')
      .replace(/{SPEAKER_2}/g, speakers[1] || 'TBD')
      .replace(/{TALK_2_DESCRIPTION}/g, 'Description to be added by speaker')
      .replace(/{TALK_2_LINKS}/g, 'Links will be shared during session')
      .replace(/{DEMO_TITLE}/g, speakers[2] ? `${speakers[2]}'s Demo` : 'Feature Demo')
      .replace(/{DEMO_PRESENTER}/g, speakers[2] || 'TBD')
      .replace(/{DEMO_DESCRIPTION}/g, 'Demo description to be added')
      .replace(/{DEMO_LINKS}/g, 'Demo materials will be shared');
  }

  populateWithPlaceholders(template) {
    return template
      .replace(/{TALK_1_TITLE}/g, 'Lightning Talk 1 (TBD)')
      .replace(/{SPEAKER_1}/g, 'Seeking speaker')
      .replace(/{TALK_1_DESCRIPTION}/g, 'Submit your AI tips and tricks!')
      .replace(/{TALK_1_LINKS}/g, '')
      .replace(/{TALK_2_TITLE}/g, 'Lightning Talk 2 (TBD)')
      .replace(/{SPEAKER_2}/g, 'Seeking speaker')
      .replace(/{TALK_2_DESCRIPTION}/g, 'Share your AI learnings!')
      .replace(/{TALK_2_LINKS}/g, '')
      .replace(/{DEMO_TITLE}/g, 'Feature Demo (TBD)')
      .replace(/{DEMO_PRESENTER}/g, 'Seeking presenter')
      .replace(/{DEMO_DESCRIPTION}/g, 'Live demo of AI tools or workflows')
      .replace(/{DEMO_LINKS}/g, '');
  }

  async createNotesTemplate() {
    const template = await fs.readFile(path.join(TEMPLATES_DIR, 'notes-template.md'), 'utf8');

    const populatedNotes = template
      .replace(/{WEEK_NUMBER}/g, this.sessionData.weekNumber)
      .replace(/{DATE}/g, this.sessionData.date)
      .replace(/{HOST_NAME}/g, this.sessionData.host)
      .replace(/{SCRIBE_NAME}/g, '[Scribe name to be added]')
      .replace(/{ATTENDEE_COUNT}/g, '[Count to be added during session]')
      .replace(/{NEXT_SESSION_DATE}/g, format(addDays(new Date(this.sessionData.date), 14), 'dd MMM yyyy'));

    await fs.writeFile(
      path.join(this.sessionData.folderPath, 'notes.md'),
      populatedNotes
    );
  }

  async createFollowUpsTemplate() {
    const template = await fs.readFile(path.join(TEMPLATES_DIR, 'follow-ups-template.md'), 'utf8');

    const populatedFollowUps = template
      .replace(/{WEEK_NUMBER}/g, this.sessionData.weekNumber)
      .replace(/{DATE}/g, this.sessionData.date)
      .replace(/{OWNER_NAME}/g, this.sessionData.host)
      .replace(/{UPDATE_DATE}/g, format(new Date(), 'yyyy-MM-dd'))
      .replace(/{NEXT_SESSION_DATE}/g, format(addDays(new Date(this.sessionData.date), 14), 'dd MMM yyyy'));

    await fs.writeFile(
      path.join(this.sessionData.folderPath, 'follow-ups.md'),
      populatedFollowUps
    );
  }

  async createSessionReadme() {
    const readmeContent = `# AI Friday Session - Week ${this.sessionData.weekNumber}

**Date:** ${this.sessionData.date}
**Host:** ${this.sessionData.host}
**Type:** ${this.sessionData.sessionType}

## Session Materials

- [📋 Agenda](./agenda.md) - Meeting structure and speakers
- [📝 Notes](./notes.md) - Live session notes (for scribe)
- [📋 Follow-ups](./follow-ups.md) - Action items and next steps

## Folders

- **submissions/** - Related speaker submissions and proposals
- **demos/** - Speaker demo materials and code samples
- **artifacts/** - Recordings, slides, and shared resources

## Status

- [ ] Speakers confirmed
- [ ] Agenda finalized
- [ ] Tech setup ready
- [ ] Session completed
- [ ] Follow-ups processed

## Quick Links

- [AI Friday Sessions Index](../README.md)
- [Baseline Topics](../../content/baseline-topics/)
- [Submission Form](../../meetings/templates/submission-form.md)
`;

    await fs.writeFile(
      path.join(this.sessionData.folderPath, 'README.md'),
      readmeContent
    );
  }

  async updateSessionIndex() {
    console.log(chalk.yellow('📊 Updating session index...'));

    const indexPath = path.join(SESSIONS_DIR, '../sessions-index.md');

    let indexContent = '';
    if (await fs.pathExists(indexPath)) {
      indexContent = await fs.readFile(indexPath, 'utf8');
    } else {
      indexContent = `# AI Friday Sessions Index

This file tracks all AI Friday sessions and their status.

## Sessions

`;
    }

    const newEntry = `
### Week ${this.sessionData.weekNumber} - ${this.sessionData.date}
- **Host:** ${this.sessionData.host}
- **Type:** ${this.sessionData.sessionType}
- **Status:** Planning
- **Folder:** [sessions/${this.sessionData.folderName}](./sessions/${this.sessionData.folderName}/)

`;

    // Add the new entry at the top of the sessions section
    const insertIndex = indexContent.indexOf('## Sessions') + '## Sessions'.length;
    const updatedContent = indexContent.slice(0, insertIndex) + newEntry + indexContent.slice(insertIndex);

    await fs.writeFile(indexPath, updatedContent);
  }
}

// Run the generator
if (require.main === module) {
  new SessionGenerator().run();
}

module.exports = SessionGenerator;