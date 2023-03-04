import api from 'src/api';

export default {
  async registerUser(context, payload) {
    const user = {
      userName: payload.userName,
      email: payload.userEmail,
      password: payload.password,
      userType: payload.userType,
    };
    try {
      await api.users.register(user);
      await context.dispatch('login', {
        UserName: user.userName,
        Password: user.password,
      });
    } catch (error) {
      throw error;
    }
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  async login(context, payload) {
    try {
      const response = await api.auth.login(payload);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('expireDate', response.data.data.expireDate);
      localStorage.setItem('userId', response.data.data.userId);
      const userToStore = {
        token: response.data.data.token,
        userId: response.data.data.userId,
      };
      context.commit('setUser', userToStore);
    } catch (error) {
      throw error;
    }
  },

  async logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
};
