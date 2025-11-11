# AI Friday Specialized Agent Specifications

## Agent Interface Contract

All agents must implement:
- `process(context_input)` - Main processing function
- `validate_input(context)` - Input validation
- `generate_output(results)` - Output formatting
- `handle_error(error, context)` - Error handling
- `get_status()` - Current status reporting

---

## 1. Session Manager Agent

### Primary Functions
- **Session Planning**: Creates comprehensive session structure
- **Template Generation**: Populates templates with session-specific data
- **Resource Preparation**: Sets up folders and initial materials
- **Timeline Management**: Manages session scheduling and deadlines

### Input Context Schema
```json
{
  "session_date": "YYYY-MM-DD",
  "session_number": "integer",
  "host_name": "string",
  "co_hosts": ["array of names"],
  "theme": "optional theme/focus",
  "confirmed_speakers": [
    {
      "name": "string",
      "topic": "string",
      "type": "lightning_talk | demo | clinic",
      "duration": "integer_minutes"
    }
  ],
  "special_requirements": ["array of special needs"],
  "baseline_topics_needed": "boolean"
}
```

### Output Context Schema
```json
{
  "session_folder": "path/to/session/folder",
  "files_created": [
    "agenda.md",
    "notes.md",
    "follow-ups.md",
    "README.md"
  ],
  "folder_structure": {
    "submissions/": "Speaker submission links",
    "demos/": "Demo materials",
    "artifacts/": "Recordings and assets"
  },
  "prep_checklist": ["array of prep tasks"],
  "timeline": {
    "two_weeks_before": ["tasks"],
    "one_week_before": ["tasks"],
    "day_of": ["tasks"]
  },
  "baseline_topics_suggested": ["array if needed"],
  "next_agent": "content_curator"
}
```

### Tools Required
- File system operations
- Template processing
- Date/time calculations
- Folder structure creation

---

## 2. Content Curator Agent

### Primary Functions
- **Submission Management**: Processes and organizes speaker submissions
- **Resource Collection**: Gathers relevant materials and links
- **Topic Coordination**: Balances topics and ensures variety
- **Speaker Communication**: Generates speaker coordination materials

### Input Context Schema
```json
{
  "session_details": "from session_manager",
  "submission_queue": ["array of pending submissions"],
  "available_speakers": ["array of potential speakers"],
  "resource_library": "current resource catalog",
  "previous_sessions": ["array of recent session summaries"],
  "content_requirements": {
    "lightning_talks_needed": "integer",
    "demos_needed": "integer",
    "clinic_topics": ["array of requested topics"]
  }
}
```

### Output Context Schema
```json
{
  "finalized_agenda": {
    "lightning_talks": ["array of confirmed talks"],
    "feature_demo": "demo details",
    "open_clinic": ["array of clinic topics"]
  },
  "speaker_materials": [
    {
      "speaker": "name",
      "preparation_guide": "path/to/guide",
      "technical_requirements": ["array"],
      "contact_info": "email/slack"
    }
  ],
  "resource_package": {
    "links_shared": ["array of URLs"],
    "materials_gathered": ["array of files"],
    "baseline_content": ["array if using baseline topics"]
  },
  "communication_templates": [
    "speaker_confirmation.md",
    "prep_reminder.md",
    "technical_check.md"
  ],
  "next_agent": "meeting_coordinator"
}
```

### Tools Required
- Submission tracking system
- Email/communication templates
- Resource cataloging
- Speaker database

---

## 3. Meeting Coordinator Agent

### Primary Functions
- **Logistics Management**: Handles meeting setup and coordination
- **Communication**: Manages pre-meeting communications
- **Facilitation Support**: Provides host with facilitation materials
- **Technical Preparation**: Ensures technical requirements are met

### Input Context Schema
```json
{
  "session_structure": "from content_curator",
  "participant_list": ["array of expected attendees"],
  "technical_requirements": {
    "recording_needed": "boolean",
    "screen_sharing": "boolean",
    "demo_requirements": ["array"]
  },
  "communication_timeline": {
    "two_weeks": "boolean",
    "one_week": "boolean",
    "day_before": "boolean",
    "day_of": "boolean"
  }
}
```

### Output Context Schema
```json
{
  "meeting_package": {
    "calendar_invite": "formatted_text",
    "agenda_final": "path/to/final/agenda",
    "host_guide": "path/to/facilitation/guide",
    "technical_checklist": ["array of tech prep items"]
  },
  "communications_sent": [
    {
      "type": "initial_invite | reminder | final_prep",
      "timestamp": "ISO-8601",
      "recipients": ["array"],
      "status": "sent | scheduled"
    }
  ],
  "facilitation_materials": {
    "opening_script": "text",
    "transition_prompts": ["array"],
    "closing_template": "text",
    "backup_activities": ["array"]
  },
  "ready_for_meeting": "boolean",
  "next_agent": "knowledge_organizer (post-meeting)"
}
```

### Tools Required
- Calendar integration
- Communication systems
- Template processing
- Meeting platform setup

---

## 4. Knowledge Organizer Agent

### Primary Functions
- **Content Processing**: Transforms raw notes into structured documentation
- **Summarization**: Creates digestible summaries of complex content
- **Action Extraction**: Identifies and formats action items
- **Knowledge Integration**: Integrates new content into existing knowledge base

### Input Context Schema
```json
{
  "raw_materials": {
    "meeting_notes": "path/to/raw/notes",
    "recording_transcript": "path/to/transcript",
    "chat_log": "path/to/chat/export",
    "shared_materials": ["array of files/links"]
  },
  "session_context": "from meeting_coordinator",
  "participants": ["array of attendees"],
  "processing_preferences": {
    "summary_length": "brief | detailed",
    "action_item_format": "checklist | table",
    "knowledge_base_integration": "boolean"
  }
}
```

### Output Context Schema
```json
{
  "structured_content": {
    "meeting_summary": "executive_summary",
    "presentation_summaries": [
      {
        "speaker": "name",
        "title": "presentation_title",
        "key_points": ["array"],
        "resources_shared": ["array"],
        "follow_up_requests": ["array"]
      }
    ],
    "action_items": [
      {
        "task": "description",
        "owner": "person",
        "due_date": "YYYY-MM-DD",
        "status": "open",
        "priority": "high | medium | low"
      }
    ],
    "key_learnings": ["array of insights"],
    "resource_library_updates": ["array of new resources"]
  },
  "deliverables": {
    "formatted_notes": "path/to/formatted/notes.md",
    "action_tracker": "path/to/actions.md",
    "confluence_export": "path/to/confluence.md",
    "knowledge_updates": ["paths to updated KB files"]
  },
  "next_agent": "archive_manager"
}
```

### Tools Required
- Natural language processing
- Content summarization
- Action item extraction
- Knowledge base integration

---

## 5. Archive Manager Agent

### Primary Functions
- **Content Organization**: Structures completed session materials
- **Knowledge Base Updates**: Integrates content into searchable knowledge base
- **Resource Cataloging**: Updates resource libraries and indexes
- **Historical Tracking**: Maintains session history and trends

### Input Context Schema
```json
{
  "processed_content": "from knowledge_organizer",
  "session_materials": ["array of all session files"],
  "knowledge_base_structure": "current KB organization",
  "tagging_requirements": ["array of tag categories"],
  "archival_preferences": {
    "retention_period": "duration",
    "compression_needed": "boolean",
    "search_indexing": "boolean"
  }
}
```

### Output Context Schema
```json
{
  "archival_complete": {
    "archived_location": "path/to/archived/session",
    "knowledge_base_updates": ["array of KB files updated"],
    "search_index_updates": ["array of index entries"],
    "resource_catalog_updates": ["array of new resources"]
  },
  "organization_structure": {
    "session_archive": "organized structure",
    "resource_library": "updated library",
    "search_indexes": "updated indexes"
  },
  "metadata": {
    "tags_applied": ["array of tags"],
    "categories_updated": ["array"],
    "cross_references": ["array of related sessions"]
  },
  "next_agent": "analytics_agent"
}
```

### Tools Required
- File system operations
- Search indexing
- Metadata management
- Content organization

---

## 6. Analytics Agent

### Primary Functions
- **Metrics Tracking**: Collects and analyzes session metrics
- **Trend Analysis**: Identifies patterns and trends across sessions
- **Improvement Recommendations**: Suggests process improvements
- **Reporting**: Generates analytics reports and dashboards

### Input Context Schema
```json
{
  "session_data": "from archive_manager",
  "historical_data": ["array of previous session data"],
  "metrics_to_track": [
    "attendance",
    "engagement",
    "action_completion",
    "resource_usage",
    "satisfaction"
  ],
  "reporting_requirements": {
    "frequency": "per_session | monthly | quarterly",
    "audience": "hosts | leadership | participants",
    "format": "dashboard | report | insights"
  }
}
```

### Output Context Schema
```json
{
  "analytics_results": {
    "session_metrics": {
      "attendance": "number",
      "engagement_score": "0-10",
      "resources_shared": "count",
      "action_items_generated": "count"
    },
    "trend_analysis": {
      "attendance_trend": "increasing | stable | decreasing",
      "topic_preferences": ["array of popular topics"],
      "engagement_patterns": ["array of insights"]
    },
    "comparisons": {
      "vs_previous_session": "comparison_data",
      "vs_average": "comparison_data",
      "vs_goals": "goal_tracking_data"
    }
  },
  "recommendations": [
    {
      "category": "process | content | engagement",
      "recommendation": "specific_suggestion",
      "priority": "high | medium | low",
      "effort": "low | medium | high"
    }
  ],
  "reports_generated": [
    "session_report.md",
    "trends_dashboard.html",
    "improvement_suggestions.md"
  ],
  "workflow_complete": "boolean"
}
```

### Tools Required
- Data analysis
- Visualization
- Report generation
- Trend analysis

---

## Agent Interaction Patterns

### Sequential Processing
```
Session Manager → Content Curator → Meeting Coordinator → Knowledge Organizer → Archive Manager → Analytics Agent
```

### Parallel Processing (where applicable)
```
Session Manager
├── Content Curator (content preparation)
└── Meeting Coordinator (logistics preparation)
```

### Error Handling
- Each agent validates input context
- Failed steps can be retried with context preserved
- Orchestrator manages error recovery
- Context files maintain error state

### Context Passing
- Each agent reads input context file
- Agent processes and enriches context
- Agent writes updated context file
- Next agent receives enriched context
- Orchestrator manages context file lifecycle