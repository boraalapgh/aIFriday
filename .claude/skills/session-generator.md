# Session Generator Skill

This skill creates complete session folders with all necessary templates and structure for AI Friday meetings.

## When to Use
Use this skill when setting up a new AI Friday session. It will create a complete folder structure with all templates populated and ready for use.

## What This Skill Does

### 1. Session Structure Creation
- Creates organized folder structure for the session
- Generates all necessary template files
- Sets up proper naming conventions and organization

### 2. Template Population
- **Agenda template**: Pre-filled with session details and structure
- **Notes template**: Ready for scribe to use during the meeting
- **Follow-ups template**: Set up for post-meeting action tracking
- **Submission tracking**: Links to relevant speaker submissions

### 3. Asset Organization
- **Demos folder**: Ready for speaker materials and code samples
- **Artifacts folder**: Space for recordings, slides, and shared resources
- **Submissions folder**: Links to relevant speaker proposals

### 4. Session Tracking
- **Session index**: Updates main sessions tracking
- **Calendar integration**: Generates calendar-ready descriptions
- **Resource linking**: Connects to baseline topics and submission queue

## Usage Instructions

When you invoke this skill, provide:
- **Session date**: Format as YYYY-MM-DD
- **Week number**: Which AI Friday session this is
- **Host name**: Who will be moderating
- **Confirmed speakers**: Names and topics if known
- **Special theme**: Any special focus or baseline topics to use

The skill will create a complete session folder with all templates populated and ready to use.

## Session Structure Created

```
meetings/sessions/YYYY-MM-DD-week-N/
├── agenda.md                 # Pre-filled agenda template
├── notes.md                  # Scribe-ready notes template
├── follow-ups.md            # Action items and next steps
├── submissions/             # Links to relevant speaker submissions
├── demos/                   # Speaker demo materials
├── artifacts/               # Recordings, slides, shared resources
└── README.md               # Session overview and links
```

## Template Integration

The skill automatically:
- Pulls from `meetings/templates/` for base templates
- Links to relevant content in `content/baseline-topics/`
- References submissions from `content/submissions/`
- Updates tracking in session index

## Automation Features

- **Smart defaults**: Populates reasonable defaults for timing and structure
- **Baseline topic integration**: Suggests relevant backup topics
- **Speaker linking**: Connects to existing submissions and speaker history
- **Resource preparation**: Sets up folders and links for common needs

## Output

Creates a complete, ready-to-use session folder with:
- All templates populated with session-specific details
- Proper folder structure for organization
- Links to relevant resources and baseline topics
- Updated session tracking and index