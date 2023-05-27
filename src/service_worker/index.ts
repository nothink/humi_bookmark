import { upload } from "../lib/upload";
import { enqueueSync } from "../lib/store";

chrome.alarms
  .create("humi_bookmark", { delayInMinutes: 1, periodInMinutes: 1 })
  .then(
    () => {},
    () => {}
  );

chrome.alarms.onAlarm.addListener(() => {
  // FIXME: これだとキューが空でもAlarmが回るので改善したい
  const now = new Date(Date.now());
  console.log("date: ", now.toTimeString());
  upload();
  // FIXME: ここでキューが空の時にAlarmをクリアしていい
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // FIXME: Alarmを追加するとしたらここ？
    const target = details.url.split("?")[0].split("&")[0];
    enqueueSync([target]);
  },
  { urls: ["https://dqx9mbrpz1jhx.cloudfront.net/vcard/*"] },
  []
);

export {};
