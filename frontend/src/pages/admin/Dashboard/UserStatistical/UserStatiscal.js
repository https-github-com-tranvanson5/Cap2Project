import React from 'react';
import UserLineChartMonth from './UserLineChartMonth';
import UserCard from './UserCard';
import UserPieChartRole from './UserPieChartRole';

function UserStatiscal() {
    return (
        <div>
            <h1>Thống kê người dùng</h1>
            <UserCard/>
            <br/>
            <h1>Thống kê người dùng theo tháng</h1>
            <UserLineChartMonth />
            <br/>
            <h1>Thống kê nhà tuyển dụng và người ứng tuyển</h1>
            <UserPieChartRole/>
        </div>
    );
}

export default UserStatiscal;
