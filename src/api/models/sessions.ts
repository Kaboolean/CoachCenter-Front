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
