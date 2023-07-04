import { getBucket } from "@extend-chrome/storage";

// TODO: モックがないとテストが書けない？

const BUCKET_KEY = "dqx9mbrpz1jhx";

interface VcardStore {
  sent: string[];
  queue: string[];
}

const bucket = getBucket<VcardStore>(BUCKET_KEY);

/**
/**
 * Add an array of vcard object keys to the queue (async)
 * @param keys An array of string keys to add to the queue
 */
const enqueue = async (keys: string[]): Promise<void> => {
  // TODO: レースコンディション怖いけど、JavaScriptの仕様的にいけるっぽい？
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pKqKE7Ibq54
  const current = await bucket.get({ queue: [] as string[] });
  const joined = [...new Set([...current.queue, ...keys])];

  await bucket.set({ queue: joined });
};

/**
 * Add an array of vcard object keys to the queue (not async)
 * @param keys An array of string keys to add to the queue
 */
export const enqueueSync = (keys: string[]): void => {
  enqueue(keys).then(
    () => {},
    () => {}
  );
};

/**
 * Get all vcard object keys that have not yet been sent in the queue (async)
 * @returns An array of string keys accumulated in the queue
 */
export const dequeue = async (): Promise<string[]> => {
  const current = await bucket.get();
  const queue = current.queue ?? [];
  const sent = current.sent ?? [];

  const returnValue = queue.filter((x) => {
    if (sent.length === 0) return true;
    return !sent.includes(x);
  });
  const nextSent = [...new Set([...sent, ...queue])];

  await bucket.set({ queue: [], sent: nextSent });

  return returnValue;
};
