import UsersResource from './resources/users';

//api de type ApiType (typescript) qui est l'interface déclarée plus bas
const api: ApiType = {
  //permet l'appel de la table users côté back avec api.users
  //UsersResource importé est une classe
  users: new UsersResource(),
};

export interface ApiType {
  users: UsersResource;
}

//permet l'appel de l'api avec api.
export default api;
