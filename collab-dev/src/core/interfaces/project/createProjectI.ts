export interface Root {
  id: number
  title: string
  description: string
  domain: string
  specification: any
  author: Author
  managerId: any
  status: any
  level: any
  githubLink: any
  tasks: any[]
  members: any[]
  pendingProfiles: any[]
  coins: number
  comments: any
  contributionRequests: any
  createdDate: string
}

export interface Author {
  id: number
  speudo: string
  email: string
  role: string
}
