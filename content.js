let bookmarkEl = null;
let lastMouseTarget = null;
let bookmarkScrollY = null;

document.addEventListener('mousemove', (e) => {
  lastMouseTarget = e.target;
});

function getScrollContainer() {
  // Claude's exact scroll container
  const claudeContainer = document.querySelector('[class*="group/scroll-root"]');
  if (claudeContainer) return claudeContainer;

  // ChatGPT fallback
  const chatgptContainer = document.querySelector('[class*="overflow-y-auto"]');
  if (chatgptContainer && chatgptContainer.scrollHeight > chatgptContainer.clientHeight) {
    return chatgptContainer;
  }

  // Generic fallback
  const all = document.querySelectorAll('*');
  for (const el of all) {
    const style = window.getComputedStyle(el);
    if (
      (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
  }

  return document.documentElement;
}

function setBookmark() {
  if (bookmarkEl) bookmarkEl.remove();

  const target = lastMouseTarget;
  if (!target || !target.parentNode) {
    alert('Move your mouse to where you want the bookmark, then press Alt+B');
    return;
  }

  // Save scroll position of the REAL container
  const container = getScrollContainer();
  bookmarkScrollY = container.scrollTop;
  sessionStorage.setItem('chatBookmarkScrollY', bookmarkScrollY);
  sessionStorage.setItem('chatBookmarkSet', 'true');

  // Create bookmark element
  bookmarkEl = document.createElement('div');
  bookmarkEl.id = 'chat-bookmark-marker';

  const imgUrl = chrome.runtime.getURL('bookmark.png');
  bookmarkEl.innerHTML = `
    <img 
      src="${imgUrl}" 
      style="width:36px; height:36px; cursor:pointer; display:block;" 
      title="Click to remove bookmark"
    />
  `;
  bookmarkEl.style.cssText = `
    position: relative;
    margin: 6px 0;
    width: fit-content;
    z-index: 9999;
  `;

  bookmarkEl.querySelector('img').addEventListener('click', () => {
    removeBookmark();
  });

  try {
    target.parentNode.insertBefore(bookmarkEl, target);
  } catch(e) {
    target.appendChild(bookmarkEl);
  }
}

function goToBookmark() {
  const container = getScrollContainer();

  // Check if bookmark element still exists in DOM
  const elInDOM = document.getElementById('chat-bookmark-marker');
  if (elInDOM) {
    elInDOM.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Element was removed by virtual scrolling — use saved scroll position
  const savedY = bookmarkScrollY ?? parseInt(sessionStorage.getItem('chatBookmarkScrollY'));
  if (savedY !== null && !isNaN(savedY)) {
    container.scrollTo({ top: savedY, behavior: 'smooth' });
  } else {
    alert('No bookmark set yet! Hover your mouse where you want it, then press Alt+B');
  }
}

function removeBookmark() {
  const elInDOM = document.getElementById('chat-bookmark-marker');
  if (elInDOM) elInDOM.remove();
  bookmarkEl = null;
  bookmarkScrollY = null;
  sessionStorage.removeItem('chatBookmarkSet');
  sessionStorage.removeItem('chatBookmarkScrollY');
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'set') setBookmark();
  if (msg.action === 'go') goToBookmark();
  if (msg.action === 'remove') removeBookmark();
});