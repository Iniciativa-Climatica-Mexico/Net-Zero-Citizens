'use client'

/**
 * Custom hook to detect if the user is on a mobile device.
 *
 * @param {void} - no parameters.
 * @returns {boolean} - true if the user is on a mobile device.
 * @example
 * ```tsx
 * const isMobile = useIsMobile()
 * ```
 */

import { useEffect, useState } from 'react'

export default function useIsMobile() {
  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
      })
    }
  }, [])

  return windowWidth < 768
}
