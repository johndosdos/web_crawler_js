function normalizeURL(url) {
  const newUrl = new URL(url);
  return newUrl.hostname + newUrl.pathname;
}

export { normalizeURL };
