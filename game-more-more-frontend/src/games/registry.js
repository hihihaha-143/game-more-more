import { gameConfig as memoryConfig } from './memory/gameConfig.js'

// Реестр всех игр проекта.
// Чтобы добавить новую игру:
// 1. Создай папку src/games/<slug>/ с gameConfig.js
// 2. Импортируй её сюда и добавь в массив games.
// Всё остальное (список на главной, роутинг) подхватится автоматически.

export const games = [
  memoryConfig,
  // сюда будем добавлять новые игры
]
