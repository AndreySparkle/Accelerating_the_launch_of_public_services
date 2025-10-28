import React from 'react'

interface Props {
  template: string
  onSave: () => void
  onCopy: () => void
}

const TemplateResult: React.FC<Props> = ({ template, onSave, onCopy }) => {
  if (!template) return null

  return (
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex justify-between items-center">
        <span className={'text-40 font-bold'}>Результат</span>
        <div className="flex gap-4 text-2xl">
          <button
            onClick={onCopy}
            className="px-16 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-white hover:text-blue-700 hover:scale-105 active:bg-white active:text-blue-700 active:scale-97 transition duration-300 font-lato"
          >
            Копировать
          </button>
          <button
            onClick={onSave}
            className="px-16 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-white hover:text-blue-700 hover:scale-105 active:bg-white active:text-blue-700 active:scale-97 transition duration-300 font-lato"
          >
            Сохранить файл
          </button>
        </div>
      </div>

      <pre className="text-white bg-gray-900 p-4 rounded-xl overflow-auto text-sm whitespace-pre-wrap max-h-150">
        {template}
      </pre>
    </div>
  )
}

export default TemplateResult
