export interface ListUserModel {
  id: string;
  userName: string;
  email: string;
  lastLoginDate: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string;
}

export interface ListUserQueryParameters {
  search: string | null;
  userName: string | null;
}

export interface GetUserModel {
  id: string;
  userName: string;
  email: string;
  lastLoginDate: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string;
  userType: string;
}

export interface CreateUserModel {
  userName: string;
  email: string;
  password: string;
  userType: string;
}

export interface GetUserDetailsModel {
  id: string;
  userName: string;
  email: string;
  lastLoginDate?: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string;
  userType: string;
  goal?: string;
  age?: number;
  height?: string;
  weight?: string;
  handicap?: string;
  grades?: string;
  description?: string;
  hourlyRate?: string;
}

export enum UserType {
  coach = 'coach',
  client = 'client',
}

export interface ListParticipantModel {
  age: number;
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
}
