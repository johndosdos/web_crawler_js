import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

test.skip("url normalization", () => {
  const inputURL = "https://blog.boot.dev";
  const normalizedOutput = "blog.boot.dev";
  expect(normalizeURL(inputURL)).toBe(normalizedOutput);
});

test("url scraping", () => {
  const baseURL = "https://boot.dev";
  const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
    </head>
    <body>
        <h1>Welcome to the Test Page</h1>
        <p>Here are some links you can test:</p>

        <a href="https://example.com">Example</a>
        <a href="/relative/path">Relative Path</a>
        <a href="https://test.com/page">Test Page</a>
        <a href="http://another-example.com">Another Example</a>

        <div>
            <p>Some nested links:</p>
            <a href="https://nested.com">Nested</a>
            <a href="/nested/relative">Nested Relative</a>
        </div>
    </body>
    </html>
    `;
  const expectedURLs = [
    "https://example.com/", // Absolute URL
    "https://boot.dev/relative/path", // Relative URL
    "https://test.com/page", // Absolute URL
    "http://another-example.com/", // Absolute URL
    "https://nested.com/", // Absolute URL
    "https://boot.dev/nested/relative", // Relative URL
  ];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expectedURLs);
});
