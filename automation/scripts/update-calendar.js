#!/usr/bin/env node

/**
 * AI Friday Calendar Updater
 *
 * Generates calendar-ready meeting descriptions, invites, and scheduling content
 * based on session agendas and speaker information.
 */

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { format, addDays, parse } = require('date-fns');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../..');
const SESSIONS_DIR = path.join(PROJECT_ROOT, 'meetings/sessions');

class CalendarUpdater {
  constructor() {
    this.sessionData = {};
    this.calendarOptions = {};
  }

  async run() {
    console.log(chalk.blue.bold('\n📅 AI Friday Calendar Updater\n'));

    try {
      await this.selectSession();
      await this.parseSessionData();
      await this.gatherCalendarOptions();
      await this.generateCalendarContent();
      await this.generateCommunications();

      console.log(chalk.green.bold('\n✅ Calendar content generated!'));
      console.log(chalk.gray(`📁 Calendar files created in: ${this.sessionData.sessionPath}/calendar/`));
      console.log(chalk.gray(`📋 Ready for copy-paste to calendar systems\n`));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ Error generating calendar content:'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  }

  async selectSession() {
    // Find session folders
    const sessionFolders = await this.findSessionFolders();

    if (sessionFolders.length === 0) {
      throw new Error('No session folders found. Create a session first.');
    }

    const { selectedSession } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSession',
        message: 'Which session to create calendar content for?',
        choices: sessionFolders.map(folder => ({
          name: `${path.basename(folder)} (${this.getSessionStatus(folder)})`,
          value: folder
        }))
      }
    ]);

    this.sessionData.sessionPath = selectedSession;
    this.sessionData.sessionName = path.basename(selectedSession);
    this.sessionData.calendarPath = path.join(selectedSession, 'calendar');

    // Ensure calendar directory exists
    await fs.ensureDir(this.sessionData.calendarPath);
  }

  async findSessionFolders() {
    const pattern = path.join(SESSIONS_DIR, '*-week-*');
    const glob = require('glob');
    return glob.sync(pattern).filter(folder =>
      fs.statSync(folder).isDirectory()
    ).sort().reverse();
  }

  getSessionStatus(sessionPath) {
    const agendaPath = path.join(sessionPath, 'agenda.md');
    if (fs.existsSync(agendaPath)) {
      const content = fs.readFileSync(agendaPath, 'utf8');
      if (content.includes('TBD') || content.includes('Seeking speaker')) {
        return 'Needs speakers';
      }
      return 'Ready';
    }
    return 'Draft';
  }

  async parseSessionData() {
    console.log(chalk.yellow('📖 Parsing session data...'));

    // Parse session name for date and week
    const nameMatch = this.sessionData.sessionName.match(/(\d{4}-\d{2}-\d{2})-week-(\d+)/);
    if (nameMatch) {
      this.sessionData.date = nameMatch[1];
      this.sessionData.weekNumber = nameMatch[2];
      this.sessionData.parsedDate = parse(this.sessionData.date, 'yyyy-MM-dd', new Date());
    }

    // Read agenda file
    const agendaPath = path.join(this.sessionData.sessionPath, 'agenda.md');
    if (await fs.pathExists(agendaPath)) {
      this.sessionData.agendaContent = await fs.readFile(agendaPath, 'utf8');
      this.parseAgendaContent();
    }

    // Read README for additional context
    const readmePath = path.join(this.sessionData.sessionPath, 'README.md');
    if (await fs.pathExists(readmePath)) {
      this.sessionData.readmeContent = await fs.readFile(readmePath, 'utf8');
    }
  }

  parseAgendaContent() {
    const content = this.sessionData.agendaContent;

    // Extract host
    const hostMatch = content.match(/\*\*Host:\*\* (.+)/);
    this.sessionData.host = hostMatch ? hostMatch[1] : 'TBD';

    // Extract speakers and topics
    this.sessionData.speakers = [];

    // Lightning talks
    const talk1Match = content.match(/#### Talk 1 — (.+) \(5–10 min\)\s+- \*\*Speaker:\*\* (.+)\s+- \*\*Abstract:\*\* (.+)/);
    if (talk1Match) {
      this.sessionData.speakers.push({
        type: 'lightning',
        title: talk1Match[1],
        speaker: talk1Match[2],
        abstract: talk1Match[3]
      });
    }

    const talk2Match = content.match(/#### Talk 2 — (.+) \(5–10 min\)\s+- \*\*Speaker:\*\* (.+)\s+- \*\*Abstract:\*\* (.+)/);
    if (talk2Match) {
      this.sessionData.speakers.push({
        type: 'lightning',
        title: talk2Match[1],
        speaker: talk2Match[2],
        abstract: talk2Match[3]
      });
    }

    // Demo
    const demoMatch = content.match(/### 🎯 Feature demo \(20 min\) — (.+)\s+- \*\*Presenter:\*\* (.+)\s+- \*\*Focus:\*\* (.+)/);
    if (demoMatch) {
      this.sessionData.speakers.push({
        type: 'demo',
        title: demoMatch[1],
        speaker: demoMatch[2],
        abstract: demoMatch[3]
      });
    }
  }

  async gatherCalendarOptions() {
    const options = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'generateTypes',
        message: 'What calendar content to generate?',
        choices: [
          { name: 'Calendar invite description (Teams/Outlook)', value: 'invite' },
          { name: 'Email announcement template', value: 'email' },
          { name: 'Slack/Teams channel message', value: 'slack' },
          { name: 'Reminder messages (2 days before)', value: 'reminders' },
          { name: 'ICS calendar file', value: 'ics' }
        ],
        default: ['invite', 'email', 'slack']
      },
      {
        type: 'input',
        name: 'meetingUrl',
        message: 'Teams meeting URL (if available):',
        default: 'https://teams.microsoft.com/l/meetup-join/...'
      },
      {
        type: 'input',
        name: 'timeZone',
        message: 'Time zone for the meeting:',
        default: 'Europe/Amsterdam'
      },
      {
        type: 'input',
        name: 'startTime',
        message: 'Meeting start time (HH:mm):',
        default: '12:00'
      }
    ]);

    this.calendarOptions = options;
  }

  async generateCalendarContent() {
    console.log(chalk.yellow('📅 Generating calendar content...'));

    if (this.calendarOptions.generateTypes.includes('invite')) {
      await this.generateCalendarInvite();
    }

    if (this.calendarOptions.generateTypes.includes('email')) {
      await this.generateEmailAnnouncement();
    }

    if (this.calendarOptions.generateTypes.includes('slack')) {
      await this.generateSlackMessage();
    }

    if (this.calendarOptions.generateTypes.includes('reminders')) {
      await this.generateReminderMessages();
    }

    if (this.calendarOptions.generateTypes.includes('ics')) {
      await this.generateICSFile();
    }
  }

  async generateCalendarInvite() {
    const speakersList = this.sessionData.speakers
      .map(s => `${s.title} (${s.speaker})`)
      .join(', ') || 'Speakers TBD';

    const inviteContent = `AI Friday — Week ${this.sessionData.weekNumber} — Tips, Tricks & Live Demos

📅 ${format(this.sessionData.parsedDate, 'EEEE, MMMM do, yyyy')} at ${this.calendarOptions.startTime} (${this.calendarOptions.timeZone})
🎯 Biweekly AI learning session for Product, Design, and Engineering

Join our biweekly AI Friday to share what you're building with AI, swap practical tips, and watch live demos (Figma → code, theming, Storybook, agents, etc.). Each session features lightning talks + a focused demo + open clinic. New to AI? Perfect—bring a problem, a question, or a 2‑minute show‑and‑tell.

🏃‍♂️ This Week's Speakers:
${speakersList}

📋 AGENDA (60 minutes)
• 00–05: Welcome & wins
• 05–25: Lightning talks (5–10 min each)
• 25–45: Feature demo (Figma/coding, agent workflows, Storybook theming, etc.)
• 45–60: Open clinic: unblockers, troubleshooting, "pair‑up" asks

🏠 House rules: Be kind. Keep it concrete. Share links. Recordings & notes posted same day.

🔗 Links:
• Meeting: ${this.calendarOptions.meetingUrl}
• Submit topics: [Confluence Page URL]
• Previous sessions: [AI Friday Sessions Index]

Host: ${this.sessionData.host}
Recording: Enabled (internal use only)`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'calendar-invite.txt'),
      inviteContent
    );

    console.log(chalk.green('  ✓ Calendar invite content created'));
  }

  async generateEmailAnnouncement() {
    const nextSessionDate = format(addDays(this.sessionData.parsedDate, 14), 'MMMM do');

    const emailContent = `Subject: 🤖 AI Friday Week ${this.sessionData.weekNumber} - ${format(this.sessionData.parsedDate, 'MMM do')} - ${this.sessionData.speakers.length > 0 ? 'Great lineup!' : 'Speakers needed!'}

Hi team,

Our next AI Friday is coming up on ${format(this.sessionData.parsedDate, 'EEEE, MMMM do')} at ${this.calendarOptions.startTime}!

${this.sessionData.speakers.length > 0 ?
  `🎯 This week's lineup:\n${this.sessionData.speakers.map(s => `• ${s.title} - ${s.speaker}`).join('\n')}\n` :
  `🔍 We're still looking for speakers! This is a great opportunity to share your AI learnings with the team.\n`
}

What to expect:
• Lightning talks (5-10 min): Quick tips and tricks
• Live demo (15-20 min): Hands-on AI workflows
• Open clinic (15 min): Bring your AI questions and blockers

Perfect for:
✅ Sharing a cool AI tool you discovered
✅ Showing how you automated a workflow
✅ Getting help with an AI implementation
✅ Learning what others are building

${this.sessionData.speakers.length === 0 ?
  `Want to present? Reply to this email or submit here: [Confluence Page]\nEven a 5-minute tip is valuable!` :
  `Can't make it? No worries - we'll share the recording and notes afterward.`
}

📅 Calendar invite: Check your calendar for "AI Friday Week ${this.sessionData.weekNumber}"
🔗 Teams link: ${this.calendarOptions.meetingUrl}
⏰ Time: ${this.calendarOptions.startTime} ${this.calendarOptions.timeZone} (60 min)

See you there!
${this.sessionData.host}

P.S. Next AI Friday after this: ${nextSessionDate}`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'email-announcement.txt'),
      emailContent
    );

    console.log(chalk.green('  ✓ Email announcement created'));
  }

  async generateSlackMessage() {
    const speakersText = this.sessionData.speakers.length > 0 ?
      `🎤 Speakers: ${this.sessionData.speakers.map(s => s.speaker).join(', ')}` :
      `🔍 Still seeking speakers - great opportunity to share your AI wins!`;

    const slackContent = `🤖 **AI Friday Week ${this.sessionData.weekNumber}** - ${format(this.sessionData.parsedDate, 'MMM do')} at ${this.calendarOptions.startTime}

${speakersText}

Quick AI tips + live demos + open clinic for questions/blockers

${this.sessionData.speakers.length > 0 ?
  `This week:\n${this.sessionData.speakers.map(s => `• ${s.title}`).join('\n')}` :
  `Perfect chance to share:\n• A useful AI tool you found\n• How you automated something\n• Cool workflow or demo`
}

📅 Calendar invite sent | 🎥 Recording enabled | ⏰ 60 min
🔗 ${this.calendarOptions.meetingUrl}

${this.sessionData.speakers.length === 0 ? 'Want to present? DM me!' : 'See you there! 🚀'}`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'slack-message.txt'),
      slackContent
    );

    console.log(chalk.green('  ✓ Slack message created'));
  }

  async generateReminderMessages() {
    const twoDaysBefore = format(addDays(this.sessionData.parsedDate, -2), 'EEEE');
    const dayBefore = format(addDays(this.sessionData.parsedDate, -1), 'EEEE');

    // 2-day reminder
    const twoDayReminder = `Subject: 🤖 AI Friday reminder - This ${format(this.sessionData.parsedDate, 'EEEE')} at ${this.calendarOptions.startTime}

Quick reminder that AI Friday Week ${this.sessionData.weekNumber} is this ${format(this.sessionData.parsedDate, 'EEEE')}!

${this.sessionData.speakers.length > 0 ?
  `Confirmed lineup:\n${this.sessionData.speakers.map(s => `• ${s.title} - ${s.speaker}`).join('\n')}` :
  `We still have room for more speakers - even 5-minute tips are super valuable!`
}

📅 ${format(this.sessionData.parsedDate, 'EEEE, MMMM do')} at ${this.calendarOptions.startTime}
🔗 Teams: ${this.calendarOptions.meetingUrl}

Bring your AI questions for the open clinic! 🚀`;

    // Day-before reminder
    const dayBeforeReminder = `Subject: 🤖 Tomorrow: AI Friday Week ${this.sessionData.weekNumber} at ${this.calendarOptions.startTime}

AI Friday is tomorrow! 🎉

Final agenda:
${this.sessionData.speakers.length > 0 ?
  this.sessionData.speakers.map((s, i) =>
    `• ${s.type === 'demo' ? '🎯 Demo' : '⚡ Lightning'}: ${s.title} - ${s.speaker}`
  ).join('\n') :
  '• Looking for last-minute speakers (even 5 min is great!)'
}

What to bring:
✅ Your AI questions and blockers for the clinic
✅ Any cool tools or tips you want to share quickly
✅ Problems you're stuck on (crowd-sourced solutions!)

📅 Tomorrow (${format(this.sessionData.parsedDate, 'EEEE')}) at ${this.calendarOptions.startTime}
🔗 ${this.calendarOptions.meetingUrl}
🎥 Will be recorded for folks who can't make it

See you there!`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'reminder-2-days.txt'),
      twoDayReminder
    );

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'reminder-day-before.txt'),
      dayBeforeReminder
    );

    console.log(chalk.green('  ✓ Reminder messages created'));
  }

  async generateICSFile() {
    const startDateTime = new Date(`${this.sessionData.date}T${this.calendarOptions.startTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AI Friday//AI Friday Session//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:ai-friday-week-${this.sessionData.weekNumber}@company.com
DTSTART:${formatICSDate(startDateTime)}
DTEND:${formatICSDate(endDateTime)}
SUMMARY:AI Friday — Week ${this.sessionData.weekNumber} — Tips, Tricks & Live Demos
DESCRIPTION:Biweekly AI learning session with lightning talks\\, demos\\, and open clinic. Speakers: ${this.sessionData.speakers.map(s => s.speaker).join(', ') || 'TBD'}
LOCATION:${this.calendarOptions.meetingUrl}
ORGANIZER:CN=${this.sessionData.host}:MAILTO:organizer@company.com
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, `ai-friday-week-${this.sessionData.weekNumber}.ics`),
      icsContent
    );

    console.log(chalk.green('  ✓ ICS calendar file created'));
  }

  async generateCommunications() {
    console.log(chalk.yellow('📨 Creating communication templates...'));

    // Communication checklist
    const checklistContent = `# Communication Checklist - Week ${this.sessionData.weekNumber}

## Pre-Session Communications

### 1 Week Before
- [ ] Email announcement sent to team distribution list
- [ ] Calendar invites sent to regular attendees
- [ ] Slack/Teams channel announcement posted
- [ ] Confluence page updated with session details

### 2-3 Days Before
- [ ] Reminder email sent (use reminder-2-days.txt)
- [ ] Speaker prep check-in completed
- [ ] Tech setup confirmed (Teams link, recording, etc.)
- [ ] Last call for additional speakers if needed

### Day Before
- [ ] Final reminder sent (use reminder-day-before.txt)
- [ ] Agenda finalized and shared
- [ ] All speaker materials received and organized
- [ ] Backup topics ready if needed

## Day Of Session
- [ ] Teams meeting started 5 minutes early
- [ ] Recording enabled
- [ ] Welcome and housekeeping (5 min)
- [ ] Agenda shared in chat
- [ ] Links and resources shared during session

## Post-Session Communications
- [ ] Recording processed and shared
- [ ] Session notes published to Confluence
- [ ] Action items distributed to owners
- [ ] Thank you message to speakers
- [ ] Next session announcement (2 weeks out)

## Files Generated
- calendar-invite.txt: Copy-paste ready invite description
- email-announcement.txt: Team announcement email
- slack-message.txt: Channel announcement
- reminder-2-days.txt: Pre-session reminder
- reminder-day-before.txt: Final reminder
- ai-friday-week-${this.sessionData.weekNumber}.ics: Calendar file for import

## Communication Channels
- Email: [Distribution list]
- Slack: #ai-friday channel
- Teams: [Team channel]
- Confluence: [AI Friday space]

**Communication Owner:** ${this.sessionData.host}
**Session Date:** ${this.sessionData.date}
**Teams Link:** ${this.calendarOptions.meetingUrl}
`;

    await fs.writeFile(
      path.join(this.sessionData.calendarPath, 'communication-checklist.md'),
      checklistContent
    );

    console.log(chalk.green('  ✓ Communication templates and checklist created'));
  }
}

// Run the updater
if (require.main === module) {
  new CalendarUpdater().run();
}

module.exports = CalendarUpdater;