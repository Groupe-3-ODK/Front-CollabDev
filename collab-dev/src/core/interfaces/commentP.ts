export interface IProjectOwner {
  name: string;
  projectsCount: number;
  memberSince: string;
}

export interface IProjectMember {
  name: string;
  role?: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  status: string;
  level: string;
  progress: number;
  creationDate: string;
  currentPhase: string;
  technologies: string[];
  owner: IProjectOwner;
  members: IProjectMember[];
}