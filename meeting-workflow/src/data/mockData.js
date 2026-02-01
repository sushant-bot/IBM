export const sampleTranscript = `Google Meet Recording - Q1 Planning Session
Date: January 28, 2026
Duration: 45 minutes
Participants: Sushant (PM), Tejas (Engineering Lead), Shivam (Design), Kapil (QA), Vedant (Backend), Sohail (DevOps), Siddhant (Security)

---

[00:00:15] Sushant: Good morning everyone. Let's start with our Q1 planning. We have a lot to cover today regarding the new dashboard feature.

[00:01:22] Tejas: Thanks Sushant. From engineering's perspective, we need to finalize the API contracts by next Friday. I can own that deliverable.

[00:02:45] Sushant: Perfect. Tejas, can you also coordinate with the backend team on the database schema changes?

[00:03:10] Tejas: Yes, I'll set up a meeting with Vedant's team this week.

[00:04:30] Shivam: For design, I've completed the initial mockups. I need feedback from the team by Wednesday so I can finalize the component library updates.

[00:05:15] Sushant: Great work Shivam. Everyone please review his Figma file and leave comments.

[00:06:20] Kapil: QA will need the test environment ready by February 10th. Can engineering confirm that timeline?

[00:07:00] Tejas: That should be doable. I'll confirm by end of day tomorrow.

[00:08:45] Sushant: We also need someone to draft the user documentation. Any volunteers?

[00:09:30] Shivam: I can take a first pass at it since I know the UX flow best.

[00:10:15] Sushant: Thanks Shivam. Let's aim to have that draft ready by February 15th.

[00:12:00] Kapil: One more thing - we should schedule the security review. Who's handling that?

[00:12:45] Sushant: Good point. Siddhant, can you coordinate with the security team and get that on the calendar?

[00:13:00] Siddhant: Sure, I'll handle the security review scheduling.

[00:14:00] Sohail: Also, we need to update the deployment runbook. I think that's still using the old process.

[00:14:30] Sushant: Can someone take ownership of that?

[00:15:00] [silence - no response]

[00:15:30] Sushant: Okay, we can figure that out offline. Let's wrap up - everyone clear on their action items?

[00:16:00] All: Yes.

[00:16:15] Sushant: Great. See everyone at next week's sync.

---
End of Recording`;

export const meetingAnalysis = {
  summary: [
    "Q1 planning meeting focused on new dashboard feature development",
    "Cross-functional team alignment on timelines and deliverables",
    "Key milestones: API contracts (Feb 6), Test environment (Feb 10), Documentation (Feb 15)",
    "Security review scheduling assigned to Siddhant",
    "One action item (deployment runbook) left unassigned"
  ],
  actionItems: [
    {
      id: 1,
      task: "Finalize API contracts",
      owner: "Tejas",
      dueDate: "February 6, 2026",
      confidence: 95
    },
    {
      id: 2,
      task: "Coordinate with backend team on database schema changes",
      owner: "Tejas", 
      dueDate: "February 2, 2026",
      confidence: 88
    },
    {
      id: 3,
      task: "Review Shivam's Figma mockups and leave comments",
      owner: "All Team Members",
      dueDate: "February 4, 2026",
      confidence: 82
    },
    {
      id: 4,
      task: "Confirm test environment timeline",
      owner: "Tejas",
      dueDate: "January 29, 2026",
      confidence: 92
    },
    {
      id: 5,
      task: "Draft user documentation",
      owner: "Shivam",
      dueDate: "February 15, 2026",
      confidence: 90
    },
    {
      id: 6,
      task: "Schedule security review with security team",
      owner: "Siddhant",
      dueDate: null,
      confidence: 75
    },
    {
      id: 7,
      task: "Update deployment runbook",
      owner: null,
      dueDate: null,
      confidence: 45
    }
  ]
};

export const governanceResults = {
  autoApprovable: [
    {
      id: 1,
      task: "Finalize API contracts",
      owner: "Tejas",
      dueDate: "February 6, 2026",
      confidence: 95,
      reason: "Clear owner, specific deadline, high confidence"
    },
    {
      id: 2,
      task: "Coordinate with backend team on database schema changes",
      owner: "Tejas",
      dueDate: "February 2, 2026", 
      confidence: 88,
      reason: "Assigned owner, defined timeline"
    },
    {
      id: 4,
      task: "Confirm test environment timeline",
      owner: "Tejas",
      dueDate: "January 29, 2026",
      confidence: 92,
      reason: "Explicit commitment with deadline"
    },
    {
      id: 5,
      task: "Draft user documentation",
      owner: "Shivam",
      dueDate: "February 15, 2026",
      confidence: 90,
      reason: "Volunteer confirmed, deadline set"
    }
  ],
  requiresReview: [
    {
      id: 3,
      task: "Review Shivam's Figma mockups and leave comments",
      owner: "All Team Members",
      dueDate: "February 4, 2026",
      confidence: 82,
      blockReason: "Non-specific owner assignment"
    },
    {
      id: 6,
      task: "Schedule security review with security team",
      owner: "Siddhant",
      dueDate: null,
      confidence: 75,
      blockReason: "Missing deadline"
    },
    {
      id: 7,
      task: "Update deployment runbook",
      owner: null,
      dueDate: null,
      confidence: 45,
      blockReason: "No owner assigned, no deadline, low confidence"
    }
  ]
};
