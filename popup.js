const status = document.getElementById('status');

function send(action) {
  status.textContent = 'Sending...';
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) {
      status.textContent = 'No active tab found!';
      return;
    }
    const tabId = tabs[0].id;

    chrome.tabs.sendMessage(tabId, { action: action }, (response) => {
      if (chrome.runtime.lastError) {
        status.textContent = 'Injecting...';
        // Inject BOTH files
        chrome.scripting.executeScript(
          { target: { tabId: tabId }, files: ['content.js'] },
          () => {
            chrome.scripting.executeScript(
              { target: { tabId: tabId }, files: ['navigate.js'] },
              () => {
                if (chrome.runtime.lastError) {
                  status.textContent = 'Inject failed: ' + chrome.runtime.lastError.message;
                  return;
                }
                setTimeout(() => {
                  chrome.tabs.sendMessage(tabId, { action: action }, () => {
                    status.textContent = 'Done!';
                    setTimeout(() => status.textContent = '', 2000);
                  });
                }, 300);
              }
            );
          }
        );
      } else {
        status.textContent = 'Done!';
        setTimeout(() => status.textContent = '', 2000);
      }
    });
  });
}

document.getElementById('setBtn').addEventListener('click', () => send('set'));
document.getElementById('goBtn').addEventListener('click', () => send('go'));
document.getElementById('removeBtn').addEventListener('click', () => send('remove'));
document.getElementById('topBtn').addEventListener('click', () => send('top'));
document.getElementById('botBtn').addEventListener('click', () => send('bottom'));