/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_API_URL: string
  readonly VITE_OPERATIONS_API_URL: string
  readonly VITE_API_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
