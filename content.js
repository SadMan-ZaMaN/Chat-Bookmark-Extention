let bookmarkEl = null;

function setBookmark() {
  // Remove old bookmark if exists
  if (bookmarkEl) bookmarkEl.remove();

  // Create a visible bookmark marker
  bookmarkEl = document.createElement('div');
  bookmarkEl.id = 'chat-bookmark-marker';
  bookmarkEl.innerHTML = '📍 Bookmark set here';
  bookmarkEl.style.cssText = `
    position: relative;
    background: #ff6b35;
    color: white;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 14px;
    border-radius: 20px;
    margin: 10px auto;
    width: fit-content;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;

  // Insert at current scroll position in the page
  const scrollY = window.scrollY;
  const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  if (el) {
    el.parentNode.insertBefore(bookmarkEl, el);
  } else {
    document.body.appendChild(bookmarkEl);
  }

  // Save scroll position
  sessionStorage.setItem('chatBookmarkY', scrollY);
  sessionStorage.setItem('chatBookmarkSet', 'true');
}

function goToBookmark() {
  if (bookmarkEl) {
    bookmarkEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    const saved = sessionStorage.getItem('chatBookmarkY');
    if (saved) window.scrollTo({ top: parseInt(saved), behavior: 'smooth' });
    else alert('No bookmark set yet! Press Alt+B to set one.');
  }
}

// Keyboard shortcut: Alt+B to set, Alt+G to go
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'b') { e.preventDefault(); setBookmark(); }
  if (e.altKey && e.key === 'g') { e.preventDefault(); goToBookmark(); }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'set') setBookmark();
  if (msg.action === 'go') goToBookmark();
});