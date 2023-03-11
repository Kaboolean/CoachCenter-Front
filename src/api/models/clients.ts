export interface GetClientModel {
  goal: string;
  age: number;
  height: number;
  weight: number;
  handicap: string;
}

export interface GetClientModelWithId extends GetClientModel {
  userId: string;
}
