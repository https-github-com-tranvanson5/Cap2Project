import React from 'react';
import UserLineChartMonth from './UserLineChartMonth';
import UserCard from './UserCard';
import UserPieChartRole from './UserPieChartRole';

function UserStatiscal() {
    return (
        <div>
            <UserCard/>
            <UserLineChartMonth />
            <UserPieChartRole/>
        </div>
    );
}

export default UserStatiscal;
