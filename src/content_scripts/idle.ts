/**
 * document_idleで発火するcontent_scripts
 */

import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";
import { enqueueSync } from "../lib/store";
import { stringifyDocument } from "../lib/stringify";

/**
 * document_idle時のメインエントリポイント
 */
const main = (): void => {
  const html = stringifyDocument(document);
  const vcards = retrieveVcards(html);
  enqueueSync(vcards);
  appendRoot();
};

main();
export {};
