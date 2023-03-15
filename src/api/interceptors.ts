import { Router } from 'vue-router';
import { AxiosInstance } from 'axios';

interface IAxiosError {
  response: IAxiosResponse;
}

interface IAxiosResponse {
  status: number;
}

export default (http: AxiosInstance, router: Router) => {
  http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') as string | undefined;
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error as IAxiosError;
      if (!response) {
        return Promise.reject(error);
      }

      if ([403].includes(response.status)) {
        await router.replace({ name: 'error-403' });
      }

      if ([401].includes(response.status)) {
        await router.replace('/login');
      }

      return Promise.reject(error);
    }
  );
};
