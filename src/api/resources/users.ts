import http from '../http';
import {
  ListUserModel,
  ListUserQueryParameters,
  GetUserModel,
} from '../models/users';

const resource = 'users';

export default class UsersResource {
  public async list(
    queryParams?: ListUserQueryParameters | null
  ): Promise<ListUserModel[]> {
    const params = queryParams ? queryParams : {};
    // get http://localhost:5065/users
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
}
