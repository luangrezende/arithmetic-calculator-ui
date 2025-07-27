import { useThemeMode } from 'src/context/theme-context'

import { Tooltip } from 'src/components/tooltip'
import { Iconify } from 'src/components/iconify'

export function ThemeToggle() {
  const { mode, toggleTheme, isAuthRoute } = useThemeMode()

  if (isAuthRoute) return null

  return (
    <Tooltip content={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <button
        type="button"
        onClick={toggleTheme}
        className="w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-full bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-sm transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
      >
        <Iconify
          icon={mode === 'dark' ? 'solar:sun-bold' : 'solar:moon-bold'}
          width={16}
          sx={{
            color: mode === 'dark' ? '#eab308' : '#2563eb',
            transition: 'all 0.2s ease-out',
            width: { xs: 16, xl: 18 },
            height: { xs: 16, xl: 18 },
            '&:hover': {
              transform: 'rotate(12deg) scale(1.1)'
            }
          }}
        />
      </button>
    </Tooltip>
  )
}
