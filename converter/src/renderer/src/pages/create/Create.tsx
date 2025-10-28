import React, { useState } from 'react'
import AddFile from '../../Components/ui/AddFile/AddFile'
import RemoveButton from '../../Components/ui/RemoveButton/RemoveButton'
import CreateButton from '../../Components/ui/CreateButton/CreateButton'
import TemplateResult from '../../Components/ui/TemplateResult/TemplateResult'
import Toast from '../../Components/ui/Toast/Toast'
import { JsonSchema, FileContent, FormData, UserData } from '../../types/schema'

interface FileData {
  id: string
  name: string
  type: string
  file: File
}

interface ToastState {
  id: string
  message: string
  type: 'success' | 'error'
}

const Create: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([])
  const [generatedTemplate, setGeneratedTemplate] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

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

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const getServiceCode = (jsonData: JsonSchema): string => {
    if (jsonData.formData?.ServiceCode) {
      return jsonData.formData.ServiceCode.toString().replace(/\D/g, '')
    } else if (jsonData.ServiceCode) {
      return jsonData.ServiceCode.toString().replace(/\D/g, '')
    }
    return '00000000'
  }

  const handleCreateTemplate = async (): Promise<void> => {
    if (!hasEpguFile || !hasVisFile) {
      showToast(
        'Необходимо добавить JSON-схему услуги ЕПГУ и XSD-схему ВИС',
        'error'
      )
      return
    }

    setIsGenerating(true)
    try {
      const filesData = await Promise.all(
        files.map(async fileData => {
          const content = await readFileContent(fileData.file)
          return {
            type: fileData.type,
            name: fileData.name,
            content: content,
            size: fileData.file.size
          } as FileContent
        })
      )

      let template: string
      if (window.electronAPI) {
        template = await window.electronAPI.generateTemplate(filesData)
      } else {
        template = generateSimpleTemplate(filesData)
      }

      setGeneratedTemplate(template)

      await handleSaveTemplate(template)
    } catch (error) {
      console.error('Ошибка генерации шаблона:', error)
      showToast('Произошла ошибка при генерации шаблона', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSimpleTemplate = (filesData: FileContent[]): string => {
    let jsonSchema: JsonSchema | null = null
    const testData: JsonSchema[] = []

    for (const fileData of filesData) {
      if (fileData.type === 'JSON-схема услуги (ЕПГУ)') {
        jsonSchema = JSON.parse(fileData.content) as JsonSchema
      } else if (fileData.type === 'Тестовое заявление (JSON)') {
        testData.push(JSON.parse(fileData.content) as JsonSchema)
      }
    }

    let template = `## Velocity Template for EPGU to VIS Integration
## Generated in browser mode
## Test data: ${testData.length > 0 ? `${testData.length} files loaded` : 'not used'}
<?xml version="1.0" encoding="UTF-8"?>
<AppDataRequest xmlns="http://socit.ru/kalin/orders/2.0.0">
  <SetRequest>
`

    if (jsonSchema?.formData) {
      template += generateFormFields(jsonSchema.formData)
    }

    if (jsonSchema?.c7) {
      template += generateUserData(jsonSchema.c7)
    }

    template += `  </SetRequest>
</AppDataRequest>`

    return template
  }

  const generateFormFields = (formData: FormData): string => {
    let fields = ''
    const fieldMappings = {
      orderId: 'orderId',
      ServiceCode: 'ServiceCode',
      ServiceName: 'ServiceName'
    }

    for (const [jsonField, xmlField] of Object.entries(fieldMappings)) {
      if (formData[jsonField]) {
        fields += `    <${xmlField}>${formData[jsonField]}</${xmlField}>\n`
      }
    }
    return fields
  }

  const generateUserData = (userData: UserData): string => {
    let userDataBlock = `    <userData>\n`
    const fieldMappings = {
      lastName: 'lastName',
      firstName: 'firstName',
      middleName: 'middleName',
      birthDate: 'birthDate',
      Sex: 'Sex',
      Snils: 'Snils',
      Inn: 'Inn',
      phone: 'phone',
      Email: 'Email',
      citizenship: 'citizenship'
    }

    for (const [jsonField, xmlField] of Object.entries(fieldMappings)) {
      if (userData[jsonField]) {
        userDataBlock += `      <${xmlField}>$c7.${jsonField}</${xmlField}>\n`
      }
    }
    userDataBlock += `    </userData>\n`
    return userDataBlock
  }

  const handleSaveTemplate = async (template?: string): Promise<boolean> => {
    const content = template || generatedTemplate
    if (!content) return false

    try {
      const epguFile = files.find(
        file => file.type === 'JSON-схема услуги (ЕПГУ)'
      )
      let serviceCode = '00000000'

      if (epguFile) {
        const fileContent = await readFileContent(epguFile.file)
        const jsonData = JSON.parse(fileContent) as JsonSchema
        serviceCode = getServiceCode(jsonData)
      }

      const fileName = `${serviceCode}_Applicant.vm`

      if (window.electronAPI) {
        const result = await window.electronAPI.saveFileDialog({
          filters: [
            { name: 'VM Templates', extensions: ['vm'] },
            { name: 'All Files', extensions: ['*'] }
          ],
          defaultPath: fileName
        })

        if (!result.canceled && result.filePaths[0]) {
          await window.electronAPI.writeFile(result.filePaths[0], content)
          return true
        }
        return false
      } else {
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        return true
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error)
      showToast('Произошла ошибка при сохранении шаблона', 'error')
      return false
    }
  }

  const handleCopyToClipboard = async (): Promise<void> => {
    if (!generatedTemplate) return

    try {
      await navigator.clipboard.writeText(generatedTemplate)
      showToast('Текст скопирован в буфер обмена!')
    } catch (error) {
      console.error('Ошибка копирования:', error)
      const textArea = document.createElement('textarea')
      textArea.value = generatedTemplate
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      showToast('Текст скопирован в буфер обмена!')
    }
  }

  const hasEpguFile = files.some(
    file => file.type === 'JSON-схема услуги (ЕПГУ)'
  )
  const hasVisFile = files.some(
    file => file.type === 'XSD-схема вида сведений (ВИС)'
  )
  const hasApplicationFile = files.some(
    file => file.type === 'Тестовое заявление (JSON)'
  )

  return (
    <main
      className={
        'bg-gray-50 min-h-screen py-16 text-blue-700 font-lato flex justify-center'
      }
    >
      <div className="container px-6 flex flex-col w-full justify-between gap-y-12">
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
              isCompleted={hasEpguFile}
              allowMultiple={false}
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
              isCompleted={hasVisFile}
              allowMultiple={false}
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
              isCompleted={hasApplicationFile}
              allowMultiple={true}
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
                    <div className="flex items-center gap-4">
                      <span className="font-lato text-sm text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <RemoveButton onClick={() => removeFile(file.id)} />
                    </div>
                  </div>
                ))
              ) : (
                <span>Файлы отсутствуют</span>
              )}
            </div>
          </div>

          <TemplateResult
            template={generatedTemplate}
            onSave={() => handleSaveTemplate()}
            onCopy={handleCopyToClipboard}
          />
        </div>

        <CreateButton
          onClick={handleCreateTemplate}
          disabled={!hasEpguFile || !hasVisFile || isGenerating}
          isLoading={isGenerating}
        />

        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </main>
  )
}

export default Create
