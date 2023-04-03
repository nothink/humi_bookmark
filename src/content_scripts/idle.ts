import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";

const updateContents = (): void => {
  const vcards = retrieveVcards();
  appendRoot(vcards);
};

updateContents();

export {};
