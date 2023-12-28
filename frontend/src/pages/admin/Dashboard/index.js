import classNames from 'classnames/bind';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';


import { useDispatch, useSelector } from 'react-redux';
import BlogStatistical from './BlogStatitiscal/BlogStatistical';
import styles from './Dashboard.module.scss';
import JobStatitiscal from './JobStatitiscal/JobStatitiscal';
import UserStatiscal from './UserStatistical/UserStatiscal';

const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState({});
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userList = useSelector((state) => state.allUser.users?.allUsers);
    // console.log(userList);

    // useEffect(() => {
    //     const chartData = getAllUsers(user?.jwt, dispatch);

    //     if (chartData) {
    //         chartData
    //             .then((data) => setChartData(data.data))
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }, []);

    return (
        <div>
            <Row className={cx('card')} style={{margin: "20px", padding:"20px"}}>
                <Row>
                    <Col><h2>Thống kê User</h2></Col>
                </Row>
                <Row>
                    <Col >
                        <UserStatiscal />
                    </Col>
                </Row>
            </Row>
            <Row className={cx('card')} style={{margin: "20px", padding:"20px"}}>
                <Row>
                    <Col><h2>Thống kê Blog</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <BlogStatistical />
                    </Col>
                </Row>
            </Row>
            <Row className={cx('card')} style={{margin: "20px", padding:"20px"}}>
            <Row>
                    <Col><h2>Thống kê công việc đăng tuyển</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <JobStatitiscal/>
                    </Col>
                </Row>
            </Row>
        </div>
    );
}

export default Dashboard;