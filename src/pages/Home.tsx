import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Folder, ArrowRight } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { loadManifest } from '@/lib/content'
import type { Manifest } from '@/lib/types'

// Section icons & colors for visual variety
const SECTION_STYLES: Record<number, { color: string; bg: string }> = {
  0: { color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  1: { color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-950/30' },
  2: { color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  3: { color: 'text-amber-600',  bg: 'bg-amber-50 dark:bg-amber-950/30' },
  4: { color: 'text-rose-600',   bg: 'bg-rose-50 dark:bg-rose-950/30' },
  5: { color: 'text-teal-600',   bg: 'bg-teal-50 dark:bg-teal-950/30' },
  6: { color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  7: { color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  8: { color: 'text-cyan-600',   bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
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
          База знаний
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

      {/* Sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {manifest.sections.map((section, idx) => {
          const style = SECTION_STYLES[idx] ?? SECTION_STYLES[0]
          const hasSubfolders = section.subfolders.length > 0

          return (
            <Link key={section.slug} to={`/${section.slug}`} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-border/80 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center mb-3`}>
                    <Folder className={`h-5 w-5 ${style.color}`} />
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                    {section.name}
                  </CardTitle>
                  {hasSubfolders && (
                    <CardDescription className="text-xs">
                      {section.subfolders.length} подразделов
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {section.fileCount} {section.fileCount === 1 ? 'заметка' :
                        section.fileCount < 5 ? 'заметки' : 'заметок'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
