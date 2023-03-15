export interface ListSessionModel {
  id: string;
  name: string;
  date: string;
  location: string;
  duration: number;
  description: string;
  coachId: string;
  coachFirstName: string;
  coachLastName: string;
  tags: string[];
  participantCount: number;
}

export interface GetSessionModel {
  id: string;
  name: string;
  date: string;
  location: string;
  duration: number;
  description: string;
  tags: string[];
  coachUserId: string;
  coachUserName: string;
  coachFirstName: string;
  coachLastName: string;
  coachGrades: string;
  coachDescription: string;
  coachHourlyRate: number;
}

export interface CreateSessionModel {
  name: string;
  date: string;
  location: string;
  duration: number;
  description: string;
  tags: string[];
}

export interface UpdateSessionModel {
  id: string;
  name: string;
  date: string;
  location: string;
  duration: number;
  description: string;
  tags: string[];
}
