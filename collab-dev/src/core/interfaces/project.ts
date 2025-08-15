// Interface pour une demande de contribution (candidature de manager)
export interface IContributionRequest {
  id: number; // Ceci est l'ID de la demande elle-même
  candidateProfileId: number; // NOUVEAU : L'ID du Profil du candidat
  candidateName: string; // Nom du candidat
  requestDate: string;   // Date de la demande (ISO 8601 string)
}

export interface Iproject {
  id: number;
  title: string;
  description: string;
  domain: Domain;
  specification?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'VALIDATED';
  author: UserResponseDTO;

  managerId: Profil | null; // Peut être null si aucun manager n'est assigné
  status: Status;

  level: Level;
  githubLink?: string;
  tasks: Task[];
  members: Profil[];
  pendingProfiles: Profil[];
  contributionRequests: IContributionRequest[]; // Utilise la nouvelle interface
  coins: number;
  comments: Comment[];
  createdDate: string; // LocalDate → string ISO
  progress?: number;
  technologies?: String[]
  
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
  id: number; // L'ID du profil
  name: string;
  bio?: string;
  skills?: string[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status
  completed: boolean;
}

export interface Comment {
  id: number;
  content: string;
  author: Profil;
  createdAt: string;
}
