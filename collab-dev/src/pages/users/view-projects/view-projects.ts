// view-projects.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfilType, UsersService } from '../../../core/services/users.service';

import { CookieService } from 'ngx-cookie-service';
import { forkJoin } from 'rxjs';
import { Iproject } from '../../../core/interfaces/project';
import { ProjectService } from '../../../core/services/project.service';
import { Pop } from '../../../shared/reusablesComponents/pop/pop';

interface Project {
  id: number;
  title: string;
  description: string;
  level: string;
  domain: string;
  status: string;
  contributors: string[];
  createdDate: Date;
  isFavorite: boolean;
  domainColor: string;
}

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, Pop],
  providers: [CookieService],
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.css',
})
export class ViewProjectsComponent implements OnInit {
  router = inject(Router);
  private _projectService = inject(ProjectService);
  private _userService = inject(UsersService);

  public currentUser: any = null;

  projectsData: any[] = [];
  membersSpeudos: { [projectId: number]: string[] } = {};
  private cookieService = inject(CookieService);

  // showProjectDetails(project: Project) {
  //   this.router.navigate(['/projects/view-details', project.id]);
  // }

  filteredProjects: any = [];

  constructor(private userService: UsersService) {}

  userId: number = 1;
  profilType: ProfilType = 2;

  searchTerm: string = '';
  selectedFilter: string = 'title';
  // filterOptions: { [key: string]: string[] } = {
  //   title: [],
  //   level: ['Débutant', 'Intermédiaire', 'Avancé'],
  //   domain: ['Technologie', 'Design', 'Marketing'],
  //   status: ['En cours', 'Planifié', 'Terminé'],
  // };

  domainColors = ['#8A2BE2', '#FFD700', '#40E0D0', '#FF4500', '#ADFF2F'];
  selectedProject: Iproject | null = null; // Pour suivre le projet sélectionné dans la modale

  ngOnInit() {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    this.getProjects();
  }

  filterProjects() {
    console.log('searchTerm', this.searchTerm);
    console.log('selectedFilter', this.selectedFilter);
    console.log('projectsData', this.projectsData);

    let result = [...this.projectsData];
    if (this.searchTerm) {
      result = result.filter((project) => {
        const rawValue = project[this.selectedFilter as keyof Project] ?? '';
        const value = rawValue.toString().toLowerCase();
        return value.includes(this.searchTerm.toLowerCase());
      });
    }
    this.filteredProjects = result;
    console.warn('projets filter', this.filteredProjects);
  }

  onSearchChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterProjects();
  }

  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.selectedFilter = selectElement.value;
      this.searchTerm = '';
      this.filterProjects();
    }
  }

  // toggleFavorite(project: Project) {
  //   project.isFavorite = !project.isFavorite;
  // }

  getRelativeDate(date: string | Date): string {
    const d = new Date(date); // conversion en objet Date
    if (isNaN(d.getTime())) return ''; // sécurité si date invalide

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "aujourd'hui";
    if (diffDays === 1) return 'il y a 1 jour';
    if (diffDays < 7) return `il y a ${diffDays} jours`;
    if (diffDays < 30) return 'il y a une semaine';
    if (diffDays < 365) return 'il y a un mois';
    return "il y a plus d'un an";
  }

  getRandomColor(): string {
    return this.domainColors[
      Math.floor(Math.random() * this.domainColors.length)
    ];
  }

  getAvatarColor(pseudo: string): string {
    let hash = 0;
    for (let i = 0; i < pseudo.length; i++) {
      hash = pseudo.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 50%)`;
  }

  showContributors(project: Iproject) {
    this.selectedProject = project;
  }

  closeModal(event: MouseEvent) {
    this.selectedProject = null;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // joinProject(id: number): void {
  //   if (this.profilType == 2) {
  //     this.router.navigate(['/shared/user-sidebar']);
  //   }
  //   this.userService.joinProjectWithProfilType(
  //     id,
  //     this.userId,
  //     this.profilType
  //   );
  //   console.log(
  //     `ça marche vous avez rejoin le projet ${id},
  //     avec votre id ${this.userId} et avec le profil ${this.profilType}`
  //   );
  // }
  getProjects() {
    this._projectService.getProjects().subscribe({
      next: (response) => {
        this.projectsData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log(this.projectsData);
        this.filterProjects();

        this.projectsData.forEach((project: any) => {
          const memberUserIds =
            project.members?.map((m: any) => m.userId) || [];
          const userObservables = memberUserIds.map((id: number) =>
            this._userService.getUserById(id)
          );

          if (userObservables.length > 0) {
            forkJoin<any[]>(userObservables).subscribe((users: any[]) => {
              console.log('users récupérés:', users);
              this.membersSpeudos[project.id] = users.map((u) => u.data.speudo);
              console.log(
                `Speudos du projet ${project.id}:`,
                this.membersSpeudos[project.id]
              );
              console.warn(this.membersSpeudos);
            });
          } else {
            this.membersSpeudos[project.id] = [];
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      },
    });
  }

  showModal = false;

  onSubmit(profile: string) {
    console.log('Profil choisi :', profile);
    if (profile === 'Gestionnaire') {
      this.router.navigate(['/user/manager-submit-form']);
    } else if (profile === 'Designer') {
      if (
        1 === 1
        // this.selectedProject &&
        // this.selectedProject.id
        // &&
        // this.currentUser &&
        // this.currentUser.id
      ) {
        this.joinProjectWithProfilType(5, 5, 'DESIGNER');
      } else {
        console.error('selectedProject or currentUser is null');
      }
    } else {
      if (
        this.selectedProject &&
        this.selectedProject.id &&
        this.currentUser &&
        this.currentUser.id
      ) {
        this.joinProjectWithProfilType(
          this.selectedProject.id,
          this.currentUser.id,
          'DEVELOPER'
        );
        alert('mercu vous etre dev');
      } else {
        console.error('currentUser is null');
      }
    }

    this.showModal = false; // ferme aussi après soumission
  }

  openModal(): void {
    this.showModal = true;
  }

  // Méthode appelée lorsque le modal émet l'événement 'closeModal'
  onModalClose(): void {
    this.showModal = false;
  }

  joinProjectWithProfilType(
    projectId: number,
    userId: number,
    profilType: string
  ) {
    this._projectService
      .joinProjectWithProfilName(projectId, userId, profilType)
      .subscribe({
        //12, 5, 'DESIGNER'
        next: (res) => console.log('Rejoint projet avec profil', res),
        error: (err) => console.error('Erreur join project', err),
      });
  }
}
