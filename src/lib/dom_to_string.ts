// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: let serialized_html = DOMtoString(document);

// TODO: want to fix more testable.
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling

export function DOMtoString(documentRoot: Node): string {
  let html: string = ''
  let node: Node | null = documentRoot.firstChild
  while (node != null) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        if (node instanceof Element) {
          html += node.outerHTML
        }
        break
      case Node.TEXT_NODE:
        if (node.nodeValue !== null) {
          html += node.nodeValue
        }
        break
      case Node.CDATA_SECTION_NODE:
        if (node.nodeValue !== null) {
          html += '<![CDATA[' + node.nodeValue + ']]>'
        }
        break
      case Node.COMMENT_NODE:
        if (node.nodeValue !== null) {
          html += '<!--' + node.nodeValue + '-->'
        }
        break
      case Node.DOCUMENT_TYPE_NODE:
        if (node instanceof DocumentType) {
          // (X)HTML documents are identified by public identifiers
          html +=
            '<!DOCTYPE ' +
            node.name +
            (node.publicId !== '' ? ' PUBLIC "' + node.publicId + '"' : '') +
            (node.publicId === '' && node.systemId !== '' ? ' SYSTEM' : '') +
            (node.systemId !== '' ? ' "' + node.systemId + '"' : '') +
            '>\n'
        }
        break
    }
    node = node.nextSibling
  }
  return html
}
