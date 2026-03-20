import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FileText, Folder, ChevronRight } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { Separator } from '@/components/ui/separator'
import { loadManifest, findSection } from '@/lib/content'
import type { ContentSection, ContentFolder, ContentFile } from '@/lib/types'

function FileItem({ file, sectionSlug, prefix }: {
  file: ContentFile
  sectionSlug: string
  prefix?: string
}) {
  const href = prefix
    ? `/${sectionSlug}/${prefix}/${encodeURIComponent(file.name)}`
    : `/${sectionSlug}/${encodeURIComponent(file.name)}`

  return (
    <Link
      to={href}
      state={{ filePath: file.path }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors group"
    >
      <FileText className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
      <span className="text-sm text-foreground leading-snug">{file.name}</span>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}

function SubfolderBlock({ folder, sectionSlug }: {
  folder: ContentFolder
  sectionSlug: string
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2 px-1">
        <Folder className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {folder.name}
        </h3>
        <span className="text-xs text-muted-foreground">({folder.files.length})</span>
      </div>
      <div className="space-y-0.5">
        {folder.files.map(file => (
          <FileItem
            key={file.path}
            file={file}
            sectionSlug={sectionSlug}
            prefix={encodeURIComponent(folder.name)}
          />
        ))}
      </div>
    </div>
  )
}

export function SectionPage() {
  const { section: sectionSlug } = useParams<{ section: string }>()
  const [sectionData, setSectionData] = useState<ContentSection | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionSlug) return
    loadManifest()
      .then(m => {
        const s = findSection(m, sectionSlug)
        if (!s) throw new Error(`Раздел не найден: ${sectionSlug}`)
        setSectionData(s)
      })
      .catch(e => setError(String(e)))
  }, [sectionSlug])

  if (error) {
    return (
      <Layout breadcrumbs={[{ label: 'Раздел не найден' }]}>
        <p className="text-destructive">{error}</p>
      </Layout>
    )
  }

  if (!sectionData) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-muted-foreground">Загрузка...</div>
        </div>
      </Layout>
    )
  }

  const hasSubfolders = sectionData.subfolders.length > 0
  const hasRootFiles = sectionData.files.length > 0

  return (
    <Layout
      breadcrumbs={[{ label: sectionData.name }]}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          {sectionData.name}
        </h1>
        <p className="text-muted-foreground">
          {sectionData.fileCount} {sectionData.fileCount < 5 ? 'заметки' : 'заметок'}
          {hasSubfolders && ` · ${sectionData.subfolders.length} подразделов`}
        </p>
      </div>

      <div>
        {/* Root files */}
        {hasRootFiles && (
          <div className="mb-6">
            {hasSubfolders && (
              <div className="flex items-center gap-2 mb-2 px-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Общие
                </h3>
              </div>
            )}
            <div className="space-y-0.5">
              {sectionData.files.map(file => (
                <FileItem
                  key={file.path}
                  file={file}
                  sectionSlug={sectionSlug!}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subfolders */}
        {hasSubfolders && (
          <>
            {hasRootFiles && <Separator className="mb-6" />}
            {sectionData.subfolders.map(folder => (
              <SubfolderBlock
                key={folder.path}
                folder={folder}
                sectionSlug={sectionSlug!}
              />
            ))}
          </>
        )}
      </div>
    </Layout>
  )
}
