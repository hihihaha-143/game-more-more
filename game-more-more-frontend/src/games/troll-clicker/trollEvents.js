// 200 сценариев-издевательств.
// Сценарий — это ДЕЙСТВИЕ (кнопка убежала, счётчик обнулился, экран затрясло),
// а не фраза. Текст для чёрной плашки живёт отдельно, в phrases.js.
//
// caption — короткая подпись события. Она не подменяет случайную фразу игрока.
// У каждого сценария уникальный id, поэтому мешок событий не повторяет их,
// пока не будут показаны все 200.

const scenario = (id, kind, caption, extra = {}) => ({ id, kind, caption, ...extra })

export const trollEvents = [
  // ============================================================
  // 1–15. Текстовые издевательства: событие есть, эффекта нет
  // ============================================================
  scenario('text-01', 'text', 'новая фраза! старая мне надоела', { duration: 2200 }),
  scenario('text-02', 'text', 'ты серьёзно?', { duration: 1600 }),
  scenario('text-03', 'text', 'а вот теперь ничего не произошло', { duration: 2400 }),
  scenario('text-04', 'text', 'представь, что тут был эффект', { duration: 2600 }),
  scenario('text-05', 'text', 'я забыл, что хотел сделать', { duration: 2000 }),
  scenario('text-06', 'text', 'сюрприз! его нет', { duration: 1800 }),
  scenario('text-07', 'text', 'этот клик был лишним', { duration: 2100 }),
  scenario('text-08', 'text', 'сейчас будет что-то эпичное... наверное', { duration: 2800 }),
  scenario('text-09', 'text', 'нет, это не баг. это издевательство', { duration: 2400 }),
  scenario('text-10', 'text', 'подумай о своей жизни', { duration: 3000 }),
  scenario('text-11', 'text', 'кнопка передаёт тебе привет. и всё', { duration: 2300 }),
  scenario('text-12', 'text', 'твой прогресс в надёжных руках. шутка', { duration: 2500 }),
  scenario('text-13', 'text', 'спецэффекты закончились. остались только клики', { duration: 2700 }),
  scenario('text-14', 'text', 'я тут просто напомню, что ты кликаешь', { duration: 2200 }),
  scenario('text-15', 'text', 'ничего. абсолютно ничего.', { duration: 1900 }),

  // ============================================================
  // 16–50. Анимации и изменения внешнего вида кнопки (35)
  // ============================================================
  scenario('anim-01', 'animate', 'танцууееем', { animation: 'shake', duration: 900 }),
  scenario('anim-02', 'animate', 'кнопка в панике', { animation: 'shake', duration: 1800 }),
  scenario('anim-03', 'animate', 'микротряска. почти незаметно', { animation: 'shake', duration: 400 }),
  scenario('anim-04', 'animate', 'ой, меня качает', { animation: 'wobble', duration: 1400 }),
  scenario('anim-05', 'animate', 'голова кругом', { animation: 'spin', duration: 1200 }),
  scenario('anim-06', 'animate', 'вращение. просто потому что', { animation: 'spin', duration: 2400, visual: { scale: 1.1 } }),
  scenario('anim-07', 'animate', 'я мячик', { animation: 'bounce', duration: 1000 }),
  scenario('anim-08', 'animate', 'прыг-скок, прыг-скок', { animation: 'bounce', duration: 2200 }),
  scenario('anim-09', 'animate', 'я дышу', { animation: 'pulse', duration: 1800 }),
  scenario('anim-10', 'animate', 'сердцебиение кнопки', { animation: 'pulse', duration: 2600, visual: { scale: 1.08 } }),
  scenario('anim-11', 'animate', 'я из желе', { animation: 'jelly', duration: 1600 }),
  scenario('anim-12', 'animate', 'маятник', { animation: 'swing', duration: 2000 }),
  scenario('anim-13', 'animate', 'я перевернулся', { animation: 'flip', duration: 1200 }),
  scenario('anim-14', 'animate', 'посмотри на меня с другой стороны', { animation: 'flip', duration: 2400, visual: { rotate: 180 } }),
  scenario('anim-15', 'animate', 'ошибка визуализации', { animation: 'glitch', duration: 1000 }),
  scenario('anim-16', 'animate', 'кнопка сломалась. красиво', { animation: 'glitch', duration: 1800, visual: { hue: 120, saturate: 3 } }),
  scenario('anim-17', 'animate', 'лечу', { animation: 'float', duration: 2400 }),
  scenario('anim-18', 'animate', 'невесомость', { animation: 'float', duration: 3200, visual: { rotate: 12 } }),
  scenario('anim-19', 'animate', 'мне холодно', { animation: 'tremble', duration: 1600, visual: { opacity: 0.7 } }),
  scenario('anim-20', 'animate', 'обнимаю себя', { animation: 'squeeze', duration: 1400 }),
  scenario('anim-21', 'animate', 'я таю', { animation: 'melt', duration: 2600, visual: { scaleY: 0.7 } }),
  scenario('anim-22', 'animate', 'карусель', { animation: 'spiral', duration: 2200 }),
  scenario('anim-23', 'animate', 'вибрация. не спрашивай', { animation: 'vibrate', duration: 1800 }),
  scenario('anim-24', 'animate', 'я вырос', { animation: 'pulse', duration: 1600, visual: { scale: 1.8 } }),
  scenario('anim-25', 'animate', 'а теперь я маленький', { animation: 'pulse', duration: 1600, visual: { scale: 0.35 } }),
  scenario('anim-26', 'animate', 'я большой. очень', { animation: 'bounce', duration: 2000, visual: { scale: 2.2 } }),
  scenario('anim-27', 'animate', 'почти не видно', { animation: 'tremble', duration: 2200, visual: { scale: 0.15 } }),
  scenario('anim-28', 'animate', 'наклон. для стиля', { animation: 'swing', duration: 1800, visual: { rotate: -25, scale: 1.2 } }),
  scenario('anim-29', 'animate', 'вверх ногами', { animation: 'wobble', duration: 2200, visual: { rotate: 180 } }),
  scenario('anim-30', 'animate', 'зеркало', { animation: 'pulse', duration: 1800, visual: { scaleX: -1 } }),
  scenario('anim-31', 'animate', 'я призрак', { animation: 'float', duration: 2600, visual: { opacity: 0.15 } }),
  scenario('anim-32', 'animate', 'радуга. против твоей воли', { animation: 'spin', duration: 2400, visual: { hue: 180, saturate: 3 } }),
  scenario('anim-33', 'animate', 'размытие', { animation: 'wobble', duration: 2000, visual: { blur: 4 } }),
  scenario('anim-34', 'animate', 'контраст', { animation: 'glitch', duration: 1500, visual: { contrast: 3 } }),
  scenario('anim-35', 'animate', 'кнопка кричит', { animation: 'shake', duration: 1400, visual: { fontSize: '52px', scale: 1.3 } }),

  // ============================================================
  // 51–58. Исчезновение кнопки (8)
  // ============================================================
  scenario('hide-01', 'hide', 'мне скучно... я пошёл'),
  scenario('hide-02', 'hide', 'кнопка ушла за хлебом'),
  scenario('hide-03', 'hide', 'её нет дома'),
  scenario('hide-04', 'hide', 'я в отпуске. нажми в пустоту'),
  scenario('hide-05', 'hide', 'кнопка спряталась. найди'),
  scenario('hide-06', 'hide', 'считай до трёх. я вернусь'),
  scenario('hide-07', 'hide', 'а ты без меня не справишься?'),
  scenario('hide-08', 'hide', 'ку-ку. я тут была'),

  // ============================================================
  // 59–73. Перемещение и побег от курсора (15)
  // ============================================================
  scenario('move-01', 'move', 'я вправо', { offset: { x: 150, y: -60 }, duration: 2200 }),
  scenario('move-02', 'move', 'я влево. и немного вверх', { offset: { x: -140, y: -80 }, duration: 2200 }),
  scenario('move-03', 'move', 'я вниз', { offset: { x: 0, y: 110 }, duration: 2000 }),
  scenario('move-04', 'move', 'догоняй', { offset: { x: 200, y: 90 }, duration: 2600 }),
  scenario('move-05', 'move', 'кнопка передумала стоять здесь', { offset: { x: -200, y: 20 }, duration: 2400 }),
  scenario('move-06', 'move', 'ой, я случайно', { offset: { x: 80, y: -120 }, duration: 1800 }),
  scenario('move-07', 'move', 'тебе придётся тянуться', { offset: { x: -80, y: 130 }, duration: 2600 }),
  scenario('move-08', 'move', 'я тут. нет, тут', { offset: { x: 220, y: -30 }, duration: 2000 }),
  scenario('move-09', 'move', 'кнопка устала от центра', { offset: { x: -220, y: 100 }, duration: 2400 }),
  scenario('move-10', 'move', 'небольшой сдвиг. для настроения', { offset: { x: 30, y: 80 }, duration: 1600 }),
  scenario('flee-01', 'flee', 'поймай меня!', { duration: 4500 }),
  scenario('flee-02', 'flee', 'не трогай меня', { duration: 5000 }),
  scenario('flee-03', 'flee', 'я боюсь щекотки', { duration: 3800 }),
  scenario('flee-04', 'flee', 'кнопки тоже хотят личного пространства', { duration: 5200 }),
  scenario('flee-05', 'flee', 'убегаю от ответственности', { duration: 4600 }),

  // ============================================================
  // 74–98. Счётчик: амнезия, кражи, подарки, реверс, скорость (25)
  // ============================================================
  scenario('amnesia-01', 'amnesia', 'ой, я забыл чот, давай сначала?'),
  scenario('amnesia-02', 'amnesia', 'где я? кто ты? сколько кликов?'),
  scenario('amnesia-03', 'amnesia', 'а что если обнулиться?'),
  scenario('amnesia-04', 'amnesia', 'память подвела'),
  scenario('amnesia-05', 'amnesia', 'я всё забыл. кроме своего превосходства'),
  scenario('amnesia-06', 'amnesia', 'начнём с чистого листа'),
  scenario('steal-01', 'steal', 'минус пять. зато бесплатно', { amount: 5, duration: 1800 }),
  scenario('steal-02', 'steal', 'налог на клики', { amount: 13, duration: 2000 }),
  scenario('steal-03', 'steal', 'инфляция', { amount: 27, duration: 2000 }),
  scenario('steal-04', 'steal', 'я забрал половину сотни', { amount: 50, duration: 2200 }),
  scenario('steal-05', 'steal', 'спасибо за сотню', { amount: 100, duration: 2400 }),
  scenario('steal-06', 'steal', 'одолжил один. не верну', { amount: 1, duration: 1600 }),
  scenario('steal-07', 'steal', 'комиссия за издевательство', { amount: 20, duration: 2000 }),
  scenario('steal-08', 'steal', 'не спрашивай, куда', { amount: 45, duration: 2200 }),
  scenario('bonus-01', 'bonus', 'держи три клика. я сегодня добрый', { amount: 3, duration: 1800 }),
  scenario('bonus-02', 'bonus', 'мне тебя жалко. вот десять', { amount: 10, duration: 2200 }),
  scenario('bonus-03', 'bonus', 'процент от сделки. сделки нет', { amount: 5, duration: 1800 }),
  scenario('bonus-04', 'bonus', 'подарок. не благодари', { amount: 1, duration: 1500 }),
  scenario('reverse-01', 'reverse', 'нажми, а я отниму', { remaining: 3, duration: 6000 }),
  scenario('reverse-02', 'reverse', 'обратный отсчёт', { remaining: 5, duration: 7000 }),
  scenario('reverse-03', 'reverse', 'регресс', { remaining: 8, duration: 9000 }),
  scenario('reverse-04', 'reverse', 'работаем назад', { remaining: 10, duration: 10000 }),
  scenario('speed-01', 'speed', 'ускоряемся. считается как два', { gain: 2, duration: 3000 }),
  scenario('speed-02', 'speed', 'турборежим. не спрашивай зачем', { gain: 3, duration: 2500 }),
  scenario('slow-01', 'slow', 'я устал, давай медленнее', { gain: 0, duration: 2500 }),

  // ============================================================
  // 99–118. Паузы, поломки и подмена надписи (20)
  // ============================================================
  scenario('pause-01', 'pause', 'подожди', { duration: 1000 }),
  scenario('pause-02', 'pause', 'кнопка отдыхает', { duration: 2500 }),
  scenario('pause-03', 'pause', 'перерыв на траур', { duration: 4000 }),
  scenario('pause-04', 'pause', 'мгновенная пауза. почти', { duration: 500 }),
  scenario('pause-05', 'pause', 'игра окончена. спасибо за участие', { duration: 3000 }),
  scenario('pause-06', 'pause', 'не сейчас', { duration: 1500 }),
  scenario('pause-07', 'pause', 'я подумаю, стоит ли считать твой клик', { duration: 5000 }),
  scenario('broken-01', 'broken', 'кнопка не найдена. попробуйте позже', { duration: 2000 }),
  scenario('broken-02', 'broken', 'ошибка 404: смысл не найден', { duration: 1500 }),
  scenario('broken-03', 'broken', 'сломалась. сама', { duration: 2500 }),
  scenario('broken-04', 'broken', 'не нажимается. и не проси', { duration: 1000 }),
  scenario('broken-05', 'broken', 'технические работы. навсегда', { duration: 3000 }),
  scenario('label-01', 'label', 'кнопка сменила имя', { label: 'НЕ КЛИК', duration: 3000 }),
  scenario('label-02', 'label', 'и вот теперь точно не нажимай', { label: 'НЕ НАЖИМАЙ', duration: 2500 }),
  scenario('label-03', 'label', 'проверка на слабо', { label: 'СЛАБО?', duration: 3000 }),
  scenario('label-04', 'label', 'теперь можно', { label: 'МОЖНО', duration: 2000 }),
  scenario('label-05', 'label', 'сама скромность', { label: 'ХВАТИТ', duration: 2800 }),
  scenario('label-06', 'label', 'ненасытность', { label: 'ЕЩЁ', duration: 2400 }),
  scenario('label-07', 'label', 'кнопка даёт советы', { label: 'ПОТРОГАЙ ТРАВУ', duration: 3500 }),
  scenario('label-08', 'label', 'почти. не почти', { label: '1000', duration: 2400 }),

  // ============================================================
  // 119–148. Модальные окна и ложные концовки (30)
  // ============================================================
  scenario('modal-01', 'modal', 'игра решила с тобой поговорить', {
    overlay: { title: 'Уведомление', text: 'Вы уверены, что хотите продолжать?', action: 'Нет' },
  }),
  scenario('modal-02', 'modal', 'важное уведомление без важности', {
    overlay: { title: 'Важно', text: 'Ваш прогресс не сохранён и не будет.', action: 'Смириться' },
  }),
  scenario('modal-03', 'modal', 'философский вопрос', {
    overlay: { title: 'Вопрос', text: 'Сколько кликов осталось до счастья?', action: 'Неизвестно' },
  }),
  scenario('modal-04', 'modal', 'игра проявляет заботу', {
    overlay: { title: 'Напоминание', text: 'Вы недавно кликали. Может, хватит?', action: 'Нет' },
  }),
  scenario('modal-05', 'modal', 'подтверждение продуктивности', {
    overlay: { title: 'Подтверждение', text: 'Удалить всю свою продуктивность?', action: 'Да' },
  }),
  scenario('modal-06', 'modal', 'совет дня. не самый полезный', {
    overlay: { title: 'Совет дня', text: 'Иногда лучший клик — не кликать.', action: 'Кликать' },
  }),
  scenario('modal-07', 'modal', 'пользователь не найден', {
    overlay: { title: 'Ошибка пользователя', text: 'Пользователь не найден. Нажмите, чтобы продолжить.', action: 'Найти себя' },
  }),
  scenario('modal-08', 'modal', 'донат на ноль рублей', {
    overlay: { title: 'Донат', text: 'На развитие игры: 0 ₽. Спасибо за поддержку!', action: 'Забрать ноль' },
  }),
  scenario('win-01', 'fakeWin', 'ложная победа. классика', {
    overlay: { title: 'ВСЁ!', text: 'Ты победил! ...шутка.', action: 'не смешно' },
  }),
  scenario('win-02', 'fakeWin', 'демоверсия победы', {
    overlay: { title: 'ПОБЕДА', text: '1000 кликов! А, нет, это была демоверсия.', action: 'закрыть' },
  }),
  scenario('win-03', 'fakeWin', 'следующий уровень: трава', {
    overlay: { title: 'УРОВЕНЬ ПРОЙДЕН', text: 'Следующий уровень: трава.', action: 'выйти в сад' },
  }),
  scenario('win-04', 'fakeWin', 'достижение на ноль очков', {
    overlay: { title: 'ДОСТИЖЕНИЕ', text: '«Нажал кнопку». +0 очков.', action: 'гордиться' },
  }),
  scenario('win-05', 'fakeWin', 'конец, которого не было', {
    overlay: { title: 'КОНЕЦ', text: 'Игра окончена. Ты всё ещё здесь?', action: 'уйти' },
  }),
  scenario('error-01', 'fakeError', 'кнопка перегрелась', {
    overlay: { title: 'ОШИБКА 1000', text: 'Слишком много кликов. Кнопка перегрелась.', action: 'остудить' },
  }),
  scenario('error-02', 'fakeError', 'смысл не найден', {
    overlay: { title: 'ОШИБКА 404', text: 'Смысл не найден.', action: 'жить дальше' },
  }),
  scenario('error-03', 'fakeError', 'прогресс удалён. или нет', {
    overlay: { title: 'КРИТИЧЕСКАЯ ОШИБКА', text: 'Прогресс удалён. Шутка. Или нет.', action: 'проверить' },
  }),
  scenario('error-04', 'fakeError', 'пользователь слишком усерден', {
    overlay: { title: 'СБОЙ', text: 'Пользователь кликает слишком усердно.', action: 'продолжить' },
  }),
  scenario('error-05', 'fakeError', 'не хватило памяти на старания', {
    overlay: { title: 'ОШИБКА ПАМЯТИ', text: 'Недостаточно памяти, чтобы запомнить твои старания.', action: 'ок' },
  }),
  scenario('ad-01', 'ad', 'реклама травы. бесплатно', {
    overlay: { title: 'РЕКЛАМА', text: 'Трава рядом с вами. Потрогать за 0 ₽.', action: 'закрыть рекламу' },
  }),
  scenario('ad-02', 'ad', 'реклама курса', {
    overlay: { title: 'РЕКЛАМА 2/5', text: 'Купи курс «Как перестать кликать». Первый урок бесплатно.', action: 'пропустить' },
  }),
  scenario('ad-03', 'ad', 'спонсор пустоты', {
    overlay: { title: 'СПОНСОР', text: 'Кнопка спонсируется компанией «Ничего».', action: 'спасибо, нет' },
  }),
  scenario('ad-04', 'ad', 'скидка на страдания', {
    overlay: { title: 'ТОЛЬКО СЕГОДНЯ', text: 'Скидка 100% на ещё 1000 кликов!', action: 'отказаться' },
  }),
  scenario('permission-01', 'permission', 'разрешение на издевательства', {
    overlay: { title: 'Разрешение', text: 'Разрешить игре издеваться над вами?', action: 'Разрешить', secondary: 'Разрешить' },
  }),
  scenario('permission-02', 'permission', 'доступ к памяти. которого не будет', {
    overlay: { title: 'Доступ к памяти', text: 'Игра хочет забыть ваш прогресс. Разрешить?', action: 'Разрешить', secondary: 'Разрешить' },
  }),
  scenario('permission-03', 'permission', 'уведомления о траве', {
    overlay: { title: 'Уведомления', text: 'Присылать вам напоминания о траве?', action: 'Да', secondary: 'Позже' },
  }),
  scenario('permission-04', 'permission', 'геолокация травы', {
    overlay: { title: 'Геолокация', text: 'Мы видим, что вы далеко от травы.', action: 'Понятно', secondary: 'Не понятно' },
  }),
  scenario('update-01', 'update', 'обновление, которого никто не просил', {
    overlay: { title: 'Обновление 0.0.1', text: 'Добавлена трава. Удалён смысл.', action: 'обновить' },
    duration: 2800,
  }),
  scenario('update-02', 'update', 'скачиваем клики обратно', {
    overlay: { title: 'Загрузка...', text: 'Скачиваем 1000 кликов обратно.', action: 'подождать' },
    duration: 3200,
  }),
  scenario('update-03', 'update', 'оптимизация прогресса', {
    overlay: { title: 'Оптимизация', text: 'Убираем лишние клики из вашего прогресса.', action: 'отмена' },
    duration: 2600,
  }),
  scenario('update-04', 'update', 'новая версия, менее удобная', {
    overlay: { title: 'Новая версия', text: 'Теперь кнопка на 3% менее удобная.', action: 'установить' },
    duration: 3000,
  }),

  // ============================================================
  // 149–178. Экран, эффекты и атмосфера (30)
  // ============================================================
  scenario('screen-01', 'screenShake', 'землетрясение на один балл', { duration: 1000 }),
  scenario('screen-02', 'screenShake', 'кнопка вызвала землетрясение', { duration: 2500 }),
  scenario('screen-03', 'screenShake', 'микротряска. почти уютно', { duration: 400 }),
  scenario('screen-04', 'screenShake', 'трясём всё, кроме прогресса', { duration: 3500 }),
  scenario('screen-05', 'screenShake', 'сейсмостойкость не гарантируется', { duration: 1800 }),
  scenario('flash-01', 'flash', 'вспышка!', { duration: 500, color: '#fded0d' }),
  scenario('flash-02', 'flash', 'фото на память', { duration: 800, color: '#ffffff' }),
  scenario('flash-03', 'flash', 'ой', { duration: 300, color: '#f75d31' }),
  scenario('flash-04', 'flash', 'свет выключили', { duration: 1400, color: '#000000' }),
  scenario('spotlight-01', 'spotlight', 'свет только на кнопку', { duration: 2500 }),
  scenario('spotlight-02', 'spotlight', 'кнопка в центре внимания', { duration: 4000 }),
  scenario('spotlight-03', 'spotlight', 'неловкая тишина', { duration: 1800 }),
  scenario('countdown-01', 'countdown', 'приготовься', { duration: 3000, overlayText: '3... 2... 1...' }),
  scenario('countdown-02', 'countdown', 'обратный отсчёт до ничего', { duration: 5000, overlayText: '10... 9... 8...' }),
  scenario('countdown-03', 'countdown', 'сейчас что-то будет', { duration: 2500, overlayText: 'СЕЙЧАС ЧТО-ТО БУДЕТ' }),
  scenario('countdown-04', 'countdown', 'ноль', { duration: 2000, overlayText: '0' }),
  scenario('ticker-01', 'ticker', 'срочные новости', { duration: 4000, tickerText: 'СРОЧНО: кнопка всё ещё не сохраняет прогресс' }),
  scenario('ticker-02', 'ticker', 'прогноз погоды', { duration: 6000, tickerText: 'ПОГОДА: в игре без изменений. Трава: на улице.' }),
  scenario('ticker-03', 'ticker', 'курс клика', { duration: 3500, tickerText: 'КУРС КЛИКА: 1 клик = 0 смысла' }),
  scenario('ticker-04', 'ticker', 'научное открытие', { duration: 5000, tickerText: 'НОВОСТИ: учёные выяснили, зачем вы это делаете. Шутка.' }),
  scenario('rain-01', 'rain', 'трава с неба. потрогай хотя бы так', { duration: 3500, emoji: '🌿' }),
  scenario('rain-02', 'rain', 'кузнечики. тоже природа', { duration: 3000, emoji: '🦗' }),
  scenario('rain-03', 'rain', 'деньги, которых нет', { duration: 4000, emoji: '💸' }),
  scenario('rain-04', 'rain', 'мозги падают. лови', { duration: 3500, emoji: '🧠' }),
  scenario('confetti-01', 'confetti', 'конфетти за просто так', { duration: 3000 }),
  scenario('confetti-02', 'confetti', 'праздник без повода', { duration: 5000 }),
  scenario('confetti-03', 'confetti', 'салют в честь твоей настойчивости', { duration: 2500 }),
  scenario('hint-01', 'hint', 'подсказка: кнопка находится там, куда ты нажимаешь', { duration: 3500, hintText: 'СОВЕТ: нажми на кнопку' }),
  scenario('hint-02', 'hint', 'нажми на кнопку, чтобы нажать на кнопку', { duration: 5000, hintText: 'СОВЕТ: это всё ещё кнопка' }),
  scenario('cursor-01', 'cursor', 'ты не один. тут ещё курсоры', { duration: 4000 }),

  // ============================================================
  // 179–200. Обманки, клоны и враньё в счётчике (22)
  // ============================================================
  scenario('decoys-01', 'decoys', 'нас двое, выбери правильную', { count: 2, duration: 3200 }),
  scenario('decoys-02', 'decoys', 'кнопка размножилась', { count: 3, duration: 3400 }),
  scenario('decoys-03', 'decoys', 'найди настоящую', { count: 5, duration: 3800 }),
  scenario('decoys-04', 'decoys', 'одна из них не считает', { count: 4, duration: 3600 }),
  scenario('decoys-05', 'decoys', 'удачи', { count: 6, duration: 4000 }),
  scenario('decoys-06', 'decoys', 'кнопки-обманки. классика', { count: 3, duration: 3000 }),
  scenario('decoys-07', 'decoys', 'это всё ещё одна кнопка', { count: 7, duration: 4200 }),
  scenario('decoys-08', 'decoys', 'фальшивка среди нас', { count: 2, duration: 3000 }),
  scenario('clones-01', 'clones', 'нас много! все настоящие. наверное', { count: 2, duration: 3500 }),
  scenario('clones-02', 'clones', 'нажми на всех', { count: 3, duration: 3800 }),
  scenario('clones-03', 'clones', 'армия кнопок', { count: 4, duration: 4200 }),
  scenario('clones-04', 'clones', 'каждая считается', { count: 5, duration: 4500 }),
  scenario('clones-05', 'clones', 'у тебя появился дублёр', { count: 1, duration: 3200 }),
  scenario('clones-06', 'clones', 'кнопочный апокалипсис', { count: 6, duration: 4800 }),
  scenario('lie-01', 'lie', 'ты почти на 1000', { fakeScore: '999', duration: 2600 }),
  scenario('lie-02', 'lie', 'а вот теперь ноль', { fakeScore: '0', duration: 2400 }),
  scenario('lie-03', 'lie', 'ты уже победил. не смотри на счётчик', { fakeScore: '1000', duration: 3000 }),
  scenario('lie-04', 'lie', 'счётчик сломался', { fakeScore: '???', duration: 2800 }),
  scenario('lie-05', 'lie', 'минус сорок два. красиво', { fakeScore: '-42', duration: 2600 }),
  scenario('lie-06', 'lie', 'всё начинается с одного', { fakeScore: '1', duration: 2400 }),
  scenario('lie-07', 'lie', 'миллион. можешь идти', { fakeScore: '1000000', duration: 3200 }),
  scenario('lie-08', 'lie', 'осталось чуть-чуть', { fakeScore: '999999', duration: 3000 }),
]

export const TROLL_EVENT_COUNT = trollEvents.length

// Каждый сценарий показывается один раз за «мешок», затем мешок тасуется заново.
let eventBag = []

export function drawTrollEvent() {
  if (trollEvents.length === 0) return null
  if (eventBag.length === 0) {
    eventBag = trollEvents.map((_, index) => index)
    for (let i = eventBag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[eventBag[i], eventBag[j]] = [eventBag[j], eventBag[i]]
    }
  }
  return trollEvents[eventBag.pop()]
}

export function resetTrollEventBag() {
  eventBag = []
}
