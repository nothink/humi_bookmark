// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'vcard.ameba.jp'
                }
            })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

// global storage for dumping target paths.
var files = [];

// set interval
let intervalId = setInterval(() => {
    let targets = files.concat();
    files = [];
    if (targets.length > 0) {
        upload(targets);
    }
}, 5 * 1000);
