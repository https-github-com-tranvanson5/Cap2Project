import {
    LOCAL_STORAGE_REFRESH_TOKEN_NAME,
    LOCAL_STORAGE_TOKEN_NAME,
} from '~/constants/constants';

class TokenService {
    getLocalRefreshToken() {
        return localStorage[LOCAL_STORAGE_REFRESH_TOKEN_NAME];
    }

    updateLocalRefreshToken(token) {
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME, token);
    }

    getLocalAccessToken() {
        return localStorage[LOCAL_STORAGE_TOKEN_NAME];
    }

    updateLocalAccessToken(token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
    }

    removeAccessToken() {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    }
}

export default new TokenService();
