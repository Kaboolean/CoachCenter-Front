import UsersResource from './resources/users';
import AuthResource from './resources/auth';
import SessionsResource from './resources/sessions';
import ContactFormResource from './resources/contactForm';

//api de type ApiType (typescript) qui est l'interface déclarée plus bas
const api: ApiType = {
  //UsersResource importé est une classe
  users: new UsersResource(),
  auth: new AuthResource(),
  sessions: new SessionsResource(),
  contactForms: new ContactFormResource(),
};

export interface ApiType {
  users: UsersResource;
  auth: AuthResource;
  sessions: SessionsResource;
  contactForms: ContactFormResource;
}

//permet l'appel de l'api avec le mot clé api.
export default api;
