import axios from 'axios';

import { API_URL } from '~/constants/constants';
import TokenService from '~/services/tokenService';
import { refreshTokenApi } from '~/services/userService';

const axiosClient = axios.create({
    baseURL: API_URL,
});

axiosClient.interceptors.request.use(
    (config) => {
        const localToken = TokenService.getLocalAccessToken();

        if (localToken) {
            config.headers.common['Authorization'] = `Bearer ${localToken}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            const token = response.data.data?.accessToken;

            if (token) {
                TokenService.updateLocalAccessToken(token);
            }

            return response.data;
        }

        return response.data;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/api/auth/register' && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshTokenApi({
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const accessToken = rs.data.data.accessToken;
                    TokenService.updateLocalAccessToken(accessToken);

                    return axiosClient(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }

        return Promise.reject(err);
    },
);

export default axiosClient;
