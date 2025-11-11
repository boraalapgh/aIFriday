Create a new AI Friday session using the orchestrated agent system with complete folder structure, templates, and cross-week intelligence.

This command triggers the **Session Creation Workflow** using the AI Friday orchestrator and specialized sub-agents.

## What This Command Does

1. **Gathers Session Details**: Collects session date, host, theme, and special requirements
2. **Analyzes Previous Sessions**: Reviews recent sessions for successful patterns and host preferences
3. **Creates Week-Specific Folder**: Sets up complete session structure with context management
4. **Invokes Specialized Sub-Agents**: Coordinates session-manager → content-curator → meeting-coordinator
5. **Delivers Complete Session Package**: All templates, prep materials, and coordination tools ready

## Session Details Required

When you run this command, you'll be asked for:
- **Session Date** (YYYY-MM-DD format)
- **Week Number** (which AI Friday session this is)
- **Host Name** (who will be moderating)
- **Session Theme** (focus area like "productivity tools", "automation workflows", etc.)
- **Special Requirements** (recording, specific tech needs, etc.)

## What Gets Created

### Week-Specific Session Folder
```
meetings/sessions/YYYY-MM-DD-week-N/
├── context/                    # Agent coordination and decisions
│   ├── workflow.json           # Main workflow tracking
│   ├── session_manager.json    # Session structure decisions
│   ├── content_curator.json    # Speaker and content coordination
│   └── meeting_coordinator.json # Logistics and communication
├── inputs/                     # Ready for raw materials
├── generated/                  # Agent-created materials
│   ├── agenda.md               # Theme-optimized agenda
│   ├── prep_checklist.md       # Timeline-based prep tasks
│   ├── speaker_guides/         # Individual speaker materials
│   └── communication_templates/ # Email/Slack templates
├── outputs/                    # Final deliverables (post-session)
├── artifacts/                  # Session recordings, demos, slides
└── README.md                   # Session overview and links
```

### Cross-Week Intelligence Applied
- **Previous Session Analysis**: Reviews 2-3 recent sessions for successful patterns
- **Host Preferences**: Applies learned preferences for returning hosts
- **Theme Optimization**: Uses successful formats from similar themed sessions
- **Resource Integration**: Selects appropriate baseline topics as backup content

## Sub-Agent Workflow

1. **Session Manager**: Creates structure, generates agenda and prep materials based on cross-week analysis
2. **Content Curator**: Finds speakers, matches topics to theme, prepares backup content
3. **Meeting Coordinator**: Sets up logistics, communication schedules, and facilitation materials

## Expected Outputs

By the end of this workflow, you'll have:
- ✅ Complete session folder with all necessary structure
- ✅ Theme-optimized agenda with timing and format
- ✅ Host prep checklist with timeline-based tasks
- ✅ Speaker coordination materials and guides
- ✅ Communication templates for outreach and reminders
- ✅ Baseline topic backup content ready
- ✅ Complete context trail for audit and future learning

## Usage

Simply run:
```
/new-session
```

The orchestrator will guide you through collecting session details and coordinate the sub-agents to create your complete session package with cross-week intelligence applied for optimal success.