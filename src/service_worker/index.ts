chrome.alarms
  .create("humi_bookmark", { delayInMinutes: 1, periodInMinutes: 1 })
  .then(
    () => {},
    () => {}
  );

chrome.alarms.onAlarm.addListener(() => {
  console.log(Date.now());
});

export {};
