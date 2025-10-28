export interface FormData {
  orderId?: string
  ServiceCode?: string
  ServiceName?: string
  [key: string]: unknown
}

export interface UserData {
  lastName?: string
  firstName?: string
  middleName?: string
  birthDate?: string
  Sex?: string
  Snils?: string
  Inn?: string
  phone?: string
  Email?: string
  citizenship?: string
  [key: string]: unknown
}

export interface JsonSchema {
  formData?: FormData
  c7?: UserData
  ServiceCode?: string
  [key: string]: unknown
}

export interface FileContent {
  type: string
  name: string
  content: string
  size: number
}
