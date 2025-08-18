import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-my-contributions',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-contributions.html',
  styleUrl: './my-contributions.css',
  providers: [CookieService],
})
export class MyContributions {
  contributions: any = [];
  projetsDesigner: any[] = [];
  projetsDeveloper: any[] = [];
  projetsManager: any[] = [];
  userId: number = 0; // ID de l'utilisateur connecté
  private cookieService = inject(CookieService);
  private router = inject(Router);
  public currentUser: any = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      console.log(this.currentUser.id);
    }
    this.projectService.getUserContributions(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.contributions = res.data;
        console.warn(this.contributions);
      },
      error: (err) => {
        console.log(err);
        alert(err.message);
      },
    });
  }

  // Filtre actuel pour les projets
  filter: string = 'all';

  /**
   * Retourne la liste des projets filtrés en fonction du filtre actuel.
   * @returns {any[]} La liste des projets filtrés.
   */
  get filteredProjects(): any[] {
    if (!this.currentUser) return [];

    const userId = this.currentUser.id;

    switch (this.filter) {
      case 'all':
        return this.contributions;

      case 'code':
        return this.contributions.filter((project: { members: any[] }) =>
          project.members?.some(
            (m) => m.userId === userId && m.profilName === 'DEVELOPER'
          )
        );

      case 'design':
        return this.contributions.filter((project: { members: any[] }) =>
          project.members?.some(
            (m) => m.userId === userId && m.profilName === 'DESIGNER'
          )
        );

      case 'management':
        console.log('filtre gestion ativer');
        console.log(userId);
        return this.contributions.filter(
          (project: {
            managerId: {
              profilName: string;
              userId: any;
            };
          }) => project.managerId?.userId === userId
        );

      default:
        return this.contributions;
    }
  }

  /**
   * Définit le filtre actuel pour les projets.
   * @param filter La valeur du filtre.
   */
  setFilter(filter: string): void {
    this.filter = filter;
  }

  /**
   * Retourne la couleur de fond en fonction du niveau du projet.
   * @param level Le niveau du projet.
   * @returns {string} Le code couleur hexadécimal.
   */
  getLevelColor(level: string): string {
    switch (level) {
      case 'Débutant':
        return '#DDEEBB';
      case 'Intermédiaire':
        return '#92D3FB';
      case 'Avancé':
        return '#FBC792'; // J'ai ajouté une couleur pour le niveau avancé
      default:
        return '#FFFFFF';
    }
  }

  isManager: boolean = false;

  showProjectEnv(project: any) {
    if (project.managerId.userId === this.currentUser.id) {
      this.isManager = true;
      this.router.navigate(['/users/project-detail', project.id], {
        queryParams: { isManager: this.isManager },
      });
    } else {
      this.isManager = false;
      this.router.navigate(['/users/project-detail', project.id], {
        queryParams: { isManager: this.isManager },
      });
    }
  }
}
