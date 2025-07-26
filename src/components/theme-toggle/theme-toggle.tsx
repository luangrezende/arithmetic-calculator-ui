import { useThemeMode } from 'src/context/theme-context'
import { Iconify } from 'src/components/iconify'

export function ThemeToggle() {
  const { mode, toggleTheme, isAuthRoute } = useThemeMode()

  if (isAuthRoute) return null

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md group"
    >
      <Iconify
        icon={mode === 'dark' ? 'solar:sun-bold' : 'solar:moon-bold'}
        width={20}
        sx={{
          color: mode === 'dark' ? '#eab308' : '#2563eb',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.1)'
          }
        }}
      />
    </button>
  )
}
