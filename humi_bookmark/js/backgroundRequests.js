// push static path to global array
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let target = details.url.replace('https', 'http').replace('http://', '').split("?")[0].split("&")[0];

    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        // Add requested url host and path strings
        backgroundPage.files.push(target);
    });
  },
  {urls: ['*://*.ameba.jp/vcard/*']},
  []
);
