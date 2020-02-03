"use strict";

// create default storage settings
// TODO: ポップアップの設定なので実装時に書き換えが必要
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
});

// Create alarm when extenssion is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("putResource", { periodInMinutes: 1 });
  console.log("alarm cleated.");
});

// Push to API, and clear storage.
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "putResource") {
    chrome.storage.local.get("urls", value => {
      if (!value.urls) {
        return;
      }
      const fetchTarget = value.urls as string[];
      // put array to api.
      fetch("https://yurararan.nothink.jp/api/v0/resources", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          urls: fetchTarget
        })
      })
        .then(response => {
          console.log(response);
          chrome.storage.local.get("urls", value => {
            // 現在の値を更新
            const remains = (value.urls as string[]).slice(fetchTarget.length);
            chrome.storage.local.set({ urls: remains });
          });
        })
        .catch(console.error);
    });
  }
});

// push static path to global array
chrome.webRequest.onCompleted.addListener(
  details => {
    // リクエスト毎にそのURLのスキーマ以外をスタックに詰め込む
    const target = details.url
      .replace("https://", "http://")
      .replace("http://", "")
      .replace("//", "/")
      .split("?")[0]
      .split("&")[0];

    chrome.storage.local.get("urls", value => {
      // 現在の値を更新
      const current: string[] = value.urls ? (value.urls as string[]) : [];
      if (!current.includes(target)) {
        current.push(target); // 必ず後ろから追加すること
        chrome.storage.local.set({ urls: current });
      }
    });
  },
  {
    urls: ["*://*.ameba.jp/vcard/*", "*://*.cloudfront.net/vcard/*"]
  },
  []
);
