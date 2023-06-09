import { stringifyDocument } from "./stringify";

/**
 * retrieve strings with "vcard/"
 */
export const retrieveVcards = (): string[] => {
  const parsed = stringifyDocument(document);
  const regex = /vcard\/[-_.a-zA-Z0-9/+]*\.[a-zA-Z0-9]+/g;
  const matches = Array.from(parsed.matchAll(regex), (m) => m[0]);
  // remove dups
  const nodups = [...new Set(matches)];
  // create urls
  return nodups.map((vcard) => `https://dqx9mbrpz1jhx.cloudfront.net/${vcard}`);
};
