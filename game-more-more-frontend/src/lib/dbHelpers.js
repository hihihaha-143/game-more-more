import { db } from './db.js'

// ========== PROFILE ==========

/**
 * Получить профиль или создать новый, если его нет.
 * Привязан к uuid устройства (генерируется один раз и хранится в profile).
 */
export async function getOrCreateProfile() {
  const existing = await db.profile.orderBy('id').first()
  if (existing) return existing

  const uuid = crypto.randomUUID()
  const profile = {
    uuid,
    nickname: 'Игрок',
    createdAt: new Date().toISOString(),
  }
  const id = await db.profile.add(profile)
  return { id, ...profile }
}

/**
 * Обновить поля профиля.
 */
export async function updateProfile(partial) {
  const profile = await getOrCreateProfile()
  await db.profile.update(profile.id, partial)
  return { ...profile, ...partial }
}

// ========== PROGRESS ==========

/**
 * Получить прогресс по игре (gameSlug).
 * Если записи нет — вернуть null.
 */
export async function getProgress(gameSlug) {
  return db.progress.where('gameSlug').equals(gameSlug).first()
}

/**
 * Сохранить (обновить/создать) прогресс по игре.
 * Поля: gameSlug, level, bestScore.
 */
export async function saveProgress(gameSlug, { level, bestScore }) {
  const existing = await getProgress(gameSlug)
  const now = new Date().toISOString()

  if (existing) {
    await db.progress.update(existing.id, {
      level: level ?? existing.level,
      bestScore:
        bestScore !== undefined
          ? Math.max(bestScore, existing.bestScore ?? 0)
          : existing.bestScore,
      updatedAt: now,
    })
    return { ...existing, level, bestScore, updatedAt: now }
  }

  const record = {
    gameSlug,
    level: level ?? 1,
    bestScore: bestScore ?? 0,
    updatedAt: now,
  }
  const id = await db.progress.add(record)
  return { id, ...record }
}

// ========== ACHIEVEMENTS ==========

/**
 * Получить все полученные достижения.
 */
export async function getAchievements() {
  return db.achievements.toArray()
}

/**
 * Разблокировать достижение (если ещё не разблокировано).
 * Возвращает true, если достижение было новым.
 */
export async function unlockAchievement(achievementId, gameSlug = null) {
  const existing = await db.achievements
    .where('achievementId')
    .equals(achievementId)
    .first()

  if (existing) return false

  await db.achievements.add({
    achievementId,
    gameSlug,
    unlockedAt: new Date().toISOString(),
  })
  return true
}

// ========== STATS (ключ-значение) ==========

/**
 * Инкрементировать счётчик по ключу (например, 'gamesPlayed').
 */
export async function incrementStat(key, amount = 1) {
  const existing = await db.stats.where('key').equals(key).first()
  if (existing) {
    await db.stats.update(existing.id, { value: (existing.value ?? 0) + amount })
  } else {
    await db.stats.add({ key, value: amount })
  }
}

/**
 * Получить значение счётчика (или 0).
 */
export async function getStat(key) {
  const record = await db.stats.where('key').equals(key).first()
  return record?.value ?? 0
}
