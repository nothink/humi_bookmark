// popupが開かれたときに、content.jsへメッセージを通知
chrome.tabs.query(
  { currentWindow: true, active: true },
  ([tab]: chrome.tabs.Tab[]) => {
    chrome.tabs.sendMessage(tab.id as number, {});
  }
);

// content.jsから送信されてきたメッセージを取得
const lists: HTMLUListElement = document.getElementById(
  "lists"
) as HTMLUListElement;
chrome.runtime.onMessage.addListener(({ urlList }) => {
  lists.innerHTML = urlList.map((url: string) => `<li>${url}</li>`).join("");
});
