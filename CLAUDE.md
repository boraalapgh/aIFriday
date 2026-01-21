# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Friday is an intelligent meeting management system for biweekly learning sessions where Product, Design, and Engineering teams share AI learnings. It uses Claude Code's native sub-agent architecture for orchestrated workflows.

## Development Commands

```bash
# Navigate to automation directory first
cd automation

# Install dependencies
npm install

# Create new session structure
npm run new-session

# Process meeting recordings
npm run process-recordings

# Generate calendar content
npm run update-calendar

# Export to Confluence format
npm run export-confluence

# Combined: new session + calendar update
npm run generate-all

# Run workflow by type
npm run workflow --type new        # New session workflow
npm run workflow --type complete   # Session completion workflow
```

## Agent Orchestration Architecture

The system uses **direct-invocation agent orchestration** - slash commands directly invoke specialized agents rather than routing through a central orchestrator.

### 6 Specialized Agents (`.claude/agents/`)

| Agent | Function | Invoked By |
|-------|----------|------------|
| `session-manager` | Creates session structure, analyzes patterns, generates agenda | `/new-session` |
| `content-curator` | Matches speakers to topics, balances content types | `/new-session` (after session-manager) |
| `research-curator` | Web searches for current info, trends, perspectives on topics | `/research-topic`, content-curator |
| `topic-manager` | Manages content pipeline, processes submissions | `/update-backlog` |
| `meeting-coordinator` | Handles logistics, generates communications | `/prep-meeting` |
| `knowledge-organizer` | Transforms raw notes into structured docs | `/process-notes` |

### Agent Communication Pattern

Agents communicate via **Markdown context files** with YAML frontmatter in session `context/` folders:
- `workflow.md` - Master workflow status
- `session_manager.md`, `content_curator.md`, etc. - Agent-specific decisions and handoffs

### Slash Commands (`.claude/commands/`)

- `/new-session` - Orchestrates session creation with session-manager → content-curator
- `/prep-meeting` - Triggers meeting-coordinator for facilitation materials
- `/process-notes` - Triggers knowledge-organizer for post-session documentation
- `/update-backlog` - Triggers topic-manager for pipeline management
- `/research-topic` - Standalone web research for any topic (also invoked by content-curator)
- `/add-topic-idea` - Quick capture to `content/topic-ideas.md`

## Key Directory Structure

```
meetings/sessions/{YYYY-MM-DD-week-N}/   # Week-centric session folders
├── context/      # Agent decisions and workflow state
├── inputs/       # Raw materials (notes, transcripts, chat)
├── generated/    # Agent-created materials
├── outputs/      # Final deliverables
└── artifacts/    # Recordings, demos, slides

content/
├── baseline-topics/   # 6 ready-to-run backup sessions (A-F)
├── submissions/       # Speaker submission pipeline (new/in-review/scheduled/archive)
├── pipeline/          # Priority queue, medium-term, idea backlog
└── research/          # Standalone research briefs from /research-topic
```

## Content Pipeline Stages

Submissions flow through: `new/` → `in-review/` → `scheduled/` → `archive/`
Pipeline management: `priority-queue.md` (next 2-3) → `medium-term.md` (4-8 weeks) → `idea-backlog.md`

## Working with Agents

When modifying agents in `.claude/agents/`:
- Each agent has embedded YAML configuration and instructions
- All agents use Sonnet model
- Agent outputs should follow templates in `meetings/templates/`
- Success criteria are defined within each agent file

When creating new sessions:
- Session folders follow `YYYY-MM-DD-week-N` naming
- Always update `meetings/sessions-index.md` after creating sessions
- Context files enable audit trails and agent coordination
