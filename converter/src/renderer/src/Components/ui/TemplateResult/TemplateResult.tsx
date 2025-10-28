import React from 'react'

interface Props {
  template: string
  onSave: () => void
  onCopy: () => void
}

const TemplateResult: React.FC<Props> = ({ template, onSave, onCopy }) => {
  if (!template) return null

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex justify-between items-center">
        <span className={'text-40 font-bold'}>Результат генерации</span>
        <div className="flex gap-4">
          <button
            onClick={onCopy}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-lato"
          >
            Копировать в буфер
          </button>
          <button
            onClick={onSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-lato"
          >
            Сохранить в файл
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap max-h-96">
          {template}
        </pre>
      </div>
    </div>
  )
}

export default TemplateResult
