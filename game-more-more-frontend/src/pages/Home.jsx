import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page-home">
      <h1>Game More More</h1>
      <p>Здесь скоро будут игры.</p>
      <Link to="/unknown">Проверить 404 →</Link>
    </div>
  )
}
