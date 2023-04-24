import { dequeue } from "./store";

/**
 * URLのリストを収集エンドポイントに送信する
 * @param urls 送信したいURL文字列
 */
export const submit = async (urls: string[]): Promise<void> => {
  // put array to api.
  const endpoint =
    "https://asia-northeast1-seioclub.cloudfunctions.net/dqx9mbrpz1jhx";

  await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });
};

/**
 * キューに溜まってる分をアップロードする
 */
export const upload = (): void => {
  dequeue().then(
    (keys: string[]) => {
      submit(keys).then(
        () => {},
        () => {}
      );
    },
    () => {}
  );
};
