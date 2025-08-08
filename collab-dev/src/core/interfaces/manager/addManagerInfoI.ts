export interface addManagerInfoI {
  id: number
  manager: Manager
  githubLink: string
  pathCv: string
  createdDate: string
}

export interface Manager {
  id: number
  user: any
  level: any
  coins: number
  validatedProjects: number
  badge: any
  profilName: any
  tasks: any
  requestedProjects: any
  createdDate: any
}