export class project {
  title: string
  description: string
  domain: string
  author: Author

  constructor(){
    this.title = ''
    this.description = ''
    this.domain = ''
    this.author = 
  }
}

export interface Author {
  id: number
}