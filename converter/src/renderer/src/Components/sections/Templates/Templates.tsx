import React from 'react'
import { templatesHistory } from './Templates.data'
import Template from '../../ui/Template/Template'

const Templates: React.FC = () => {
  return (
    <section className={'flex flex-col gap-y-12 pt-16'}>
      <span className={'text-40 font-bold font-lato'}>Созданные шаблоны</span>
      <ul className={'flex flex-col gap-y-4'}>
        {templatesHistory.map((template, index) => (
          <Template
            key={`template-${index}`}
            title={template.title}
            date={template.date}
            isFavorite={template.isFavorite}
          />
        ))}
      </ul>
    </section>
  )
}

export default Templates
