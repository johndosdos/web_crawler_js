import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

const inputURL =
  "https://www.boot.dev/lessons/0eb6dd92-7d44-4980-a558-2168f0db4ee5";

const normalizedOutput =
  "www.boot.dev/lessons/0eb6dd92-7d44-4980-a558-2168f0db4ee5";

test("check url", () => {
  expect(normalizeURL(inputURL)).toBe(normalizedOutput);
});
