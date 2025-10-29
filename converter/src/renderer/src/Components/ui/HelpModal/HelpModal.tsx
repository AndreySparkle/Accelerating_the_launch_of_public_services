import { createPortal } from 'react-dom'
import React, { useEffect, useRef } from 'react'
import { fileChoose, helpers, howToCreate } from './helpModal.data'

interface Props {
  onClose: () => void
}

const HelpModal: React.FC<Props> = ({ onClose }) => {
  const modalInnerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscClick = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleBackdropClick = (event: MouseEvent): void => {
      if (event.target === backdropRef.current) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscClick)
    backdropRef.current?.addEventListener('click', handleBackdropClick)

    document.body.style.overflow = 'hidden'

    return (): void => {
      window.removeEventListener('keydown', handleEscClick)
      backdropRef.current?.removeEventListener('click', handleBackdropClick)

      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/50 font-lato z-30"
    >
      <div
        ref={modalInnerRef}
        className="max-w-250 bg-white flex flex-col p-9 gap-y-12 rounded-xl z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'flex justify-between items-center'}>
          <span className={'font-bold text-32 leading-6'}>
            Как создать новый шаблон?
          </span>
          <button
            type="button"
            aria-label={'Закрыть модальное окно'}
            onClick={onClose}
            className={
              'hover:text-blue-600 active:scale-97 hover:rotate-90 transition duration-300'
            }
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden={'true'}
            >
              <path
                d="M12.862 14.1675L14.1674 12.8621L22 20.6946L29.8326 12.8621L31.138 14.1675L23.3054 22.0001L31.138 29.8326L29.8326 31.1381L22 23.3055L14.1674 31.1381L12.862 29.8326L20.6946 22.0001L12.862 14.1675Z"
                fill="#0B1F33"
              />
            </svg>
          </button>
        </div>
        <ul className={'flex flex-col gap-y-6 text-xl leading-5 text-blue-700'}>
          {howToCreate.map((text, index) => (
            <li key={`text-${index}`} className={'flex gap-x-4'}>
              <span>{`${index + 1}.`}</span>
              <div>
                {text}
                {index === 1 && (
                  <ul>
                    {fileChoose.map((file, index) => (
                      <li key={`file-${index}`}>
                        <b>{file.bold}</b> {file.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
        <span className={'font-bold text-32 leading-6'}>Подсказки</span>
        <ul className={'flex flex-col gap-y-6 text-xl leading-5 text-blue-700'}>
          {helpers.map((helper, index) => (
            <li key={`helper-${index}`} className={'flex gap-x-4'}>
              <span>{`${index + 1}.`}</span>
              <span>{helper}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          type={'button'}
          className={
            'bg-blue-600 text-white py-9 rounded-xl hover:text-blue-700 hover:bg-white hover:scale-102 active:text-blue-700 active:bg-white active:scale-97 transition duration-300'
          }
        >
          <span className={'text-32 leading-5'}>Я готов!</span>
        </button>
      </div>
    </div>,
    document.body
  )
}

export default HelpModal
