import axiosClient from '~/apis/config';
import config from '~/config';

export const getCandidatesApi = async () => {
    return await axiosClient.get(config.candidatesApiUrl.getCandidates);
};
