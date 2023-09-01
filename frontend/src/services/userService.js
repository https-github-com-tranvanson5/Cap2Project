import axiosClient from '~/apis/config';
import config from '~/config';

export const registerApi = async (email, password, fullname) => {
    return await axiosClient.post(config.authApiUrl.register, {
        email,
        password,
        fullname,
    });
};

export const registerRecruiterApi = async (email, password, fullname) => {
    return await axiosClient.post(config.authApiUrl.registerRecruiter, {
        role: 'recruiter',
        email,
        password,
        fullname,
    });
};

export const loginApi = async (data) => {
    return await axiosClient.post(config.authApiUrl.login, data);
};

export const refreshTokenApi = async (data) => {
    return await axiosClient.post(config.authApiUrl.refreshToken, data);
};

export const fetchUserApi = async () => {
    return await axiosClient.get(config.authApiUrl.fetchUser);
};

export const logoutApi = async () => {
    return await axiosClient.delete(config.authApiUrl.logout);
};

export const getAllUsersApi = async () => {
    return await axiosClient.get(config.usersApiUrl.allUsers);
};

export const deleteUserApi = async (id) => {
    return await axiosClient.delete(config.usersApiUrl.deleteUser + id);
};

export const getDetailRecuiterByIdApi = async (id) => {
    return await axiosClient.get(config.usersApiUrl.getDetailRecruiter + id);
};

export const updateProfileUserApi = async (data) => {
    return await axiosClient.post(config.usersApiUrl.updateProfile, data);
};
