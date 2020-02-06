'use strict';

const DEFAULT_IOS_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1';

let userAgent = '';

// create default storage settings
// TODO: ポップアップの設定なので実装時に書き換えが必要
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
  });
  chrome.storage.local.set({ userAgent: DEFAULT_IOS_USER_AGENT }, () => {
    console.log(`current UA is ${DEFAULT_IOS_USER_AGENT}`);
    userAgent = DEFAULT_IOS_USER_AGENT;
  });
});

// UAの設定を変える
chrome.webRequest.onBeforeSendHeaders.addListener(
  info => {
    const headers = info.requestHeaders;
    if (headers) {
      headers.forEach(header => {
        if (header.name.toLowerCase() == 'user-agent') {
          header.value = userAgent;
        }
      });
      return { requestHeaders: headers };
    }
  },
  {
    urls: ['*://vcard.ameba.jp/*'],
    types: ['main_frame'],
  },
  ['blocking', 'requestHeaders']
);

// Create alarm when extenssion is start
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('putResource', { periodInMinutes: 1 });
});

// Push to API, and clear storage.
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'putResource') {
    chrome.storage.local.get('urls', value => {
      if (!value.urls) {
        return;
      }
      const fetchTarget = value.urls as string[];
      // put array to api.
      fetch('https://yurararan.nothink.jp/api/v0/resources', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: fetchTarget,
        }),
      })
        .then(() => {
          chrome.storage.local.get('urls', value => {
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
    // TODO: この辺も非同期化すると幸せ？
    const target = details.url
      .replace('https://', 'http://')
      .replace('http://', '')
      .replace('//', '/')
      .split('?')[0]
      .split('&')[0];

    // TODO: Storage更新メソッドを抜き出す
    chrome.storage.local.get('urls', value => {
      // 現在の値を更新
      const current: string[] = value.urls ? (value.urls as string[]) : [];
      if (!current.includes(target)) {
        current.push(target); // 必ず後ろから追加すること
        chrome.storage.local.set({ urls: current });
      }
    });
  },
  {
    urls: ['*://*.ameba.jp/vcard/*', '*://*.cloudfront.net/vcard/*'],
  },
  []
);

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    // TODO: Storage更新メソッドを抜き出す
    chrome.storage.local.get('urls', value => {
      // 現在の値を更新
      const current: string[] = value.urls ? (value.urls as string[]) : [];
      if (!current.includes(details.url)) {
        current.push(details.url); // 必ず後ろから追加すること
        chrome.storage.local.set({ urls: current });
      }
    });
  },
  {
    urls: ['*://*.ameba.jp/vcard/*', '*://*.cloudfront.net/vcard/*'],
    types: ['xmlhttprequest', 'main_frame', 'sub_frame'],
  },
  []
);
