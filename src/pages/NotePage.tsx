import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ArrowLeft } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { loadManifest, loadNote, findSection } from '@/lib/content'
import type { ContentFile } from '@/lib/types'

export function NotePage() {
  const { section: sectionSlug, '*': rest } = useParams<{ section: string; '*': string }>()
  const location = useLocation()

  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [noteTitle, setNoteTitle] = useState<string>('')
  const [sectionName, setSectionName] = useState<string>('')
  const [subfolderName, setSubfolderName] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionSlug || !rest) return

    async function load() {
      try {
        const manifest = await loadManifest()
        const section = findSection(manifest, sectionSlug!)
        if (!section) throw new Error('Раздел не найден')
        setSectionName(section.name)

        // rest contains the path after /:section/
        // Could be "filename" or "subfolder/filename"
        const segments = rest!.split('/').map(decodeURIComponent)

        let fileEntry: ContentFile | undefined
        let filePath: string

        if (segments.length === 1) {
          const fileName = segments[0]
          setNoteTitle(fileName)
          fileEntry = section.files.find(f => f.name === fileName)
          filePath = fileEntry?.path ?? `${encodeURIComponent(section.dirName)}/${encodeURIComponent(fileName + '.md')}`
        } else {
          const subName = segments[0]
          const fileName = segments[1]
          setSubfolderName(subName)
          setNoteTitle(fileName)
          const subfolder = section.subfolders.find(sf => sf.name === subName)
          fileEntry = subfolder?.files.find(f => f.name === fileName)
          filePath = fileEntry?.path
            ?? `${encodeURIComponent(section.dirName)}/${encodeURIComponent(subName)}/${encodeURIComponent(fileName + '.md')}`
        }

        // If location.state has the path, prefer it
        const statePath = (location.state as { filePath?: string } | null)?.filePath
        const resolvedPath = statePath ?? filePath

        const text = await loadNote(resolvedPath)
        setContent(text)
      } catch (e) {
        setError(String(e))
      }
    }

    load()
  }, [sectionSlug, rest, location.state])

  const breadcrumbs = [
    { label: sectionName || sectionSlug!, href: `/${sectionSlug}` },
    ...(subfolderName ? [{ label: subfolderName }] : []),
    { label: noteTitle },
  ]

  if (error) {
    return (
      <Layout breadcrumbs={breadcrumbs}>
        <p className="text-destructive">{error}</p>
      </Layout>
    )
  }

  if (!content) {
    return (
      <Layout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-muted-foreground">Загрузка...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div>
        {/* Back link */}
        <Link
          to={`/${sectionSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {sectionName || 'Назад'}
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
          {noteTitle}
        </h1>

        {/* Markdown content */}
        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Open external links in new tab
              a: ({ href, children, ...props }) => {
                const isExternal = href?.startsWith('http')
                return (
                  <a
                    href={href}
                    {...props}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {children}
                  </a>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  )
}
