import { useEffect, useReducer, useRef } from 'react'
import {
  DEFAULT_MESSAGE,
  EVENT_FREQUENCY,
  REPEAT_VISIT_MESSAGE,
  TARGET_CLICKS,
} from './gameConfig.js'
import { getRandomTrollPhrase, resetPhraseBag } from './phrases.js'
import { drawTrollEvent, resetTrollEventBag } from './trollEvents.js'
import {
  createInitialState,
  isBlockingEvent,
  trollReducer,
} from './gameReducer.js'
import { getStat, incrementStat } from '../../lib/dbHelpers.js'
import { db } from '../../lib/db.js'
import styles from './TrollClicker.module.scss'

const VISIT_FLAG = 'troll-clicker-visited'
const FINISHED_MARKER = 'troll-clicker-just-finished'

const ANIMATION_CLASSES = {
  bounce: styles.animBounce,
  flip: styles.animFlip,
  float: styles.animFloat,
  glitch: styles.animGlitch,
  jelly: styles.animJelly,
  melt: styles.animMelt,
  pulse: styles.animPulse,
  shake: styles.animShake,
  spin: styles.animSpin,
  spiral: styles.animSpiral,
  squeeze: styles.animSqueeze,
  swing: styles.animSwing,
  tremble: styles.animTremble,
  vibrate: styles.animVibrate,
  wobble: styles.animWobble,
}

const DIALOG_ICONS = {
  ad: '📢',
  fakeError: '⚠️',
  fakeWin: '🏆',
  modal: '💬',
  permission: '🔔',
  update: '⏳',
}

const DIALOG_VARIANTS = {
  ad: styles.dialogAd,
  fakeError: styles.dialogError,
  fakeWin: styles.dialogWin,
  modal: styles.dialogModal,
  permission: styles.dialogPermission,
  update: styles.dialogUpdate,
}

const CLONE_POSITIONS = [
  { x: -155, y: -75 },
  { x: 155, y: -75 },
  { x: -165, y: 85 },
  { x: 165, y: 85 },
  { x: 0, y: -170 },
  { x: 0, y: 170 },
]

const DECOY_POSITIONS = [
  { x: -170, y: -100 },
  { x: 165, y: -90 },
  { x: -180, y: 80 },
  { x: 175, y: 95 },
  { x: -40, y: -175 },
  { x: 70, y: 170 },
  { x: 0, y: -35 },
]

const DECOY_LABELS = ['КЛИК', 'ТОЧНО КЛИК', 'КЛИК?', 'ЖМИ', 'КНОПКА', 'КЛИК', 'НУ?']

const CURSOR_POSITIONS = [
  { x: 14, y: 24, delay: 0 },
  { x: 72, y: 16, delay: 0.3 },
  { x: 37, y: 68, delay: 0.6 },
  { x: 83, y: 58, delay: 0.9 },
  { x: 55, y: 82, delay: 1.2 },
]

function makeFleeOffset() {
  return {
    x: (Math.random() - 0.5) * 300,
    y: (Math.random() - 0.5) * 180,
  }
}

function buildVisualStyle(visual = {}) {
  const filters = [
    visual.blur ? `blur(${visual.blur}px)` : '',
    visual.hue ? `hue-rotate(${visual.hue}deg)` : '',
    visual.saturate ? `saturate(${visual.saturate})` : '',
    visual.contrast ? `contrast(${visual.contrast})` : '',
  ].filter(Boolean)

  return {
    transform: [
      `scale(${visual.scale ?? 1})`,
      `scaleX(${visual.scaleX ?? 1})`,
      `scaleY(${visual.scaleY ?? 1})`,
      `rotate(${visual.rotate ?? 0}deg)`,
    ].join(' '),
    opacity: visual.opacity ?? 1,
    filter: filters.length > 0 ? filters.join(' ') : undefined,
  }
}

export default function TrollClicker() {
  const [state, dispatch] = useReducer(trollReducer, undefined, createInitialState)
  const pressesRef = useRef(0)
  const visitCheckedRef = useRef(false)

  const event = state.activeEvent
  const eventSerial = event?.serial
  const eventDuration = event?.duration

  // Проверка визита. Ref защищает от двойного запуска в StrictMode:
  // иначе первый визит ошибочно показывал бы сообщение для повторного.
  useEffect(() => {
    if (visitCheckedRef.current) return
    visitCheckedRef.current = true

    const checkVisit = async () => {
      try {
        const hasVisited = await getStat(VISIT_FLAG)
        const justFinished =
          window.localStorage.getItem(FINISHED_MARKER) === '1'

        if (hasVisited > 0 || justFinished) {
          dispatch({ type: 'SET_INTRO', message: REPEAT_VISIT_MESSAGE })

          // Финал удалил DB-флаг, но по сценарию следующий заход должен
          // снова показать вступление. Метка не хранит прогресс — только
          // передаёт этот факт между перезагрузками.
          if (justFinished) {
            window.localStorage.removeItem(FINISHED_MARKER)
            if (hasVisited === 0) await incrementStat(VISIT_FLAG)
          }
        } else {
          await incrementStat(VISIT_FLAG)
        }
      } catch (error) {
        console.error('Не удалось проверить визит в кликер:', error)
      }
    }

    checkVisit()
  }, [])

  // После настоящего финала флаг удаляется, чтобы следующий заход снова
  // начинался с издевательского приветствия.
  useEffect(() => {
    if (!state.isCompleted) return

    const markFinished = async () => {
      try {
        await db.stats.where('key').equals(VISIT_FLAG).delete()
        window.localStorage.setItem(FINISHED_MARKER, '1')
      } catch (error) {
        console.error('Не удалось удалить флаг визита:', error)
      }
    }

    markFinished()
  }, [state.isCompleted])

  // Любой сценарий с duration сам снимается. При замене события
  // cleanup отменяет старый таймер, а serial не даёт чужому таймеру
  // сбросить новое событие.
  useEffect(() => {
    if (!eventSerial || !eventDuration) return undefined

    const timer = window.setTimeout(() => {
      dispatch({ type: 'CLEAR_EVENT', serial: eventSerial })
    }, eventDuration)

    return () => window.clearTimeout(timer)
  }, [eventSerial, eventDuration])

  const handlePress = () => {
    if (state.isCompleted || isBlockingEvent(event)) return

    const nextPress = pressesRef.current + 1
    pressesRef.current = nextPress

    const shouldTriggerEvent =
      nextPress % EVENT_FREQUENCY === 0 && event?.kind !== 'amnesia'

    dispatch({
      type: 'CLICK',
      phrase: getRandomTrollPhrase(),
      event: shouldTriggerEvent ? drawTrollEvent() : null,
    })
  }

  const handleReturnButton = () => {
    if (state.isCompleted) return
    pressesRef.current += 1
    dispatch({ type: 'RETURN_HIDDEN', phrase: getRandomTrollPhrase() })
  }

  const handleButtonHover = () => {
    if (event?.kind !== 'flee') return
    dispatch({ type: 'FLEE_BUTTON', offset: makeFleeOffset() })
  }

  const handleDecoyClick = () => {
    if (event?.kind !== 'decoys') return
    dispatch({
      type: 'TAUNT',
      phrase: getRandomTrollPhrase(),
      caption: 'это была не та кнопка. или та?',
    })
  }

  const handleCloseDialog = () => {
    if (!event) return
    dispatch({ type: 'CLOSE_EVENT', serial: event.serial })
  }

  const handleRestart = () => {
    pressesRef.current = 0
    resetTrollEventBag()
    resetPhraseBag()
    dispatch({ type: 'RESET', message: DEFAULT_MESSAGE })
  }

  const isHidden = !state.isCompleted && event?.kind === 'hide'
  const isBreak = event?.kind === 'pause' || event?.kind === 'broken'
  const buttonDisabled = state.isCompleted || isBreak
  const buttonLabel = state.isCompleted
    ? 'ВСЁ'
    : event?.kind === 'pause'
      ? 'ПАУЗА'
      : event?.kind === 'broken'
        ? '404'
        : event?.label ?? 'КЛИК'

  const offset = event?.offset ?? { x: 0, y: 0 }
  const visual = event?.visual ?? {}
  const visualStyle = buildVisualStyle(visual)
  const animationClass = event?.animation
    ? ANIMATION_CLASSES[event.animation] ?? ''
    : ''
  const buttonFontSize =
    visual.fontSize ?? (buttonLabel.length > 9 ? '13px' : '24px')

  const displayedClicks = event?.kind === 'lie' ? event.fakeScore : state.clicks
  const progress = state.isCompleted
    ? 100
    : Math.min(100, (state.clicks / TARGET_CLICKS) * 100)

  const overlay = event?.overlay
  const dialogVariant = event ? DIALOG_VARIANTS[event.kind] : ''
  const isCountdown = event?.kind === 'countdown'
  const isTicker = event?.kind === 'ticker'
  const isRain = event?.kind === 'rain'
  const isConfetti = event?.kind === 'confetti'
  const isCursor = event?.kind === 'cursor'
  const isSpotlight = event?.kind === 'spotlight'
  const isFlash = event?.kind === 'flash'
  const isHint = event?.kind === 'hint'
  const isScreenShake = event?.kind === 'screenShake'
  const isDecoys = event?.kind === 'decoys'
  const isClones = event?.kind === 'clones'
  const isAmnesia = event?.kind === 'amnesia'

  return (
    <div
      className={[
        styles.gameContainer,
        isScreenShake ? styles.screenShake : '',
        state.isCompleted ? styles.finished : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-event-kind={event?.kind ?? 'none'}
      data-event-id={event?.id ?? ''}
      data-clicks={state.clicks}
      data-completed={state.isCompleted ? 'true' : 'false'}
    >
      <header className={styles.header}>
        <h2>Кликер-Тролль</h2>
        <p className={styles.score} aria-live="polite">
          Кликов: <strong>{displayedClicks}</strong> / {TARGET_CLICKS}
        </p>
        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        {isAmnesia && (
          <p className={styles.amnesiaNote}>счётчик временно забыл, где остановился</p>
        )}
      </header>

      {isTicker && (
        <div className={styles.ticker} aria-hidden="true">
          <span>{event.tickerText}</span>
        </div>
      )}

      <div className={styles.messageBox} aria-live="polite">
        {state.message}
      </div>

      <div className={styles.eventCaptionSlot}>
        {event && (
          <div key={event.serial} className={styles.eventCaption}>
            {event.caption}
          </div>
        )}
      </div>

      <div className={styles.clickArea}>
        {isHidden ? (
          <button
            type="button"
            className={styles.hiddenArea}
            onClick={handleReturnButton}
          >
            Кнопка ушла. Нажми сюда, чтобы вернуть.
          </button>
        ) : (
          <div
            className={styles.buttonStage}
            style={{
              '--move-x': `${offset.x}px`,
              '--move-y': `${offset.y}px`,
            }}
          >
            <div className={styles.buttonVisual} style={visualStyle}>
              <button
                type="button"
                className={[
                  styles.clickButton,
                  buttonDisabled ? styles.clickButtonDisabled : '',
                  state.isCompleted ? styles.clickButtonFinished : '',
                  animationClass,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ fontSize: buttonFontSize }}
                disabled={buttonDisabled}
                onClick={handlePress}
                onMouseEnter={handleButtonHover}
                onFocus={handleButtonHover}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        )}

        {isClones && !state.isCompleted && (
          <div className={styles.cloneLayer}>
            {Array.from({ length: event.count ?? 2 }, (_, index) => {
              const position = CLONE_POSITIONS[index % CLONE_POSITIONS.length]
              return (
                <button
                  key={`clone-${index}`}
                  type="button"
                  className={styles.cloneButton}
                  style={{
                    '--clone-x': `${position.x}px`,
                    '--clone-y': `${position.y}px`,
                  }}
                  onClick={handlePress}
                  tabIndex={-1}
                >
                  КЛИК
                </button>
              )
            })}
          </div>
        )}

        {isDecoys && !state.isCompleted && (
          <div className={styles.decoyLayer}>
            {Array.from({ length: event.count ?? 2 }, (_, index) => {
              const position = DECOY_POSITIONS[index % DECOY_POSITIONS.length]
              return (
                <button
                  key={`decoy-${index}`}
                  type="button"
                  className={styles.decoyButton}
                  style={{
                    '--decoy-x': `${position.x}px`,
                    '--decoy-y': `${position.y}px`,
                  }}
                  onClick={handleDecoyClick}
                >
                  {DECOY_LABELS[index % DECOY_LABELS.length]}
                </button>
              )
            })}
          </div>
        )}

        {isHint && (
          <div className={styles.hint} aria-hidden="true">
            {event.hintText}
          </div>
        )}
      </div>

      {state.isCompleted && (
        <div className={styles.finalActions}>
          <button
            type="button"
            className={styles.restartButton}
            onClick={handleRestart}
          >
            ну ладно, ещё раз
          </button>
        </div>
      )}

      {overlay && (
        <div className={styles.overlayBackdrop}>
          <section
            className={[styles.dialog, dialogVariant].filter(Boolean).join(' ')}
            role="dialog"
            aria-modal="true"
            aria-labelledby="troll-dialog-title"
          >
            <div className={styles.dialogIcon} aria-hidden="true">
              {DIALOG_ICONS[event.kind] ?? '💬'}
            </div>
            <h3 id="troll-dialog-title">{overlay.title}</h3>
            <p>{overlay.text}</p>
            {event.kind === 'update' && (
              <div className={styles.fakeLoader} aria-hidden="true">
                <span />
              </div>
            )}
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogPrimary}
                onClick={handleCloseDialog}
              >
                {overlay.action}
              </button>
              {overlay.secondary && (
                <button
                  type="button"
                  className={styles.dialogSecondary}
                  onClick={handleCloseDialog}
                >
                  {overlay.secondary}
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      {isSpotlight && <div className={styles.spotlight} aria-hidden="true" />}

      {isFlash && (
        <div
          className={styles.flash}
          style={{ backgroundColor: event.color ?? '#ffffff' }}
          aria-hidden="true"
        />
      )}

      {isCountdown && (
        <div className={styles.countdown} aria-hidden="true">
          <span>{event.overlayText}</span>
        </div>
      )}

      {isRain && (
        <div className={styles.rain} aria-hidden="true">
          {Array.from({ length: 26 }, (_, index) => (
            <span
              key={`rain-${index}`}
              className={styles.rainDrop}
              style={{
                left: `${(index * 37 + 11) % 100}%`,
                animationDelay: `${(index % 9) * 0.14}s`,
                animationDuration: `${1.8 + (index % 5) * 0.25}s`,
              }}
            >
              {event.emoji}
            </span>
          ))}
        </div>
      )}

      {isConfetti && (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 34 }, (_, index) => (
            <span
              key={`confetti-${index}`}
              className={styles.confettiPiece}
              style={{
                left: `${(index * 29 + 7) % 100}%`,
                backgroundColor: ['#fded0d', '#f75d31', '#ffaaae', '#000000'][
                  index % 4
                ],
                animationDelay: `${(index % 10) * 0.12}s`,
                animationDuration: `${2 + (index % 4) * 0.3}s`,
                transform: `rotate(${(index * 47) % 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {isCursor && (
        <div className={styles.cursorStorm} aria-hidden="true">
          {CURSOR_POSITIONS.map((cursor) => (
            <span
              key={`${cursor.x}-${cursor.y}`}
              className={styles.fakeCursor}
              style={{
                left: `${cursor.x}%`,
                top: `${cursor.y}%`,
                animationDelay: `${cursor.delay}s`,
              }}
            >
              ➤
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
