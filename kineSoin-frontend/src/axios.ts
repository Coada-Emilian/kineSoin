import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshAuthentication } from './utils/functions/authentication/refreshAuthentication';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    // Ignore requests without a config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Never attempt to refresh if the refresh endpoint itself failed
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    // Only attempt a refresh once for 401 responses
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const auth = await refreshAuthentication();

      if (!auth) {
        return Promise.reject(error);
      }

      originalRequest.headers.set('Authorization', `Bearer ${auth.token}`);

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
