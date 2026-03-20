import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Folder, ChevronRight } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { Badge } from '@/components/ui/badge'
import { loadManifest } from '@/lib/content'
import type { Manifest } from '@/lib/types'

const SECTION_COLORS: Record<number, string> = {
  0: 'text-violet-400',
  1: 'text-blue-400',
  2: 'text-emerald-400',
  3: 'text-amber-400',
  4: 'text-rose-400',
  5: 'text-teal-400',
  6: 'text-indigo-400',
  7: 'text-orange-400',
  8: 'text-cyan-400',
}

export function Home() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadManifest()
      .then(setManifest)
      .catch(e => setError(String(e)))
  }, [])

  if (error) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-destructive mb-2 font-medium">Не удалось загрузить контент</p>
          <p className="text-muted-foreground text-sm">
            Запустите <code className="bg-muted px-1.5 py-0.5 rounded">npm run sync-content</code> для синхронизации
          </p>
        </div>
      </Layout>
    )
  }

  if (!manifest) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-muted-foreground">Загрузка...</div>
        </div>
      </Layout>
    )
  }

  const totalNotes = manifest.sections.reduce((s, sec) => s + sec.fileCount, 0)

  return (
    <Layout>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          КОЛОСКОВ.РФ
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Персональная коллекция заметок, аналитики и концепций в области финтех и продуктовой разработки.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="secondary" className="gap-1.5 py-1 px-3">
            <Folder className="h-3.5 w-3.5" />
            {manifest.sections.length} разделов
          </Badge>
          <Badge variant="secondary" className="gap-1.5 py-1 px-3">
            <FileText className="h-3.5 w-3.5" />
            {totalNotes} заметок
          </Badge>
        </div>
      </div>

      {/* Sections list */}
      <div className="flex flex-col gap-2">
        {manifest.sections.map((section, idx) => {
          const color = SECTION_COLORS[idx] ?? SECTION_COLORS[0]

          return (
            <Link
              key={section.slug}
              to={`/${section.slug}`}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border bg-card hover:bg-accent/60 transition-colors group"
            >
              <Folder className={`h-5 w-5 shrink-0 ${color}`} />
              <span className="flex-1 text-sm font-medium text-foreground leading-snug">
                {section.name}
              </span>
              <span className="text-sm text-muted-foreground tabular-nums shrink-0">
                {section.fileCount}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
