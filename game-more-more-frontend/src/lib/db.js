import Dexie from 'dexie'

// === Схема БД ===
// Хранилища:
//   profile   — данные игрока (ник, uuid устройства, настройки)
//   progress  — прогресс по играм (по одной записи на игру)
//   achievements — полученные достижения
//   stats     — общая статистика (сыграно, время и т.п.)

export const db = new Dexie('GameMoreMoreDB')

db.version(1).stores({
  profile: '++id, uuid, nickname, createdAt',
  progress: '++id, gameSlug, level, bestScore, updatedAt',
  achievements: '++id, achievementId, gameSlug, unlockedAt',
  stats: '++id, key, value',
})
