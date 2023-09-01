import axiosClient from '~/apis/config';
import config from '~/config';

export const getChartAdminApi = async () => {
    try {
        return await axiosClient.get(config.chartApiUrl.getAdminChart);
    } catch (error) {
        console.log(error);
    }
};
