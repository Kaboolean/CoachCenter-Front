import http from '../http';
import {
  ListUserModel,
  ListUserQueryParameters,
  GetUserModel,
  CreateUserModel,
} from '../models/users';

const resource = 'users';

//classe exportée puis importée dans src/api/index.ts
//cette classe importe et utilise les DTO dans src/api/models qui correspondent aux DTO côté back
//c'est dans cette classe que sont déclarées les méthodes d'appels API
export default class UsersResource {
  //méthode async list
  public async list(
    queryParams?: ListUserQueryParameters | null
  ): Promise<ListUserModel[]> {
    const params = queryParams ? queryParams : {};
    // get http://localhost:5065/users
    //contact direct avec le controller
    const result = await http.get<ListUserModel[]>(resource, {
      params,
    });
    return result.data;
  }

  public async getById(id: string): Promise<GetUserModel> {
    // get http://localhost:5065/users/{id}
    const result = await http.get<GetUserModel>(`${resource}/${id}`);
    return result.data;
  }

  public async register(CreateUserModel: CreateUserModel) {
    try {
      const result = await http.post(`${resource}`, CreateUserModel);
      return result;
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteUserById(id: string) {
    try {
      await http.delete(`${resource}/${id}`);
    } catch (err: any) {
      throw err;
    }
  }
}
