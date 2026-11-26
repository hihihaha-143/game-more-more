import axios from 'axios'

// Единая точка конфигурации API.
// В dev: прокси Vite перенаправляет /api -> Laravel (localhost:8000).
// В будущем (хостинг / Capacitor): здесь меняем baseURL.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
})

// Общий перехватчик ошибок — чтобы не дублировать try/catch в каждом вызове.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Позже здесь можно централизованно логировать/показывать тосты.
    return Promise.reject(error)
  },
)

export default api
