/**
 * document_idleで発火するcontent_scripts
 */

import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";
import { enqueueSync } from "../lib/store";

const updateContents = (): void => {
  const vcards = retrieveVcards();
  enqueueSync(vcards);
  appendRoot();
};

updateContents();

export {};
