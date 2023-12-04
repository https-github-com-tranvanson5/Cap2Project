export const jobDetailSelector = (state) => {
    return state.recruitmentDetail?.recruitmentDetailDesc;
};

export const isLoadingRecruitmentSelector = (state) =>
    state.recruitmentDetail?.isLoading;
