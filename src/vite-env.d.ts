/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  readonly VITE_OPEN_WEATHER_BASE_URL:string
  readonly VITE_OPEN_WEATHER_KEY:string
  readonly VITE_LOCATION_IQ_BASE_URL:string
  readonly VITE_LOCATION_IQ_KEY:string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
