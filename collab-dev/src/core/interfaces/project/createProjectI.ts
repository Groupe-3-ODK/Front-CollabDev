export interface createProject {
  id: number
  title: string
  description: string
  domaine: string
  specification: any
  author: Author
}

export interface Author {
  id: number
  pseudo: string
  email: string
  password: string
  role: string
}