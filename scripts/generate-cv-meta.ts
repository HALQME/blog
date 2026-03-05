import { readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"

const cvPath = "src/content/cv.typst"

const content = readFileSync(cvPath, "utf-8")
const hash = createHash("sha256").update(content).digest("hex").slice(0, 6)
const date = new Date().toISOString().split("T")[0]

const updated = content
  .replace(/#let file-hash = ".*"/, `#let file-hash = "${hash}"`)
  .replace(/#let last-updated = ".*"/, `#let last-updated = "${date}"`)

writeFileSync(cvPath, updated, "utf-8")
console.log(`Updated: hash=${hash}, date=${date}`)
