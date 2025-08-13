
export type BadgeColor = 'green' | 'yellow' | 'red';
export type UserProfile = 'DESIGNER' | 'DEVELOPER';

export interface IUser {
  id: number;
  pseudo: string;
  badge: BadgeColor;
  profile: UserProfile;
}