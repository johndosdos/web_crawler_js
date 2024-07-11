import { crawlPage, getURLsFromHTML } from "./crawl.js";

async function main() {
  if (process.argv.length === 3) {
    console.log("Starting...");
    console.log(`Web crawler starting at ${process.argv[2]}...`);
  } else {
    console.log(new Error("Received 0 arguments; 1 argument required."));
  }

  const htmlPage = await crawlPage(process.argv[2]);
  const urlArray = getURLsFromHTML(htmlPage, process.argv[2]);
  console.log(urlArray);
}

main();
