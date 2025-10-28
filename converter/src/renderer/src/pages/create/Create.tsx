import React, { useState } from 'react'
import AddFile from '../../Components/ui/AddFile/AddFile'
import RemoveButton from '../../Components/ui/RemoveButton/RemoveButton'

interface FileData {
  id: string
  name: string
  type: string
  file: File
}

const Create: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([])

  const handleFileAdd = (file: File, type: string): void => {
    const newFile: FileData = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: type,
      file: file
    }
    setFiles(prev => [...prev, newFile])
  }

  const removeFile = (id: string): void => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  return (
    <main
      className={'bg-gray-50 min-h-screen py-8 pt-16 text-blue-700 font-lato'}
    >
      <div className="container px-6 mx-auto flex flex-col w-full">
        <div className={'flex flex-col gap-12 mx-auto items-start w-full'}>
          <span className={'text-5xl font-bold'}>Добавить файлы</span>
          <div className={'flex flex-col w-full gap-y-4'}>
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'JSON-схема услуги (ЕПГУ)')
              }
              accept=".json,application/json"
              title={'Добавить схему услуги ЕПГУ'}
              description={'Описание полей формы с портала Госуслуг'}
            />
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'XSD-схема вида сведений (ВИС)')
              }
              accept=".xsd,application/xml"
              title={'Добавить схему вида сведений ВИС'}
              description={
                'Структура данных, которую ожидает внутренняя система'
              }
            />
          </div>

          <span className={'text-5xl font-bold'}>Ваше заявление</span>

          <div className={'flex flex-col w-full gap-y-4'}>
            <AddFile
              onFileAdd={file =>
                handleFileAdd(file, 'Тестовое заявление (JSON)')
              }
              accept=".json,application/json"
              title={'Добавить заявление'}
              description={'Примеры заполненных форм (можно выбрать несколько)'}
            />
          </div>

          <div className="flex flex-col w-full gap-y-4">
            <span className={'text-40 font-bold'}>Добавленные файлы</span>
            <div className="flex flex-col gap-3">
              {files.length > 0 ? (
                files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="font-lato text-lg">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.type}</p>
                    </div>
                    <RemoveButton onClick={() => removeFile(file.id)} />
                  </div>
                ))
              ) : (
                <span>Файлы отсутствуют</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Create
