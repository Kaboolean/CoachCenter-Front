export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userType = payload.userType;
  },
  autoLogout(state) {
    state.didAutoLogout = true;
  },
};
