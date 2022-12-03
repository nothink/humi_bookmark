import { parseDoc } from '../lib/parse'
import { upload } from '../lib/upload'

export const retrieveVcards = (): void => {
  const parsed = parseDoc(document)
  const regex = /vcard\/[-_.a-zA-Z0-9/+]*\.[a-zA-Z0-9]+/g
  const matches = Array.from(parsed.matchAll(regex), (m) => m[0])
  if (matches.length > 0) {
    upload(matches)
  }
}
