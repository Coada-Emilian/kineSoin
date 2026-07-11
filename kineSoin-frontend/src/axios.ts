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

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const auth = await refreshAuthentication();

      if (auth) {
        originalRequest.headers.Authorization = `Bearer ${auth.token}`;

        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
