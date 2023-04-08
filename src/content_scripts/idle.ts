import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";
import { enqueue } from "../lib/store";

const updateContents = (): void => {
  const vcards = retrieveVcards();
  enqueue(vcards);
  appendRoot();
};

updateContents();

export {};
