# AI Friday - Intelligent Meeting Management System

A sophisticated agent-orchestrated system for organizing, running, and following up on AI Friday sessions - biweekly learning sessions for Product, Design, and Engineering teams. Built with Claude Code's native sub-agent architecture for consistent, high-quality session management.

## 🎯 Overview

AI Friday is a recurring, 60-minute, biweekly session where teams share AI learnings, showcase tips & tricks, and run live demos. This system uses specialized AI agents to automate and enhance every aspect of session management, from planning to post-session documentation.

### Session Format
- **Duration**: 60 minutes, every second Friday
- **Structure**: Lightning talks (25 min) + Feature demo (20 min) + Open clinic (15 min)
- **Audience**: Product, Design, Engineering, and anyone interested in AI
- **Management**: Fully orchestrated by specialized Claude sub-agents

## 🚀 Quick Start - Agent-Orchestrated Workflows

### For Session Hosts

#### 1. **Create a New Session** (`/new-session`)
```bash
/new-session
```
**What you provide**: Session date, host name, theme, special requirements
**What you get**:
- ✅ Complete week-specific folder: `/meetings/sessions/YYYY-MM-DD-week-N/`
- ✅ Theme-optimized agenda with timing and format
- ✅ Host prep checklist with timeline-based tasks
- ✅ Speaker coordination materials and guides
- ✅ Communication templates for outreach
- ✅ Baseline topic backup content ready
- ✅ Complete context trail for audit and learning

#### 2. **Prepare for the Meeting** (`/prep-meeting`)
```bash
/prep-meeting
```
**What you provide**: Target session (or current upcoming session)
**What you get**:
- ✅ Complete host facilitation package with timing guidance
- ✅ Individual speaker preparation materials
- ✅ Professional communication templates ready for distribution
- ✅ Technical setup verification and troubleshooting resources
- ✅ Platform configuration optimized for session experience
- ✅ Backup plans for common scenarios and issues

#### 3. **Process Session Notes** (`/process-notes`)
```bash
/process-notes
```
**What you provide**: Raw notes, transcripts, chat logs, shared materials
**What you get**:
- ✅ Structured meeting notes ready for team reference
- ✅ Action items extracted with clear ownership and deadlines
- ✅ Confluence-ready export for team wiki
- ✅ Resource library updates integrated
- ✅ Knowledge base enhanced with new insights
- ✅ Follow-up topics identified for future sessions

#### 4. **Manage Content Pipeline** (`/update-backlog`)
```bash
/update-backlog
```
**What you provide**: New submissions, pipeline preferences, focus areas
**What you get**:
- ✅ Updated content pipeline with clear priority levels
- ✅ New submissions processed and categorized
- ✅ Speaker outreach materials ready for community engagement
- ✅ Session planning recommendations for upcoming weeks
- ✅ Content gap analysis with filling strategies
- ✅ Community engagement metrics and insights

### For Speakers

1. **Submit a topic**: Use `/update-backlog` or fill out the [submission form](meetings/templates/submission-form.md)
2. **Prepare your content**: You'll receive customized preparation guides and support
3. **Join the session**: 8-20 minute slots with comprehensive coordination support

## 📁 Project Structure

```
aIFriday/
├── .claude/
│   ├── agents/           # 5 specialized Claude sub-agents
│   │   ├── session-manager.md      # Session structure & planning
│   │   ├── content-curator.md      # Speaker coordination & content prep
│   │   ├── topic-manager.md        # Pipeline management & submissions
│   │   ├── meeting-coordinator.md  # Logistics & communication
│   │   └── knowledge-organizer.md  # Note processing & documentation
│   ├── commands/         # Orchestrated slash commands
│   │   ├── new-session.md          # Trigger session creation workflow
│   │   ├── prep-meeting.md         # Trigger preparation workflow
│   │   ├── process-notes.md        # Trigger note processing workflow
│   │   └── update-backlog.md       # Trigger pipeline management workflow
│   └── skills/
│       └── orchestrator.md         # Central workflow coordination
├── meetings/
│   ├── templates/        # Reusable meeting templates
│   ├── sessions/         # Week-specific session folders with complete context
│   │   └── YYYY-MM-DD-week-N/     # Each session gets full folder structure
│   │       ├── context/            # Agent coordination & decisions
│   │       ├── inputs/             # Raw materials (notes, transcripts)
│   │       ├── generated/          # Agent-created materials
│   │       ├── outputs/            # Final deliverables
│   │       └── artifacts/          # Recordings, demos, slides
│   └── archive/          # Completed meetings
├── content/
│   ├── baseline-topics/  # Ready-to-run sessions (A-F)
│   ├── submissions/      # Speaker submissions organized by pipeline
│   │   ├── new/          # Unprocessed submissions
│   │   ├── in-review/    # Being evaluated
│   │   ├── scheduled/    # Assigned to sessions
│   │   └── archive/      # Completed submissions
│   ├── pipeline/         # Content pipeline management
│   │   ├── priority-queue.md       # Next 2-3 sessions
│   │   ├── medium-term.md          # 4-8 weeks out
│   │   └── idea-backlog.md         # Future development
│   └── resources/        # Shared assets, prompts, code samples
├── automation/
│   ├── scripts/          # Node.js automation scripts
│   └── generators/       # Template generators and utilities
├── docs/
│   ├── architecture/     # Agent system documentation
│   ├── playbooks/        # Process documentation
│   └── retrospectives/   # Meeting feedback and improvements
└── README.md
```

## 🤖 Agent-Orchestrated System

This project uses Claude Code's native sub-agent architecture for intelligent, consistent session management with cross-week learning and institutional memory.

### Specialized Sub-Agents

- **`session-manager`** - Creates session structure and planning with cross-week intelligence
- **`content-curator`** - Manages speakers, topics, and content preparation
- **`topic-manager`** - Handles pipeline management, submissions, and community engagement
- **`meeting-coordinator`** - Coordinates logistics, communication, and facilitation support
- **`knowledge-organizer`** - Processes notes into structured documentation and action items

### Orchestrated Slash Commands

- **`/new-session`** - Triggers session creation workflow (session-manager → content-curator → meeting-coordinator)
- **`/prep-meeting`** - Invokes meeting-coordinator for comprehensive preparation materials
- **`/process-notes`** - Activates knowledge-organizer for note processing and documentation
- **`/update-backlog`** - Engages topic-manager for pipeline and community management

### Intelligent Features

- **Cross-Week Learning**: Agents analyze previous sessions to improve outcomes
- **Context Preservation**: Complete audit trail of all decisions and work
- **Week-Centric Organization**: Each session gets dedicated folder with full context
- **Quality Assurance**: Built-in validation and professional output standards
- **Institutional Memory**: Patterns and preferences learned and applied automatically

### Usage Example

```bash
# Set up a new session with full orchestration
/new-session

# The orchestrator coordinates specialized agents to create:
# 1. Complete week-specific folder structure with context management
# 2. Cross-week analysis applied for optimal session format
# 3. Theme-optimized agenda with timing and backup content
# 4. Speaker coordination materials and communication templates
# 5. Host preparation package with facilitation guidance
# 6. Technical setup requirements and troubleshooting resources
# 7. Complete context trail for continuous improvement
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

## 📋 Agent-Orchestrated Session Workflow

### 1. Session Planning (2 weeks before)
```bash
/new-session
```
**Agents activated**: session-manager → content-curator → meeting-coordinator
**Deliverables**: Complete session package with agenda, speaker coordination, and prep materials

### 2. Pipeline Management (ongoing)
```bash
/update-backlog
```
**Agent activated**: topic-manager
**Deliverables**: Updated content pipeline, speaker outreach materials, and community engagement

### 3. Session Preparation (1 week before)
```bash
/prep-meeting
```
**Agent activated**: meeting-coordinator
**Deliverables**: Host facilitation package, technical setup, and communication materials

### 4. During the Session
- Follow the agent-generated facilitation guide
- Use structured note-taking templates
- Collect materials for post-session processing

### 5. Post-Session Processing
```bash
/process-notes
```
**Agent activated**: knowledge-organizer
**Deliverables**: Structured documentation, action items, Confluence export, and knowledge base updates

### 6. Continuous Improvement
- Agents automatically analyze each session for patterns and improvements
- Cross-week intelligence applied to future sessions
- Context preservation enables learning and optimization

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

## 📦 Complete Deliverables You Get

### From `/new-session` Workflow
**Input**: Session date, host, theme, requirements
**Output**: Complete session management package
- 📁 **Week-specific folder structure** with full organization
- 📋 **Theme-optimized agenda** with timing and backup content
- ✅ **Host prep checklist** with timeline-based tasks
- 👥 **Speaker coordination materials** and individual guides
- 📧 **Communication templates** for all touchpoints
- 🎯 **Baseline topic backups** ready for immediate use
- 📊 **Context files** documenting all decisions and cross-week learning

### From `/prep-meeting` Workflow
**Input**: Target session identification
**Output**: Comprehensive preparation package
- 🎤 **Host facilitation guide** with scripts and timing
- 🔧 **Technical setup verification** and troubleshooting
- 📬 **Professional communication templates** ready to send
- 📋 **Individual speaker prep materials** customized per presenter
- ⚙️ **Platform configuration** optimized for experience
- 🛡️ **Backup plans** for common scenarios and issues

### From `/process-notes` Workflow
**Input**: Raw notes, transcripts, chat logs, materials
**Output**: Professional documentation suite
- 📄 **Structured meeting notes** ready for team reference
- ✅ **Action items tracker** with ownership and deadlines
- 🌐 **Confluence-ready export** formatted for team wiki
- 📚 **Resource library updates** integrated and cataloged
- 🧠 **Knowledge base enhancements** with insights extracted
- 🔄 **Follow-up topics identified** for future sessions

### From `/update-backlog` Workflow
**Input**: New submissions, focus areas, preferences
**Output**: Content pipeline management system
- 📊 **Updated content pipeline** with priority levels and timelines
- 📝 **Processed submissions** categorized and scheduled
- 📢 **Speaker outreach materials** for community engagement
- 💡 **Session planning recommendations** for upcoming weeks
- 📈 **Content gap analysis** with strategic filling approaches
- 👥 **Community engagement insights** and participation metrics

### Universal Benefits
- 🧠 **Cross-week intelligence** applied automatically
- 📋 **Complete audit trail** of all decisions and work
- 🔄 **Institutional memory** preserved and leveraged
- 📈 **Continuous improvement** through pattern recognition
- ⚡ **Professional consistency** across all deliverables
- 🎯 **Quality assurance** built into every output

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

## 🚀 Getting Started

1. **Install Claude Code**: Ensure you have Claude Code CLI available
2. **Clone this repository**: `git clone https://github.com/boraalapgh/aIFriday.git`
3. **Start with a session**: Run `/new-session` to create your first AI Friday session
4. **Explore the agents**: Each slash command coordinates specialized agents automatically
5. **Build your pipeline**: Use `/update-backlog` to manage ongoing content and community

**System Architecture**: 5 specialized Claude sub-agents + orchestrator
**Last Updated**: November 2024 - Agent orchestration system with cross-week intelligence
**Next Session**: Check the [sessions index](meetings/sessions-index.md) for upcoming dates