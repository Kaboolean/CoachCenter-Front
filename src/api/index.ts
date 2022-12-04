import UsersResource from './resources/users';

const api: ApiType = {
  users: new UsersResource(),
};

export interface ApiType {
  users: UsersResource;
}

export default api;
