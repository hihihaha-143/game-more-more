import { useState, useEffect } from 'react'
import { achievementsConfig } from '../data/achievementsConfig.js'
import { getAchievements } from '../lib/dbHelpers.js'
import { Trophy, Gamepad2, Lock, CheckCircle2 } from 'lucide-react' // Иконки
import styles from './Achievements.module.scss'

// Мапа для рендера иконок по строковому имени из конфига
const iconMap = {
  Trophy,
  Gamepad2,
}

export default function Achievements() {
  const [unlockedIds, setUnlockedIds] = useState([])

  useEffect(() => {
    // Загружаем из Dexie список полученных достижений
    const fetchAchievements = async () => {
      const unlocked = await getAchievements()
      setUnlockedIds(unlocked.map((a) => a.achievementId))
    }
    fetchAchievements()
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мои достижения</h1>
      
      <div className={styles.list}>
        {achievementsConfig.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id)
          const IconComponent = iconMap[achievement.iconName] || Trophy

          return (
            <div 
              key={achievement.id} 
              className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked}`}
            >
              <div className={styles.iconWrapper}>
                <IconComponent size={32} color={isUnlocked ? '#f75d31' : '#ccc'} />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{achievement.title}</h3>
                <p className={styles.cardDesc}>{achievement.description}</p>
              </div>

              <div className={styles.status}>
                {isUnlocked ? (
                  <CheckCircle2 size={24} color="#28a745" title="Получено" />
                ) : (
                  <Lock size={24} color="#ccc" title="Заблокировано" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
