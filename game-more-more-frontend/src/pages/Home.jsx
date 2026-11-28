import { Link } from 'react-router-dom'
import { games } from '../games/registry.js'
import { Gamepad2 } from 'lucide-react'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Выбери игру</h1>
      
      <div className={styles.grid}>
        {games.map((game) => (
          <Link key={game.slug} to={game.route} className={styles.card}>
            <div className={styles.iconWrapper}>
              {game.icon ? <img src={game.icon} alt={game.title} /> : <Gamepad2 size={48} color="#f75d31" />}
            </div>
            <h2 className={styles.cardTitle}>{game.title}</h2>
            <p className={styles.cardDesc}>{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
