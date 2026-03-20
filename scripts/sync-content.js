#!/usr/bin/env node
/**
 * Syncs Obsidian markdown content to public/content/
 * and generates manifest.json with the full file tree.
 *
 * Usage: node scripts/sync-content.js [source-path]
 * Default source: ~/Desktop/Git/obsidian/koloskov
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SOURCE_PATH =
  process.argv[2] ||
  path.join(os.homedir(), 'Desktop/Git/obsidian/koloskov')

const DEST_PATH = path.join(__dirname, '../public/content')

const IGNORED_DIRS = new Set(['.git', '.obsidian', '.idea', '.trash', 'REFS', 'assets'])

// Transliteration map for generating URL slugs
const TRANSLITERATE_MAP = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
  'з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o',
  'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
  'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
}

function transliterate(str) {
  return str
    .toLowerCase()
    .split('')
    .map(c => TRANSLITERATE_MAP[c] ?? c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function countFiles(folder) {
  let count = folder.files.length
  for (const sub of folder.subfolders) count += countFiles(sub)
  return count
}

function buildFolder(dirPath, relPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const files = []
  const subfolders = []

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue

    const fullPath = path.join(dirPath, entry.name)
    const entryRel = relPath ? `${relPath}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      const sub = buildFolder(fullPath, entryRel)
      if (sub.files.length > 0 || sub.subfolders.length > 0) {
        subfolders.push(sub)
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({
        name: entry.name.replace(/\.md$/, ''),
        path: entryRel.split('/').map(encodeURIComponent).join('/'),
        rawPath: entryRel,
      })
    }
  }

  files.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  subfolders.sort((a, b) => a.name.localeCompare(b.name, 'ru'))

  return {
    name: path.basename(dirPath),
    path: relPath.split('/').map(encodeURIComponent).join('/'),
    rawPath: relPath,
    files,
    subfolders,
  }
}

function syncFiles(srcDir, destDir, relPath = '') {
  fs.mkdirSync(destDir, { recursive: true })
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue

    const srcFull = path.join(srcDir, entry.name)
    const destFull = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      syncFiles(srcFull, destFull, relPath ? `${relPath}/${entry.name}` : entry.name)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.copyFileSync(srcFull, destFull)
    }
  }
}

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    console.error(`❌ Source not found: ${SOURCE_PATH}`)
    console.error(`   Pass the path as argument: node scripts/sync-content.js /path/to/obsidian`)
    process.exit(1)
  }

  console.log(`📂 Source: ${SOURCE_PATH}`)
  console.log(`📂 Dest:   ${DEST_PATH}`)

  // Clean dest
  if (fs.existsSync(DEST_PATH)) {
    fs.rmSync(DEST_PATH, { recursive: true })
  }
  fs.mkdirSync(DEST_PATH, { recursive: true })

  // Read top-level directories (sections)
  const topEntries = fs.readdirSync(SOURCE_PATH, { withFileTypes: true })
    .filter(e => e.isDirectory() && !IGNORED_DIRS.has(e.name) && /^\d+\./.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'))

  const sections = []
  let totalFiles = 0

  for (const entry of topEntries) {
    const dirPath = path.join(SOURCE_PATH, entry.name)
    const folder = buildFolder(dirPath, entry.name)

    const fileCount = countFiles(folder)
    totalFiles += fileCount

    sections.push({
      name: entry.name,
      slug: transliterate(entry.name),
      dirName: entry.name,
      fileCount,
      files: folder.files,
      subfolders: folder.subfolders,
    })

    // Sync files
    syncFiles(dirPath, path.join(DEST_PATH, entry.name))
    console.log(`  ✓ ${entry.name} (${fileCount} notes)`)
  }

  const manifest = {
    sections,
    generatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(
    path.join(DEST_PATH, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  )

  console.log(`\n✅ Done! ${totalFiles} notes synced. Manifest written.`)
}

main()
