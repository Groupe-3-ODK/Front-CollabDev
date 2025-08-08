export class Task {
  projectId: number;
  profilIdCible: number;
  taskIds: number[];

  constructor() {
    this.projectId = 0;
    this.profilIdCible = 0;
    this.taskIds = [];
  }
}
