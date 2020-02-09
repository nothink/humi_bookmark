'use strict';

const iosToggle = document.getElementById('ios') as HTMLInputElement;
chrome.storage.local.get('iosUserAgent', value => {
  if (iosToggle) {
    iosToggle.checked = value.iosUserAgent as boolean;
  }
});

if (iosToggle) {
  iosToggle.addEventListener('click', () => {
    chrome.storage.local.set({ iosUserAgent: iosToggle.checked }, () => {
      console.log('iosToggle: ', iosToggle.checked);
    });
  });
}
