import axiosClient from '~/apis/config';
import config from '~/config';

export const uploadImageApi = async (data) => {
    return await axiosClient.post(config.uploadApiUrl.uploadImage, data);
};

export const cloudinaryUploadApi = async (fileToUpload) => {
    return await axiosClient.post(
        config.uploadApiUrl.uploadCloudinary,
        // "http://localhost:3000"
        fileToUpload,
    );
};
