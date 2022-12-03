// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: let serialized_html = DOMtoString(document);

// TODO: want to fix more testable.
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling

/**
 * Parse Document to array of string
 * @param doc HTML Document
 * @returns array of strings
 */
export const parseDoc = (doc: Document): string[] => {
  const result: string[] = []
  let node: Node | null = doc.firstChild

  while (node != null) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        if (node instanceof Element) {
          const html = node.outerHTML
          console.log(html)
          result.push(html)
        }
        break
      case Node.TEXT_NODE:
        if (node.nodeValue !== null) {
          const text = node.nodeValue
          console.log(text)
          result.push(text)
        }
        break
      case Node.CDATA_SECTION_NODE:
        if (node.nodeValue !== null) {
          const cdata = '<![CDATA[' + node.nodeValue + ']]>'
          console.log(cdata)
          result.push(cdata)
        }
        break
      case Node.COMMENT_NODE:
        if (node.nodeValue !== null) {
          const comment = '<!--' + node.nodeValue + '-->'
          console.log(comment)
          result.push(comment)
        }
        break
      case Node.DOCUMENT_TYPE_NODE:
        if (node instanceof DocumentType) {
          // (X)HTML documents are identified by public identifiers
          const doctype =
            '<!DOCTYPE ' +
            node.name +
            (node.publicId !== '' ? ' PUBLIC "' + node.publicId + '"' : '') +
            (node.publicId === '' && node.systemId !== '' ? ' SYSTEM' : '') +
            (node.systemId !== '' ? ' "' + node.systemId + '"' : '') +
            '>\n'
          console.log(doctype)
          result.push(doctype)
        }
        break
    }
    console.log('next...')
    node = node.nextSibling
  }
  return result
}
