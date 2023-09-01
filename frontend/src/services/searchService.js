import axiosClient from '~/apis/config';
import config from '~/config';

export const getCategoriesSearch = async () => {
    return await axiosClient.get(config.searchApiUrl.getCategories);
};

export const getJobsSearch = async (title) => {
    return await axiosClient.get(
        `${config.searchApiUrl.getJobList}?title=${title}`,
    );
};
