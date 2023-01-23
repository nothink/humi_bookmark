import { getBucket } from '@extend-chrome/storage'

const BUCKET_KEY = 'dqx9mbrpz1jhx'

interface VcardStore {
  sent: string[]
  queue: string[]
}

const bucket = getBucket<VcardStore>(BUCKET_KEY, 'local')

/**
 * キューにvcardのキーを追加する
 * @param keys キューに追加したいstring[]
 */
export const pushQueues = async (keys: string[]): Promise<void> => {
  // TODO: レースコンディション怖いけど、JavaScriptの仕様的にいけるっぽい？
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pKqKE7Ibq54
  console.log(`keys of input: ${keys.toString()}`)
  const current = await bucket.get({ queue: [] as string[] })
  const joined = [...new Set([...current.queue, ...keys])]
  await bucket.set({ queue: joined })
  console.log(`keys of stored: ${joined.toString()}`)
}
