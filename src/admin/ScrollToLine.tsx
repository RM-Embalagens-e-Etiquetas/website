'use client'

import { useEffect } from 'react'

export default function ScrollToLine() {
  useEffect(() => {
    const id = window.sessionStorage.getItem('rm-line') || window.location.hash.replace('#', '')
    window.sessionStorage.removeItem('rm-line')
    if (!id) return

    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [])

  return null
}
