import { parseDoc } from '../lib/parse'
import { upload } from '../lib/upload'

/**
 * retrieve strings with "vcard/"
 */
export const retrieveVcards = (): void => {
  const parsed = parseDoc(document)
  const regex = /vcard\/[-_.a-zA-Z0-9/+]*\.[a-zA-Z0-9]+/g
  const matches = Array.from(parsed.matchAll(regex), (m) => m[0])
  // remove dups
  const nodups = [...new Set(matches)]
  // create urls
  const urls = nodups.map(
    (vcard) => `https://dqx9mbrpz1jhx.cloudfront.net/${vcard}`
  )

  if (urls.length > 0) {
    upload(urls)
  }
}
