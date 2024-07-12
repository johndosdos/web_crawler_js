export function printReport(pages) {
  console.log("\n\n");

  const sortedPagesArray = Array.from(Object.entries(pages));
  sortedPagesArray.sort((a, b) => b[1] - a[1]);

  for (const [url, count] of sortedPagesArray) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}
