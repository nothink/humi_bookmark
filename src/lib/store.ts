import { getBucket } from "@extend-chrome/storage";

const BUCKET_KEY = "dqx9mbrpz1jhx";

interface VcardStore {
  sent: string[];
  queue: string[];
}

const bucket = getBucket<VcardStore>(BUCKET_KEY);

/**
 * キューにvcardのキーを追加する
 * @param keys キューに追加したいstring[]
 */
export const pushQueues = (keys: string[]): void => {
  // TODO: レースコンディション怖いけど、JavaScriptの仕様的にいけるっぽい？
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pKqKE7Ibq54
  bucket.get({ queue: [] as string[] }).then(
    (current: { queue: string[] }) => {
      const joined = [...new Set([...current.queue, ...keys])];
      bucket.set({ queue: joined }).then(
        (_: { queue: string[] }) => {},
        () => {}
      );
    },
    () => {}
  );
};
