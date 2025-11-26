# AI Friday Current System Architecture

## Overview

The AI Friday system uses **5 specialized Claude Code sub-agents** that work together through **Markdown context files** to manage the complete meeting lifecycle. No central orchestrator - each agent handles its responsibilities and passes context to the next agent in the workflow.

## System Design

```
Direct Command Invocation (No Orchestrator)
         ↓
┌─────────────────────────────────────────────────────────────┐
│                   SPECIALIZED AGENTS                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│ Session Manager │ Content Curator │  Topic Manager          │
│ • Planning      │ • Submissions   │  • Pipeline management │
│ • Structure     │ • Speakers      │  • Community outreach  │
│ • Templates     │ • Resources     │  • Idea processing      │
├─────────────────┼─────────────────┼─────────────────────────┤
│ Meeting Coordinator │ Knowledge Organizer │                 │
│ • Prep & logistics  │ • Note processing   │                 │
│ • Communication     │ • Documentation     │                 │
│ • Facilitation      │ • Action tracking   │                 │
└─────────────────────┴─────────────────────┴─────────────────┘
```

## How It Actually Works

### Command → Agent Flow
- `/new-session` → **session-manager** agent
- `/prep-meeting` → **meeting-coordinator** agent
- `/process-notes` → **knowledge-organizer** agent
- `/update-backlog` → **topic-manager** agent
- `/add-topic-idea` → writes to **topic-ideas.md** for later processing

### Context Management (Markdown + YAML)
Each agent creates **Markdown context files** with YAML frontmatter:

```
meetings/sessions/2024-11-25-week-25/
├── context/
│   ├── workflow.md           # Main workflow status
│   ├── session_manager.md    # Session creation context
│   ├── content_curator.md    # Speaker coordination context
│   └── meeting_coordinator.md # Logistics context
├── generated/                # Agent outputs
├── inputs/                   # Raw materials
└── outputs/                  # Processed materials
```

**Example Context File:**
```markdown
---
agent: "session_manager"
status: "completed"
week_number: 25
---

# Session Manager Context

## Decisions Made
- **Session Format**: Standard 60-minute format chosen
- **Theme**: AI Productivity Tools
- **Timing**: 25min lightning talks, 20min deep dive, 15min clinic

## Handoff to Content Curator
- Need 2-3 lightning talk speakers
- Deep dive slot available for productivity demo
- Baseline Topic C ready as backup
```

## Agent Responsibilities

### **session-manager** - Session Setup
- Creates week-specific folder structure
- Generates agenda template with theme focus
- Creates prep checklist with detailed guidance
- Analyzes previous sessions for patterns

### **content-curator** - Speaker Coordination
- Matches speakers to session themes
- Manages submission queue and baseline topics
- Creates speaker guides and communication templates
- Prepares content packages with resources

### **topic-manager** - Pipeline Management
- Processes topic ideas from `content/topic-ideas.md`
- Manages speaker pipeline and submission queue
- Handles community outreach and gap identification
- Balances content across sessions

### **meeting-coordinator** - Logistics & Communication
- Handles all meeting logistics and platform setup
- Generates communication templates and schedules
- Creates comprehensive facilitation guides
- Manages technical requirements and backup plans

### **knowledge-organizer** - Post-Session Processing
- Processes raw notes into structured documentation
- Extracts action items with clear ownership
- Creates multiple output formats (team notes, wiki export)
- Updates resource library and knowledge base

## Key Features

### **Week-Centric Organization**
- Each session gets its own dated folder: `YYYY-MM-DD-week-N`
- Complete context preservation within session folders
- Cross-session learning through pattern analysis

### **Markdown Context System**
- Human-readable context files with YAML metadata
- Clear audit trail of agent decisions and handoffs
- Easy to review, edit, and understand

### **No Central Orchestrator**
- Direct command → agent invocation
- Agents handle their own context and handoffs
- Simpler, more maintainable architecture
- No single point of failure

### **Topic Idea Capture**
- `/add-topic-idea` for quick community input
- `content/topic-ideas.md` as central collection point
- topic-manager processes ideas into pipeline

## Workflow Examples

### Session Creation
```
User: /new-session
  ↓
session-manager agent invoked
  ↓
Creates: folder structure, agenda, prep checklist
Updates: context/workflow.md, context/session_manager.md
  ↓
Ready for content-curator next
```

### Topic Idea to Session
```
User: /add-topic-idea "Prompt engineering for beginners"
  ↓
Writes to: content/topic-ideas.md
  ↓
Later: /update-backlog
  ↓
topic-manager processes ideas → pipeline
  ↓
Eventually: content-curator uses for session planning
```

## File Organization

```
/content/
├── topic-ideas.md           # Community idea capture
├── pipeline/
│   ├── priority-queue.md    # Next 2-3 sessions
│   ├── medium-term.md       # 4-8 weeks out
│   └── idea-backlog.md      # Future development
└── baseline-topics/         # Ready-to-run backup content
    ├── session-a-figma-tokens.md
    ├── session-b-frontend-agents.md
    └── session-c-prompt-engineering.md

/meetings/sessions/YYYY-MM-DD-week-N/
├── context/                 # Agent context files (Markdown)
├── generated/               # Agent outputs (agendas, prep)
├── inputs/                  # Raw materials (notes, transcripts)
├── outputs/                 # Processed materials (structured notes)
└── README.md               # Session overview
```

## Benefits of Current Design

### **Maintainable**
- Each agent owns its functionality
- Clear separation of concerns
- Easy to update individual workflows

### **Traceable**
- Complete context history in readable files
- Agent decision reasoning preserved
- Human-inspectable audit trail

### **Resilient**
- No central orchestrator to fail
- Agents can be invoked independently
- Partial workflows can resume

### **Scalable**
- Add new agents without changing existing ones
- Week-centric design handles growing session history
- Community can contribute topic ideas easily

This architecture emerged from real usage and represents the working system as it exists today - not a theoretical design but battle-tested workflows that support successful AI Friday sessions.