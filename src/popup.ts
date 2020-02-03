"use strict";

// TODO: ポップアップは未実装

const changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", data => {
  if (changeColor) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute("value", data.color);
  }
});

// TODO: このホップアップ設定はチュートリアルのため不要なら消す
if (changeColor) {
  changeColor.onclick = (element): void => {
    if (element && element.target) {
      const color = (element.target as HTMLButtonElement).value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
        if (tabId) {
          chrome.tabs.executeScript(tabId, {
            code: 'document.body.style.backgroundColor = "' + color + '";'
          });
        }
      });
    }
  };
}
