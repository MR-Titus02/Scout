// Module declarations to satisfy TypeScript imports for assets and JSON in the frontend scaffold.
declare module '*.css'
declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

// Allow importing JSON files without explicit types in this scaffold. Replace `any` with concrete interfaces where appropriate.
declare module '*.json' {
  const value: any
  export default value
}

// Minimal DOM extension for imported environment variables, if used later
interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string
  readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
