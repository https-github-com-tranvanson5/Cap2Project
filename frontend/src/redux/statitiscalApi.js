import {
    getUserStatitiscalMonthStart,
    getUserStatitiscalMonthSuccess,
    getUserStatitiscalMonthFailed,

    // userMinMaxCreateAt
    getUserMinMaxCreateAtStart,
    getUserMinMaxCreateAtSuccess,
    getUserMinMaxCreateAtFailed,

    //count user
    getUserCountStart,
    getUserCountSuccess,
    getUserCountFailed,

    //count Role
    getUserCountRoleStart,
    getUserCountRoleSuccess,
    getUserCountRoleFailed,

    //getAll
    getAllUsersFailed,
    getAllUsersStart,
    getAllUsersSuccess,
    // UserStatitiscalYear
    getUserStatitiscalYearStart,
    getUserStatitiscalYearSuccess,
    getUserStatitiscalYearFailed,

    //count blog
    getCountBlogStart,
    getCountBlogSuccess,
    getCountBlogFailed,

    //count blog month
    getCountBlogMonthStart,
    getCountBlogMonthSuccess,
    getCountBlogMonthFailed,

    // MinYear
    getMinYearStart,
    getMinYearSuccess,
    getMinYearFailed,

    // getCountBlogYear
    getCountBlogYearStart,
    getCountBlogYearSuccess,
    getCountBlogYearFailed,

    // getqualityJob
    getqualityJobStart,
    getqualityJobSuccess,
    getqualityJobFailed,

    // getqualityJobByStatus
    getqualityJobByStatusStart,
    getqualityJobByStatusSuccess,
    getqualityJobByStatusFailed,

    // getQualityJobMoth
    getQualityJobMothStart,
    getQualityJobMothSuccess,
    getQualityJobMothFailed,

    // getqualityJobByYear
    getQualityJobByYearStart,
    getQualityJobByYearSuccess,
    getQualityJobByYearFailed,

    // rankTopJob
    getRankTopJobStart,
    getRankTopJobSuccess,
    getRankTopJobFailed,

    // rankTopCareer
    getRankTopCareerStart,
    getRankTopCareerSuccess,
    getRankTopCareerFailed,

    // minMaxYearBlog
    getMinMaxYearBlogStart,
    getMinMaxYearBlogSuccess,
    getMinMaxYearBlogFailed,

} from './statitiscalSlice';
export const minMaxYearBlog = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getMinMaxYearBlogStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/blog/admin/yearMinMax`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getMinMaxYearBlogSuccess(data));
        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getMinMaxYearBlogFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const rankTopCareer = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getRankTopCareerStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/rankTopCareer`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getRankTopCareerSuccess(data));
        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getRankTopCareerFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getRankTopJob = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getRankTopJobStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/rankTopJob`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getRankTopJobSuccess(data));
        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getRankTopJobFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getQualityJobByYear = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getQualityJobByYearStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/getqualityJobByYear?status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getQualityJobByYearSuccess(data));
        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getQualityJobByYearFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getJobMinMaxYear = async (jwt, dispatch) => {
    // Dispatch action start
    dispatch(getMinYearStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/getMinMaxYear`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getMinYearSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getMinYearFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getQualityJobMoth = async (jwt, dispatch, year, status) => {
    // Dispatch action start
    dispatch(getQualityJobMothStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/getqualityJobMonthByStatus?status=${status}&year=${year}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getQualityJobMothSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getQualityJobMothFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getqualityJobByStatus = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getqualityJobByStatusStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/getqualityJobByStatus?status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getqualityJobByStatusSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getqualityJobByStatusFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getqualityJob = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getqualityJobStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/job/getqualityJob`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getqualityJobSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getqualityJobFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getCountBlogYear = async (jwt, dispatch, status, year, role) => {
    // Dispatch action start
    dispatch(getCountBlogYearStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/blog/admin/countBlogYear?status=${status}&year=${year}&role=${role}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getCountBlogYearSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getCountBlogYearFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getMinMaxYear = async (jwt, dispatch) => {
    // Dispatch action start
    dispatch(getMinYearStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/blog/admin/yearMinMax`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getMinYearSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getMinYearFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getCountBlogMonth = async (jwt, dispatch, year, status) => {
    // Dispatch action start
    dispatch(getCountBlogMonthStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/blog/admin/countBlogMonth?year=${year}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getCountBlogMonthSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getCountBlogMonthFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getCountBlog = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getCountBlogStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/blog/admin/countBlog?status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getCountBlogSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getCountBlogFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getUserStatistiscalMonth = async (jwt, dispatch, year, status) => {
    // Dispatch action start
    dispatch(getUserStatitiscalMonthStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/countUserByMoth?year=${year}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getUserStatitiscalMonthSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getUserStatitiscalMonthFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getUserStatistiscalYear = async (jwt, dispatch, status) => {
    // Dispatch action start
    dispatch(getUserStatitiscalYearStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/countUserByYear?status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getUserStatitiscalYearSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getUserStatitiscalYearFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};


export const getUserMinMaxCreateAt = async (jwt, dispatch) => {
    dispatch(getUserMinMaxCreateAtStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/getMinMaxYear`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getUserMinMaxCreateAtSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getUserMinMaxCreateAtFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getUserCount = async (jwt, dispatch, status) => {
    dispatch(getUserCountStart());

    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/countUser?status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getUserCountSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getUserCountFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};

export const getUserCountRole = async (jwt, dispatch, year, status) => {
    dispatch(getUserCountRoleStart());
    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/countRole?year=${year}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getUserCountRoleSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getUserCountRoleFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
export const getAllUsers = async (
    jwt,
    dispatch,
    search,
    column,
    sort,
    status,
    role,
) => {
    dispatch(getAllUsersStart());
    try {
        // Sửa lỗi: chuyển thành fetch với async/await
        const response = await fetch(
            `http://localhost:8080/api/admin/getDataUser?search=${search}&column=${column}create_at&sort=${sort}&role=${role}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Kiểm tra response
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Lấy dữ liệu và dispatch action success
        const data = await response.json();
        dispatch(getAllUsersSuccess(data));

        // Trả về dữ liệu
        return data;
    } catch (error) {
        // Dispatch action failed
        dispatch(getAllUsersFailed(error.message));
        return null; // Trả về null để báo lỗi
    }
};
