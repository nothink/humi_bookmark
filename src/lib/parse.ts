// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: let serialized_html = DOMtoString(document);

// TODO: want to fix more testable.
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling

/**
 * Stringfy Node element
 * @param node HTML Node
 * @returns a string
 */
const stringifyNode = (node: ChildNode): string => {
  if (node instanceof Element) {
    return node.outerHTML
  }
  return node.nodeValue ?? ''
}

/**
 * Parse Document to array of string
 * @param doc HTML Document
 * @returns array of strings
 */
export const parseDoc = (doc: Document): string[] => {
  const result: string[] = []
  const nodes = doc.childNodes
  nodes.forEach((node: ChildNode): void => {
    result.push(stringifyNode(node))
  })
  return result
}
