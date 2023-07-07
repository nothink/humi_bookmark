import { describe, expect, it } from "vitest";
import { stringifyDocument, stringifyNode } from "./stringify";

describe("stringifyNode", () => {
  it("stringifyNode returns outerHTML for Element nodes", (t) => {
    const div = document.createElement("div");
    div.innerHTML = "<p>Hello, world!</p>";
    const actual = stringifyNode(div);
    expect(actual).toEqual("<div><p>Hello, world!</p></div>");
  });

  it("stringifyNode returns nodeValue for non-Element nodes", (t) => {
    const text = document.createTextNode("Hello, world!");
    const actual = stringifyNode(text);
    expect(actual).toEqual("Hello, world!");
  });

  it("stringifyNode returns empty string for null nodeValue", (t) => {
    const text = document.createTextNode("");
    const actual = stringifyNode(text);
    expect(actual).toEqual("");
  });
});

describe("stringifyDocument", () => {
  it("stringifyDocument should return the outerHTML of an empty document", () => {
    const doc = new DOMParser().parseFromString("", "text/html");
    const result = stringifyDocument(doc);
    expect(result).toBe("<html><head></head><body></body></html>");
  });

  it("stringifyDocument should return the outerHTML of a single element document", () => {
    const doc = new DOMParser().parseFromString(
      "<html><head></head><body></body></html>",
      "text/html",
    );
    const result = stringifyDocument(doc);
    expect(result).toBe("<html><head></head><body></body></html>");
  });

  it("stringifyDocument should return the outerHTML of all child nodes of a document", () => {
    const doc = new DOMParser().parseFromString(
      "<html><head></head><body><div></div><p></p></body></html>",
      "text/html",
    );
    const result = stringifyDocument(doc);
    expect(result).toBe(
      "<html><head></head><body><div></div><p></p></body></html>",
    );
  });
});
