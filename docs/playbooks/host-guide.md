# AI Friday Host Guide

Your complete guide to planning, running, and following up on successful AI Friday sessions.

## 🎯 Overview

As an AI Friday host, you're the curator of learning experiences, facilitator of community building, and guardian of productive discussions. This guide will help you create engaging, valuable sessions that inspire team AI adoption.

### Host Responsibilities

**Pre-Session Planning (2 weeks out)**
- Recruit speakers and curate content
- Set up session structure and materials
- Coordinate logistics and communications

**Session Facilitation (60 minutes)**
- Guide timing and transitions
- Encourage participation and questions
- Maintain energy and focus

**Post-Session Follow-up (1 week after)**
- Process content and action items
- Share resources and recordings
- Plan future sessions

## 📅 Session Planning Workflow

### 2 Weeks Before: Content Curation

**1. Set Up the Session**
```bash
/new-session
```
This creates the complete folder structure with templates.

**2. Review Speaker Pipeline**
```bash
/update-backlog
```
Check submissions, reach out to potential speakers, balance content types.

**3. Content Strategy**
Aim for this mix each session:
- **1-2 Lightning Talks**: Quick wins, tools, tips
- **1 Feature Demo**: Deeper dive, live coding, workflows
- **Open Clinic**: Community problem-solving

**Speaker Recruitment Tips:**
- Rotate between teams to ensure diverse perspectives
- Mix experience levels (beginner insights are valuable!)
- Follow up on previous session discussions
- Use baseline topics when speakers aren't available

### 1 Week Before: Session Preparation

**1. Generate Prep Materials**
```bash
/prep-meeting
```
This creates host checklists, speaker guidelines, and communication templates.

**2. Speaker Coordination**
- Confirm all speakers and topics
- Send prep guidelines and timing expectations
- Collect abstracts and resource links
- Do tech checks if needed for complex demos

**3. Communications**
- Send team announcement with speaker lineup
- Create/update calendar invite with details
- Post in team channels with session preview
- Prepare backup content (baseline topics)

**Communication Checklist:**
- [ ] Email announcement sent
- [ ] Calendar invite updated with agenda
- [ ] Team channel notification posted
- [ ] Speaker prep materials shared
- [ ] Backup topics identified

### 2-3 Days Before: Final Preparations

**1. Logistics Check**
- Confirm Teams meeting link works
- Test recording setup
- Verify screen sharing works
- Prepare session materials

**2. Final Speaker Touch-base**
- Quick check-in on preparation status
- Remind about timing and format
- Share any last-minute attendee questions
- Confirm tech requirements

**3. Backup Planning**
- Have 2-3 baseline topics ready
- Prepare discussion starters for quiet moments
- Plan clinic topics if no one brings questions
- Keep session flexible for group energy

## 🎪 Running the Session

### Session Structure (60 minutes)

**Opening (5 minutes) - Set the Stage**
```
"Welcome to AI Friday Week X! Today we have [speakers] sharing [topics].

Quick reminders:
- We're recording for folks who can't make it
- Share links and resources in chat
- Save complex questions for the clinic
- Be kind, keep it concrete, respect time

Let's start with quick wins - anyone have AI victories to share?"
```

**Lightning Talks (20 minutes) - Energy and Variety**
- Introduce each speaker with context
- Keep strict time limits (use timer)
- Encourage questions but defer deep ones
- Highlight key takeaways between talks

**Feature Demo (20 minutes) - Deep Dive Learning**
- Set up the context and "why this matters"
- Let the demo breathe - don't rush
- Ask clarifying questions during natural pauses
- Summarize key learnings before moving on

**Open Clinic (15 minutes) - Community Problem-Solving**
- Start with problems from chat/previous sessions
- Encourage multiple perspectives on solutions
- Facilitate connections between people with similar interests
- End with clear next steps and follow-ups

### Facilitation Best Practices

**Energy Management:**
- Start with high energy and enthusiasm
- Use names when calling on people
- Acknowledge great questions and insights
- Keep momentum with smooth transitions

**Time Management:**
- Give 2-minute and 30-second warnings
- Have "parking lot" for great but off-topic questions
- Be firm but kind about time limits
- Always leave time for clinic discussions

**Participation Encouragement:**
- Call out lurkers in a friendly way
- Ask follow-up questions to draw out insights
- Connect related comments from different speakers
- Create safe space for "dumb" questions

**Technical Facilitation:**
- Monitor chat for questions and resources
- Help with screen sharing issues quickly
- Ensure speakers are audible and visible
- Backup when demos fail

### Handling Common Situations

**Speaker Runs Over Time:**
"That's great insight, [Name]. In the interest of time, let's continue this in the clinic. Next up we have..."

**Demo Fails:**
"Technology happens! [Name], can you walk us through what we would have seen? This is actually a great learning moment about..."

**No Questions During Clinic:**
"Let me start with something that came up earlier..." or "Here's a challenge I've been facing..."

**Overly Technical Discussion:**
"This is getting into some great technical details. Let me capture this for follow-up, and let's see if we can make it accessible for our broader audience..."

**Disruptive Participant:**
Move conversation to private chat or suggest offline discussion. Keep session moving.

## 📋 Post-Session Follow-up

### Immediate (Day Of)

**1. Process Session Content**
```bash
/process-notes
```
This structures raw notes, extracts action items, and organizes resources.

**2. Quick Wrap-up**
- Thank speakers publicly (chat/email)
- Share recording link when available
- Post key resources in team channels
- Note any urgent action items

### Week After: Documentation and Distribution

**1. Content Organization**
- Process detailed notes for knowledge base
- Extract reusable resources and templates
- Update resource library with new tools
- Create action item tracking

**2. Team Communication**
- Send summary email with highlights
- Share structured notes in Confluence
- Post resources in relevant team channels
- Follow up on action items

### Session Retrospective

**What Worked Well:**
- Which content formats were most engaging?
- What generated the best discussions?
- Which resources got the most interest?

**Areas for Improvement:**
- Did we manage time well?
- Was the technical level appropriate?
- Did everyone get value from the session?

**Future Planning:**
- What follow-up topics emerged?
- Who showed interest in presenting?
- What gaps in coverage do we have?

## 🚀 Advanced Hosting Techniques

### Content Curation Strategies

**Theme-Based Sessions:**
- "Frontend AI" month with related presentations
- "Prompt Engineering" deep-dive series
- "AI Tools for Designers" special focus

**Community-Driven Content:**
- Survey team for burning questions
- Create "AI Challenge" sessions with problem-solving
- Invite external speakers from other teams

**Skill-Building Progressions:**
- Beginner → Intermediate → Advanced sequences
- Build on previous sessions' learnings
- Create hands-on workshop formats

### Engagement Tactics

**Interactive Elements:**
- Live polls about tool usage
- Collaborative problem-solving
- "What would you do?" scenarios

**Community Building:**
- Highlight community members' work
- Create connections between similar interests
- Start team challenges or experiments

**Knowledge Retention:**
- Summarize key insights at the end
- Create "quote of the session" highlights
- Build knowledge progression across sessions

### Measuring Success

**Quantitative Metrics:**
- Attendance trends
- Session feedback scores
- Resource library growth
- Action item completion rates

**Qualitative Indicators:**
- Quality of questions and discussions
- Cross-team collaborations sparked
- Tools adopted by team members
- Community enthusiasm and energy

## 🛠 Host Resources

### Session Management Tools

**Claude Code Commands:**
- `/new-session` - Set up complete session structure
- `/prep-meeting` - Generate all prep materials
- `/process-notes` - Structure post-session content
- `/update-backlog` - Manage speaker pipeline

**Automation Scripts:**
```bash
cd automation
npm run new-session       # Interactive session setup
npm run update-calendar   # Generate calendar content
npm run export-confluence # Format for knowledge base
```

### Templates and Checklists

- **[Session Planning Checklist](../templates/session-planning-checklist.md)**
- **[Speaker Outreach Templates](../templates/speaker-outreach-templates.md)**
- **[Facilitation Prompts](../templates/facilitation-prompts.md)**
- **[Post-Session Tasks](../templates/post-session-checklist.md)**

### Emergency Content

**Baseline Topics (Sessions A-F):**
Ready-to-run sessions when speakers aren't available:
- Session A: Figma → Code workflows
- Session B: Frontend AI agents
- Session C: Prompt engineering
- Session D: Documentation with Claude
- Session E: Storybook automation
- Session F: Figma MCP integration

## ❓ Frequently Asked Questions

**Q: What if no one submits topics for a session?**
A: Use baseline topics! They're designed to be valuable even without preparation.

**Q: How do I handle technical difficulties during demos?**
A: Stay calm, have the presenter explain what should happen, and move on. It's a learning opportunity.

**Q: What if discussions get too technical for some attendees?**
A: Acknowledge both audiences: "For those following along..." and "For others, the key insight is..."

**Q: How do I encourage quieter team members to participate?**
A: Create low-pressure opportunities like chat questions, "quick wins" sharing, or pair-up suggestions.

**Q: What if a session runs low on energy?**
A: Ask engaging questions, share your own struggles/wins, or transition to more interactive clinic time.

**Q: How do I balance different skill levels in the audience?**
A: Set context for technical discussions and always pull out broader insights that apply to everyone.

---

## 🎉 Ready to Host?

Hosting AI Friday is a rewarding way to build community, share knowledge, and drive AI adoption across teams. Remember:

- **Stay curious** - Model the learning mindset you want to see
- **Be inclusive** - Ensure everyone can contribute and benefit
- **Keep it practical** - Focus on actionable insights and real applications
- **Build community** - Connect people with shared interests

**Questions?** Check the #ai-friday channel or reach out to previous hosts for advice.

Your leadership in organizing these sessions directly contributes to the team's AI capabilities and collaborative culture!