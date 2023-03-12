import UsersResource from './resources/users';
import AuthResource from './requests/auth';
import SessionsResource from './resources/sessions';

//api de type ApiType (typescript) qui est l'interface déclarée plus bas
const api: ApiType = {
  //permet l'appel de la table users côté back avec api.users
  //UsersResource importé est une classe
  users: new UsersResource(),
  auth: new AuthResource(),
  sessions: new SessionsResource(),
};

export interface ApiType {
  users: UsersResource;
  auth: AuthResource;
  sessions: SessionsResource;
}

//permet l'appel de l'api avec le mot clé api.
export default api;
