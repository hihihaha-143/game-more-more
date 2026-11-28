import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Achievements from './pages/Achievements.jsx'
import NotFound from './pages/NotFound.jsx'
import MemoryGame from './games/memory/MemoryGame.jsx'
import TrollClicker from './games/troll-clicker/TrollClicker.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'games/memory', element: <MemoryGame /> },
      { path: 'games/troll-clicker', element: <TrollClicker /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
