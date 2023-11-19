
import axios from 'axios';
import config from '~/config';

export const getCategoriesSearch = async () => {
    return await axios.get('http://localhost:8080/api/search/categories');
};

export const getJobsSearch = async (title) => {
    return await axios.get(
        `${'http://localhost:8080/api/search/jobs'}?title=${title}`,
    );
};
