import http from '../http';

import { LoginModel } from '../models/auth';

export default class AuthResource {
  public async login(LoginModel: LoginModel) {
    try {
      const response = await http.post('auth/login', LoginModel);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
