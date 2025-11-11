#!/usr/bin/env node

/**
 * AI Friday Confluence Exporter
 *
 * Formats meeting content for easy copy-paste to Confluence.
 * Converts markdown to Confluence-compatible format and organizes content.
 */

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const MarkdownIt = require('markdown-it');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../..');
const SESSIONS_DIR = path.join(PROJECT_ROOT, 'meetings/sessions');

class ConfluenceExporter {
  constructor() {
    this.sessionData = {};
    this.exportOptions = {};
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
  }

  async run() {
    console.log(chalk.blue.bold('\n📄 AI Friday Confluence Exporter\n'));

    try {
      await this.selectSession();
      await this.loadSessionContent();
      await this.gatherExportOptions();
      await this.generateConfluenceContent();
      await this.createExportPackage();

      console.log(chalk.green.bold('\n✅ Confluence export completed!'));
      console.log(chalk.gray(`📁 Export files: ${this.sessionData.exportPath}`));
      console.log(chalk.gray(`📋 Ready for copy-paste to Confluence\n`));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ Error exporting to Confluence:'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  }

  async selectSession() {
    // Find completed sessions
    const sessionFolders = await this.findSessionFolders();

    if (sessionFolders.length === 0) {
      throw new Error('No session folders found.');
    }

    const { selectedSession } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSession',
        message: 'Which session to export to Confluence?',
        choices: sessionFolders.map(folder => ({
          name: `${path.basename(folder)} (${this.getSessionStatus(folder)})`,
          value: folder
        }))
      }
    ]);

    this.sessionData.sessionPath = selectedSession;
    this.sessionData.sessionName = path.basename(selectedSession);
    this.sessionData.exportPath = path.join(selectedSession, 'confluence-export');

    // Ensure export directory exists
    await fs.ensureDir(this.sessionData.exportPath);
  }

  async findSessionFolders() {
    const glob = require('glob');
    const pattern = path.join(SESSIONS_DIR, '*-week-*');
    return glob.sync(pattern).filter(folder =>
      fs.statSync(folder).isDirectory()
    ).sort().reverse();
  }

  getSessionStatus(sessionPath) {
    const notesPath = path.join(sessionPath, 'notes.md');
    const followUpsPath = path.join(sessionPath, 'follow-ups.md');

    if (fs.existsSync(followUpsPath) && fs.existsSync(notesPath)) {
      return 'Complete';
    } else if (fs.existsSync(notesPath)) {
      return 'Has notes';
    }
    return 'Draft';
  }

  async loadSessionContent() {
    console.log(chalk.yellow('📖 Loading session content...'));

    // Load all available session files
    const files = ['agenda.md', 'notes.md', 'follow-ups.md', 'README.md'];

    for (const file of files) {
      const filePath = path.join(this.sessionData.sessionPath, file);
      if (await fs.pathExists(filePath)) {
        this.sessionData[file.replace('.md', '')] = await fs.readFile(filePath, 'utf8');
      }
    }

    // Load processed content if available
    const processedPath = path.join(this.sessionData.sessionPath, 'artifacts/processed');
    if (await fs.pathExists(processedPath)) {
      const processedFiles = await fs.readdir(processedPath);
      this.sessionData.processedFiles = {};

      for (const file of processedFiles) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join(processedPath, file), 'utf8');
          this.sessionData.processedFiles[file] = content;
        }
      }
    }

    // Extract session metadata
    this.parseSessionMetadata();
  }

  parseSessionMetadata() {
    // Extract date and week from folder name
    const match = this.sessionData.sessionName.match(/(\d{4}-\d{2}-\d{2})-week-(\d+)/);
    if (match) {
      this.sessionData.date = match[1];
      this.sessionData.weekNumber = match[2];
    }

    // Extract host from agenda or readme
    const agendaContent = this.sessionData.agenda || '';
    const hostMatch = agendaContent.match(/\*\*Host:\*\* (.+)/);
    this.sessionData.host = hostMatch ? hostMatch[1] : 'Unknown';

    // Extract attendee count from notes
    const notesContent = this.sessionData.notes || '';
    const attendeeMatch = notesContent.match(/\*\*Attendees:\*\* (.+) participants/);
    this.sessionData.attendeeCount = attendeeMatch ? attendeeMatch[1] : 'Unknown';
  }

  async gatherExportOptions() {
    const options = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'includeContent',
        message: 'What content to include in Confluence export?',
        choices: [
          { name: 'Executive summary (overview and key outcomes)', value: 'summary' },
          { name: 'Detailed meeting notes', value: 'notes' },
          { name: 'Action items and follow-ups', value: 'actions' },
          { name: 'Resources and links shared', value: 'resources' },
          { name: 'Next session preview', value: 'preview' }
        ],
        default: ['summary', 'notes', 'actions', 'resources']
      },
      {
        type: 'list',
        name: 'format',
        message: 'Confluence page format:',
        choices: [
          { name: 'Single comprehensive page', value: 'single' },
          { name: 'Multiple pages (summary + details)', value: 'multiple' },
          { name: 'Meeting notes template format', value: 'template' }
        ]
      },
      {
        type: 'input',
        name: 'spaceKey',
        message: 'Confluence space key (e.g., "TEAM", "AI"):',
        default: 'AI'
      },
      {
        type: 'input',
        name: 'parentPage',
        message: 'Parent page title (for organization):',
        default: 'AI Friday Sessions'
      }
    ]);

    this.exportOptions = options;
  }

  async generateConfluenceContent() {
    console.log(chalk.yellow('📝 Generating Confluence content...'));

    if (this.exportOptions.format === 'single') {
      await this.generateSinglePage();
    } else if (this.exportOptions.format === 'multiple') {
      await this.generateMultiplePages();
    } else {
      await this.generateTemplateFormat();
    }
  }

  async generateSinglePage() {
    let confluenceContent = this.generateConfluenceHeader();

    if (this.exportOptions.includeContent.includes('summary')) {
      confluenceContent += this.generateExecutiveSummary();
    }

    if (this.exportOptions.includeContent.includes('notes')) {
      confluenceContent += this.generateDetailedNotes();
    }

    if (this.exportOptions.includeContent.includes('actions')) {
      confluenceContent += this.generateActionItems();
    }

    if (this.exportOptions.includeContent.includes('resources')) {
      confluenceContent += this.generateResourcesSection();
    }

    if (this.exportOptions.includeContent.includes('preview')) {
      confluenceContent += this.generateNextSessionPreview();
    }

    confluenceContent += this.generateConfluenceFooter();

    await fs.writeFile(
      path.join(this.sessionData.exportPath, 'confluence-single-page.txt'),
      confluenceContent
    );
  }

  async generateMultiplePages() {
    // Main summary page
    let summaryPage = this.generateConfluenceHeader();
    summaryPage += this.generateExecutiveSummary();
    summaryPage += this.generateActionItems();
    summaryPage += this.generateNextSessionPreview();
    summaryPage += this.generateConfluenceFooter();

    await fs.writeFile(
      path.join(this.sessionData.exportPath, 'confluence-summary.txt'),
      summaryPage
    );

    // Detailed notes page
    let detailsPage = this.generateConfluenceHeader('Detailed Notes');
    detailsPage += this.generateDetailedNotes();
    detailsPage += this.generateResourcesSection();
    detailsPage += this.generateConfluenceFooter();

    await fs.writeFile(
      path.join(this.sessionData.exportPath, 'confluence-details.txt'),
      detailsPage
    );
  }

  async generateTemplateFormat() {
    const templateContent = this.generateMeetingTemplate();

    await fs.writeFile(
      path.join(this.sessionData.exportPath, 'confluence-template.txt'),
      templateContent
    );
  }

  generateConfluenceHeader(title = null) {
    const pageTitle = title || `AI Friday Week ${this.sessionData.weekNumber} - ${this.sessionData.date}`;

    return `h1. ${pageTitle}

{panel:title=Session Info|borderStyle=solid|borderColor=#ccc|titleBGColor=#f0f0f0|bgColor=#fafafa}
*Date:* ${this.sessionData.date}
*Host:* ${this.sessionData.host}
*Attendees:* ${this.sessionData.attendeeCount} participants
*Recording:* Available on internal drive
{panel}

{toc:printable=true|style=square|maxLevel=3|minLevel=1|type=list|outline=clear|include=.*}

----

`;
  }

  generateExecutiveSummary() {
    return `h2. 📊 Executive Summary

{info:title=Key Highlights}
${this.extractKeyHighlights()}
{info}

h3. Session Overview

This week's AI Friday focused on ${this.extractSessionFocus()}. We had ${this.sessionData.attendeeCount} participants sharing insights and learning from each other.

h3. Main Topics Covered

${this.extractMainTopics()}

h3. Key Outcomes

${this.extractKeyOutcomes()}

----

`;
  }

  generateDetailedNotes() {
    const notesContent = this.sessionData.notes || 'Detailed notes not available.';

    // Convert markdown to Confluence format
    let confluenceNotes = this.convertMarkdownToConfluence(notesContent);

    return `h2. 📝 Detailed Session Notes

${confluenceNotes}

----

`;
  }

  generateActionItems() {
    const followUpsContent = this.sessionData['follow-ups'] || '';

    let actionItemsSection = `h2. ✅ Action Items & Follow-ups

`;

    if (followUpsContent.includes('| Task | Owner | Due Date | Status |')) {
      // Extract action items table
      const tableMatch = followUpsContent.match(/\| Task \| Owner \| Due Date \| Status \|[\s\S]*?(?=\n\n|\n##|\n---|\n\*\*|$)/);

      if (tableMatch) {
        const tableContent = tableMatch[0];
        const confluenceTable = this.convertMarkdownTableToConfluence(tableContent);
        actionItemsSection += confluenceTable;
      }
    } else {
      actionItemsSection += `{note}
Action items will be added here after session processing.
{note}`;
    }

    actionItemsSection += `

h3. Follow-up Sessions

${this.extractFollowUpSessions()}

----

`;

    return actionItemsSection;
  }

  generateResourcesSection() {
    let resourcesSection = `h2. 🔗 Resources & Links

`;

    // Extract resources from notes
    const resources = this.extractSharedResources();

    if (resources.length > 0) {
      resourcesSection += `h3. Tools & Services

`;
      resources.forEach(resource => {
        resourcesSection += `* [${resource.name}|${resource.url}] - ${resource.description}
`;
      });

      resourcesSection += `
h3. Code & Demos

${this.extractCodeResources()}

h3. Articles & Documentation

${this.extractDocumentationLinks()}
`;
    } else {
      resourcesSection += `{note}
Resources and links will be added here after session processing.
{note}`;
    }

    resourcesSection += `

----

`;

    return resourcesSection;
  }

  generateNextSessionPreview() {
    return `h2. 🔮 Next Session

{panel:title=AI Friday Week ${parseInt(this.sessionData.weekNumber) + 1}|borderStyle=solid|borderColor=#0073e6|titleBGColor=#e6f3ff|bgColor=#f9fcff}
*Date:* [Next session date]
*Call for Speakers:* Submit your topics [here|confluence-submission-link]
*Suggested Topics:* Based on this session's feedback
{panel}

h3. Topic Ideas from This Session

${this.extractTopicIdeas()}

h3. Volunteer to Present

Interested in sharing your AI learnings? We'd love to have you! Topics can be:
* 5-minute tips and tricks
* 15-minute live demos
* Problem-solving sessions
* Tool recommendations

Contact ${this.sessionData.host} or submit through our [topic submission form|submission-link].

----

`;
  }

  generateConfluenceFooter() {
    return `{panel:title=Session Files|borderStyle=solid|borderColor=#ccc|titleBGColor=#f0f0f0|bgColor=#fafafa}
*Recording:* [Session recording link]
*Raw Notes:* [Link to detailed notes]
*Artifacts:* [Link to shared materials]
*Previous Sessions:* [AI Friday Sessions Index|parent-page-link]
{panel}

_Page generated on ${new Date().toISOString().split('T')[0]} from AI Friday automation tools._`;
  }

  generateMeetingTemplate() {
    return `h1. AI Friday Week ${this.sessionData.weekNumber} - ${this.sessionData.date}

{note:title=Meeting Template}
This page uses the standard AI Friday meeting template format.
{note}

|| Session Info ||
| Date | ${this.sessionData.date} |
| Host | ${this.sessionData.host} |
| Attendees | ${this.sessionData.attendeeCount} |
| Recording | [Link] |

h2. Agenda

h3. Welcome & Wins (5 min)
[Content here]

h3. Lightning Talks (20 min)

h4. Talk 1 - [Title]
*Speaker:* [Name]
*Key Points:*
* Point 1
* Point 2
* Point 3

h4. Talk 2 - [Title]
*Speaker:* [Name]
*Key Points:*
* Point 1
* Point 2
* Point 3

h3. Feature Demo (20 min)
*Presenter:* [Name]
*Demo:* [Title]
*Key Takeaways:*
* Takeaway 1
* Takeaway 2
* Takeaway 3

h3. Open Clinic (15 min)
*Topics Discussed:*
* Topic 1
* Topic 2
* Topic 3

h2. Action Items

|| Task || Owner || Due Date || Status ||
| [Task] | [Owner] | [Date] | [Status] |

h2. Resources Shared

* [Resource 1|url] - Description
* [Resource 2|url] - Description
* [Resource 3|url] - Description

h2. Next Steps

[Next session info and follow-up items]

----

{panel:title=Files & Links}
[Standard footer with links]
{panel}`;
  }

  // Helper methods for content extraction
  extractKeyHighlights() {
    return `* ${this.sessionData.attendeeCount} attendees participated actively
* [Number] new tools and resources shared
* [Number] action items identified for follow-up
* Strong engagement in open clinic discussions`;
  }

  extractSessionFocus() {
    const agendaContent = this.sessionData.agenda || '';
    const demoMatch = agendaContent.match(/### 🎯 Feature demo \(20 min\) — (.+)/);
    return demoMatch ? demoMatch[1] : 'AI tools and practical applications';
  }

  extractMainTopics() {
    return `* Lightning Talk 1: [Topic from agenda]
* Lightning Talk 2: [Topic from agenda]
* Feature Demo: [Demo topic from agenda]
* Open Clinic: Community Q&A and troubleshooting`;
  }

  extractKeyOutcomes() {
    return `* New AI tools discovered by the team
* Practical workflows shared and documented
* Community knowledge expanded
* Follow-up collaborations initiated`;
  }

  extractSharedResources() {
    // This would parse the notes content for links and resources
    // For now, return placeholder structure
    return [
      { name: 'Resource 1', url: 'https://example.com', description: 'Description' },
      { name: 'Resource 2', url: 'https://example.com', description: 'Description' }
    ];
  }

  extractCodeResources() {
    return `* [Demo Repository|repo-url] - Code samples from the demo
* [Shared Scripts|scripts-url] - Automation scripts discussed`;
  }

  extractDocumentationLinks() {
    return `* [Tool Documentation|doc-url] - Official documentation
* [Best Practices Guide|guide-url] - Team recommendations`;
  }

  extractTopicIdeas() {
    return `* Advanced [tool name] techniques
* Integration patterns with existing workflows
* Cost optimization strategies
* Team adoption and training approaches`;
  }

  extractFollowUpSessions() {
    return `Based on this session's discussions, potential follow-up topics include:
* Deep dive into [specific tool or technique]
* Workshop format for hands-on learning
* Cross-team collaboration sessions`;
  }

  convertMarkdownToConfluence(markdown) {
    // Basic markdown to Confluence conversion
    let confluence = markdown;

    // Headers
    confluence = confluence.replace(/^### (.+)$/gm, 'h3. $1');
    confluence = confluence.replace(/^## (.+)$/gm, 'h2. $1');
    confluence = confluence.replace(/^# (.+)$/gm, 'h1. $1');

    // Bold and italic
    confluence = confluence.replace(/\*\*(.+?)\*\*/g, '*$1*');
    confluence = confluence.replace(/\*(.+?)\*/g, '_$1_');

    // Links
    confluence = confluence.replace(/\[(.+?)\]\((.+?)\)/g, '[$1|$2]');

    // Code blocks
    confluence = confluence.replace(/```(\w+)?\n([\s\S]*?)```/g, '{code:language=$1}\n$2{code}');
    confluence = confluence.replace(/`(.+?)`/g, '{{$1}}');

    // Lists
    confluence = confluence.replace(/^- (.+)$/gm, '* $1');

    return confluence;
  }

  convertMarkdownTableToConfluence(markdownTable) {
    const lines = markdownTable.trim().split('\n');
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const separator = lines[1];
    const rows = lines.slice(2);

    let confluenceTable = '|| ' + headers.join(' || ') + ' ||\n';

    rows.forEach(row => {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length > 0) {
        confluenceTable += '| ' + cells.join(' | ') + ' |\n';
      }
    });

    return confluenceTable;
  }

  async createExportPackage() {
    console.log(chalk.yellow('📦 Creating export package...'));

    // Create export instructions
    const instructionsContent = `# Confluence Export Instructions

## Files Generated

${this.exportOptions.format === 'single' ? '- confluence-single-page.txt: Complete session page content' : ''}
${this.exportOptions.format === 'multiple' ? '- confluence-summary.txt: Executive summary page\n- confluence-details.txt: Detailed notes page' : ''}
${this.exportOptions.format === 'template' ? '- confluence-template.txt: Meeting template format' : ''}

## How to Import to Confluence

1. **Create new page in Confluence**
   - Space: ${this.exportOptions.spaceKey}
   - Parent page: ${this.exportOptions.parentPage}

2. **Copy content**
   - Open the generated .txt file
   - Copy all content
   - Paste into Confluence editor (use "Insert" → "Markup" for best results)

3. **Review and adjust**
   - Update any placeholder links
   - Add actual recording links
   - Verify formatting looks correct
   - Add any missing information

4. **Publish and share**
   - Publish the page
   - Share link with team
   - Add to AI Friday sessions index

## Confluence Formatting Notes

- Headers use h1., h2., h3. syntax
- Links use [text|url] format
- Tables use || for headers, | for cells
- Panels use {panel} macro for callouts
- Code uses {code} macro

## Content Included

${this.exportOptions.includeContent.map(item => `- ${item}`).join('\n')}

## Next Steps

1. Import content to Confluence
2. Update any placeholder information
3. Add recording and artifact links
4. Share with team and stakeholders

**Generated on:** ${new Date().toISOString()}
**Session:** Week ${this.sessionData.weekNumber} - ${this.sessionData.date}
`;

    await fs.writeFile(
      path.join(this.sessionData.exportPath, 'EXPORT-INSTRUCTIONS.md'),
      instructionsContent
    );

    console.log(chalk.green('  ✓ Export package created with instructions'));
  }
}

// Run the exporter
if (require.main === module) {
  new ConfluenceExporter().run();
}

module.exports = ConfluenceExporter;