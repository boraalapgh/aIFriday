# AI Friday - Meeting Management System

A comprehensive system for organizing, running, and following up on AI Friday sessions - biweekly learning sessions for Product, Design, and Engineering teams.

## 🎯 Overview

AI Friday is a recurring, 60-minute, biweekly session where teams share AI learnings, showcase tips & tricks, and run live demos. This repository contains all the tools, templates, and automation needed to run successful AI Friday sessions.

### Session Format
- **Duration**: 60 minutes, every second Friday
- **Structure**: Lightning talks (20 min) + Feature demo (20 min) + Open clinic (15 min)
- **Audience**: Product, Design, Engineering, and anyone interested in AI

## 🚀 Quick Start

### For Session Hosts

1. **Create a new session**:
   ```bash
   /new-session
   ```
   Or use automation:
   ```bash
   cd automation && npm run new-session
   ```

2. **Prep for the meeting**:
   ```bash
   /prep-meeting
   ```

3. **After the session**:
   ```bash
   /process-notes
   ```

### For Speakers

1. **Submit a topic**: Fill out the [submission form](meetings/templates/submission-form.md)
2. **Prepare your content**: Check the [speaker guide](docs/playbooks/speaker-guide.md)
3. **Join the session**: 5-20 minute slots available

## 📁 Project Structure

```
aIFriday/
├── .claude/
│   ├── commands/          # Custom slash commands (/new-session, /prep-meeting, etc.)
│   └── skills/           # Claude skills for meeting management
├── meetings/
│   ├── templates/        # Reusable meeting templates
│   ├── sessions/         # Individual meeting folders (by date)
│   └── archive/          # Completed meetings
├── content/
│   ├── baseline-topics/  # Ready-to-run sessions (A-F)
│   ├── submissions/      # Speaker submissions and ideas
│   └── resources/        # Shared assets, prompts, code samples
├── automation/
│   ├── scripts/          # Node.js automation scripts
│   └── generators/       # Template generators and utilities
├── docs/
│   ├── playbooks/        # Process documentation
│   └── retrospectives/   # Meeting feedback and improvements
└── README.md
```

## 🤖 Claude Code Integration

This project is designed to work seamlessly with Claude Code's CLI interface.

### Custom Slash Commands

- **`/new-session`** - Set up a new AI Friday session with all templates
- **`/prep-meeting`** - Generate prep materials for upcoming session
- **`/process-notes`** - Convert raw notes into structured documentation
- **`/update-backlog`** - Manage submission queue and baseline topics

### Custom Skills

- **`ai-friday-prep`** - Generate meeting agendas and prep checklists
- **`session-generator`** - Create new session folders with templates
- **`content-organizer`** - Process meeting notes into structured docs
- **`topic-manager`** - Manage submission queue and baseline topics

### Usage Example

```bash
# Set up a new session
/new-session

# Claude will ask for session details and create:
# - Complete folder structure
# - Pre-filled agenda template
# - Notes template for scribe
# - Follow-up tracking template
```

## 🛠 Automation Scripts

Node.js scripts for advanced automation:

```bash
cd automation

# Install dependencies
npm install

# Available commands
npm run new-session          # Create new session
npm run process-recordings   # Organize meeting artifacts
npm run update-calendar      # Generate calendar content
npm run export-confluence    # Format for Confluence

# Or use the CLI directly
node index.js workflow --type new      # Complete new session setup
node index.js workflow --type complete # Process completed session
```

## 📋 Session Management Workflow

### 1. Session Planning (2 weeks before)
- Use `/new-session` to create session structure
- Reach out to potential speakers
- Update submission queue with `/update-backlog`

### 2. Session Preparation (1 week before)
- Use `/prep-meeting` to generate materials
- Send calendar invites and reminders
- Prepare backup topics from baseline content

### 3. During the Session
- Follow the agenda template
- Take notes using the scribe template
- Record the session for later processing

### 4. Post-Session Follow-up
- Use `/process-notes` to structure raw materials
- Extract action items and resources
- Export to Confluence for team sharing

## 📚 Baseline Topics (Ready-to-Run)

When speakers aren't available, use these prepared sessions:

- **Session A**: Figma → Code: Tokens to Components
- **Session B**: Agents in the Frontend (OpenAI Agents SDK)
- **Session C**: Prompt Engineering Playbook for ICs
- **Session D**: Claude: Zero‑to‑Docs with AI
- **Session E**: Storybook v9: Zero‑to‑Docs with AI
- **Session F**: Figma MCP & Code Generation

Each baseline topic includes:
- Lightning talk outline
- Live demo script
- Resource links
- Discussion prompts

## 🎯 Success Metrics

### Goals (6-8 weeks)
- ✅ Library of ≥10 internal tips/playbooks documented
- ✅ Positive pulse score (≥4/5) on usefulness and clarity
- ✅ Spark ≥2 ideas for new projects
- ✅ Active community participation

### Tracking
- Attendance and engagement metrics
- Resource library growth
- Action item completion rates
- Community feedback and satisfaction

## 🤝 Contributing

### Adding New Content

1. **Submit a topic**: Use the [submission form](meetings/templates/submission-form.md)
2. **Create baseline topics**: Follow the template in `content/baseline-topics/`
3. **Improve processes**: Update playbooks in `docs/playbooks/`

### Development

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/your-feature`
3. **Make changes** and test with Claude Code
4. **Submit pull request** with clear description

## 📖 Documentation

- **[Speaker Guide](docs/playbooks/speaker-guide.md)** - How to prepare and present
- **[Host Guide](docs/playbooks/host-guide.md)** - Running successful sessions
- **[Process Guide](docs/playbooks/process-guide.md)** - Full workflow documentation

## 🔗 Quick Links

- **[Session Index](meetings/sessions-index.md)** - All past and upcoming sessions
- **[Resource Library](content/resources/README.md)** - Tools and links shared
- **[Submission Queue](content/submissions/README.md)** - Upcoming topics and speakers

## 📞 Support

- **Issues**: Use GitHub issues for bugs and feature requests
- **Questions**: Ask in the #ai-friday channel
- **Host**: Contact the current AI Friday host for session-specific questions

---

**Last Updated**: Generated automatically by AI Friday automation tools
**Next Session**: Check the [sessions index](meetings/sessions-index.md) for upcoming dates