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
}
