// generate-files.js
const fs = require("fs");
const path = require("path");

const blogFolder = path.resolve(__dirname, "../blog");
const outputFilePath = path.join(blogFolder, "files.json");

const files = fs
  .readdirSync(blogFolder)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(blogFolder, file), "utf-8");
    const lines = content.split("\n");
    const titleMatch = lines
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "")
      .trim();
    const dateMatch = lines
      .find((line) => line.startsWith("date:"))
      ?.replace("date:", "")
      .trim();
    const excerpt = lines
      .find((line) => line.startsWith("summary:"))
      ?.replace("summary:", "")
      .trim();

    if (!titleMatch) {
      throw new Error(`Missing title in file: ${file}`);
    }
    if (!dateMatch) {
      throw new Error(`Missing date in file: ${file}`);
    }
    if (!excerpt) {
      throw new Error(`Missing summary in file: ${file}`);
    }

    return {
      name: file.replace(".md", ""),
      title: titleMatch,
      date: dateMatch,
      excerpt,
    };
  });

fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2));

console.log("Files metadata generated:", files);
