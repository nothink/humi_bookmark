import { getBucket } from "@extend-chrome/storage";

const BUCKET_KEY = "dqx9mbrpz1jhx";

interface VcardStore {
  sent: string[];
  queue: string[];
}

const bucket = getBucket<VcardStore>(BUCKET_KEY);

/**
 * キューにvcardのオブジェクトキー配列を追加する(async)
 * @param keys キューに追加したいstring[]
 */
export const enqueue = async (keys: string[]): Promise<void> => {
  // TODO: レースコンディション怖いけど、JavaScriptの仕様的にいけるっぽい？
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pKqKE7Ibq54
  const current = await bucket.get({ queue: [] as string[] });

  const joined = [...new Set([...current.queue, ...keys])];

  await bucket.set({ queue: joined });
};

/**
 * キューにvcardのオブジェクトキー配列を追加する(not async)
 * @param keys キューに追加したいstring[]
 */
export const enqueueSync = (keys: string[]): void => {
  enqueue(keys).then(
    () => {},
    () => {}
  );
};

/**
 * キューに蓄積されたvcardのオブジェクトキー配列から、まだ送信されていないものを全て取得する(async)
 * @returns キューに蓄積されたstring[]
 */
export const dequeue = async (): Promise<string[]> => {
  const current = await bucket.get();
  const returnValue = current.queue.filter((x) => !current.sent.includes(x));
  const nestSent = [...new Set([...current.sent, ...current.queue])];

  await bucket.set({ queue: [], sent: nestSent });

  return returnValue;
};
