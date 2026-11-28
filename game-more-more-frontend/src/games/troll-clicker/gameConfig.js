export const TARGET_CLICKS = 1000

// Временно 5, чтобы можно было быстро проверить все издевательства.
// Для релиза достаточно поменять на 15 или 20.
export const EVENT_FREQUENCY = 5

export const DEFAULT_MESSAGE = 'Ну давай. Один клик. Что ты теряешь?'

export const REPEAT_VISIT_MESSAGE =
  'а ты думал мне хочется твой прогресс запоминать? наивныыый'

export const FINAL_MESSAGE =
  'вау... тебе настолько заняться нечем, да? ну... хз, иди... траву потрогай, что ли'

export const AMNESIA_RECALL_MESSAGE = (clicks) =>
  `о, я вспомнил ты остановился на ${clicks}. начинаем от сюда`

export const gameConfig = {
  slug: 'troll-clicker',
  title: 'Кликер-Тролль',
  description: 'Нажми 1000 раз. Игра обязательно тебя отблагодарит. Наверное.',
  route: '/games/troll-clicker',
  icon: null,
}
