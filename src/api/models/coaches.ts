export interface GetCoachModel {
  grades: string;
  description: string;
  hourlyRate: number;
}

export interface GetCoachModelWithId extends GetCoachModel {
  userId: string;
}
