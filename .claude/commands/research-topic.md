Research a topic using web search to gather current information, trends, and diverse perspectives for AI Friday session preparation.

## What This Command Does

1. **Searches the Web**: Finds recent articles, docs, discussions, and announcements
2. **Gathers Perspectives**: Captures enthusiast, skeptic, and pragmatist viewpoints
3. **Identifies Trends**: Highlights what's new and generating discussion
4. **Curates Resources**: Selects the most valuable links (not exhaustive lists)
5. **Suggests Content**: Provides demo ideas and discussion starters

## Usage

```
/research-topic {topic}
/research-topic {topic} --angle {specific focus}
/research-topic {topic} --session {session-folder}
```

## Examples

```
/research-topic "Claude MCP servers"
/research-topic "AI code review tools" --angle "integration with CI/CD"
/research-topic "Figma to React workflows" --session 2025-01-30-week-5
```

## Workflow

When invoked, the research-curator agent will:

### 1. Clarify Scope
- Confirm the topic and any specific angles
- Ask if this is for a specific session or general research
- Determine output location

### 2. Execute Research
Using WebSearch and WebFetch tools:
- Search 3-5 angles on the topic
- Prioritize content from last 6 months
- Gather official docs, community discussions, and practitioner experiences
- Identify contrasting opinions

### 3. Synthesize Brief
Create a focused research brief containing:
- **TL;DR**: 2-3 sentence summary
- **What's New**: Recent developments that matter
- **Key Perspectives**: Multiple viewpoints, not just hype
- **Practical Insights**: Actionable takeaways
- **Demo Ideas**: Suggestions for live demonstrations
- **Curated Resources**: 5-8 high-value links

### 4. Save Output
- If session specified: `meetings/sessions/{session}/generated/research_brief.md`
- If standalone: `content/research/{topic-slug}_brief.md`

## Output Characteristics

**What you'll get:**
- 5-10 minute read (not a 20-page document)
- Focus on what's NEW and NOTABLE
- Multiple perspectives, including criticisms
- Actionable insights for speakers
- Curated links with context on why they matter

**What you won't get:**
- Exhaustive literature review
- Generic background information
- Single-source cheerleading
- Links dumped without context

## Integration with Other Workflows

### During `/new-session`
Research can be triggered after session structure is created to inform content planning.

### During Speaker Preparation
Content-curator can invoke research-curator to prepare speaker-specific briefs with targeted angles.

### Standalone Research
Use anytime to explore potential topics or prepare for planning discussions.

## Tips for Better Results

**Be specific about angles:**
```
# Too broad
/research-topic "AI agents"

# Better - specific angle
/research-topic "AI agents" --angle "building with Claude Agent SDK for internal tools"
```

**Specify context when relevant:**
```
# If you have a speaker in mind
/research-topic "prompt engineering" --angle "for designers with no coding background"
```

## Agent Details

- **Agent**: research-curator
- **Model**: Sonnet
- **Tools**: WebSearch, WebFetch, Read, Write, Glob
- **Output**: Markdown research brief

---

Ready to research? Provide a topic and I'll gather the latest information and perspectives for your AI Friday session.
