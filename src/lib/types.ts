export interface ContentFile {
  name: string
  path: string // relative path from content root, URL-encoded
  rawPath: string // original path with spaces/cyrillic
}

export interface ContentFolder {
  name: string
  path: string
  rawPath: string
  files: ContentFile[]
  subfolders: ContentFolder[]
}

export interface ContentSection {
  /** Display name e.g. "1. Отраслевая аналитика" */
  name: string
  /** Short key for URL slug, e.g. "1-otraslevaya-analitika" */
  slug: string
  /** Original directory name */
  dirName: string
  fileCount: number
  subfolders: ContentFolder[]
  files: ContentFile[]
}

export interface Manifest {
  sections: ContentSection[]
  generatedAt: string
}
