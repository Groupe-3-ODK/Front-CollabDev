export class createTasks {
  projectId: number
  tasks: Task[]

  constructor(){
    this.projectId = 0
    this.tasks = []
  }
}

export interface Task {
  taskName: string
  description: string
  deadLine: string
}