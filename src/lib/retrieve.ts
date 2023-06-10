/**
 * retrieve strings with "vcard/"
 */
export const retrieveVcards = (html: string): string[] => {
  const regex = /vcard\/[-_.a-zA-Z0-9/+]*\.[a-zA-Z0-9]+/g;
  const matches = Array.from(html.matchAll(regex), (m) => m[0]);
  // remove dups
  const nodups = [...new Set(matches)];
  // create urls
  return nodups.map((vcard) => `https://dqx9mbrpz1jhx.cloudfront.net/${vcard}`);
};
