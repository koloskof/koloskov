import type { Manifest, ContentSection } from './types'

let manifestCache: Manifest | null = null

export async function loadManifest(): Promise<Manifest> {
  if (manifestCache) return manifestCache
  const res = await fetch('/content/manifest.json')
  if (!res.ok) throw new Error('Failed to load manifest')
  manifestCache = await res.json() as Manifest
  return manifestCache
}

export async function loadNote(encodedPath: string): Promise<string> {
  const res = await fetch(`/content/${encodedPath}`)
  if (!res.ok) throw new Error(`Failed to load note: ${encodedPath}`)
  return res.text()
}

export function findSection(manifest: Manifest, slug: string): ContentSection | undefined {
  return manifest.sections.find(s => s.slug === slug)
}
