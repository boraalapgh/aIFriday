# AI Friday Quick Start Guide

Get your AI Friday sessions up and running in 15 minutes.

## 🚀 New to AI Friday? Start Here

AI Friday is a biweekly learning session where teams share AI tools, tips, and live demos. This guide gets you from zero to your first successful session quickly.

### What You Need
- This repository set up locally
- Claude Code CLI access
- Teams/meeting platform for sessions
- 2-3 willing speakers (or use our baseline topics)

### What You'll Get
- Complete session structure and templates
- Automated meeting materials
- Speaker guidelines and prep tools
- Post-session documentation system

## ⚡ 15-Minute Setup

### Step 1: First Session Creation (5 minutes)

**Create your first session:**
```bash
/new-session
```

**You'll be asked:**
- Session date (default: 2 weeks from now)
- Week number (start with 1)
- Host name (probably you!)
- Speakers (leave empty for now)
- Session type (choose "regular session")

**What you get:**
- Complete folder structure in `meetings/sessions/YYYY-MM-DD-week-1/`
- Pre-filled agenda template
- Notes template for meeting scribe
- Follow-up tracking template

### Step 2: Get Your First Speakers (5 minutes)

**Option A: Find volunteer speakers**
- Send the [submission form](../../meetings/templates/submission-form.md) to your team
- Ask for lightning talks (5-10 min) - these are low pressure!
- Focus on practical tips and tools people are already using

**Option B: Use baseline topics (recommended for first session)**
- Choose from 6 ready-to-run topics in `content/baseline-topics/`
- **Session A** (Figma → Code) is great for design/dev teams
- **Session C** (Prompt Engineering) works for any audience
- You can present these yourself or ask team leads

### Step 3: Generate Meeting Materials (5 minutes)

**Create all your meeting communications:**
```bash
/prep-meeting
```

**You'll get:**
- Calendar invite description (copy-paste ready)
- Email announcement template
- Slack/Teams message template
- Host checklist for day-of session

**Send these out:**
1. Update your calendar invite with the generated description
2. Send team announcement email
3. Post in your team Slack/Teams channel

## 🎯 Running Your First Session

### Simple Format (60 minutes)
```
0:00-0:05  Welcome & quick wins
0:05-0:25  Lightning talks (2 x 10 min)
0:25-0:45  Feature demo (20 min)
0:45-1:00  Open clinic (questions & discussion)
```

### Host Script (Copy This!)

**Opening (5 min):**
> "Welcome to our first AI Friday! I'm [name] and I'll be hosting. We're trying something new - a biweekly session to share AI tips and learn from each other.
>
> Today's format: quick wins, two lightning talks, a demo, then open discussion. We're recording this for folks who can't make it.
>
> Let's start - anyone have a quick AI win from this week?"

**Between sections:**
> "Great insights! Let's keep the energy going with [next speaker/topic]."

**Open clinic:**
> "Now for my favorite part - what AI challenges are you facing? What would you like help with?"

**Closing:**
> "This was fantastic! I'll share the recording and notes. Our next AI Friday is [date]. Who wants to share something then?"

### If Things Go Wrong
- **Demo fails?** "Technology happens! Can you walk us through what we should have seen?"
- **No questions?** "Let me start with something I've been struggling with..."
- **Run over time?** "Great discussion! Let's continue in Slack and move to [next item]."

## 📝 After Your Session

### Immediate (day of session)
```bash
/process-notes
```

**Upload your raw notes and get:**
- Structured meeting summary
- Action item tracking
- Resource organization
- Confluence-ready content

### Follow-up (next day)
1. **Thank your speakers** - quick message or email
2. **Share the recording** - post link in team channel
3. **Distribute resources** - share useful links that came up
4. **Plan next session** - who expressed interest in speaking?

## 🎪 Growing Your AI Friday Community

### After 2-3 Sessions

**Expand participation:**
- Invite other teams to present or attend
- Create themed sessions (e.g., "Design AI Month")
- Start "AI Friday Challenges" for hands-on learning

**Improve quality:**
- Survey attendees for feedback
- Experiment with different formats
- Build resource library from sessions

**Scale operations:**
- Train other hosts (rotate hosting duties)
- Create speaker mentorship program
- Set up automated workflows

### Content Ideas That Always Work

**Lightning Talk Topics:**
- "5 ChatGPT prompts that save me time daily"
- "One AI tool I can't live without"
- "My biggest AI failure and what I learned"
- "How I automated [boring task] with AI"

**Demo Topics:**
- Live code generation with AI
- Design workflow automation
- Content creation and editing
- Document and meeting automation

**Clinic Topics:**
- "Help me choose between [AI tools]"
- "I want to automate [process] - where do I start?"
- "How do you handle [AI challenge]?"

## 🛠 Advanced Features (When You're Ready)

### Automation Scripts
```bash
cd automation
npm install
npm run new-session    # Interactive session creation
npm run update-calendar # Generate all communications
npm run export-confluence # Format for knowledge sharing
```

### Custom Skills
- **ai-friday-prep**: Generate meeting prep materials
- **content-organizer**: Structure post-session content
- **topic-manager**: Manage speaker pipeline

### Process Documentation
- **[Speaker Guide](speaker-guide.md)**: Help presenters prepare
- **[Host Guide](host-guide.md)**: Advanced hosting techniques
- **[Process Guide](process-guide.md)**: Complete workflow documentation

## ❓ Quick FAQ

**Q: What if no one wants to present?**
A: Use baseline topics! Session C (Prompt Engineering) is perfect for any team.

**Q: How do I keep people engaged?**
A: Ask questions, share your own struggles, and focus on practical problems people face daily.

**Q: What if I'm not an AI expert?**
A: Perfect! AI Friday is about learning together. Share what you're curious about.

**Q: How often should we meet?**
A: Biweekly works well. Weekly can be too much prep, monthly loses momentum.

**Q: What if only 3 people show up?**
A: Great! Smaller groups often have the best discussions. Keep going.

**Q: Can we invite external speakers?**
A: Absolutely! Just ensure content is relevant to your team's daily work.

## 🎉 Success Checklist

After your first session, you should have:
- [ ] One completed session with recording
- [ ] At least one "this was useful!" comment
- [ ] 2-3 people interested in future presenting
- [ ] Next session date scheduled
- [ ] List of topics for future sessions

### You're Ready to Scale When:
- Sessions run smoothly without major prep stress
- You have a pipeline of willing speakers
- Attendees are implementing shared tips
- People are asking for the next session date

---

## 🚀 Ready to Start?

1. **Run `/new-session`** to create your first session
2. **Pick a baseline topic** or find 2-3 volunteers
3. **Send calendar invite** with generated description
4. **Show up and facilitate** - you've got this!

The hardest part is the first session. After that, the community builds itself.

**Need help?** Check out the other playbooks or ask in #ai-friday channel.

**Remember:** Perfect is the enemy of good. Start simple, learn from each session, and improve over time. Your team will appreciate the initiative and learning opportunity!