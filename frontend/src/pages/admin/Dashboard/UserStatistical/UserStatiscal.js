import UserCard from './UserCard';
import UserLineChartMonth from './UserLineChartMonth';
import UserPieChartRole from './UserPieChartRole';

function UserStatiscal() {
    return (
        <div>
            <UserCard/>
            <br/>
            <UserLineChartMonth />
            <br/>
            <UserPieChartRole/>
        </div>
    );
}

export default UserStatiscal;