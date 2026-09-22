'use client'

import { useEffect } from 'react'

/** O Payload desenha o Salvar fora da área visível do drawer de upload. */
export default function ForceUploadSave() {
  useEffect(() => {
    const place = () => {
      const header = document.querySelector('.bulk-upload--drawer-header')
      if (!header) return

      const saveSlot = document.querySelector('.bulk-upload--actions-bar__saveButtons')
      if (saveSlot && saveSlot.parentElement !== header) {
        saveSlot.setAttribute('data-rm-upload-save', '1')
        header.insertBefore(saveSlot, header.lastElementChild)
      }

      const button = header.querySelector(
        '.bulk-upload--actions-bar__saveButtons button, .bulk-upload--actions-bar__buttons button',
      )
      if (button instanceof HTMLElement) {
        button.style.display = 'inline-flex'
        button.style.visibility = 'visible'
        button.style.minWidth = '112px'
      }
    }

    place()
    const observer = new MutationObserver(place)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
