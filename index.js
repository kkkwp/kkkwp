import { readFileSync, writeFileSync } from "node:fs";
import Parser from "rss-parser";

const readmePath = "README.md";
let readmeContent = readFileSync(readmePath, "utf8");

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});
 
(async () => {
  const feed = await parser.parseURL("https://chxrryda.tistory.com/rss");
 
  let latestPosts = "<h2>  Latest Blog Posts  </h2>\n\n";
  for (let i = 0; i < 5 && i < feed.items.length; i++) {
    const { title, link } = feed.items[i];
    latestPosts += `- [${title}](${link})\n`;
  }

  const newReadmeContent = readmeContent.includes("<h2>  Latest Blog Posts  </h2>")
    ? readmeContent.replace(
        /<h2>  Latest Blog Posts  <\/h2>[\s\S]*?(?=\n\n<br>|\n$)/,
        latestPosts
      )
    : readmeContent + latestPosts;
 
  if (newReadmeContent !== readmeContent)
    writeFileSync(readmePath, newReadmeContent, "utf8");
})();