import axios from 'axios';

export const getChartAdminApi = async () => {
    try {
        return await axios.get('http://localhost:8080/api/chart/admin ');
    } catch (error) {
        console.log(error);
    }
};
