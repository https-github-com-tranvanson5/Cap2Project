export const isLoadingSelector = (state) => {
    return state.home?.isLoading;
};

export const jobListSelector = (state) => {
    return state.home?.jobList;
};

export const jobSelector = (state) => {
    return state.home?.job;
};

export const messageSelector = (state) => {
    return state.home?.messsage;
};
