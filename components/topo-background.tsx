'use client'

import React from 'react'

/**
 * TopographicBackground — Adaptive topographic pattern
 * Light mode: topo-green.png (forest green with lighter green lines)
 * Dark mode: topo-dark.png (brown/black with gold lines)
 */
export function TopographicBackground() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    // Check both the media query and the document class
    const updateDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
    }

    updateDarkMode()

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const observer = new MutationObserver(updateDarkMode)

    mediaQuery.addEventListener('change', updateDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      mediaQuery.removeEventListener('change', updateDarkMode)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        /* Darker base under the pattern (dark mode) */
        backgroundColor: isDark ? 'oklch(0.11 0.018 55)' : undefined,
      }}
    >
      {/* Topo pattern — lines softened in dark mode */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark ? 'url(/topo-dark.png)' : 'url(/topo-green.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDark ? 0.42 : 1,
        }}
      />
      {/* Subtle darkening vignette to match the reference mood */}
      {isDark && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 40%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      )}
    </div>
  )
}
