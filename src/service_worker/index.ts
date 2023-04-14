chrome.alarms
  .create("humi_bookmark", { delayInMinutes: 1, periodInMinutes: 1 })
  .then(
    () => {},
    () => {}
  );

chrome.alarms.onAlarm.addListener(() => {
  // FIXME: これだとキューが空でもAlarmが回るので改善したい
  const now = new Date(Date.now());
  console.log(now.toTimeString());
});

export {};
