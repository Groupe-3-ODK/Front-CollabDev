// Interface pour une demande de contribution (candidature de manager)
export interface IContributionRequest {
  userId: any;
  id: number; 
  candidateProfileId: number; 
  candidateName: string; 
  requestDate: string; 
}

export interface Iproject {
  id: number;
  title: string;
  description: string;
  domain: Domain;
  specification?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'VALIDATED';
  author: UserResponseDTO;
  pendingRequestsCount?: number;
  managerId: Profil | null; 
  level: Level;
  githubLink?: string;
  tasks: Task[];
  members: Profil[];
  pendingProfiles: Profil[];
  contributionRequests: IContributionRequest[]; 
  coins: number;
  comments: Comment[];
  createdDate: string; 
  progress?: number;
  technologies?: String[];
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
  status: Status;
  completed: boolean;
}

export interface Comment {
  id: number;
  content: string;
  author: Profil;
  createdAt: string;
}
