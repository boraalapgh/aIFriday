# Topic Manager Skill

This skill manages the AI Friday content pipeline, including submissions, idea backlog, and session planning.

## When to Use
Use this skill to manage the ongoing flow of AI Friday content - processing new submissions, organizing the topic backlog, and planning future sessions.

## What This Skill Does

### 1. Submission Processing
- **New submission intake**: Processes speaker proposals and topic ideas
- **Quality assessment**: Evaluates submissions for fit and readiness
- **Categorization**: Organizes topics by type, complexity, and timing
- **Speaker coordination**: Manages presenter communications and scheduling

### 2. Backlog Management
- **Priority queue**: Maintains upcoming sessions with confirmed speakers
- **Medium-term pipeline**: Tracks topics for 4-8 weeks out
- **Idea parking lot**: Stores concepts that need development
- **Baseline topic rotation**: Manages ready-to-run backup sessions

### 3. Session Planning
- **Content balancing**: Ensures good mix of lightning talks and demos
- **Audience targeting**: Balances beginner and advanced content
- **Topic diversity**: Avoids clustering similar topics
- **Speaker diversity**: Encourages participation across teams

### 4. Community Engagement
- **Speaker outreach**: Generates personalized invitations for specific topics
- **Call for submissions**: Creates engaging requests for content
- **Feedback integration**: Incorporates session feedback into future planning
- **Gap identification**: Finds areas needing more coverage

## Usage Instructions

When you invoke this skill, provide:
- **Action type**: What you want to do (process submissions, plan sessions, update backlog)
- **Current submissions**: New topics or speaker proposals to process
- **Session context**: Which sessions need planning or speakers
- **Feedback**: Any session feedback or requests to incorporate

The skill will update the content pipeline and provide recommendations for session planning.

## Content Pipeline Structure

### Submission States:
- **New**: Just received, needs initial review
- **In Review**: Being evaluated for fit and timing
- **Scheduled**: Assigned to specific session
- **In Development**: Speaker preparing content
- **Ready**: Confirmed and prepared for presentation
- **Completed**: Already presented
- **Parked**: Good idea but needs more development

### Queue Organization:
```
content/
├── submissions/
│   ├── new/                    # Unprocessed submissions
│   ├── in-review/             # Being evaluated
│   ├── scheduled/             # Assigned to sessions
│   └── archive/               # Completed or rejected
├── pipeline/
│   ├── priority-queue.md      # Next 2-3 sessions
│   ├── medium-term.md         # 4-8 weeks out
│   └── idea-backlog.md        # Future development
└── baseline-topics/           # Ready-to-run sessions A-F
```

## Management Functions

### Submission Processing:
- **Topic evaluation**: Assess fit, timing, and audience value
- **Speaker readiness**: Evaluate presenter experience and preparation time
- **Content gaps**: Identify how submission fills team learning needs
- **Scheduling recommendations**: Suggest optimal session timing

### Pipeline Balancing:
- **Session composition**: Mix of lightning talks, demos, and clinic topics
- **Difficulty progression**: Balance beginner and advanced content
- **Team representation**: Encourage diverse speaker participation
- **Topic themes**: Identify natural groupings and progressions

### Speaker Support:
- **Preparation guidance**: Connect speakers with resources and templates
- **Content development**: Help refine topics and presentation approaches
- **Technical support**: Assist with demo setup and requirements
- **Feedback integration**: Share insights from previous sessions

## Automation Features

### Smart Recommendations:
- **Session suggestions**: Optimal topic combinations for upcoming sessions
- **Speaker matching**: Connect topics with potential presenters
- **Gap identification**: Areas needing more coverage or expertise
- **Timing optimization**: Best scheduling based on topic complexity

### Outreach Generation:
- **Personalized invitations**: Custom requests for specific expertise
- **Call for submissions**: Engaging announcements for topic areas
- **Follow-up communications**: Gentle reminders and support offers
- **Success stories**: Share impact of previous sessions

### Quality Assurance:
- **Content standards**: Ensure submissions meet quality and fit criteria
- **Preparation tracking**: Monitor speaker readiness and support needs
- **Feedback integration**: Incorporate session outcomes into planning
- **Community pulse**: Track engagement and satisfaction

## Integration Points

### Session Planning:
- Coordinates with session-generator skill for complete setup
- Integrates with ai-friday-prep skill for speaker communication
- Connects to baseline topics for backup content

### Content Library:
- Updates resource collections based on new submissions
- Identifies reusable patterns and best practices
- Maintains topic taxonomy and relationships

### Community Management:
- Tracks speaker participation and development
- Identifies mentorship and collaboration opportunities
- Maintains engagement and enthusiasm

## Success Metrics

The skill optimizes for:
- **Pipeline health**: Consistent flow of quality submissions
- **Session quality**: Engaging, valuable content for attendees
- **Speaker satisfaction**: Positive experience for presenters
- **Community growth**: Increasing participation and engagement

## Output Reports

Regular reporting includes:
- **Pipeline status**: Current queue and upcoming session planning
- **Submission trends**: Topics, speakers, and engagement patterns
- **Content gaps**: Areas needing more coverage or development
- **Community health**: Participation metrics and feedback themes