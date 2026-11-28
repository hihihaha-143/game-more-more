import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { levels } from './data/levels.js'
import { saveProgress, unlockAchievement } from '../../lib/dbHelpers.js'
import styles from './MemoryGame.module.scss'

export default function MemoryGame() {
  const [cards] = useState(() => {
    const level = levels[0]
    return [...level.cards].sort(() => Math.random() - 0.5)
  })
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [newAchievement, setNewAchievement] = useState(null)

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(cards[index].id) || flipped.length === 2) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      const [firstIdx, secondIdx] = newFlipped
      const firstCard = cards[firstIdx]
      const secondCard = cards[secondIdx]

      if (firstCard.pairId === secondCard.pairId) {
        setMatched((prev) => [...prev, firstCard.id, secondCard.id])
        setFlipped([])
      } else {
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const isGameWon = matched.length === cards.length && cards.length > 0

  useEffect(() => {
    if (!isGameWon) return

    const saveResult = async () => {
      await saveProgress('memory', { bestScore: moves })
      const isNew = await unlockAchievement('memory-first-win', 'memory')
      
      if (isNew) {
        setNewAchievement('Первая победа в «Найди пару»!')
        setTimeout(() => setNewAchievement(null), 3000)
      }
    }

    saveResult()
  }, [isGameWon, moves])

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <h2>Найди пару</h2>
        <p>Ходов: {moves}</p>
        
        {newAchievement && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.achievementToast}
          >
            🏆 {newAchievement}
          </motion.div>
        )}

        {isGameWon && (
          <motion.p 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            style={{ color: 'green', fontWeight: 'bold', fontSize: '24px', marginTop: '10px' }}
          >
            Победа! 🎉
          </motion.p>
        )}
      </div>

      <div className={styles.board}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index)
          const isMatched = matched.includes(card.id)

          return (
            <motion.div
              key={index}
              className={`${styles.card} ${isMatched ? styles.matched : ''}`}
              onClick={() => handleCardClick(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                className={styles.cardInner}
                initial={false}
                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className={styles.cardFront}>?</div>
                <div className={styles.cardBack}>{card.content}</div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
