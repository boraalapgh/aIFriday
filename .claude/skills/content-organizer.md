# Content Organizer Skill

This skill processes raw meeting materials into structured, searchable, and actionable documentation.

## When to Use
Use this skill after an AI Friday session to transform raw notes, recordings, and artifacts into organized, valuable documentation.

## What This Skill Does

### 1. Content Processing
- **Raw notes transformation**: Converts messy meeting notes into structured documentation
- **Recording analysis**: Extracts key insights from meeting transcripts
- **Link organization**: Catalogues all shared resources and references
- **Action item extraction**: Identifies and structures follow-up tasks

### 2. Documentation Generation
- **Meeting summary**: Executive summary of key outcomes and decisions
- **Resource catalog**: Organized list of all tools, links, and materials shared
- **Knowledge extraction**: Identifies reusable tips, patterns, and best practices
- **Follow-up planning**: Structures action items with owners and timelines

### 3. Content Distribution
- **Confluence-ready format**: Prepares content for easy copy-paste to company wiki
- **Archive organization**: Properly files completed session materials
- **Resource library updates**: Adds new resources to main collection
- **Search optimization**: Structures content for easy future discovery

### 4. Quality Assurance
- **Link validation**: Ensures all shared resources are accessible
- **Content completeness**: Identifies missing information or unclear items
- **Action item clarity**: Ensures all tasks have clear owners and deadlines
- **Knowledge capture**: Extracts learnings for future session improvement

## Usage Instructions

When you invoke this skill, provide:
- **Session folder**: Path to the completed session
- **Raw materials**: Notes, recordings, chat logs, shared links
- **Session context**: Date, speakers, topics covered
- **Processing priorities**: What aspects are most important to capture

The skill will create organized, searchable documentation ready for sharing and archival.

## Processing Workflow

### Input Materials:
- Raw meeting notes from scribe
- Recording transcripts (if available)
- Chat logs with shared links
- Speaker materials (slides, demos, code)
- Informal feedback and comments

### Output Documents:
- **Structured meeting notes**: Clean, scannable summary
- **Action items tracker**: Clear tasks with ownership
- **Resource library**: Categorized tools and references
- **Knowledge base updates**: Reusable insights and patterns
- **Confluence-ready content**: Formatted for easy publishing

## Organization Standards

### File Structure:
```
meetings/sessions/YYYY-MM-DD-week-N/
├── processed/
│   ├── meeting-summary.md       # Executive summary
│   ├── detailed-notes.md        # Full structured notes
│   ├── action-items.md         # Task tracking
│   ├── resources.md            # All shared links and tools
│   └── insights.md             # Key learnings and patterns
├── artifacts/
│   ├── recording-transcript.txt
│   ├── chat-log.txt
│   └── speaker-materials/
└── confluence-export/
    └── session-N-summary.md    # Ready for copy-paste
```

### Content Standards:
- **Scannable format**: Headers, bullets, clear sections
- **Action-oriented**: Clear next steps and owners
- **Link-rich**: Easy navigation between related content
- **Search-friendly**: Tags, keywords, and cross-references

## Integration Features

### Resource Library Updates:
- Adds new tools to `content/resources/`
- Updates tool categories and descriptions
- Creates cross-references between sessions

### Knowledge Base Enhancement:
- Extracts reusable patterns to `docs/playbooks/`
- Updates best practices documentation
- Identifies topics for future sessions

### Archive Management:
- Moves completed sessions to `meetings/archive/`
- Updates session index with outcomes
- Creates searchable session database

## Quality Metrics

The skill ensures:
- **Completeness**: All important content captured
- **Clarity**: Information is clear and actionable
- **Accessibility**: Content is easy to find and navigate
- **Reusability**: Insights can be applied to future sessions

## Output Validation

Before completion, the skill verifies:
- All action items have clear owners and deadlines
- All shared links are working and properly categorized
- Key insights are extracted and documented
- Content is ready for sharing with stakeholders