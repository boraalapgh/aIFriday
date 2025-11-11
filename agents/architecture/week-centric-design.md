# Week-Centric Agent Architecture for AI Friday

## Overview

The AI Friday system uses a week-centric organization where each session gets its own complete folder with context files, generated materials, and all artifacts. Claude sub-agents work within these weekly contexts and can reference previous weeks as needed.

## Week-Centric Folder Structure

```
meetings/sessions/
├── 2024-11-15-week-24/                    # Session-specific folder
│   ├── context/                           # Week-specific context files
│   │   ├── workflow.json                  # Main workflow context
│   │   ├── session_manager.json          # Agent-specific contexts
│   │   ├── content_curator.json
│   │   ├── meeting_coordinator.json
│   │   ├── knowledge_organizer.json
│   │   └── archive_manager.json
│   ├── inputs/                            # Week inputs
│   │   ├── raw_notes.md                   # Raw meeting notes
│   │   ├── transcript.txt                 # Meeting transcript
│   │   ├── chat_export.txt                # Chat log
│   │   └── submissions/                   # Speaker submissions
│   ├── generated/                         # Agent-generated content
│   │   ├── agenda.md                      # Generated agenda
│   │   ├── speaker_guides/                # Individual speaker guides
│   │   ├── prep_checklist.md             # Host preparation checklist
│   │   └── communication_templates/       # Email/Slack templates
│   ├── outputs/                           # Final deliverables
│   │   ├── structured_notes.md           # Processed meeting notes
│   │   ├── action_items.md               # Action item tracker
│   │   ├── confluence_export.md          # Ready for Confluence
│   │   └── resource_updates.md           # Resource library updates
│   ├── artifacts/                         # Session artifacts
│   │   ├── recordings/                    # Audio/video recordings
│   │   ├── slides/                        # Presentation materials
│   │   ├── demos/                         # Demo code and assets
│   │   └── shared_links.md               # All shared resources
│   └── README.md                         # Session overview and index
├── 2024-11-01-week-22/                   # Previous session
├── 2024-10-18-week-20/                   # Earlier session
└── sessions-index.md                     # Global session index
```

## Context File Schema (Week-Specific)

### Main Workflow Context (`context/workflow.json`)
```json
{
  "session": {
    "session_id": "2024-11-15-week-24",
    "date": "2024-11-15",
    "week_number": 24,
    "status": "planning | preparation | active | completed | archived",
    "folder_path": "/meetings/sessions/2024-11-15-week-24/"
  },
  "workflow": {
    "current_step": "session_manager",
    "completed_steps": ["initialization"],
    "pending_steps": ["content_curator", "meeting_coordinator"],
    "step_history": [
      {
        "step": "session_manager",
        "agent_type": "claude_subagent",
        "started_at": "2024-11-01T10:00:00Z",
        "completed_at": "2024-11-01T10:15:00Z",
        "status": "completed",
        "context_file": "context/session_manager.json"
      }
    ]
  },
  "cross_week_references": {
    "previous_session": "2024-11-01-week-22",
    "referenced_sessions": ["2024-10-18-week-20", "2024-10-04-week-18"],
    "patterns_learned": ["successful_formats", "speaker_preferences"],
    "resource_inheritance": ["baseline_topics", "communication_templates"]
  },
  "week_state": {
    "inputs_received": {
      "initial_request": true,
      "speaker_submissions": false,
      "transcript": false,
      "raw_notes": false
    },
    "outputs_generated": {
      "agenda": false,
      "prep_materials": false,
      "structured_notes": false,
      "action_items": false
    },
    "human_interventions": []
  }
}
```

### Agent-Specific Context (e.g., `context/session_manager.json`)
```json
{
  "agent": {
    "name": "session_manager",
    "type": "claude_subagent",
    "version": "1.0.0",
    "specialization": "session_planning_and_structure"
  },
  "execution": {
    "started_at": "2024-11-01T10:00:00Z",
    "completed_at": "2024-11-01T10:15:00Z",
    "duration_ms": 900000,
    "status": "completed"
  },
  "inputs": {
    "session_date": "2024-11-15",
    "host_name": "Alex Chen",
    "theme": "AI Tools for Productivity",
    "confirmed_speakers": [],
    "special_requirements": ["record_session", "demo_setup"]
  },
  "cross_week_analysis": {
    "previous_sessions_reviewed": [
      "2024-11-01-week-22",
      "2024-10-18-week-20"
    ],
    "patterns_identified": [
      "productivity_themes_popular",
      "demo_sessions_high_engagement",
      "alex_prefers_structured_agendas"
    ],
    "recommendations_inherited": [
      "use_baseline_topic_B_if_no_speakers",
      "send_reminders_1_week_before",
      "prepare_backup_clinic_topics"
    ]
  },
  "outputs": {
    "files_created": [
      "generated/agenda.md",
      "generated/prep_checklist.md",
      "README.md"
    ],
    "folder_structure_created": true,
    "templates_populated": [
      "agenda_template",
      "notes_template",
      "followup_template"
    ],
    "next_agent_context": {
      "agent": "content_curator",
      "priority_tasks": ["find_productivity_speakers", "prepare_baseline_topic_B"],
      "session_structure": "standard_60min_format"
    }
  },
  "artifacts": {
    "decision_log": [
      "chose_standard_format_based_on_previous_success",
      "included_demo_slot_due_to_engagement_data",
      "prepared_baseline_topic_B_as_backup"
    ],
    "resource_references": [
      "/content/baseline-topics/session-b-frontend-agents.md",
      "/meetings/templates/agenda-template.md"
    ]
  }
}
```

## Claude Sub-Agent Implementation

### Orchestrator Agent
```markdown
# AI Friday Orchestrator Agent

You are the orchestrator for AI Friday session management. You coordinate Claude sub-agents to complete workflows while maintaining week-specific context.

## Your Responsibilities

1. **Workflow Management**: Route tasks to appropriate specialized sub-agents
2. **Context Coordination**: Manage context files within weekly session folders
3. **Cross-Week Intelligence**: Help agents learn from previous sessions
4. **Human Interaction**: Handle human inputs and approvals

## Available Sub-Agents

- **session_manager**: Creates session structure and initial planning
- **content_curator**: Manages speakers, topics, and content preparation
- **meeting_coordinator**: Handles logistics and communication
- **knowledge_organizer**: Processes notes and creates structured documentation
- **archive_manager**: Organizes completed sessions and updates knowledge base

## Workflow Process

1. **Initialize Week**: Create session folder structure and base context
2. **Launch Sub-Agents**: Use Task tool to launch appropriate sub-agents in sequence
3. **Context Management**: Update context files after each sub-agent completes
4. **Cross-Week Learning**: Provide previous session context to sub-agents
5. **Human Checkpoints**: Pause for human input when needed

## Task Tool Usage

For each sub-agent, use the Task tool with detailed prompts:

```
I need you to act as the [AGENT_NAME] for AI Friday session management.

WEEK CONTEXT:
- Session: [SESSION_DATE]
- Week Number: [WEEK_NUM]
- Folder: /meetings/sessions/[SESSION_FOLDER]/

PREVIOUS WEEK ANALYSIS:
- Last session: [PREVIOUS_SESSION_FOLDER]
- Key learnings: [LEARNINGS_FROM_PREVIOUS]
- Successful patterns: [PATTERNS_TO_REPEAT]

YOUR TASK:
[SPECIFIC_TASK_DESCRIPTION]

CONTEXT FILES TO UPDATE:
- Read from: context/workflow.json
- Update: context/[agent_name].json
- Next agent context: [NEXT_AGENT_DETAILS]

EXPECTED OUTPUTS:
[LIST_OF_EXPECTED_FILES_AND_UPDATES]

When complete, provide a summary of what you accomplished and update the context file with your outputs.
```

## Example Sub-Agent Launch

When launching the session_manager sub-agent:

```
Task: Launch session_manager sub-agent for new AI Friday session

Prompt:
You are the Session Manager agent for AI Friday. Create the complete session structure for week 24.

WEEK CONTEXT:
- Session Date: 2024-11-15
- Week Number: 24
- Host: Alex Chen
- Theme: AI Tools for Productivity
- Folder: /meetings/sessions/2024-11-15-week-24/

CROSS-WEEK LEARNING:
Review previous sessions in /meetings/sessions/ and identify:
- What session formats worked well
- Host preferences for Alex Chen
- Popular themes and speaker types
- Baseline topics that could work for productivity theme

TASKS:
1. Create complete folder structure for the week
2. Generate agenda.md using productivity theme
3. Create prep_checklist.md for host
4. Update context/session_manager.json with your work
5. Prepare handoff context for content_curator agent

OUTPUTS EXPECTED:
- generated/agenda.md
- generated/prep_checklist.md
- README.md with session overview
- context/session_manager.json updated
- Recommendation for next steps

Analyze previous weeks, create the session structure, and update context files.
```
```

## Context Management Functions

### Cross-Week Context Passing
```javascript
function getPreviousWeekContext(currentWeek, lookbackWeeks = 3) {
  const previousSessions = [];
  // Logic to find and load previous session contexts
  // Extract patterns, preferences, and successful approaches
  return {
    patterns: extractSuccessfulPatterns(previousSessions),
    preferences: extractHostPreferences(previousSessions),
    resources: extractReusableResources(previousSessions),
    lessons_learned: extractLessonsLearned(previousSessions)
  };
}
```

### Context File Updates
```javascript
function updateAgentContext(weekFolder, agentName, agentOutputs) {
  const contextPath = `${weekFolder}/context/${agentName}.json`;
  const agentContext = {
    agent: {
      name: agentName,
      type: "claude_subagent",
      execution: {
        started_at: agentOutputs.started_at,
        completed_at: new Date().toISOString(),
        status: "completed"
      }
    },
    inputs: agentOutputs.inputs,
    cross_week_analysis: agentOutputs.cross_week_analysis,
    outputs: agentOutputs.outputs,
    artifacts: agentOutputs.artifacts
  };

  writeFile(contextPath, JSON.stringify(agentContext, null, 2));
  updateWorkflowContext(weekFolder, agentName, "completed");
}
```

## Human Interaction Points

### When to Pause for Human Input
- Speaker confirmation needed
- Special requirements unclear
- Previous session review needed
- Quality check requested
- Error recovery needed

### Input/Output Handling
- Save human inputs to `inputs/` folder
- Update context with human decisions
- Resume workflow with additional context
- Track human interventions in audit log