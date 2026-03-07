import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

const cvPath = 'src/content/cv.typst'
const content = readFileSync(cvPath, 'utf-8')

const currentHashMatch = content.match(/#let file-hash = "([^"]+)"/)
const currentHash = currentHashMatch?.[1]
const currentDateMatch = content.match(/#let last-updated = "([^"]+)"/)
const currentDate = currentDateMatch?.[1]

const normalized = content
  .replace(/#let file-hash = ".*"\n/, '')
  .replace(/#let last-updated = ".*"\n/, '')

const fileHash = createHash('sha256').update(normalized).digest('hex').slice(0, 6)
const today = new Date().toISOString().split('T')[0]

const newDate = currentHash !== fileHash ? today : currentDate || today

const updated = content
  .replace(/#let file-hash = ".*"/, `#let file-hash = "${fileHash}"`)
  .replace(/#let last-updated = ".*"/, `#let last-updated = "${newDate}"`)

writeFileSync(cvPath, updated, 'utf-8')
console.log(`Hash: ${fileHash}, Date: ${newDate}, Updated: ${currentHash !== fileHash}`)
