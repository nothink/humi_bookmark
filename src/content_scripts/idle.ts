import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";
import { pushQueues } from "../lib/store";

const updateContents = (): void => {
  const vcards = retrieveVcards();
  pushQueues(vcards);
  appendRoot();
};

updateContents();

export {};
