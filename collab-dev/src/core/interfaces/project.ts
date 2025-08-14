// Interface pour une demande de contribution (candidature de manager)
export interface IContributionRequest {
  id: number;
  candidateName: string; // Nom du candidat
  requestDate: string;   // Date de la demande (ISO 8601 string)
  // Ajoutez d'autres propriétés pertinentes pour une demande si nécessaire,
  // par exemple un lien vers le profil du candidat, son CV, etc.
}

export interface Iproject {
  id: number;
  title: string;
  description: string;
  domain: Domain;
  specification?: string;

  author: UserResponseDTO;
  managerId: Profil | null; // Peut être null si aucun manager n'est assigné
  status: Status;
  level: Level;
  githubLink?: string;
  tasks: Task[];
  members: Profil[];
  pendingProfiles: Profil[];
  contributionRequests: IContributionRequest[]; // Utilise la nouvelle interface pour les demandes
  coins: number;
  comments: Comment[];
  createdDate: string; // LocalDate → string ISO
}

/** ENUMS (même valeurs que côté Java) */
export type Domain = 'TECH' | 'DESIGN' | 'MARKETING' | 'OTHER';
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'VALIDATED';
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

/** Interfaces minimales des sous-objets */
export interface UserResponseDTO {
  id: number;
  pseudo: string;
  email: string;
  role: string;
}

export interface Profil {
  id: number;
  name: string;
  bio?: string;
  skills?: string[];
  // Ajoutez d'autres propriétés de Profil si nécessaire
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export interface Comment {
  id: number;
  content: string;
  author: Profil;
  createdAt: string;
}
