import api from 'src/api';

export default {
  async registerUser(_, payload) {
    const user = {
      userName: payload.userName,
      email: payload.userEmail,
      password: payload.password,
    };
    //const userType = payload.userType;
    try {
      const response = await api.users.register(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async loginUser(context, payload) {
    const userLogin = {
      ...payload,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXUtNBXTge4dAAqv-0VhJePc42Kc1U4cU`,
        userLogin
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('tokenExpiration', expirationDate);
      const userToStoreLocal = {
        token: response.data.idToken,
        userId: response.data.localId,
      };
      console.log(response);
      console.log(response.data);
      context.commit('setUser', userToStoreLocal);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
