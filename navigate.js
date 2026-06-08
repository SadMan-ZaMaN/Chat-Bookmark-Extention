function getFirstMessage() {
  // All these sites use similar structures for chat messages
  const selectors = [
    // Claude
    '[data-testid="human-turn"]',
    '[data-testid="assistant-turn"]',
    // ChatGPT
    '[data-message-id]',
    // Gemini
    '[class*="conversation-turn"]',
    '[class*="message"]',
    // Generic fallback
    'article',
  ];

  for (const selector of selectors) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) return els[0]; // first message
  }
  return null;
}

function getLastMessage() {
  const selectors = [
    '[data-testid="human-turn"]',
    '[data-testid="assistant-turn"]',
    '[data-message-id]',
    '[class*="conversation-turn"]',
    '[class*="message"]',
    'article',
  ];

  for (const selector of selectors) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) return els[els.length - 1]; // last message
  }
  return null;
}

function goToTop() {
  const el = getFirstMessage();
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function goToBottom() {
  const el = getLastMessage();
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'top') goToTop();
  if (msg.action === 'bottom') goToBottom();
});