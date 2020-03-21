'use strict';

// ------------------------- constants -------------------------
/** 規定のUAはiOS Safariに指定 */
const DEFAULT_IOS_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1';
/** alarmの名前 */
const PUT_ALARM_KEY = 'putResource';

// パケットを監視する関係で常に起動してるので、background常駐にする
let urls: string[] = [];
let ends: string[] = [];

// ------------------------- functions -------------------------
/**
 * setIosUserAgent : UAの値をiOS Safariに変更する
 */
const setIosUserAgent = (
  info: chrome.webRequest.WebRequestHeadersDetails
): chrome.webRequest.BlockingResponse => {
  const headers = info.requestHeaders;
  if (headers) {
    headers.forEach(header => {
      if (header.name.toLowerCase() === 'user-agent') {
        header.value = DEFAULT_IOS_USER_AGENT;
      }
    });
  }
  return { requestHeaders: headers };
};

/**
 * updateUserAgent : 必要ならばUAの値を更新する
 */
const updateUserAgent = (
  changes: { [key: string]: chrome.storage.StorageChange },
  areaName: string
): void => {
  if (areaName === 'local' && changes.iosUserAgent) {
    if (changes.iosUserAgent.newValue) {
      // 新規値がtrueの時はaddListener
      chrome.webRequest.onBeforeSendHeaders.addListener(
        setIosUserAgent,
        {
          urls: ['*://vcard.ameba.jp/*'],
          types: ['main_frame'],
        },
        ['blocking', 'requestHeaders']
      );
    } else if (changes.iosUserAgent.oldValue) {
      // 新規値がfaleの時はremoveListener
      chrome.webRequest.onBeforeSendHeaders.removeListener(setIosUserAgent);
    }
    return;
  }
};

/**
 * pushUrl: URLをローカルストレージにpushする
 * @param url string URL文字列
 */
const pushUrl = (src: string): void => {
  // リクエスト毎にそのURLのスキーマやパラメータ以外の
  // URL部分をスタックに詰め込む
  const url = new URL(src);
  const key = url.origin + url.pathname;
  if (!urls.includes(key) && !ends.includes(key)) {
    urls.push(key);
  }
};

const sendCurrent = (): void => {
  const target = urls;
  urls = [];
  console.log(target);
  ends = ends.concat(target);
  // put array to api.
  fetch('https://masamai.nothink.jp/api/v1/resources', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      urls: target,
    }),
  }).catch(console.error);
};

// ------------------------- runtime.onInstalled -------------------------
chrome.runtime.onInstalled.addListener(() => {
  // アラーム作成
  chrome.alarms.create(PUT_ALARM_KEY, { periodInMinutes: 1 });
  // chrome.storageにリスナー追加
  chrome.storage.onChanged.addListener(updateUserAgent);
  // 規定値を設定
  chrome.storage.local.set({ iosUserAgent: true });
});

// ------------------------- runtime.onStartup -------------------------
chrome.runtime.onStartup.addListener(() => {
  // add Listener
  // TODO: Listenerがダブってないことを確認すること
  chrome.storage.onChanged.addListener(updateUserAgent);
});

// ------------------------- runtime.onSuspend -------------------------
chrome.runtime.onSuspend.addListener(() => {
  // 最後に全部送って終了
  sendCurrent();
});

// ------------------------- runtime.onMessage -------------------------
chrome.runtime.onMessage.addListener(message => {
  // 今回はmessage以外いらない
  if (message && message.url && typeof message.url === 'string') {
    // message に url キーが含まれる場合はスタックに詰め込む
    pushUrl(message.url as string);
  }
});

// ------------------------- alarms.onAlarm -------------------------
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === PUT_ALARM_KEY && urls.length > 0) {
    sendCurrent();
  }
});

// ------------------------- webRequest.onCompleted -------------------------
chrome.webRequest.onCompleted.addListener(
  details => {
    // リクエスト毎にそのURLのスキーマ以外をスタックに詰め込む
    pushUrl(details.url);
  },
  {
    urls: ['*://*.ameba.jp/vcard/*', '*://*.cloudfront.net/vcard/*'],
  },
  []
);
