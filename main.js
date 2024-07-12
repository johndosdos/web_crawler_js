import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  let urlArg = process.argv[2];

  if (!urlArg.startsWith("https://")) {
    urlArg = "https://" + urlArg;
  }

  if (process.argv.length === 3) {
    console.log("Starting...");
    console.log(`Web crawler starting at ${urlArg}...`);
  } else {
    console.log(new Error("Received 0 arguments; 1 argument required."));
  }

  const rawReport = await crawlPage(urlArg);
  printReport(rawReport);
}

main();
