import axiosClient from '~/apis/config';
import config from '~/config';

export const getListJobApi = async () => {
    return await axiosClient.get(config.jobsApiUrl.getList);
};

// post a job
export const postJobDesc = async (data) => {
    return await axiosClient.post(config.jobsApiUrl.postJobDesc, data);
};

export const editJobDesc = async (body) => {
    return await axiosClient.put(
        `${config.jobsApiUrl.postJobDesc}/${body.id}`,
        body.data,
    );
};
// deleted a job
export const deletedJobDesc = async (id) => {
    return await axiosClient.delete(
        `${config.jobsApiUrl.deletedJobDesc}/${id}`,
    );
};

// get detail job
export const getDetailPost = (id) => {
    return axiosClient.get(`${config.jobsApiUrl.getList}/${id}`);
};

export const applyJobsApi = (data) => {
    return axiosClient.post(config.jobsApiUrl.applyJobs, data);
};
