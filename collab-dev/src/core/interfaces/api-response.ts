export interface IApiResponse {
  code: string;
  message: string;
  data: UserData;
}

export interface UserData {
  designers: never[];
  id: number;
  speudo: string;
  email: string;
  profils: any[]; // Si tu connais le type des profils, remplace `any` par l'interface correspondante
  role: string;
}

