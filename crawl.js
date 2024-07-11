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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  try {
    const currentURLnorm = new URL(currentURL, baseURL).toString();

    if (!(currentURLnorm in pages)) {
      pages[currentURLnorm] = 1;
    } else {
      pages[currentURLnorm] += 1;
      return pages;
    }

    const response = await fetch(currentURL, {
      method: "GET",
      mode: "cors",
    });

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
