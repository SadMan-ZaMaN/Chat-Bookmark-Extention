# Chat Bookmark - Chrome Extension

A lightweight Chrome extension that lets you bookmark your reading position
in AI chat apps so you never lose your place again.

## Supported Sites

- Claude (claude.ai)
- ChatGPT (chatgpt.com)
- Gemini (gemini.google.com)
- DeepSeek (chat.deepseek.com)

## Features

- Set a bookmark anywhere in the chat using your mouse position
- Jump back to your bookmark instantly
- Remove bookmark by clicking the bookmark image or using a shortcut
- Navigate to the first or last message of the current conversation
- Popup UI accessible from the Chrome toolbar
- Extremely lightweight — uses almost no RAM or CPU

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Set bookmark | Alt+B |
| Go to bookmark | Alt+G |
| Remove bookmark | Alt+R |
| Go to first message | Alt+T |

> Note: Go to last message is only available via the popup button,
> since Chrome extensions have a maximum of 4 keyboard shortcuts.

> If shortcuts don't work, go to `chrome://extensions/shortcuts`
> and assign them manually.

## Popup Buttons

Click the extension icon in your Chrome toolbar to open the popup:

| Button | Action |
|---|---|
| [+] Set Bookmark | Set bookmark at mouse position |
| [>] Go to Bookmark | Jump back to bookmark |
| [x] Remove Bookmark | Remove current bookmark |
| [^] Go to Top | Jump to first message in chat |
| [v] Go to Bottom | Jump to last message in chat |

## Installation

This extension is not on the Chrome Web Store yet. Install it manually:

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in top right corner)
4. Click **Load unpacked**
5. Select the `chat-bookmark-extension` folder
6. The extension icon will appear in your Chrome toolbar

## How to Use

### Setting a Bookmark
1. Open any supported AI chat site
2. Read through the conversation
3. When you want to mark your position, **hover your mouse** over
   the message you are reading
4. Press **Alt+B** or click **[+] Set Bookmark** in the popup
5. A bookmark image will appear at that position

### Going Back to Your Bookmark
- Press **Alt+G** or click **[>] Go to Bookmark** in the popup
- The page will smoothly scroll back to your bookmark

### Removing a Bookmark
- Click directly on the bookmark image to remove it, or
- Press **Alt+R**, or
- Click **[x] Remove Bookmark** in the popup
- Setting a new bookmark automatically removes the old one

### Navigating the Chat
- Click **[^] Go to Top** or press **Alt+T** to jump to the
  first message in the conversation
- Click **[v] Go to Bottom** to jump to the latest message


## File Structure
'''
chat-bookmark-extension/
├── manifest.json       — Extension config and permissions
├── background.js       — Handles keyboard shortcuts
├── content.js          — Bookmark logic injected into chat pages
├── navigate.js         — Top and bottom navigation logic
├── popup.html          — Popup UI layout
├── popup.js            — Popup button logic
└── bookmark.png        — Your bookmark image
'''






## Why I Built This

AI chat apps automatically scroll to the bottom whenever you send a
new message. If you were reading an earlier part of the conversation,
you have to manually scroll back and find your place. This extension
solves that problem with a simple bookmark system that works across
all major AI chat platforms.

## Performance

This extension is extremely lightweight:

| Thing | RAM usage |
|---|---|
| This extension | ~1-2 MB |
| One Chrome tab | ~100-300 MB |
| Claude / ChatGPT tab | ~300-500 MB |

The mouse tracker runs continuously but only saves one variable,
adding no noticeable overhead.

## License

MIT License — free to use, modify, and share.