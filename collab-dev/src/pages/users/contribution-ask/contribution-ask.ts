import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-contribution-ask',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contribution-ask.html',
  styleUrls: ['./contribution-ask.css'],
})
export class ContributionAsk implements OnInit {
  contributions: any[] = [];
  userId: number = 0; // ID de l'utilisateur connecté


  private router = inject(Router);
  public currentUser: any = null;
  constructor(private projectService: ProjectService, private cookieService: CookieService) {}

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.userId = cookieValue ? JSON.parse(cookieValue).id : 0;
    if (this.userId) {
      this.loadPendingContributions();
    }
  }

    loadPendingContributions() {
    this.projectService.getPendingProjectsByUser(this.userId).subscribe({
      next: (res) => {
        this.contributions = res.data;
        if (this.contributions && this.contributions.length > 0) {
          console.log('members:', this.contributions[0].members);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelRequest(projectId: number) {
    this.projectService.cancelPendingRequest(projectId, this.userId).subscribe({
      next: () => {
        this.contributions = this.contributions.filter(p => p.id !== projectId);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Filtre actuel pour les projets

  filter: string = 'all';

  /**
   * Retourne la liste des projets filtrés en fonction du filtre actuel.
   * @returns {any[]} La liste des projets filtrés.
   */
  get filteredProjects(): any[] {
    switch (this.filter) {
      case 'all':
        return this.contributions;
      case 'code':
        return this.contributions.filter((project: any) =>
          Array.isArray(project.members) &&
          project.members.some(
            (m: any) => m.userId === this.userId && m.profilName?.toUpperCase() === 'DEVELOPER'
          )
        );
      case 'design':
        return this.contributions.filter((project: any) =>
          Array.isArray(project.members) &&
          project.members.some(
            (m: any) => m.userId === this.userId && m.profilName?.toUpperCase() === 'DESIGNER'
          )
        );
      case 'management':
        return this.contributions.filter((project: any) =>
          project.managerId &&
          project.managerId.userId === this.userId &&
          project.managerId.profilName?.toUpperCase() === 'MANAGER'
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
      case 'BEGINNER':
        return '#DDEEBB';
      case 'INTERMEDIATE':
        return '#92D3FB';
      case 'ADVANCED':
        return '#FBC792';
      default:
        return '#FFFFFF';
    }
  }
  public isDeveloper(contribution: any): boolean {
    return contribution && contribution.members && Array.isArray(contribution.members)
      ? contribution.members.some((m: any) => m.userId === this.userId && m.profilName === 'DEVELOPER')
      : false;
  }
  public isDesigner(contribution: any): boolean {
    return contribution && contribution.members && Array.isArray(contribution.members)
      ? contribution.members.some((m: any) => m.userId === this.userId && m.profilName === 'DESIGNER')
      : false;
  }
  public isManager(contribution: any): boolean {
    return contribution && contribution.managerId
      ? contribution.managerId.userId === this.userId
      : false;
  }
}
