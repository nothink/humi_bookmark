import { appendRoot } from "./append";
import { retrieveVcards } from "../lib/retrieve";

const updateContents = (): void => {
  appendRoot();
  retrieveVcards();
};

updateContents();

export {};
