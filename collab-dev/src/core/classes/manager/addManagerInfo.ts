export class addManagerInfo {
  manager: Manager
  githubLink: string
  pathCv: string

  constructor(){
    this.manager = 
    this.githubLink = ''
    this.pathCv = ''
  }
}

export interface Manager {
  id: number
}
