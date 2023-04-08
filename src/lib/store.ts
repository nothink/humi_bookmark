import { getBucket } from "@extend-chrome/storage";

const BUCKET_KEY = "dqx9mbrpz1jhx";

interface VcardStore {
  sent: string[];
  queue: string[];
}

const bucket = getBucket<VcardStore>(BUCKET_KEY);

/**
 * キューにvcardのオブジェクトキー配列を追加する(not async)
 * @param keys キューに追加したいstring[]
 */
export const enqueue = (keys: string[]): void => {
  // TODO: レースコンディション怖いけど、JavaScriptの仕様的にいけるっぽい？
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pKqKE7Ibq54
  bucket.get({ sent: [] as string[], queue: [] as string[] }).then(
    (current: { sent: string[]; queue: string[] }) => {
      // 一応このアルゴリズムでは sent と queue が独立のはず
      // sent と queue の和集合に含まれないものを queue に追加する
      const all = [...current.sent, ...current.queue];
      const additions = keys.filter((item) => !all.includes(item));
      const nextQueue = [...current.queue, ...additions];
      bucket.set({ queue: nextQueue }).then(
        (_: { queue: string[] }) => {},
        () => {}
      );
    },
    () => {}
  );
};
