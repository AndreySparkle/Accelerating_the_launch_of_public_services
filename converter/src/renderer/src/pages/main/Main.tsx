import React from 'react'
import Hero from '../../Components/sections/Hero/Hero'
import Templates from '../../Components/sections/Templates/Templates'

const Main: React.FC = () => {
  return (
    <>
      <main className={'bg-gray-50'}>
        <div className="px-6 bg-gradient-to-b from-blue-400 to-blue-300 to-75%">
          <Hero />
        </div>
        <div className="container mx-auto px-6">
          <Templates />
        </div>
      </main>
    </>
  )
}

export default Main
