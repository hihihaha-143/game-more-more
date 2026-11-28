import { Outlet, Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'
import styles from './Layout.module.scss'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftNav}>
            {!isHome && (
              <Link to="/" className={styles.backLink}>
                <ArrowLeft size={20} />
                <span>В меню</span>
              </Link>
            )}
            <Link to="/" className={styles.logo}>
              <h1>Game More More</h1>
            </Link>
          </div>

          <div className={styles.rightNav}>
            <Link to="/achievements" className={styles.iconLink} title="Достижения">
              <Trophy size={24} />
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Game More More</p>
        </div>
      </footer>
    </div>
  )
}
