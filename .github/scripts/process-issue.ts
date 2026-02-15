import fs from "node:fs";
import path from "node:path";

const issueBody = process.env.ISSUE_BODY;
const issueNumber = process.env.ISSUE_NUMBER;

if (!issueBody) {
  console.error("No issue body found");
  process.exit(1);
}

// Extract Frontmatter
const frontmatterMatch = issueBody.match(/^---\n([\s\S]*?)\n---/);

if (!frontmatterMatch) {
  console.error("No frontmatter found in issue body");
  process.exit(1);
}

const frontmatter = frontmatterMatch[1];
let slug = "";

// Simple regex to find slug in frontmatter
const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m);
if (slugMatch) {
  slug = slugMatch[1].trim();
} else {
  // Fallback to issue number if slug is not provided
  slug = `issue-${issueNumber}`;
}

// Validate slug (basic alphanumeric + hyphens + dots for safety)
// Remove quotes if present
slug = slug.replace(/^["'](.*)["']$/, "$1");
// Replace invalid chars with hyphen
slug = slug.replace(/[^a-zA-Z0-9-_.]/g, "-").toLowerCase();

const fileName = `${slug}.mdx`;
const filePath = path.join("src", "content", "blog", fileName);

// Ensure directory exists
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Write the file
// @ts-ignore
await Bun.write(filePath, issueBody);

console.log(`Created file: ${filePath}`);

// Output for GitHub Actions
if (process.env.GITHUB_OUTPUT) {
  const outputFile = process.env.GITHUB_OUTPUT;
  // @ts-ignore
  await Bun.write(outputFile, `filepath=${filePath}\n`);
}
