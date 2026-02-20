import React from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = React.createContext({ theme: 'light' as Theme, toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }){
  const [theme, setTheme] = React.useState<Theme>(() => {
    try { const saved = localStorage.getItem('site:theme'); return (saved as Theme) || 'light' } catch { return 'light' }
  })

  React.useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark') root.classList.add('theme-dark')
    else root.classList.remove('theme-dark')
    try { localStorage.setItem('site:theme', theme) } catch {}
  }, [theme])

  const toggle = React.useCallback(()=> setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme(){ return React.useContext(ThemeContext) }

export function ThemeToggle(){
  const { theme, toggle } = useTheme()
  return (
    <button aria-label="Toggle theme" onClick={toggle} className="ml-3 p-2 rounded-md border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
