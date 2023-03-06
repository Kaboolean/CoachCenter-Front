export default {
  getUser(state) {
    const user = {
      token: state.token,
      userId: state.userId,
    };
    return user;
  },
  getUserId(state) {
    return state.userId;
  },
  getUserType(state) {
    return state.userType;
  },
  // isAuthenticated(state) {
  //   return !!state.token;
  // },
  isAuthenticated(state) {
    const user = {
      token: !!state.token,
      userType: state.userType,
    };
    return user;
  },
  isAutoLogout(state) {
    return state.didAutoLogout;
  },
};
