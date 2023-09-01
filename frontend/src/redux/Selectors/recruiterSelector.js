export const isLoadingSelector = (state) => {
    return state.recruiter?.isLoading;
};

export const jobSelector = (state) => {
    return state.recruiter?.job;
};

export const messageRecruiterSelector = (state) => {
    return state.recruiter?.messsage;
};

export const recruiterJobListSelector = (state) =>
    state.recruiter?.recruiterJobList;
