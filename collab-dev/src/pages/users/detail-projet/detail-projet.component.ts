import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
}

interface Task {
  id: number;
  title: string;
  initials: string;
  avatarClass: string;
  status: TaskStatus;
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  avatarClass: string;
}

@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css'],
})
export class DetailProjetComponent {
  projectId!: number;
  isManager: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.isManager = this.route.snapshot.queryParams['isManager'] === 'true';
  }

  progressPercent = 33;
  totalTasks = 6;
  inProgressTasks = 2;
  doneTasks = 2;
  collaboratorsCount = 3;

  TaskStatus = TaskStatus;

  tasks: Record<TaskStatus, Task[]> = {
    [TaskStatus.Todo]: [
      {
        id: 1,
        title: 'Interface admin',
        initials: 'AC',
        avatarClass: 'blue-bg',
        status: TaskStatus.Todo,
      },
      {
        id: 2,
        title: 'Interface utilisateur',
        initials: 'AC',
        avatarClass: 'orange-bg',
        status: TaskStatus.Todo,
      },
    ],
    [TaskStatus.InProgress]: [
      {
        id: 3,
        title: 'API Authentification',
        initials: 'AC',
        avatarClass: 'blue-bg',
        status: TaskStatus.InProgress,
      },
      {
        id: 4,
        title: 'Base de données',
        initials: 'AC',
        avatarClass: 'purple-bg',
        status: TaskStatus.InProgress,
      },
    ],
    [TaskStatus.Done]: [
      {
        id: 5,
        title: 'Maquettes UI',
        initials: 'AC',
        avatarClass: 'orange-bg',
        status: TaskStatus.Done,
      },
      {
        id: 6,
        title: 'Configuration serveur',
        initials: 'AC',
        avatarClass: 'purple-bg',
        status: TaskStatus.Done,
      },
    ],
  };

  teamMembers: TeamMember[] = [
    {
      name: 'Aissatou Coulibaly',
      role: 'Designer',
      initials: 'AC',
      avatarClass: 'blue-bg',
    },
    {
      name: 'Aissatou Coulibaly',
      role: 'Développeur Backend',
      initials: 'AC',
      avatarClass: 'orange-bg',
    },
    {
      name: 'Aissatou Coulibaly',
      role: 'Développeur Frontend',
      initials: 'AC',
      avatarClass: 'purple-bg',
    },
  ];

  draggedTask: Task | null = null;

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, task: Task) {
    this.draggedTask = task;
  }

  drop(event: DragEvent, newStatus: TaskStatus) {
    event.preventDefault();
    if (!this.draggedTask) return;

    const oldStatus = this.draggedTask.status;
    if (oldStatus !== newStatus) {
      this.tasks[oldStatus] = this.tasks[oldStatus].filter(
        (t) => t.id !== this.draggedTask!.id
      );
      this.draggedTask.status = newStatus;
      this.tasks[newStatus].push(this.draggedTask);
      this.updateProgress();
    }
  }

  updateProgress() {
    this.doneTasks = this.tasks[TaskStatus.Done].length;
    this.inProgressTasks = this.tasks[TaskStatus.InProgress].length;
    this.totalTasks =
      this.tasks[TaskStatus.Todo].length +
      this.inProgressTasks +
      this.doneTasks;
    this.progressPercent =
      this.totalTasks > 0
        ? Math.round((this.doneTasks / this.totalTasks) * 100)
        : 0;
  }

  sendToAdmin() {
    alert("Envoyé à l'administrateur");
  }

  navigateToConfigurationSection() {
    this.router.navigate(['/users/configure-project', this.projectId]);
  }
  navigateToCreateTaskSection() {
    this.router.navigate(['/users/create-task', this.projectId]);
  }
  navigateToAddTeamSection() {
    this.router.navigate(['/users/admin/add-team', this.projectId]);
  }
}
