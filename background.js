chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    if (command === 'set-bookmark') {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'set' });
    }
    if (command === 'go-to-bookmark') {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'go' });
    }
    if (command === 'remove-bookmark') {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'remove' });
    }
    if (command === 'go-to-top') {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'top' });
    }
    if (command === 'go-to-bottom') {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'bottom' });
    }
  });
});