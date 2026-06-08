let bookmarkEl = null;
let lastMouseTarget = null;

// Track wherever the mouse is hovering
document.addEventListener('mousemove', (e) => {
  lastMouseTarget = e.target;
});

function setBookmark() {
  // Remove old bookmark if exists
  if (bookmarkEl) bookmarkEl.remove();

  const target = lastMouseTarget;
  if (!target || !target.parentNode) {
    alert('Move your mouse to where you want the bookmark, then press Alt+B');
    return;
  }

  // Create bookmark element
  bookmarkEl = document.createElement('div');
  bookmarkEl.id = 'chat-bookmark-marker';

  const imgUrl = chrome.runtime.getURL('bookmark.png');
  bookmarkEl.innerHTML = `
    <img 
      src="${imgUrl}" 
      style="width:36px; height:36px; cursor:pointer; display:block;" 
      title="📍 Click to remove bookmark"
      id="chat-bookmark-img"
    />
  `;
  bookmarkEl.style.cssText = `
    position: relative;
    margin: 6px 0;
    width: fit-content;
    z-index: 9999;
  `;

  // Click image to remove bookmark
  bookmarkEl.querySelector('img').addEventListener('click', () => {
    removeBookmark();
  });

  // Insert before the hovered element
  try {
    target.parentNode.insertBefore(bookmarkEl, target);
  } catch(e) {
    target.appendChild(bookmarkEl);
  }

  sessionStorage.setItem('chatBookmarkSet', 'true');
}

function goToBookmark() {
  if (bookmarkEl) {
    bookmarkEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert('No bookmark set yet! Hover your mouse where you want it, then press Alt+B');
  }
}

function removeBookmark() {
  if (bookmarkEl) {
    bookmarkEl.remove();
    bookmarkEl = null;
    sessionStorage.removeItem('chatBookmarkSet');
  }
}

// Listen for messages from background.js and popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'set') setBookmark();
  if (msg.action === 'go') goToBookmark();
  if (msg.action === 'remove') removeBookmark();
});