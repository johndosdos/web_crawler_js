import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const newUrl = new URL(url);
  return newUrl.hostname + newUrl.pathname;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const anchorTags = dom.window.document.querySelectorAll("a");
  const urlArray = [];
  for (const tag of anchorTags) {
    const fullURL = new URL(tag.href, baseURL).href;
    urlArray.push(fullURL);
  }
  return urlArray;
}

export { normalizeURL, getURLsFromHTML };
