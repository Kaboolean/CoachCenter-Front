import http from '../http';
import {
  ListUserModel,
  ListUserQueryParameters,
  GetUserModel,
  CreateUserModel,
  GetUserDetailsModel,
} from '../models/users';
import { GetCoachModel, GetCoachModelWithId } from '../models/coaches';
import { GetClientModel, GetClientModelWithId } from '../models/clients';

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

  public async getUserById(id: string): Promise<GetUserModel> {
    // get http://localhost:5065/users/{id}
    const result = await http.get<GetUserModel>(`${resource}/${id}`);

    return result.data;
  }

  public async getCoach(id: string) {
    const result = await http.get<GetCoachModel>(`coaches/${id}`);
    console.log(result);
    return result.data.data;
  }
  public async getClient(id: string) {
    const result = await http.get<GetClientModel>(`clients/${id}`);
    console.log(result);
    return result.data.data;
  }

  public async register(user: CreateUserModel) {
    try {
      const result = await http.post(`${resource}`, user);
      return result.data.data;
    } catch (err: any) {
      throw err;
    }
  }

  public async updateUser(user: GetUserModel) {
    try {
      await http.put(`${resource}`, user);
    } catch (err: any) {
      throw err;
    }
  }
  public async updateCoach(coach: GetCoachModelWithId) {
    try {
      await http.put('/coaches', coach);
    } catch (err: any) {
      throw err;
    }
  }
  public async updateClient(client: GetClientModelWithId) {
    try {
      await http.put('/clients', client);
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
