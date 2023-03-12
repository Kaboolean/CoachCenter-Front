export interface GetCoachModel {
  grades: string;
  description: string;
  hourlyRate: number;
}

export interface UpdateCoachModel {
  userId: string;
  grades: string;
  description: string;
  hourlyRate: number;
}
