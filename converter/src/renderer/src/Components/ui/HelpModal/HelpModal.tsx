import { createPortal } from 'react-dom'
import React from 'react'

const HelpModal: React.FC = () => {
  return createPortal(
    <div>
      <div></div>
    </div>,
    document.body
  )
}

export default HelpModal
