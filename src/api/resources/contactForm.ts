import http from '../http';
import { GuestContactForm, UserContactForm } from '../models/contactForms';

const resource = 'contactforms';

export default class ContactFormsResource {
  //méthode async list
  public async CreateGuestContactForm(form: GuestContactForm) {
    const result = await http.post(`${resource}/guest`, form);
    return result.data;
  }

  public async CreateUserContactForm(form: UserContactForm) {
    const result = await http.post(`${resource}/user`, form);
    return result.data;
  }
}
