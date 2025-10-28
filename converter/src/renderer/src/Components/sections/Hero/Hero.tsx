import React, { useState } from 'react'
import { helperButtons } from './hero.data'
import HelperButton from '../../ui/HelperButton/HelperButton'
import LinkToCreate from '../../ui/LinkToCreate/LinkToCreate'
import HelpModal from '../../ui/HelpModal/HelpModal'

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const buttonsWithHandlers = helperButtons.map(button => {
    if (button.title === 'Как создать новый шаблон?') {
      return {
        ...button,
        onClick: handleOpenModal
      }
    }
    return button
  })

  return (
    <section className="container mx-auto pt-32 pb-12">
      <div className="flex flex-col gap-y-9 max-w-200 mx-auto items-start">
        <div>
          <h1 className={'font-lato text-5xl text-white'}>
            VM — шаблоны просто и удобно!
          </h1>
        </div>
        <span className={'block w-full h-0.5 bg-white opacity-35'}></span>
        <nav>
          <ul className={'flex gap-x-4.5'}>
            {buttonsWithHandlers.map((button, index) => (
              <li key={`hero-button-${index}`}>
                <HelperButton href={button.href} onClick={button.onClick}>
                  {button.title}
                </HelperButton>
              </li>
            ))}
          </ul>
        </nav>
        <LinkToCreate className={''} text={'Создать новый шаблон'} />
      </div>

      {isModalOpen && <HelpModal onClose={handleCloseModal} />}
    </section>
  )
}

export default Hero
