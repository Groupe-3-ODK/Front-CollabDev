import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iproject, IContributionRequest, Profil } from '../interfaces/project'; // Importe les interfaces nécessaires

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private projects: Iproject[] = [
    {
      id: 1,
      title: 'Projet ALP',
      description: 'Développement d\'une application de gestion de projets.',
      domain: 'TECH',
      author: { id: 1, pseudo: 'Seydou Dembele', email: 'seydou@example.com', role: 'ADMIN' },
      managerId: null,
      status: 'TODO',
      level: 'INTERMEDIATE',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [
        { id: 101, candidateProfileId: 1001, candidateName: 'Aïssatou Coulibaly', requestDate: '2025-11-11' }, // Ajout de candidateProfileId
        { id: 102, candidateProfileId: 1002, candidateName: 'Amadou Diallo', requestDate: '2025-11-12' }     // Ajout de candidateProfileId
      ],
      coins: 100,
      comments: [],
      createdDate: '2025-11-10'
    },
    {
      id: 2,
      title: 'Projet Beta',
      description: 'Refonte du site web institutionnel.',
      domain: 'MARKETING',
      author: { id: 3, pseudo: 'Fatima Zahra', email: 'fatima@example.com', role: 'ADMIN' },
      managerId: { id: 20, name: 'Lamine Traoré', bio: 'Expert en marketing digital' },
      status: 'IN_PROGRESS',
      level: 'BEGINNER',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [
        { id: 201, candidateProfileId: 2001, candidateName: 'Mariam Kone', requestDate: '2025-11-15' } // Ajout de candidateProfileId
      ],
      coins: 150,
      comments: [],
      createdDate: '2025-11-05'
    },
    {
      id: 3,
      title: 'Projet Gamma',
      description: 'Implémentation d\'un système de CRM.',
      domain: 'TECH',
      author: { id: 4, pseudo: 'Cheikh Sarr', email: 'cheikh@example.com', role: 'ADMIN' },
      managerId: { id: 30, name: 'Samba Diop', bio: 'Consultant CRM' },
      status: 'DONE',
      level: 'ADVANCED',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [],
      coins: 200,
      comments: [],
      createdDate: '2025-10-20'
    }
  ];

  getProjects(): Observable<Iproject[]> {
    return of(this.projects);
  }

  getProjectById(id: number): Observable<Iproject | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  acceptRequest(projectId: number, requestId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const requestIndex = project.contributionRequests.findIndex(req => req.id === requestId);
      if (requestIndex !== -1) {
        const acceptedRequest = project.contributionRequests.splice(requestIndex, 1)[0];
        console.log(`Demande ${acceptedRequest.candidateName} (ID de demande: ${requestId}, ID de profil: ${acceptedRequest.candidateProfileId}) acceptée pour le projet "${project.title}" (ID: ${projectId}).`);

        // Simule l'assignation du manager au projet (si le projet n'en a pas déjà un)
        if (!project.managerId) {
          project.managerId = { id: acceptedRequest.candidateProfileId, name: acceptedRequest.candidateName, bio: 'Nouveau manager assigné via demande' };
          console.log(`Le projet "${project.title}" a maintenant ${acceptedRequest.candidateName} comme manager.`);
        }
      } else {
        console.warn(`Demande avec l'ID ${requestId} non trouvée dans le projet ${projectId}.`);
      }
    } else {
      console.warn(`Projet avec l'ID ${projectId} non trouvé.`);
    }
  }

  rejectRequest(projectId: number, requestId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const requestIndex = project.contributionRequests.findIndex(req => req.id === requestId);
      if (requestIndex !== -1) {
        const rejectedRequest = project.contributionRequests.splice(requestIndex, 1)[0];
        console.log(`Demande ${rejectedRequest.candidateName} (ID de demande: ${requestId}) refusée pour le projet "${project.title}" (ID: ${projectId}).`);
      } else {
        console.warn(`Demande avec l'ID ${requestId} non trouvée dans le projet ${projectId}.`);
      }
    } else {
      console.warn(`Projet avec l'ID ${projectId} non trouvé.`);
    }
  }

  getPendingManagerRequests(): Observable<Iproject[]> {
    return of(this.projects.filter(p => p.contributionRequests && p.contributionRequests.length > 0));
  }
}
