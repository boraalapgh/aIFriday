# AI Friday Agent Orchestration Architecture

## Overview

The AI Friday system uses an orchestrator agent pattern with specialized agents that work together through context files to manage the complete meeting lifecycle.

## Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                       │
│  • Workflow coordination                                    │
│  • Agent selection and routing                             │
│  • Context file management                                 │
│  • Error handling and recovery                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ context files
┌─────────────────────────────────────────────────────────────┐
│                   SPECIALIZED AGENTS                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│ Session Manager │ Content Curator │  Knowledge Organizer    │
│ • Planning      │ • Submissions   │  • Note processing      │
│ • Structure     │ • Resources     │  • Documentation        │
│ • Templates     │ • Demos         │  • Action tracking      │
├─────────────────┼─────────────────┼─────────────────────────┤
│ Meeting Coordinator │ Archive Manager │ Analytics Agent      │
│ • Prep & logistics  │ • Post-processing │ • Metrics           │
│ • Communication     │ • Organization    │ • Insights          │
│ • Facilitation      │ • Knowledge base  │ • Improvements      │
└─────────────────────┴─────────────────┴─────────────────────┘
```

## Context File System

### Context File Schema

Each workflow step creates and updates context files that contain:

```json
{
  "workflow_id": "unique-workflow-identifier",
  "workflow_type": "session_creation | meeting_prep | note_processing | backlog_management",
  "step": "current_step_name",
  "timestamp": "ISO-8601-timestamp",
  "agent": "agent_name",
  "status": "in_progress | completed | error | waiting",
  "inputs": {
    "session_date": "YYYY-MM-DD",
    "host_name": "string",
    "participants": ["array of names"],
    "materials": ["array of file paths or URLs"]
  },
  "outputs": {
    "files_created": ["array of file paths"],
    "updates_made": ["array of changes"],
    "next_actions": ["array of recommended next steps"]
  },
  "context": {
    "session_details": {},
    "speaker_info": {},
    "resource_links": {},
    "previous_sessions": {}
  },
  "metadata": {
    "duration": "execution_time_ms",
    "resources_used": ["list of tools/APIs used"],
    "confidence_score": 0.95
  }
}
```

### Context File Locations

```
.aifriday/
├── contexts/
│   ├── workflows/
│   │   ├── {workflow_id}/
│   │   │   ├── context.json      # Main workflow context
│   │   │   ├── step_001.json     # Individual step contexts
│   │   │   ├── step_002.json
│   │   │   └── final_output.json
│   │   └── active/               # Currently running workflows
│   ├── agents/
│   │   ├── session_manager/      # Agent-specific context
│   │   ├── content_curator/
│   │   └── knowledge_organizer/
│   └── history/                  # Completed workflow archives
```

## Specialized Agents

### 1. Session Manager Agent
**Responsibilities:**
- Session planning and scheduling
- Folder structure creation
- Template generation and population
- Initial session setup

**Context Inputs:**
- Session date, host, planned topics
- Previous session history
- Available baseline topics

**Context Outputs:**
- Session folder structure
- Populated templates
- Prep checklist

### 2. Content Curator Agent
**Responsibilities:**
- Speaker submission management
- Resource collection and organization
- Demo material preparation
- Baseline topic selection

**Context Inputs:**
- Submission queue
- Resource library
- Speaker preferences

**Context Outputs:**
- Curated content list
- Speaker coordination notes
- Resource links and materials

### 3. Meeting Coordinator Agent
**Responsibilities:**
- Meeting preparation logistics
- Communication templates
- Facilitation guides
- Real-time meeting support

**Context Inputs:**
- Session structure
- Participant list
- Technical requirements

**Context Outputs:**
- Prep checklist
- Communication materials
- Facilitation notes

### 4. Knowledge Organizer Agent
**Responsibilities:**
- Raw note processing
- Content summarization
- Action item extraction
- Documentation formatting

**Context Inputs:**
- Raw meeting notes
- Recording transcripts
- Shared materials

**Context Outputs:**
- Structured meeting notes
- Action item tracker
- Resource updates

### 5. Archive Manager Agent
**Responsibilities:**
- Post-session organization
- Knowledge base updates
- Resource cataloging
- Historical tracking

**Context Inputs:**
- Completed session materials
- Knowledge base structure
- Tagging requirements

**Context Outputs:**
- Archived session
- Updated knowledge base
- Searchable indexes

### 6. Analytics Agent
**Responsibilities:**
- Session metrics tracking
- Engagement analysis
- Improvement recommendations
- Trend identification

**Context Inputs:**
- Session attendance
- Feedback data
- Resource usage

**Context Outputs:**
- Analytics reports
- Improvement suggestions
- Trend insights

## Workflow Examples

### 1. Session Creation Workflow

```
Orchestrator → Session Manager Agent
├── Input: Date, host, theme
├── Context: session_creation_001.json
├── Action: Create folder structure
└── Output: Session folder + templates

Session Manager → Content Curator Agent
├── Input: Session structure, theme
├── Context: Updated context file
├── Action: Suggest speakers/topics
└── Output: Content recommendations

Content Curator → Meeting Coordinator Agent
├── Input: Content plan, speakers
├── Context: Updated context file
├── Action: Generate prep materials
└── Output: Complete session prep package
```

### 2. Note Processing Workflow

```
Orchestrator → Knowledge Organizer Agent
├── Input: Raw notes, recordings
├── Context: note_processing_001.json
├── Action: Extract and structure content
└── Output: Formatted notes + action items

Knowledge Organizer → Archive Manager Agent
├── Input: Structured content
├── Context: Updated context file
├── Action: Organize and catalog
└── Output: Archived session + KB updates

Archive Manager → Analytics Agent
├── Input: Session data
├── Context: Updated context file
├── Action: Generate insights
└── Output: Analytics report
```

## Implementation Benefits

### 1. Traceability
- Complete workflow history in context files
- Agent decision tracking
- Input/output lineage

### 2. Resumability
- Interrupted workflows can resume from context
- Failed steps can be retried
- Partial results preserved

### 3. Scalability
- New agents easily integrated
- Workflows can be extended
- Parallel processing possible

### 4. Maintainability
- Clear separation of concerns
- Agent specialization
- Modular architecture

### 5. Observability
- Workflow monitoring
- Performance tracking
- Error diagnosis

## Integration Points

### Current Slash Commands → Agent Workflows
- `/new-session` → Session Creation Workflow
- `/prep-meeting` → Meeting Preparation Workflow
- `/process-notes` → Note Processing Workflow
- `/update-backlog` → Backlog Management Workflow

### Context File Usage
- Human operators can inspect context files
- Agents read previous context before acting
- Workflows can branch based on context
- Error recovery uses context state

## Next Steps

1. Implement orchestrator agent with context management
2. Create specialized agents with context file I/O
3. Update slash commands to use orchestration
4. Add workflow monitoring and visualization
5. Test end-to-end workflows with context passing