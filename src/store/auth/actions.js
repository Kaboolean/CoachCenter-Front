import api from 'src/api';

let timer;

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

  async login(context, payload) {
    try {
      const response = await api.auth.login(payload);
      const expiresIn = +response.data.data.expiresIn * 1000;
      const expireDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('expiresIn', response.data.data.expiresIn);
      localStorage.setItem('userId', response.data.data.userId);
      localStorage.setItem('userType', response.data.data.userType);
      localStorage.setItem('expireDate', expireDate);

      const userToStore = {
        token: response.data.data.token,
        userId: response.data.data.userId,
        userType: response.data.data.userType,
      };

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', userToStore);
    } catch (error) {
      throw error;
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    const expireDate = localStorage.getItem('expireDate');

    const expiresIn = expireDate - new Date().getTime();

    if (expiresIn <= 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        userType: userType,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('expireDate');
    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('autoLogout');
  },
};
