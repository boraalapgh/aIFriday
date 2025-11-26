Add a new topic idea to the AI Friday pipeline for future development and planning.

**Usage**: `/add-topic-idea [topic description]`

**What this does:**
- Captures topic ideas quickly before they're forgotten
- Stores them in the content pipeline for topic-manager review
- Allows easy community input and idea collection

**Examples:**
- `/add-topic-idea Claude Code workflow automation for design teams`
- `/add-topic-idea Advanced prompt engineering techniques - requested by Sarah from Product`
- `/add-topic-idea GitHub Actions CI/CD optimization`

**Your task:**
1. **Capture the Idea**: Add the topic idea to `content/topic-ideas.md` in the "Recently Added" section
2. **Include Context**: Add who suggested it (if mentioned), why it's valuable, and any timing considerations
3. **Format Consistently**: Use the established format for easy processing
4. **Notify**: Confirm the idea has been captured and when it might be reviewed

**Topic Idea Format:**
```markdown
- **[Date]**: [Topic Description]
  - *Context*: [Who suggested, why valuable, urgency]
  - *Potential Format*: Lightning talk/Deep dive/Clinic topic
  - *Notes*: [Any additional context or considerations]
```

**Next Steps:**
The topic-manager agent reviews these ideas weekly and moves appropriate ones into the development pipeline. Ideas that are ready get moved to the backlog or scheduled for upcoming sessions.