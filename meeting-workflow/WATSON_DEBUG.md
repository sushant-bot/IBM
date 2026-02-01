# IBM Watson Orchestrate Integration - Debugging Guide

## Current Setup

Your app has:
- **Meeting Analysis Agent**: `ad102462-079b-4f86-ba0c-b959252d4976`
- **Action Governance Agent**: `1475be82-713c-49e0-bc99-529ab1b99f0e`
- **Host URL**: `https://ap-south-1.dl.watson-orchestrate.ibm.com`

## Step 1: Test Script Loading

1. Open browser at `http://localhost:5173/test-watson.html`
   - This is a diagnostic page with no React interference
   - Shows configuration status
   - Captures all console output

2. Check browser DevTools (F12) → Console tab
   - Look for `[Watson]` prefixed messages:
     - ✓ "Script loaded successfully" = Watson loader is accessible
     - ✓ "Initializing wxoLoader..." = Attempting to initialize
     - ✓ "wxoLoader initialized" = Chat should appear below "Configuration Status"
     - ✗ Any error = network/authentication/deployment issue

## Step 2: Check Network Connectivity

1. Open `http://localhost:5173/test-watson.html`
2. Press F12 → Network tab
3. Reload page
4. Search for: `wxoLoader.js`

Expected:
- **Status 200**: Script downloaded successfully (Watson is accessible)
- **Status 404**: Agent not deployed or URL incorrect
- **Status 403/401**: Authentication required
- **CORS error**: Your domain might not be whitelisted
- **Failed to fetch**: Network connectivity issue

## Step 3: Test in Main App

Once script loads in test-watson.html:

1. Navigate to `http://localhost:5173/`
2. Go through workflow:
   - Landing Page → Next
   - Transcript Input page → Check for Watson chat widget
   - If you see blue "IBM Watson" banner = agent switching is working
   - Go back → Action Governance page → Should show amber "IBM Watson" banner

3. Open F12 → Console and look for agent switching logs

## Step 4: Agent Switching Test

If Watson loads:

1. Go to Transcript Input page (should use Meeting Analysis Agent)
2. Open Console (F12)
3. Type: `window.switchAgent('actionGovernance')`
4. Press Enter
5. Should see: "Switched to agent: actionGovernance"
6. Chat widget should update to governance agent

## Troubleshooting Checklist

### Scenario 1: No `[Watson]` logs in console
- **Cause**: Script not loading
- **Check**: 
  - Is Watson URL accessible? Test in new tab: `https://ap-south-1.dl.watson-orchestrate.ibm.com/wxochat/wxoLoader.js?embed=true`
  - Network tab shows error? (404, CORS, timeout)
  - Is the orchestrationID correct?

### Scenario 2: "[Watson] Script loaded" but no chat appears
- **Cause**: wxoLoader initializing but chat not rendering
- **Check**:
  - Is `rootElementID: "root"` correct? (Check in index.html)
  - Browser console shows additional errors?
  - Try clicking outside the app in case chat is hidden
  - Check if Watson requires specific CSS or DOM structure

### Scenario 3: Agent switching not working
- **Cause**: switchAgent function not being called from components
- **Check**:
  - Open Console on Transcript Input page
  - Type: `window.switchAgent` - should show function definition
  - Type: `window.wxoAgents` - should show both agents
  - Manual test: `window.switchAgent('actionGovernance')`

### Scenario 4: Chat appears but doesn't respond
- **Cause**: Agent not properly deployed or authentication issue
- **Check**:
  - Are agent IDs correct?
  - Are agent environment IDs correct?
  - Are agents deployed and active in watsonx?
  - Check IBM Watson console for agent status

## Configuration Reference

All configs are in `index.html` in a `<script>` block:

```javascript
window.wxOConfiguration = {
  orchestrationID: "20260131-1618-5174-50d1-60461a7f7964_20260131-1619-1747-8092-d46ad2227c42",
  hostURL: "https://ap-south-1.dl.watson-orchestrate.ibm.com",
  rootElementID: "root",  // Must match React mount point
  chatOptions: {
    agentId: "ad102462-079b-4f86-ba0c-b959252d4976",  // Current agent
    agentEnvironmentId: "d760cc70-3533-4fde-aabe-d406532524d2"
  }
}
```

## Component Integration Points

**TranscriptInput.jsx**:
```javascript
useEffect(() => {
  if (window.switchAgent) window.switchAgent('meetingAnalysis');
}, []);
```

**ActionGovernance.jsx**:
```javascript
useEffect(() => {
  if (window.switchAgent) window.switchAgent('actionGovernance');
}, []);
```

## Questions to Answer During Testing

1. Can you see `[Watson] Script loaded successfully` in console?
2. Does `https://ap-south-1.dl.watson-orchestrate.ibm.com/wxochat/wxoLoader.js?embed=true` return Status 200 in Network tab?
3. Does a chat widget or chat bubble appear anywhere on the page?
4. Can you see the blue/amber "IBM Watson" banners on Transcript Input / Action Governance pages?
5. When you type `window.wxoLoader` in console, do you see an object or undefined?

---

**Report these findings** so we can diagnose the issue precisely.
