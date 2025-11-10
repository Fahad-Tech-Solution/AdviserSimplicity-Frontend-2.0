// find-unused-jsx.js
import fs from "fs";
import path from "path";
import readline from "readline";

const SRC_DIR = path.resolve("./src");

// 🧭 Recursive function to collect all files with given extensions
function walk(dir, list, extensions) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath, list, extensions);
    else if (extensions.some((ext) => file.endsWith(ext))) list.push(fullPath);
  }
}

const allJsxFiles = [];
const allProjectFiles = [];

// 📦 Gather files
walk(SRC_DIR, allJsxFiles, [".jsx"]);
walk(SRC_DIR, allProjectFiles, [".js", ".jsx", ".tsx", ".ts"]);

const allCode = allProjectFiles.map((file) =>
  fs.readFileSync(file, "utf8").toString()
);

const usedFiles = new Set();

for (const jsxFile of allJsxFiles) {
  const baseName = path.basename(jsxFile, ".jsx");
  const importRegex = new RegExp(`['"./]${baseName}['"]`, "g");

  for (const content of allCode) {
    if (importRegex.test(content)) {
      usedFiles.add(jsxFile);
      break;
    }
  }
}

// 🚫 Files that should never be deleted
const keepFiles = [
  "App.jsx",
  "main.jsx",
  "index.jsx",
  "Routes.jsx",
  "Router.jsx",
];

for (const file of allJsxFiles) {
  if (keepFiles.includes(path.basename(file))) usedFiles.add(file);
}

const unused = allJsxFiles.filter((file) => !usedFiles.has(file));

console.log("\n📂 Total JSX Files:", allJsxFiles.length);
console.log("✅ Used Files:", usedFiles.size);
console.log("🗑️  Unused JSX Files Found:\n");

if (unused.length === 0) {
  console.log("🎉 No unused JSX files found!");
  process.exit(0);
}

unused.forEach((file) => console.log(" - " + file));

// 🧨 Ask for confirmation before deleting
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\n❓ Do you want to delete these unused files? (y/n): ", (answer) => {
  if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
    for (const file of unused) {
      try {
        fs.unlinkSync(file);
        console.log("🗑️  Deleted:", file);
      } catch (err) {
        console.error("❌ Error deleting:", file, err.message);
      }
    }
    console.log("\n✅ Cleanup complete!");
  } else {
    console.log("\n🚫 No files were deleted.");
  }
  rl.close();
});
