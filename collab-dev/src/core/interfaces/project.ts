export interface Iproject {
  id: number;
  title: string;
  description: string;
  domain: Domain;
  specification?: string;

  author: UserResponseDTO;
  managerId: Profil;
  status: Status;
  level: Level;
  githubLink?: string;
  tasks: Task[];
  members: Profil[];
  pendingProfiles: Profil[];
  coins: number;
  comments: Comment[];
  contributionRequests: Profil[];
  createdDate: string; // LocalDate → string ISO
}

/** ENUMS (même valeurs que côté Java) */
export type Domain = 'TECH' | 'DESIGN' | 'MARKETING' | 'OTHER'; // à adapter selon ton enum Domain Java
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'VALIDATED'; // idem
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'; // idem

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
