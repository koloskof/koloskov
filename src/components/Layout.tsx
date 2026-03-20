import { Link, useLocation } from 'react-router-dom'
import { BookOpen, ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface LayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export function Layout({ children, breadcrumbs }: LayoutProps) {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-[680px] px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity shrink-0"
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline">Koloskov</span>
          </Link>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              <nav className="flex items-center gap-1 text-sm overflow-x-auto">
                {!isHome && (
                  <>
                    <Link
                      to="/"
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0 flex items-center gap-1"
                    >
                      <Home className="h-3.5 w-3.5" />
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </>
                )}
                {breadcrumbs.map((item, i) => (
                  <span key={i} className="flex items-center gap-1 shrink-0">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={cn(
                          'transition-colors hover:text-foreground',
                          i === breadcrumbs.length - 1
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          i === breadcrumbs.length - 1
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                    {i < breadcrumbs.length - 1 && (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </nav>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-[680px] px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
