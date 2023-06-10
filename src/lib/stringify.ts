/**
 * Stringfy Node element
 * @param node HTML Node
 * @returns a string
 */
export const stringifyNode = (node: ChildNode): string => {
  if (node instanceof Element) {
    return node.outerHTML;
  }
  return node.nodeValue ?? "";
};

/**
 * Parse DOM of a Document to string
 * @param doc HTML Document
 * @returns string
 */
export const stringifyDocument = (doc: Document): string => {
  const strs: string[] = [];
  const nodes = doc.childNodes;
  nodes.forEach((node: ChildNode): void => {
    strs.push(stringifyNode(node));
  });
  return strs.join("\n");
};
