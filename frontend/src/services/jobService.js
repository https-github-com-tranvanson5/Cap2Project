import axios from 'axios';

export const getListJobApi = async () => {
    return await axios.get('http://localhost:8080/api/user/job/getAllDataListJobBySearch');
};

// post a job
export const postJobDesc = async (data) => {
    return await axios.post('http://localhost:8080/api/admin/job/createJob', data);
};

export const editJobDesc = async (body) => {
    return await axios.put(
        `${'http://localhost:8080/api/pm/job/updateJob'}/${body.id}`,
        body.data,
    );
};
// deleted a job
// export const deletedJobDesc = async (id) => {
//     return await axios.delete(
//         `${config.jobsApiUrl.deletedJobDesc}/${id}`,
//     );
// };

// // get detail job
// export const getDetailPost = (id) => {
//     return axios.get(`${config.jobsApiUrl.getList}/${id}`);
// };

// export const applyJobsApi = (data) => {
//     return axios.post(config.jobsApiUrl.applyJobs, data);
// };

// export const savedRecruitmentApi = (jobId) => {
//     return axios.post(config.jobsApiUrl.savedRecruitment, jobId);
// };

// export const getAllSavedRecruitmentsApi = () => {
//     return axios.get(config.jobsApiUrl.savedRecruitment);
// };
