export interface IApiResponse {
  code: string;
  message: string;
  data: any;
}

export interface UserData {
  pseudo: string;
  designers: never[];
  id: number;
  speudo: string;
  email: string;
  profils: any[];
  role: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  domain: string;
  author: UserData;
  managerId: any;
  status: string | null;
  level: string | null;
  githubLink: string | null;
  tasks: any[];
  members: UserData[];
  pendingProfiles: UserData[];
  coins: number;
  comments: any[];
  contributionRequests: any[];
  createdDate: string;
  pendingRequestsCount?: number;
}
