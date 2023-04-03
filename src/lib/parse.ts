/**
 * Stringfy Node element
 * @param node HTML Node
 * @returns a string
 */
const stringifyNode = (node: ChildNode): string => {
  if (node instanceof Element) {
    return node.outerHTML;
  }
  return node.nodeValue ?? "";
};

/**
 * Parse Document to array of string
 * @param doc HTML Document
 * @returns array of strings
 */
export const parseDoc = (doc: Document): string => {
  const strs: string[] = [];
  const nodes = doc.childNodes;
  nodes.forEach((node: ChildNode): void => {
    strs.push(stringifyNode(node));
  });
  return strs.join("\n");
};
