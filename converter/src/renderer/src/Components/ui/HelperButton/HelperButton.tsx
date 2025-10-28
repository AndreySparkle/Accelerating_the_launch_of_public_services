import React from 'react'

interface Props {
  children: React.ReactNode
  href?: string
}

const HelperButton: React.FC<Props> = ({ children, href }) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={
          'py-2 px-5 bg-blue-600 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-sm hover:bg-blue-550 hover:scale-105 active:scale-97 active:bg-blue-550 transition duration-300 inline-block'
        }
      >
        <span className={'font-bold leading-5 text-white font-lato'}>
          {children}
        </span>
      </a>
    )
  }

  return (
    <button
      type="button"
      className={
        'py-2 px-5 bg-blue-600 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-sm hover:bg-blue-550 hover:scale-105 active:scale-97 active:bg-blue-550 transition duration-300'
      }
    >
      <span className={'font-bold leading-5 text-white font-lato'}>
        {children}
      </span>
    </button>
  )
}

export default HelperButton
