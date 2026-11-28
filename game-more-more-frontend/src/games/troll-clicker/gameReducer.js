import {
  AMNESIA_RECALL_MESSAGE,
  DEFAULT_MESSAGE,
  FINAL_MESSAGE,
  TARGET_CLICKS,
} from './gameConfig.js'

const BLOCKING_EVENT_KINDS = new Set([
  'ad',
  'broken',
  'fakeError',
  'fakeWin',
  'hide',
  'modal',
  'pause',
  'permission',
  'update',
])

const clampClicks = (value) => Math.min(TARGET_CLICKS, Math.max(0, value))

export const isBlockingEvent = (event) =>
  Boolean(event && BLOCKING_EVENT_KINDS.has(event.kind))

export const createInitialState = (message = DEFAULT_MESSAGE) => ({
  clicks: 0,
  message,
  isCompleted: false,
  hasInteracted: false,
  activeEvent: null,
  eventSerial: 0,
})

function finishGame(state) {
  return {
    ...state,
    clicks: TARGET_CLICKS,
    message: FINAL_MESSAGE,
    isCompleted: true,
    hasInteracted: true,
    activeEvent: null,
  }
}

function startEvent(state, event) {
  if (!event) return state

  const serial = state.eventSerial + 1
  const activeEvent = { ...event, serial }
  let next = { ...state, activeEvent, eventSerial: serial }

  switch (event.kind) {
    case 'steal':
      next = {
        ...next,
        clicks: clampClicks(next.clicks - (event.amount ?? 0)),
      }
      break
    case 'bonus':
      next = {
        ...next,
        clicks: clampClicks(next.clicks + (event.amount ?? 0)),
      }
      break
    case 'amnesia':
      next = {
        ...next,
        clicks: 0,
        activeEvent: {
          ...activeEvent,
          savedClicks: state.clicks,
          remaining: event.remaining ?? 5,
        },
      }
      break
    case 'reverse':
      next = {
        ...next,
        activeEvent: {
          ...activeEvent,
          remaining: event.remaining ?? 5,
        },
      }
      break
    default:
      break
  }

  if (next.clicks >= TARGET_CLICKS) return finishGame(next)
  return next
}

function applyClick(state, action) {
  if (state.isCompleted) return state

  const activeEvent = state.activeEvent
  if (isBlockingEvent(activeEvent)) return state

  // Амнезия: пять кликов в пустоту, затем счётчик возвращается.
  if (activeEvent?.kind === 'amnesia') {
    const remaining = (activeEvent.remaining ?? 5) - 1
    if (remaining <= 0) {
      return {
        ...state,
        clicks: activeEvent.savedClicks ?? 0,
        message: AMNESIA_RECALL_MESSAGE(activeEvent.savedClicks ?? 0),
        hasInteracted: true,
        activeEvent: null,
      }
    }

    return {
      ...state,
      clicks: Math.min(activeEvent.savedClicks ?? 0, state.clicks + 1),
      message: action.phrase,
      hasInteracted: true,
      activeEvent: { ...activeEvent, remaining },
    }
  }

  let delta = 1
  if (activeEvent?.kind === 'speed') delta = activeEvent.gain ?? 2
  if (activeEvent?.kind === 'slow') delta = activeEvent.gain ?? 0
  if (activeEvent?.kind === 'reverse') delta = -1

  const nextClicks = clampClicks(state.clicks + delta)
  let next = {
    ...state,
    clicks: nextClicks,
    message: action.phrase,
    hasInteracted: true,
  }

  // Реверс заканчивается не по таймеру, а по количеству нажатий.
  if (activeEvent?.kind === 'reverse') {
    const remaining = (activeEvent.remaining ?? 1) - 1
    next = {
      ...next,
      activeEvent:
        remaining > 0 ? { ...activeEvent, remaining } : null,
    }
  }

  if (nextClicks >= TARGET_CLICKS) return finishGame(next)

  // Каждое пятое нажатие приходит с готовым сценарием.
  if (action.event) next = startEvent(next, action.event)

  return next
}

export function trollReducer(state, action) {
  switch (action.type) {
    case 'CLICK':
      return applyClick(state, action)

    case 'RETURN_HIDDEN': {
      if (state.isCompleted || state.activeEvent?.kind !== 'hide') return state
      return applyClick(
        { ...state, activeEvent: null, hasInteracted: true },
        { ...action, event: null },
      )
    }

    case 'SET_INTRO':
      if (state.hasInteracted || state.isCompleted) return state
      return { ...state, message: action.message }

    case 'CLEAR_EVENT':
      if (state.activeEvent?.serial !== action.serial) return state
      return { ...state, activeEvent: null }

    case 'CLOSE_EVENT':
      if (state.activeEvent?.serial !== action.serial) return state
      return { ...state, activeEvent: null }

    case 'FLEE_BUTTON':
      if (state.activeEvent?.kind !== 'flee') return state
      return {
        ...state,
        activeEvent: { ...state.activeEvent, offset: action.offset },
      }

    case 'TAUNT':
      return {
        ...state,
        message: action.phrase,
        hasInteracted: true,
        activeEvent: state.activeEvent
          ? {
              ...state.activeEvent,
              caption: action.caption ?? state.activeEvent.caption,
            }
          : null,
      }

    case 'RESET':
      return createInitialState(action.message)

    default:
      return state
  }
}
