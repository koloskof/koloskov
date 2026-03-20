import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { SectionPage } from '@/pages/SectionPage'
import { NotePage } from '@/pages/NotePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:section" element={<SectionPage />} />
        <Route path="/:section/*" element={<NotePage />} />
      </Routes>
    </HashRouter>
  )
}
