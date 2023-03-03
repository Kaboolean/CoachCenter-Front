export default {
  getUser(state) {
    const user = {
      token: state.token,
      userId: state.userId,
    };
    return user;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
