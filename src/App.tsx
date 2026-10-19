import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { branches, type BranchId } from './data/bunandsum'
import { BranchProvider, useBranch } from './state/BranchContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Branches } from './pages/Branches'
import { Story } from './pages/Story'

// #/at/hackney picks that branch and lands on the home page: handy for per-branch QR codes.
function At() {
  const { id } = useParams()
  const { choose } = useBranch()
  const valid = branches.some((b) => b.id === id)
  useEffect(() => {
    if (valid) choose(id as BranchId)
  }, [valid, id, choose])
  return <Navigate to="/" replace />
}

export function App() {
  return (
    <HashRouter>
      <BranchProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/story" element={<Story />} />
            <Route path="/at/:id" element={<At />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BranchProvider>
    </HashRouter>
  )
}
