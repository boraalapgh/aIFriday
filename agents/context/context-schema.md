# AI Friday Context File Schema & Management

## Overview

The context file system provides persistent state management for agent workflows, enabling traceability, resumability, and coordination between specialized agents.

## Core Context Schema

### Base Context Structure
```json
{
  "meta": {
    "workflow_id": "uuid-v4",
    "workflow_type": "session_creation | meeting_prep | note_processing | backlog_management",
    "created_at": "ISO-8601-timestamp",
    "updated_at": "ISO-8601-timestamp",
    "version": "semantic-version",
    "schema_version": "1.0.0"
  },
  "workflow": {
    "current_step": "step_name",
    "total_steps": "integer",
    "step_history": [
      {
        "step": "step_name",
        "agent": "agent_name",
        "started_at": "ISO-8601",
        "completed_at": "ISO-8601 | null",
        "status": "pending | in_progress | completed | error | skipped",
        "error": "error_message | null"
      }
    ],
    "next_steps": ["array of upcoming steps"],
    "branch_point": "step_name | null",
    "alternate_paths": ["array of possible paths"]
  },
  "session": {
    "session_id": "unique-session-identifier",
    "date": "YYYY-MM-DD",
    "session_number": "integer",
    "status": "planning | preparation | active | completed | archived"
  },
  "agents": {
    "current_agent": "agent_name",
    "agent_history": [
      {
        "agent": "agent_name",
        "started_at": "ISO-8601",
        "completed_at": "ISO-8601 | null",
        "context_input": "reference to input context",
        "context_output": "reference to output context",
        "resources_used": ["array of tools/APIs"],
        "performance": {
          "duration_ms": "integer",
          "memory_used": "bytes",
          "api_calls": "integer"
        }
      }
    ]
  },
  "data": {
    "inputs": {},
    "working_data": {},
    "outputs": {},
    "references": {}
  },
  "files": {
    "created": ["array of file paths"],
    "modified": ["array of file paths"],
    "deleted": ["array of file paths"],
    "references": ["array of referenced files"]
  },
  "state": {
    "can_resume": "boolean",
    "resume_from_step": "step_name | null",
    "requires_human_input": "boolean",
    "blocking_issues": ["array of issues"],
    "confidence_score": "0-1 float"
  },
  "audit": {
    "checkpoints": [
      {
        "step": "step_name",
        "timestamp": "ISO-8601",
        "data_snapshot": "reference to data state",
        "verification": "hash or checksum"
      }
    ],
    "human_interventions": [
      {
        "timestamp": "ISO-8601",
        "user": "user_id",
        "action": "description",
        "before_state": "state snapshot",
        "after_state": "state snapshot"
      }
    ]
  }
}
```

## Workflow-Specific Schemas

### Session Creation Context
```json
{
  "data": {
    "inputs": {
      "session_date": "YYYY-MM-DD",
      "host_name": "string",
      "co_hosts": ["array"],
      "theme": "string | null",
      "confirmed_speakers": [
        {
          "name": "string",
          "email": "string",
          "topic": "string",
          "type": "lightning_talk | demo | clinic",
          "duration_minutes": "integer",
          "requirements": ["array"],
          "materials": ["array of file paths"]
        }
      ],
      "special_requirements": ["array"],
      "use_baseline_topics": "boolean"
    },
    "working_data": {
      "session_folder": "path/to/session/folder",
      "templates_processed": ["array of template names"],
      "baseline_topics_selected": ["array if applicable"],
      "speaker_confirmations": [
        {
          "speaker": "name",
          "status": "confirmed | pending | declined",
          "confirmation_date": "YYYY-MM-DD | null"
        }
      ]
    },
    "outputs": {
      "session_structure": {
        "folder_path": "string",
        "files_created": ["array"],
        "templates_populated": ["array"]
      },
      "agenda": {
        "lightning_talks": ["array"],
        "feature_demo": "object",
        "open_clinic": ["array"],
        "timing": "object with time allocations"
      },
      "prep_materials": {
        "host_checklist": "path",
        "speaker_guides": ["array of paths"],
        "communication_templates": ["array of paths"]
      }
    },
    "references": {
      "previous_sessions": ["array of session IDs"],
      "baseline_topics": ["array of topic IDs"],
      "speaker_database": "reference to speaker records",
      "resource_library": "reference to resource catalog"
    }
  }
}
```

### Note Processing Context
```json
{
  "data": {
    "inputs": {
      "raw_notes": "path/to/raw/notes",
      "recording_transcript": "path/to/transcript",
      "chat_export": "path/to/chat/log",
      "shared_materials": ["array of file paths/URLs"],
      "session_context": "reference to session creation context",
      "participants": ["array of participant names"],
      "processing_preferences": {
        "summary_style": "brief | detailed | executive",
        "action_item_format": "checklist | table | cards",
        "include_verbatim": "boolean",
        "anonymize_feedback": "boolean"
      }
    },
    "working_data": {
      "content_sections": [
        {
          "type": "summary | presentation | discussion | action_items",
          "raw_content": "string",
          "processed_content": "string",
          "confidence": "0-1 float",
          "needs_review": "boolean"
        }
      ],
      "extracted_entities": {
        "people": ["array of names"],
        "tools": ["array of tools mentioned"],
        "resources": ["array of URLs/files"],
        "action_items": ["array of identified actions"],
        "decisions": ["array of decisions made"]
      }
    },
    "outputs": {
      "structured_notes": {
        "executive_summary": "string",
        "presentation_summaries": ["array"],
        "key_decisions": ["array"],
        "action_items": ["array"],
        "resources_shared": ["array"],
        "follow_up_topics": ["array"]
      },
      "deliverables": {
        "formatted_notes": "path/to/notes.md",
        "action_tracker": "path/to/actions.md",
        "resource_updates": "path/to/resources.md",
        "confluence_export": "path/to/confluence.md"
      },
      "quality_metrics": {
        "completeness_score": "0-1 float",
        "accuracy_confidence": "0-1 float",
        "processing_time": "duration_ms",
        "human_review_needed": "boolean"
      }
    }
  }
}
```

## Context File Management

### File Structure
```
.aifriday/
├── contexts/
│   ├── active/                     # Currently running workflows
│   │   ├── {workflow_id}/
│   │   │   ├── context.json        # Main workflow context
│   │   │   ├── steps/
│   │   │   │   ├── 001_session_manager.json
│   │   │   │   ├── 002_content_curator.json
│   │   │   │   └── ...
│   │   │   ├── checkpoints/
│   │   │   │   ├── checkpoint_001.json
│   │   │   │   └── ...
│   │   │   └── artifacts/          # Generated files specific to workflow
│   │   └── ...
│   ├── completed/                  # Finished workflows
│   │   ├── {workflow_id}/
│   │   └── ...
│   ├── archived/                   # Long-term storage
│   │   ├── 2024/
│   │   │   ├── 01/
│   │   │   └── ...
│   │   └── ...
│   └── templates/                  # Context templates
│       ├── session_creation.json
│       ├── note_processing.json
│       └── ...
├── agents/
│   ├── registry.json               # Agent registration and capabilities
│   ├── session_manager/
│   │   ├── config.json
│   │   ├── state.json
│   │   └── logs/
│   └── ...
└── system/
    ├── orchestrator.json           # Orchestrator configuration
    ├── workflows.json              # Workflow definitions
    └── logs/                       # System-wide logs
```

### Context Operations

#### Context Creation
```javascript
function createContext(workflowType, inputs) {
  const workflowId = generateUUID();
  const context = {
    meta: {
      workflow_id: workflowId,
      workflow_type: workflowType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      version: "1.0.0",
      schema_version: "1.0.0"
    },
    workflow: {
      current_step: "initialize",
      total_steps: getWorkflowSteps(workflowType).length,
      step_history: [],
      next_steps: getWorkflowSteps(workflowType),
      branch_point: null,
      alternate_paths: []
    },
    // ... rest of context structure
    data: {
      inputs: inputs,
      working_data: {},
      outputs: {},
      references: {}
    }
  };

  return saveContext(workflowId, context);
}
```

#### Context Updates
```javascript
function updateContext(workflowId, agentUpdate) {
  const context = loadContext(workflowId);

  // Update metadata
  context.meta.updated_at = new Date().toISOString();

  // Update workflow progress
  context.workflow.current_step = agentUpdate.next_step;
  context.workflow.step_history.push({
    step: agentUpdate.step,
    agent: agentUpdate.agent,
    started_at: agentUpdate.started_at,
    completed_at: agentUpdate.completed_at,
    status: agentUpdate.status,
    error: agentUpdate.error
  });

  // Update data
  Object.assign(context.data.working_data, agentUpdate.working_data);
  Object.assign(context.data.outputs, agentUpdate.outputs);

  // Update file tracking
  context.files.created.push(...agentUpdate.files_created);
  context.files.modified.push(...agentUpdate.files_modified);

  // Create checkpoint if needed
  if (agentUpdate.create_checkpoint) {
    createCheckpoint(workflowId, context);
  }

  return saveContext(workflowId, context);
}
```

#### Context Retrieval
```javascript
function getContextForAgent(workflowId, agentName) {
  const fullContext = loadContext(workflowId);

  // Filter context for agent's needs
  const agentContext = {
    workflow_info: {
      id: fullContext.meta.workflow_id,
      type: fullContext.meta.workflow_type,
      current_step: fullContext.workflow.current_step
    },
    session: fullContext.session,
    inputs: fullContext.data.inputs,
    working_data: fullContext.data.working_data,
    previous_outputs: getPreviousAgentOutputs(fullContext, agentName),
    references: fullContext.data.references,
    files: fullContext.files
  };

  return agentContext;
}
```

## Context Validation

### Schema Validation
```javascript
function validateContext(context) {
  const errors = [];

  // Required fields validation
  if (!context.meta?.workflow_id) {
    errors.push("Missing workflow_id");
  }

  if (!context.meta?.workflow_type) {
    errors.push("Missing workflow_type");
  }

  // Workflow state validation
  if (!context.workflow?.current_step) {
    errors.push("Missing current_step");
  }

  // Data consistency validation
  if (!context.data?.inputs) {
    errors.push("Missing inputs data");
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}
```

### Integrity Checks
```javascript
function verifyContextIntegrity(workflowId) {
  const context = loadContext(workflowId);
  const checks = [];

  // File existence verification
  for (const file of context.files.created) {
    if (!fileExists(file)) {
      checks.push({
        type: "file_missing",
        file: file,
        severity: "error"
      });
    }
  }

  // Step sequence validation
  const stepHistory = context.workflow.step_history;
  for (let i = 1; i < stepHistory.length; i++) {
    if (stepHistory[i].started_at < stepHistory[i-1].completed_at) {
      checks.push({
        type: "step_sequence_error",
        steps: [stepHistory[i-1], stepHistory[i]],
        severity: "warning"
      });
    }
  }

  return checks;
}
```

## Context Archival & Cleanup

### Archival Policy
- Active contexts: Keep until workflow completion
- Completed contexts: Keep for 90 days in completed/
- Archived contexts: Compress and move to archived/ by date
- Cleanup: Remove contexts older than 1 year (configurable)

### Archive Process
```javascript
function archiveContext(workflowId) {
  const context = loadContext(workflowId);
  const archivePath = generateArchivePath(context.meta.created_at);

  // Compress context and artifacts
  const compressed = compressContext(context);

  // Move to archive location
  moveToArchive(workflowId, archivePath, compressed);

  // Update index
  updateArchiveIndex(workflowId, archivePath, context.meta);

  // Clean up active location
  removeFromActive(workflowId);
}
```

This context system provides complete traceability, resumability, and coordination capabilities for your agent orchestration system.