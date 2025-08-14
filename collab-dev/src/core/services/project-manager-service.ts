import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importe 'of' pour créer des observables
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
      managerId: null, // Pas de manager assigné initialement pour ce projet
      status: 'TODO',
      level: 'INTERMEDIATE',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [ // Exemples de demandes pour ce projet
        { id: 101, candidateName: 'Aïssatou Coulibaly', requestDate: '2025-11-11' },
        { id: 102, candidateName: 'Amadou Diallo', requestDate: '2025-11-12' }
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
      managerId: { id: 20, name: 'Lamine Traoré', bio: 'Expert en marketing digital' }, // Manager assigné
      status: 'IN_PROGRESS',
      level: 'BEGINNER',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [ // Une seule demande pour ce projet
        { id: 201, candidateName: 'Mariam Kone', requestDate: '2025-11-15' }
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
      managerId: { id: 30, name: 'Samba Diop', bio: 'Consultant CRM' }, // Manager assigné
      status: 'DONE',
      level: 'ADVANCED',
      tasks: [],
      members: [],
      pendingProfiles: [],
      contributionRequests: [], // Aucune demande en attente pour ce projet
      coins: 200,
      comments: [],
      createdDate: '2025-10-20'
    }
  ];

  /**
   * Récupère tous les projets.
   * @returns Un Observable qui émet la liste de tous les projets.
   */
  getProjects(): Observable<Iproject[]> {
    return of(this.projects);
  }

  /**
   * Récupère un projet spécifique par son ID.
   * @param id L'ID du projet à récupérer.
   * @returns Un Observable qui émet le projet trouvé ou `undefined` si non trouvé.
   */
  getProjectById(id: number): Observable<Iproject | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  /**
   * Simule l'acceptation d'une demande de contribution pour un manager.
   * Dans une vraie application, cela mettrait à jour le backend.
   * @param projectId L'ID du projet concerné.
   * @param requestId L'ID de la demande à accepter.
   */
  acceptRequest(projectId: number, requestId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const requestIndex = project.contributionRequests.findIndex(req => req.id === requestId);
      if (requestIndex !== -1) {
        const acceptedRequest = project.contributionRequests.splice(requestIndex, 1)[0];
        console.log(`Demande ${acceptedRequest.candidateName} (ID: ${requestId}) acceptée pour le projet "${project.title}" (ID: ${projectId}).`);

        // Simule l'assignation du manager au projet (si le projet n'en a pas déjà un)
        if (!project.managerId) {
          project.managerId = { id: acceptedRequest.id, name: acceptedRequest.candidateName, bio: 'Nouveau manager assigné' };
          console.log(`Le projet "${project.title}" a maintenant ${acceptedRequest.candidateName} comme manager.`);
        }
      } else {
        console.warn(`Demande avec l'ID ${requestId} non trouvée dans le projet ${projectId}.`);
      }
    } else {
      console.warn(`Projet avec l'ID ${projectId} non trouvé.`);
    }
  }

  /**
   * Simule le refus d'une demande de contribution pour un manager.
   * Dans une vraie application, cela mettrait à jour le backend.
   * @param projectId L'ID du projet concerné.
   * @param requestId L'ID de la demande à refuser.
   */
  rejectRequest(projectId: number, requestId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const requestIndex = project.contributionRequests.findIndex(req => req.id === requestId);
      if (requestIndex !== -1) {
        const rejectedRequest = project.contributionRequests.splice(requestIndex, 1)[0];
        console.log(`Demande ${rejectedRequest.candidateName} (ID: ${requestId}) refusée pour le projet "${project.title}" (ID: ${projectId}).`);
      } else {
        console.warn(`Demande avec l'ID ${requestId} non trouvée dans le projet ${projectId}.`);
      }
    } else {
      console.warn(`Projet avec l'ID ${projectId} non trouvé.`);
    }
  }

  /**
   * Récupère les projets ayant des demandes de manager en attente.
   * @returns Un Observable qui émet la liste des projets avec des demandes en attente.
   */
  getPendingManagerRequests(): Observable<Iproject[]> {
    return of(this.projects.filter(p => p.contributionRequests && p.contributionRequests.length > 0));
  }
}

