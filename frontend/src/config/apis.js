export const authApiUrl = {
    refreshToken: '/api/auth/refreshtoken',
    login: '/api/auth/login',
    register: '/api/auth/register',
    registerRecruiter: '/api/auth/register/recruiter',
    fetchUser: '/api/auth/fetchUser',
    logout: '/api/auth/logout',
};
// deleted a job
export const jobsApiUrl = {
    getList: '/api/job',
    postJobDesc: '/api/job',
    deletedJobDesc: '/api/job',
    applyJobs: 'api/applicants',
};

export const uploadApiUrl = {
    uploadImage: 'api/upload',
    uploadCloudinary: '/api/upload-cloudinary',
};

export const usersApiUrl = {
    allUsers: '/api/user/',
    deleteUser: '/api/user/',
    getDetailRecruiter: '/api/user/',
    updateProfile: '/api/user/update',
};

export const searchApiUrl = {
    getCategories: '/api/search/categories',
    getJobList: '/api/search/jobs',
};

export const chartApiUrl = {
    getAdminChart: '/api/chart/admin',
};

export const candidatesApiUrl = {
    getCandidates: '/api/applicants',
};

export const _LIMIT_PAGE = 16;
