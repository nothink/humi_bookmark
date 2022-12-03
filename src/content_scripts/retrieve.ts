import { parseDoc } from '../lib/parse'
import { upload } from '../lib/upload'

export const retrieveVcards = (): void => {
  const regex =
    /((c.|)stat100.ameba.jp)|([a-z0-9]*\.cloudfront\.net)\/vcard\/[-a-zA-Z0-9/._+]*\.(?!build)[a-zA-Z0-9]+/gm
  const parsed = parseDoc(document)
  parsed.forEach((p) => {
    if (p.length > 0) {
      // replace all '\/' to '/'
      p = p.replace(/\\\//g, '/')
      const files: string[] = []
      let m
      while ((m = regex.exec(p)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }

        // The result can be accessed through the `m`-variable.
        // replace all '//' to '/'
        const key = m[0].replace(/\/\//g, '/')
        files.push(key)
      }
      if (files.length > 0) {
        upload(files)
      }
    }
  })
}
