import authGetters from './getters.js';
import authActions from './actions.js';
import authMutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      tokenId: '',
      userId: '',
    };
  },
  getters: authGetters,
  actions: authActions,
  mutations: authMutations,
};
