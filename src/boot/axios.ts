import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import api, { ApiType } from '../api/index';
import interceptors from '../api/interceptors';
import httpClient from 'src/api/http';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: ApiType;
  }
}

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  interceptors(httpClient, router);
});

export { api };
