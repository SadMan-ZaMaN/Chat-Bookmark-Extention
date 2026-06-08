let bookmarkEl = null;

function setBookmark() {
  // Remove old bookmark if exists
  if (bookmarkEl) bookmarkEl.remove();

  // Create a visible bookmark marker
  bookmarkEl = document.createElement('div');
  bookmarkEl.id = 'chat-bookmark-marker';
  const imgUrl = chrome.runtime.getURL('bookmark.png');
  bookmarkEl.innerHTML = `<img src="${imgUrl}" style="width:40px; height:40px; cursor:pointer;" title="Your bookmark is here" />`;
  bookmarkEl.style.cssText = `
        position: relative;
        margin: 10px auto;
        width: fit-content;
        z-index: 9999;
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

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'set') setBookmark();
  if (msg.action === 'go') goToBookmark();
});