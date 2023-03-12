import http from '../http';
import { ListSessionModel } from '../models/sessions';

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
}
