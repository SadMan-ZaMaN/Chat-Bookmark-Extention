function getScrollContainer() {
  const claudeContainer = document.querySelector('[class*="group/scroll-root"]');
  if (claudeContainer) return claudeContainer;

  const chatgptContainer = document.querySelector('[class*="overflow-y-auto"]');
  if (chatgptContainer && chatgptContainer.scrollHeight > chatgptContainer.clientHeight) {
    return chatgptContainer;
  }

  return document.documentElement;
}

function getFirstMessage() {
  const selectors = [
    '[data-testid="human-turn"]',
    '[data-testid="assistant-turn"]',
    '[data-message-id]',
    '[class*="conversation-turn"]',
    'article',
  ];
  for (const selector of selectors) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) return els[0];
  }
  return null;
}

function getLastMessage() {
  const selectors = [
    '[data-testid="human-turn"]',
    '[data-testid="assistant-turn"]',
    '[data-message-id]',
    '[class*="conversation-turn"]',
    'article',
  ];
  for (const selector of selectors) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) return els[els.length - 1];
  }
  return null;
}

function goToTop() {
  const container = getScrollContainer();
  container.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToBottom() {
  const container = getScrollContainer();
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'top') goToTop();
  if (msg.action === 'bottom') goToBottom();
});