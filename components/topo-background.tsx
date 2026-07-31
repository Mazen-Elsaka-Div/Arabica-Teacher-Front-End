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
        backgroundImage: isDark ? 'url(/topo-dark.png)' : 'url(/topo-green.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
