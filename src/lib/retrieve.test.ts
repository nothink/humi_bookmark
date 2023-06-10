import { expect, test } from "vitest";
import { retrieveVcards } from "./retrieve";

test("retrieveVcards should return an array of urls", () => {
  const html = `
    <a href="https://dqx9mbrpz1jhx.cloudfront.net/vcard/abc123.jpg">vcard</a>
    <a href="https://dqx9mbrpz1jhx.cloudfront.net/vcard/def456.png">vcard</a>
    <a href="https://dqx9mbrpz1jhx.cloudfront.net/vcard/abc123.jpg">vcard</a>
  `;
  const expected = [
    "https://dqx9mbrpz1jhx.cloudfront.net/vcard/abc123.jpg",
    "https://dqx9mbrpz1jhx.cloudfront.net/vcard/def456.png",
  ];
  const actual = retrieveVcards(html);
  expect(actual).toEqual(expected);
});

test("retrieveVcards should return an empty array if no matches are found", () => {
  const html = `
    <a href="https://dqx9mbrpz1jhx.cloudfront.net/image/abc123.jpg">image</a>
    <a href="https://dqx9mbrpz1jhx.cloudfront.net/image/def456.png">image</a>
  `;
  const expected: string[] = [];
  const actual = retrieveVcards(html);
  expect(actual).toEqual(expected);
});
