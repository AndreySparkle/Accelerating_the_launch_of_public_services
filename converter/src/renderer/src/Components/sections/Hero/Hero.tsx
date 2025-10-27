import React from 'react'
import { helperButtons } from './hero.data'
import HelperButton from '../../ui/HelperButton/HelperButton'
import greeting from '../../../assets/images/Greeting.svg'
import Button from '../../ui/Button/Button'

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto pt-32 pb-12">
      <div className="relative flex flex-col gap-y-9 max-w-200 mx-auto items-start">
        <div>
          <h1
            className={'font-lato text-5xl text-white max-w-1/2 xl:max-w-none'}
          >
            VM — шаблоны просто и удобно!
          </h1>
        </div>
        <span className={'block w-full h-0.5 bg-white opacity-35'}></span>
        <nav>
          <ul className={'flex gap-x-4.5'}>
            {helperButtons.map((button, index) => (
              <li key={`hero-button-${index}`}>
                <HelperButton>{button.title}</HelperButton>
              </li>
            ))}
          </ul>
        </nav>
        <img
          src={greeting}
          alt="Робот-помощник Greeting"
          width="160"
          height="160"
          className="absolute xl:-left-55 -top-16 right-0 transition"
        />
        <Button className={''} text={'Создать новый шаблон'} />
      </div>
    </section>
  )
}

export default Hero
