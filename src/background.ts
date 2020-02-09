'use strict';

// ------------------------- constants -------------------------
/** 規定のUAはiOS Safariに指定 */
const DEFAULT_IOS_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1';
/** alarmの名前 */
const PUT_ALARM_KEY = 'putResource';

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
 * local storageからstring[] の値のみをPromise的に取得する
 * @param key local storage のkey
 */
const getStorage = (key: string): Promise<string[]> => {
  return new Promise(resolve => {
    chrome.storage.local.get(key, value => {
      resolve(value[key] as string[]);
    });
  });
};

/**
 * local storageにstring[] の値をPromise的に取得する
 * @param key local storage のkey
 * @param value setするstring[]
 */
const setStorage = (key: string, value: string[]): Promise<void> => {
  return new Promise(resolve => {
    chrome.storage.local.set({ key, value }, () => resolve());
  });
};

/**
 * pushUrl: URLをローカルストレージにpushする
 * @param url string URL文字列
 */
const pushUrl = (url: string): void => {
  // リクエスト毎にそのURLのスキーマやパラメータ以外の
  // パス部分をスタックに詰め込む
  const pathKey = url
    .replace('https://', 'http://')
    .replace('http://', '')
    .replace('//', '/')
    .split('?')[0]
    .split('&')[0];
  // chrome.storage はコールバック処理なのでPromiseで実施
  // TODO: ロックされていないので一つしか保持できてない
  getStorage('urls').then(value => {
    const current = value ? value : [];
    if (!current.includes(pathKey)) {
      current.push(pathKey); // 必ず後ろから追加すること
      console.log(current);
      return setStorage('urls', current);
    }
  });
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

// // ------------------------- onStartup -------------------------
// chrome.runtime.onStartup.addListener(() => {
//   // add Listener
//   chrome.storage.onChanged.addListener(updateUserAgent);
//   // 一回叩く？
// });

// ------------------------- runtime.onMessage -------------------------
chrome.runtime.onMessage.addListener(message => {
  // 今回はmessage以外いらない
  if (message && message.url && typeof message.url === 'string') {
    console.log(message.url as string);
    // message に url キーが含まれる場合はスタックに詰め込む
    pushUrl(message.url as string);
  }
});

// ------------------------- alarms.onAlarm -------------------------
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === PUT_ALARM_KEY) {
    // get -> put
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
