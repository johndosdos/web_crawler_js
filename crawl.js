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

async function crawlPage(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "text/html",
    },
  });

  try {
    if (response.status >= 400) {
      throw new Error("Client error");
    }
    if (!response.headers.get("content-type").includes("text/html")) {
      throw new Error("Content-Type header is not text/html");
    }
  } catch (error) {
    console.log(error);
  }
  return response.text();
}

export { normalizeURL, getURLsFromHTML, crawlPage };
