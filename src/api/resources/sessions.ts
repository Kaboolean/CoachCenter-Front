import http from '../http';
import {
  ListSessionModel,
  GetSessionModel,
  CreateSessionModel,
  UpdateSessionModel,
} from '../models/sessions';
import { ListParticipantModel } from '../models/users';
const resource = 'sessions';

//classe exportée puis importée dans src/api/index.ts
//cette classe importe et utilise les DTO dans src/api/models qui correspondent aux DTO côté back
//c'est dans cette classe que sont déclarées les méthodes d'appels API
export default class SessionsResource {
  //méthode async list
  public async SessionsList() {
    const result = await http.get<ListSessionModel[]>(`${resource}`);
    return result.data;
  }
  public async GetSessionById(id: string) {
    const result = await http.get<GetSessionModel>(`${resource}/${id}`);
    return result.data.data;
  }

  public async GetSessionParticipants(id: string) {
    const result = await http.get<ListParticipantModel>(
      `${resource}/${id}/participants`
    );
    return result.data.data;
  }

  public async GetCoachSessions(id: string) {
    const result = await http.get<ListSessionModel[]>(
      `${resource}/${id}/coach`
    );
    return result.data.data;
  }

  public async JoinSession(sessionId: string) {
    console.log(sessionId);
    await http.post(`${resource}/${sessionId}`);
  }

  public async CreateSession(session: CreateSessionModel) {
    const result = await http.post<string>(`${resource}`, session);
    return result.data;
  }

  public async UpdateSession(session: UpdateSessionModel) {
    const result = await http.put<string>(`${resource}`, session);
    return result.data;
  }

  public async DeleteSession(id: string) {
    try {
      await http.delete(`${resource}/${id}`);
    } catch (err: any) {
      throw err;
    }
  }
}
