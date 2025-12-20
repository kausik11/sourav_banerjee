import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  useEffect(()=>{
    const handleScroll = ()=>{
      const HeroHeight = document.getElementById('hero-video')?.offsetHeight || 0
       setScrolled(window.scrollY > HeroHeight - 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500
  ${scrolled
    ? 'bg-[linear-gradient(160deg,#eaf2ff_0%,#dfe9ff_45%,#f6f8ff_100%)] shadow-lg'
    : 'backdrop-blur-[100px] shadow-lg shadow-bottom-hard '}
  `}>
      
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1850a0] bg-white/60 p-1">
            <img
              src="/logo.png"
              alt="Pediatric Doctor"
              className="h-full w-full object-contain"
            />
          </div>
          <div className='flex-col justify-center items-center'>
            <p className="font-display text-xl text-[#1850a0] font-bold">Dr. Sourav Banerjee</p>
            <p className="max-w-170px font-bold text-[#40B1B6] md:max-w-none md:text-[13px]">
              Pediatrician & Neonatologist 
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-base md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-b-2 bg-transparent pb-1 text-[16px] font-medium transition-all ${
                  isActive
                    ? 'scale-105 border-[var(--brand-accent)] text-[#1850a0]'
                    : 'border-transparent text-[var(--muted)]'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/locations"
            className="hidden rounded-full border border-[var(--brand-accent)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white md:inline-flex"
          >
            Book Visit
          </NavLink>
          {/* <button
            type="button"
            onClick={toggleTheme}
            className="hidden items-center justify-center rounded-full border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--brand-accent)] md:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button> */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] p-2 text-[var(--ink)] md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="h-4 w-4">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    fill="none"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                    fill="none"
                  />
                )}
              </svg>
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 pb-4">
            <nav className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white/30 p-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)] shadow-soft">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `border-b-2 bg-transparent pb-1 text-sm transition-all ${
                      isActive
                        ? 'scale-105 border-[var(--brand-accent)] text-[var(--brand-accent)] shadow-[0_8px_24px_rgba(15,23,42,0.2)]'
                        : 'border-transparent hover:scale-105 hover:border-[var(--brand-accent)] hover:text-[var(--ink)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.2)]'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/locations"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-[var(--brand-accent)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Book Visit
              </NavLink>
              {/* <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--brand-accent)]"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button> */}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
