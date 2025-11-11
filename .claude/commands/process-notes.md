Process raw meeting materials into structured, searchable documentation using the orchestrated agent system with specialized knowledge organization capabilities.

This command triggers the **Note Processing Workflow** using the AI Friday orchestrator and the knowledge-organizer sub-agent.

## What This Command Does

1. **Identifies Target Session**: Determines which week's session to process
2. **Ingests Raw Materials**: Handles notes, transcripts, chat logs, and shared resources
3. **Invokes Knowledge Organizer**: Specialized sub-agent processes content into structured formats
4. **Creates Multiple Outputs**: Team notes, action trackers, Confluence exports, resource updates
5. **Updates Knowledge Base**: Integrates insights into searchable institutional knowledge

## Materials You Can Process

### Raw Input Types
- **Meeting Notes**: Handwritten or typed notes from session scribe
- **Audio/Video Transcripts**: Automated or manual transcriptions
- **Chat Logs**: Slack, Teams, or meeting platform chat exports
- **Shared Resources**: Links, files, slides, demo code shared during session
- **Artifacts**: Recordings, screenshots, demo assets

### Session Context Integration
The knowledge-organizer automatically accesses:
- Session agenda and planned content
- Speaker information and presentation details
- Previous session patterns for quality comparison
- Resource library for integration opportunities

## What Gets Created

### Primary Outputs in `outputs/` folder:

**`structured_notes.md`** - Complete team reference document:
- Executive summary of key outcomes
- Detailed presentation summaries with speaker attribution
- Key learnings and actionable insights
- Complete resource compilation
- Action items with clear ownership

**`action_items.md`** - Dedicated action tracking:
- Priority-sorted action items
- Owner assignments and due dates
- Context and background for each task
- Status tracking capabilities

**`confluence_export.md`** - Ready for team wiki:
- Formatted with Confluence macros
- Optimized for team sharing and discovery
- Includes visual elements and structured layouts

**`resource_updates.md`** - Knowledge base integration:
- New tools and platforms cataloged
- Resource quality assessments
- Integration opportunities identified
- Deprecated resource recommendations

### Context Documentation
**`context/knowledge_organizer.json`** - Processing audit trail:
- Input material quality assessment
- Processing decisions and confidence scores
- Content coverage and completeness metrics
- Quality assurance results

## Processing Intelligence

### Content Analysis
- **Completeness Assessment**: Evaluates quality and coverage of input materials
- **Speaker Attribution**: Properly credits ideas and contributions
- **Technical Accuracy**: Preserves technical details and specific tool names
- **Actionability Focus**: Identifies concrete takeaways and next steps

### Action Item Extraction
- **Explicit Commitments**: "I'll create a guide for this"
- **Follow-up Promises**: "I'll share that link after the session"
- **Investigation Tasks**: "Let me research that and report back"
- **Process Improvements**: "We should update our workflow based on this"

### Quality Standards
- **Clarity**: All content easily scannable with clear structure
- **Attribution**: Speakers and contributors properly credited
- **Completeness**: All major discussions and insights captured
- **Consistency**: Formatting consistent across all outputs

## Usage Options

### Process Current Session
```
/process-notes
```
*Will prompt for session identification and material upload*

### Process Specific Session
```
/process-notes 2024-11-01-week-22
```
*Processes materials for the specified session folder*

### With Uploaded Materials
Upload your raw materials (notes, transcripts, etc.) and then run:
```
/process-notes
```
*The orchestrator will automatically detect and process uploaded content*

## Expected Outcomes

After processing completes, you'll have:
- ✅ Structured meeting notes ready for team reference
- ✅ Action items extracted with clear ownership and deadlines
- ✅ Confluence-ready export for team wiki
- ✅ Resource library updates integrated
- ✅ Knowledge base enhanced with new insights
- ✅ Complete audit trail of processing decisions
- ✅ Follow-up topics identified for future sessions

## Quality Assurance

The knowledge-organizer sub-agent provides:
- **Completeness Scoring**: Assessment of how much content was captured
- **Accuracy Confidence**: Quality rating for processing results
- **Actionability Score**: Measurement of how useful the outputs are
- **Processing Metrics**: Time, coverage, and quality statistics

Transform your raw meeting materials into valuable, searchable knowledge assets that build institutional memory and drive continuous improvement!