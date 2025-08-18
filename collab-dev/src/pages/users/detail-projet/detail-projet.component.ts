import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { UsersService } from '../../../core/services/users.service';
import { forkJoin, map } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';

enum TaskStatus {
  Todo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
  Validated = 'VALIDATED',
}

interface Task {
  id: number;
  taskName: string;
  status: TaskStatus;
  coins: number;
  createdDate: string;
  assignedTo?: string;
}

interface TeamMember {
  id: number;
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
export class DetailProjetComponent implements OnInit {
  projectId!: number;
  isManager: boolean = false;
  projectDetails: any;

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    console.log('------------------->', this.projectId);
    this.isManager = this.route.snapshot.queryParams['isManager'] === 'true';
    this.loadProjectDetails(this.projectId);
  }

  progressPercent = 0;
  totalTasks = 0;
  inProgressTasks = 0;
  doneTasks = 0;
  validatedTasks = 0;
  collaboratorsCount = 0;

  TaskStatus = TaskStatus;

  tasks: Record<TaskStatus, Task[]> = {
    [TaskStatus.Todo]: [],
    [TaskStatus.InProgress]: [],
    [TaskStatus.Done]: [],
    [TaskStatus.Validated]: [],
  };

  teamMembers: TeamMember[] = [];
  pendingMembers: any[] = [];
  membersWithPseudo: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UsersService,
    private taskService: TaskService
  ) {
    console.log('TaskService instance:', this.taskService);
  }

  loadProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (response) => {
        this.projectDetails = response.data;
        // console.log('Project Details:', this.projectDetails);
        this.processProjectData();

        // Ajout récupération des pseudos des membres
        if (this.projectDetails.members && this.projectDetails.members.length > 0) {
          const requests = this.projectDetails.members.map((profil: any) =>
            this.userService.getUserById(profil.userId).pipe(
              map((user: any) => ({
                profilId: profil.id,
                pseudo: user.data.speudo,
                role: profil.profilName,
                badge: profil.badge
              }))
            )
          );
          forkJoin(requests).subscribe({
            next: (members: any) => {
              this.membersWithPseudo = members;
              // console.log('Liste complète:', this.membersWithPseudo);
            },
            error: (err) =>
              console.error('Erreur lors du chargement des pseudos', err),
          });
        }
      },
      error: (err) => console.error('Error loading project:', err),
    });
  }

  processProjectData(): void {
    // Process tasks
    if (this.projectDetails.tasks) {
      this.tasks[TaskStatus.Todo] = this.projectDetails.tasks.filter(
        (t: any) => t.status === 'TODO'
      );
      this.tasks[TaskStatus.InProgress] = this.projectDetails.tasks.filter(
        (t: any) => t.status === 'IN_PROGRESS'
      );
      this.tasks[TaskStatus.Done] = this.projectDetails.tasks.filter(
        (t: any) => t.status === 'DONE'
      );
      this.tasks[TaskStatus.Validated] = this.projectDetails.tasks.filter(
        (t: any) => t.status === 'VALIDATED'
      );

      this.totalTasks = this.projectDetails.tasks.length;
      this.inProgressTasks = this.tasks[TaskStatus.InProgress].length;
      this.doneTasks =
        this.tasks[TaskStatus.Done].length +
        this.tasks[TaskStatus.Validated].length;

      this.progressPercent =
        this.totalTasks > 0
          ? Math.round((this.doneTasks / this.totalTasks) * 100)
          : 0;
    }

    // Process team members
    if (this.projectDetails.members) {
      this.teamMembers = this.projectDetails.members.map((member: any) => ({
        id: member.id,
        name: member.userId, // Vous devriez avoir un champ pour le nom complet
        role: member.profilName,
        initials: this.getInitials(member.speudo || 'Unknown'), // Adaptez selon vos données
        avatarClass: this.getAvatarClass(member.badge),
      }));
      this.collaboratorsCount = this.teamMembers.length;
    }

    // Process pending members
    if (this.projectDetails.pendingProfiles) {
      this.pendingMembers = this.projectDetails.pendingProfiles;
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getAvatarClass(badge: string): string {
    switch (badge) {
      case 'RED':
        return 'red-bg';
      case 'YELLOW':
        return 'yellow-bg';
      case 'GREEN':
        return 'green-bg';
      default:
        return 'blue-bg';
    }
  }
  // draggedTask: Task | null = null;

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, task: Task) {
    event.dataTransfer?.setData('text/plain', task.id.toString());
  }

  drop(event: DragEvent, newStatus: TaskStatus) {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text/plain');
    console.log('Drag and drop detected', { taskId, newStatus }); // Ajouté
    if (!taskId) return;

    // Trouver la tâche dans n'importe quel statut
    let task: Task | undefined;
    let oldStatus: TaskStatus | undefined;

    for (const status in this.tasks) {
      const typedStatus = status as TaskStatus;
      const foundTask = this.tasks[typedStatus].find((t) => t.id === +taskId);
      if (foundTask) {
        task = foundTask;
        oldStatus = typedStatus;
        break;
      }
    }

    if (!task || !oldStatus || oldStatus === newStatus) return;

    // Validation des transitions autorisées
    if (oldStatus === TaskStatus.Todo && newStatus === TaskStatus.Done) {
      alert(
        'Vous ne pouvez pas passer une tâche directement de "À faire" à "Terminé". Elle doit d\'abord passer par "En cours".'
      );
      return;
    }

    // Appel API pour synchroniser le backend
    this.taskService.updateTaskStatus(+taskId, newStatus).subscribe({
      next: () => {
        // Mettre à jour le statut côté front uniquement si succès backend
        this.tasks[oldStatus!] = this.tasks[oldStatus!].filter((t) => t.id !== task!.id);
        task!.status = newStatus;
        this.tasks[newStatus].push(task!);
        this.updateTaskCounters();
      },
      error: (err) => {
        alert("Erreur lors de la mise à jour du statut côté serveur");
        console.error(err);
      }
    });
  }

  updateTaskCounters(): void {
    this.inProgressTasks = this.tasks[TaskStatus.InProgress].length;
    this.doneTasks =
      this.tasks[TaskStatus.Done].length +
      this.tasks[TaskStatus.Validated].length;
    this.totalTasks = Object.values(this.tasks).reduce(
      (sum, tasks) => sum + tasks.length,
      0
    );
    this.progressPercent =
      this.totalTasks > 0
        ? Math.round((this.doneTasks / this.totalTasks) * 100)
        : 0;
  }

  sendToAdmin() {
    if (this.projectDetails.managerId?.id) {
      this.projectService
        .validateProject(
          this.projectDetails.managerId.id,
          this.projectDetails.id
        )
        .subscribe({
          next: (response) => {
            alert("Projet envoyé à l'administrateur pour validation");
            // Mettre à jour le statut du projet
            this.projectDetails.status = 'PENDING_VALIDATION';
          },
          error: (err) =>
            console.error("Erreur lors de l'envoi à l'admin:", err),
        });
    }
  }

  // updateProgress() {
  //   this.doneTasks = this.tasks[TaskStatus.Done].length;
  //   this.inProgressTasks = this.tasks[TaskStatus.InProgress].length;
  //   this.totalTasks = this.tasks[TaskStatus.Todo].length + this.inProgressTasks + this.doneTasks;
  //   this.progressPercent = this.totalTasks > 0 ? Math.round((this.doneTasks / this.totalTasks) * 100) : 0;
  // }

  // sendToAdmin(){
  //   alert('Envoyé à l\'administrateur');
  // }

  navigateToConfigurationSection() {
    this.router.navigate(['/users/configure-project', this.projectId]);
  }
  navigateToCreateTaskSection() {
    this.router.navigate(['/users/create-task', this.projectId]);
  }
  navigateToAddTeamSection() {
    this.router.navigate(['/users/add-team', this.projectId]);
  }
}
