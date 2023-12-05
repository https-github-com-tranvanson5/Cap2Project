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

} from './statitiscalSlice';

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
export const getUserMinMaxCreateAt = async(jwt, dispatch) =>{
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

export const getUserCount = async(jwt, dispatch, status) =>{
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
