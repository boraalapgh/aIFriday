#!/usr/bin/env node

/**
 * AI Friday Recording Processor
 *
 * Organizes meeting recordings, transcripts, and artifacts after sessions.
 * Helps structure raw materials for easy access and processing.
 */

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const glob = require('glob');
const { format } = require('date-fns');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../..');
const SESSIONS_DIR = path.join(PROJECT_ROOT, 'meetings/sessions');
const ARCHIVE_DIR = path.join(PROJECT_ROOT, 'meetings/archive');

class RecordingProcessor {
  constructor() {
    this.sessionData = {};
    this.processingOptions = {};
  }

  async run() {
    console.log(chalk.blue.bold('\n🎥 AI Friday Recording Processor\n'));

    try {
      await this.selectSession();
      await this.gatherProcessingOptions();
      await this.organizeArtifacts();
      await this.processRecordings();
      await this.generateSummary();
      await this.optionalArchive();

      console.log(chalk.green.bold('\n✅ Recording processing completed!'));
      console.log(chalk.gray(`📁 Session folder: ${this.sessionData.sessionPath}`));
      console.log(chalk.gray(`📋 Ready for content organization and follow-up\n`));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ Error processing recordings:'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  }

  async selectSession() {
    // Find all session folders
    const sessionFolders = await this.findSessionFolders();

    if (sessionFolders.length === 0) {
      throw new Error('No session folders found. Create a session first.');
    }

    const { selectedSession } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSession',
        message: 'Which session to process?',
        choices: sessionFolders.map(folder => ({
          name: `${path.basename(folder)} (${this.getSessionStatus(folder)})`,
          value: folder
        }))
      }
    ]);

    this.sessionData = {
      sessionPath: selectedSession,
      sessionName: path.basename(selectedSession),
      artifactsPath: path.join(selectedSession, 'artifacts'),
      demosPath: path.join(selectedSession, 'demos')
    };

    // Ensure artifacts directory exists
    await fs.ensureDir(this.sessionData.artifactsPath);
    await fs.ensureDir(this.sessionData.demosPath);
  }

  async findSessionFolders() {
    const sessionPattern = path.join(SESSIONS_DIR, '*-week-*');
    return glob.sync(sessionPattern).filter(folder =>
      fs.statSync(folder).isDirectory()
    ).sort().reverse(); // Most recent first
  }

  getSessionStatus(sessionPath) {
    const readmePath = path.join(sessionPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      if (content.includes('- [x] Session completed')) {
        return 'Completed';
      } else if (content.includes('- [x] Speakers confirmed')) {
        return 'Ready';
      }
    }
    return 'Planning';
  }

  async gatherProcessingOptions() {
    const options = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'processTypes',
        message: 'What do you want to process?',
        choices: [
          { name: 'Meeting recording (video/audio)', value: 'recording' },
          { name: 'Chat logs and shared links', value: 'chat' },
          { name: 'Speaker materials (slides, demos)', value: 'materials' },
          { name: 'Screenshots and images', value: 'images' },
          { name: 'Code samples and repositories', value: 'code' }
        ]
      },
      {
        type: 'input',
        name: 'recordingPath',
        message: 'Path to recording file (or drag & drop):',
        when: (answers) => answers.processTypes.includes('recording'),
        validate: (input) => {
          if (!input) return 'Recording path is required';
          const cleanPath = input.replace(/['"]/g, '').trim();
          if (!fs.existsSync(cleanPath)) {
            return 'File not found. Please check the path.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'materialsPath',
        message: 'Path to speaker materials folder (or drag & drop):',
        when: (answers) => answers.processTypes.includes('materials'),
        validate: (input) => {
          if (!input) return 'Materials path is required';
          const cleanPath = input.replace(/['"]/g, '').trim();
          if (!fs.existsSync(cleanPath)) {
            return 'Folder not found. Please check the path.';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'generateTranscript',
        message: 'Generate transcript placeholder (for manual transcription)?',
        default: true,
        when: (answers) => answers.processTypes.includes('recording')
      },
      {
        type: 'confirm',
        name: 'createProcessedFolder',
        message: 'Create processed content folder structure?',
        default: true
      }
    ]);

    this.processingOptions = options;
  }

  async organizeArtifacts() {
    console.log(chalk.yellow('📁 Organizing artifacts...'));

    // Create organized folder structure
    const folders = [
      path.join(this.sessionData.artifactsPath, 'recording'),
      path.join(this.sessionData.artifactsPath, 'materials'),
      path.join(this.sessionData.artifactsPath, 'chat-logs'),
      path.join(this.sessionData.artifactsPath, 'images'),
      path.join(this.sessionData.artifactsPath, 'processed')
    ];

    for (const folder of folders) {
      await fs.ensureDir(folder);
    }

    // Create processing templates if requested
    if (this.processingOptions.createProcessedFolder) {
      await this.createProcessingTemplates();
    }
  }

  async processRecordings() {
    if (this.processingOptions.processTypes.includes('recording') && this.processingOptions.recordingPath) {
      console.log(chalk.yellow('🎥 Processing recording...'));

      const recordingPath = this.processingOptions.recordingPath.replace(/['"]/g, '').trim();
      const recordingExt = path.extname(recordingPath);
      const recordingName = `${this.sessionData.sessionName}-recording${recordingExt}`;
      const targetPath = path.join(this.sessionData.artifactsPath, 'recording', recordingName);

      // Copy recording to artifacts folder
      await fs.copy(recordingPath, targetPath);
      console.log(chalk.green(`  ✓ Recording copied to: ${path.relative(PROJECT_ROOT, targetPath)}`));

      // Generate transcript placeholder
      if (this.processingOptions.generateTranscript) {
        await this.createTranscriptPlaceholder();
      }
    }

    if (this.processingOptions.processTypes.includes('materials') && this.processingOptions.materialsPath) {
      console.log(chalk.yellow('📋 Processing speaker materials...'));

      const materialsPath = this.processingOptions.materialsPath.replace(/['"]/g, '').trim();
      const targetPath = path.join(this.sessionData.artifactsPath, 'materials');

      // Copy all materials
      const items = await fs.readdir(materialsPath);
      for (const item of items) {
        const sourcePath = path.join(materialsPath, item);
        const destPath = path.join(targetPath, item);
        await fs.copy(sourcePath, destPath);
      }

      console.log(chalk.green(`  ✓ Materials copied to: ${path.relative(PROJECT_ROOT, targetPath)}`));
    }
  }

  async createTranscriptPlaceholder() {
    const transcriptContent = `# AI Friday Session Transcript - ${this.sessionData.sessionName}

**Date:** ${format(new Date(), 'yyyy-MM-dd')}
**Status:** Pending transcription
**Recording:** [${this.sessionData.sessionName}-recording.*](./recording/)

## Instructions

1. **Automated transcription**: Use tools like:
   - Whisper (OpenAI) for local transcription
   - Otter.ai for cloud transcription
   - Rev.com for professional transcription

2. **Manual review**: Always review and correct:
   - Speaker names and identification
   - Technical terms and product names
   - Links and URLs shared
   - Action items and decisions

3. **Structured output**: Organize transcript into:
   - Opening and introductions
   - Lightning talks (with speaker names)
   - Demo sections
   - Q&A and clinic discussions
   - Closing and action items

## Transcript

[Transcript content will be added here]

### Opening (0:00 - 5:00)
- Welcome and agenda overview
- Quick wins and updates

### Lightning Talk 1 (5:00 - 15:00)
**Speaker:** [Name]
**Topic:** [Title]

[Transcript content...]

### Lightning Talk 2 (15:00 - 25:00)
**Speaker:** [Name]
**Topic:** [Title]

[Transcript content...]

### Demo Session (25:00 - 45:00)
**Presenter:** [Name]
**Demo:** [Title]

[Transcript content...]

### Open Clinic (45:00 - 60:00)
- Questions and troubleshooting
- Pair-up requests
- Resource sharing

[Transcript content...]

## Key Quotes

- "[Notable quote or insight]" - Speaker Name
- "[Important decision or action item]" - Speaker Name

## Action Items Extracted

- [ ] Action item 1 - Owner
- [ ] Action item 2 - Owner
- [ ] Action item 3 - Owner

## Links and Resources Mentioned

- Tool/Resource 1: [URL]
- Tool/Resource 2: [URL]
- Code Repository: [URL]
`;

    const transcriptPath = path.join(this.sessionData.artifactsPath, 'processed', 'transcript.md');
    await fs.writeFile(transcriptPath, transcriptContent);

    console.log(chalk.green(`  ✓ Transcript template created: ${path.relative(PROJECT_ROOT, transcriptPath)}`));
  }

  async createProcessingTemplates() {
    console.log(chalk.yellow('📝 Creating processing templates...'));

    // Processing checklist
    const checklistContent = `# Session Processing Checklist - ${this.sessionData.sessionName}

## Recording Processing
- [ ] Recording file copied to artifacts/recording/
- [ ] Transcript generated (automated)
- [ ] Transcript reviewed and corrected (manual)
- [ ] Key quotes and insights extracted
- [ ] Action items identified and assigned

## Materials Organization
- [ ] Speaker slides organized in artifacts/materials/
- [ ] Demo code and samples in demos/
- [ ] Chat logs and shared links documented
- [ ] Screenshots and images organized

## Content Creation
- [ ] Meeting notes updated with complete details
- [ ] Action items transferred to follow-ups.md
- [ ] Resource links validated and categorized
- [ ] Knowledge base articles created

## Distribution
- [ ] Notes formatted for Confluence
- [ ] Recording link shared internally
- [ ] Action items communicated to owners
- [ ] Resources added to team knowledge base

## Archive Preparation
- [ ] All artifacts properly organized
- [ ] Links and references updated
- [ ] Session marked as complete
- [ ] Consider moving to archive/ folder

## Quality Check
- [ ] All shared links are working
- [ ] Action items have clear owners and dates
- [ ] Content is searchable and well-organized
- [ ] Feedback collected for session improvement

**Processing Started:** ${format(new Date(), 'yyyy-MM-dd HH:mm')}
**Processing Status:** In Progress
**Processed By:** [Your name]
`;

    await fs.writeFile(
      path.join(this.sessionData.artifactsPath, 'processed', 'processing-checklist.md'),
      checklistContent
    );

    // Links tracker
    const linksContent = `# Links and Resources - ${this.sessionData.sessionName}

## Tools and Services Mentioned

### AI Tools
- Tool Name: [URL] - Description

### Development Tools
- Tool Name: [URL] - Description

### Resources and Articles
- Resource Name: [URL] - Description

## Code Repositories
- Repository Name: [URL] - Description and relevance

## Slides and Presentations
- Presentation Title: [Path to file] - Presenter name

## Action Items with Links
- Action item description: [Related URL] - Owner

## Quick Reference
*Most valuable links from this session:*

1. [Most important resource]: URL
2. [Second most important]: URL
3. [Third most important]: URL

## Follow-up Opportunities
*Links that suggest future session topics:*

- Topic idea: [Related URL]
- Tool to explore: [URL]
- Collaboration opportunity: [URL]
`;

    await fs.writeFile(
      path.join(this.sessionData.artifactsPath, 'processed', 'links-tracker.md'),
      linksContent
    );

    console.log(chalk.green('  ✓ Processing templates created'));
  }

  async generateSummary() {
    console.log(chalk.yellow('📊 Generating processing summary...'));

    const summaryContent = `# Processing Summary - ${this.sessionData.sessionName}

**Processed Date:** ${format(new Date(), 'yyyy-MM-dd HH:mm')}
**Session Date:** [Add session date]
**Processing Options:** ${this.processingOptions.processTypes.join(', ')}

## Files Processed

### Recordings
${this.processingOptions.processTypes.includes('recording') ?
  '- ✅ Recording file organized and transcript placeholder created' :
  '- ❌ No recording processed'}

### Materials
${this.processingOptions.processTypes.includes('materials') ?
  '- ✅ Speaker materials organized in artifacts/materials/' :
  '- ❌ No materials processed'}

### Templates Created
${this.processingOptions.createProcessedFolder ?
  '- ✅ Processing templates and checklists created' :
  '- ❌ No templates created'}

## Next Steps

1. **Immediate (next 24 hours):**
   - Review and complete transcript if recording was processed
   - Update meeting notes with final details
   - Validate all shared links

2. **Short term (next week):**
   - Process action items and assign owners
   - Create knowledge base articles from insights
   - Share resources with broader team

3. **Medium term (next month):**
   - Consider archiving completed session
   - Extract learnings for future session planning
   - Follow up on action items and outcomes

## File Structure Created

\`\`\`
${this.sessionData.sessionName}/
├── artifacts/
│   ├── recording/           # Meeting recordings
│   ├── materials/           # Speaker slides and demos
│   ├── chat-logs/          # Chat transcripts and links
│   ├── images/             # Screenshots and visuals
│   └── processed/          # Templates and organized content
├── demos/                  # Code samples and demo materials
└── [existing session files]
\`\`\`

## Ready For

- [ ] Content organization with Claude skills
- [ ] Manual review and quality check
- [ ] Distribution to team and stakeholders
- [ ] Archive preparation if session is complete
`;

    await fs.writeFile(
      path.join(this.sessionData.sessionPath, 'processing-summary.md'),
      summaryContent
    );

    console.log(chalk.green(`  ✓ Summary created: processing-summary.md`));
  }

  async optionalArchive() {
    const { shouldArchive } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldArchive',
        message: 'Is this session complete and ready to archive?',
        default: false
      }
    ]);

    if (shouldArchive) {
      console.log(chalk.yellow('📦 Moving session to archive...'));

      await fs.ensureDir(ARCHIVE_DIR);
      const archivePath = path.join(ARCHIVE_DIR, this.sessionData.sessionName);

      await fs.move(this.sessionData.sessionPath, archivePath);

      console.log(chalk.green(`  ✓ Session archived to: ${path.relative(PROJECT_ROOT, archivePath)}`));
    }
  }
}

// Run the processor
if (require.main === module) {
  new RecordingProcessor().run();
}

module.exports = RecordingProcessor;