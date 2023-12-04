import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import StatisticalLinesChart from './StatisticalLinesChart/StatisticalLinesChart';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import UserDoughnutChart from './UserDoughnutChart/UserDoughnutChart';
import { Doughnut } from 'react-chartjs-2';
import {
    countUserByMonth,
    getYearUserMinMax,
    getCountAllUser,
    getCountAllStatusUser,
    getcountUserYear,
    getCountRole,
} from '~/redux/apiRequest';
import styles from './Dashboard.module.scss';
import './dashBoardStyle.css';

const cx = classNames.bind(styles);

function formattedDataMonth(data) {
    const monthsData = {};

    for (const item of data) {
        const month = item.month;
        const count = item.count;

        if (!monthsData[month]) {
            monthsData[month] = { month: month, count: 0 };
        }

        monthsData[month].count += count;
    }

    const formattedData = [];
    for (let month = 1; month <= 12; month++) {
        const monthData = monthsData[month];
        if (monthData) {
            formattedData.push(monthData);
        } else {
            formattedData.push({ month, count: 0 });
        }
    }

    return formattedData;
}

function formatTransUserCountYear(yearMin, data) {
    const formattedData = [];

    for (let year = yearMin; year <= new Date().getFullYear(); year++) {
        let count = 0;
        const item = data.find((item) => item.year === year);

        if (item) {
            count = item.count;
        }

        formattedData.push({ year, count });
    }
    return formattedData;
}

function generateYearOptions(minYear, maxYear) {
    const yearOptions = [];

    for (let year = maxYear; year >= minYear; year--) {
        yearOptions.push({ value: year, name: year });
    }

    return yearOptions;
}

function UserStatistical() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [userByMonthActive, setUserByMonthActive] = useState([]);
    const [userByMonthBlock, setUserByMonthBlock] = useState([]);
    const [userByMonth, setUserByMonth] = useState([]);
    const [yearOption, setYearOption] = useState([]);
    const [yearDefault, setYearDefault] = useState(new Date().getFullYear());
    const [countUserActive, setCountUserActive] = useState();
    const [countUserBlock, setCountUserBlock] = useState();
    const [countUser, setCountUser] = useState();
    const [yearDefaultDoughnut, setYearDefaultDoughnut] = useState(
        new Date().getFullYear(),
    );
    const [countUserYear, setCountUserYear] = useState({
        all: [],
        active: [],
        block: [],
    });
    let [countUserRole, setCountUserRole] = useState({
        all: [],
        active: [],
        block: [],
    });

    useEffect(() => {
        yearOptionMethod();
        getCountAllUserMethod();
        getcountUserYearMethod();
        getCountRoleMethod();
    }, []);

    useEffect(() => {
        getUserByMonth();
    }, [yearDefault]);
    useEffect(() => {
        getCountRoleMethod();
    }, [yearDefaultDoughnut]);

    useEffect(() => {
        getcountUserYearMethod();
    }, [yearOption]);

    const getUserByMonth = async () => {
        try {
            const byMonthActive = await countUserByMonth(
                user?.jwt,
                dispatch,
                yearDefault,
                'ACTIVE',
            );
            setUserByMonthActive(formattedDataMonth(byMonthActive));

            const byMonthBlock = await countUserByMonth(
                user?.jwt,
                dispatch,
                yearDefault,
                'BLOCK',
            );
            setUserByMonthBlock(formattedDataMonth(byMonthBlock));

            const byMonth = await countUserByMonth(
                user?.jwt,
                dispatch,
                yearDefault,
                '',
            );
            setUserByMonth(formattedDataMonth(byMonth));
        } catch (error) {
            console.error(error);
        }
    };

    const yearOptionMethod = async () => {
        try {
            const response = await getYearUserMinMax(user?.jwt, dispatch);
            if (response?.min_year && response?.max_year) {
                setYearOption(
                    generateYearOptions(response.min_year, response.max_year),
                );
            } else {
                setYearOption([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCountAllUserMethod = async () => {
        try {
            const response = await getCountAllUser(user?.jwt, dispatch);
            setCountUser(response?.count ? response : { count: 0 });

            const responseActive = await getCountAllStatusUser(
                user?.jwt,
                dispatch,
                'ACTIVE',
            );
            setCountUserActive(
                responseActive?.count ? responseActive : { count: 0 },
            );

            const responseBlock = await getCountAllStatusUser(
                user?.jwt,
                dispatch,
                'BLOCK',
            );
            setCountUserBlock(
                responseBlock?.count ? responseBlock : { count: 0 },
            );
        } catch (error) {
            console.error(error);
        }
    };

    const getcountUserYearMethod = async () => {
        try {
            const minYear = Math.min(
                ...yearOption.map((item) => Number(item.value)),
            );
            const allData = await getcountUserYear(user?.jwt, dispatch, '');

            const activeData = await getcountUserYear(
                user?.jwt,
                dispatch,
                'ACTIVE',
            );
            const blockData = await getcountUserYear(
                user?.jwt,
                dispatch,
                'BLOCK',
            );

            const formattedAllData = formatTransUserCountYear(minYear, allData);
            const formattedActiveData = formatTransUserCountYear(
                minYear,
                activeData,
            );
            const formattedBlockData = formatTransUserCountYear(
                minYear,
                blockData,
            );

            setCountUserYear({
                all: formattedAllData,
                active: formattedActiveData,
                block: formattedBlockData,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getCountRoleMethod = async () => {
        try {
            const responseUser = await getCountRole(
                user?.jwt,
                dispatch,
                '',
                '',
                yearDefaultDoughnut,
            );
            const responseUserActive = await getCountRole(
                user?.jwt,
                dispatch,
                '',
                'ACTIVE',
                yearDefaultDoughnut,
            );
            const responseUserBlock = await getCountRole(
                user?.jwt,
                dispatch,
                '',
                'BLOCK',
                yearDefaultDoughnut,
            );

            setCountUserRole({
                all: responseUser?responseUser:[],
                active: responseUserActive?responseUserActive:[],
                block: responseUserBlock?responseUserBlock:[],
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleYearChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue) {
            setYearDefault(selectedValue);
            getUserByMonth();
        } else {
            console.error('Invalid year selected');
        }
    };
    const handleYearChangeDoughnut = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            setYearDefaultDoughnut(selectedValue);
            getCountRoleMethod();
        } else {
            console.error('Invalid year selected');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={4}>
                            <div id="">
                                <div className="">
                                    <div
                                        className="small-box"
                                        style={{ backgroundColor: '#5cb85c' }}
                                    >
                                        <div className="inner">
                                            <h3>{countUser?.count}</h3>
                                            <p>User all</p>
                                        </div>
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a
                                            href="#"
                                            className="small-box-footer"
                                        >
                                            More info{' '}
                                            <i className="fa fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div id="">
                                <div className="">
                                    <div
                                        className="small-box"
                                        style={{ backgroundColor: '#5bc0de' }}
                                    >
                                        <div className="inner">
                                            <h3>{countUserActive?.count}</h3>
                                            <p>User active</p>
                                        </div>
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a
                                            href="#"
                                            className="small-box-footer"
                                        >
                                            More info{' '}
                                            <i className="fa fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div id="">
                                <div className="">
                                    <div
                                        className="small-box "
                                        style={{ backgroundColor: '#de5b5ba8' }}
                                    >
                                        <div className="inner">
                                            <h3>{countUserBlock?.count}</h3>
                                            <p>User block</p>
                                        </div>
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a
                                            href="#"
                                            className="small-box-footer"
                                        >
                                            More info{' '}
                                            <i className="fa fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={8}>
                    <Row>
                        <h2 className={cx('title')}>
                            Thống kê tổng quan hệ thống
                        </h2>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <DropDown
                                data={yearOption}
                                defaultValueProps={yearDefault}
                                onChange={(event) => handleYearChange(event)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <StatisticalLinesChart
                            dataChart={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                ],
                                datasets: [
                                    {
                                        label: 'All',
                                        data:
                                            userByMonth?.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5cb85c',
                                        backgroundColor: '#5cb85c',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                    {
                                        label: 'Active',
                                        data:
                                            userByMonthActive?.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5bc0de',
                                        backgroundColor: '#5bc0de',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                    {
                                        label: 'Block',
                                        data:
                                            userByMonthBlock?.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#d9534f',
                                        backgroundColor: '#d9534f',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                ],
                            }}
                        />
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        <StatisticalLinesChart
                            dataChart={{
                                labels: yearOption
                                    .map((item) => item.value)
                                    .sort((a, b) => a - b),
                                datasets: [
                                    {
                                        label: 'All',
                                        data:
                                            countUserYear.all.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5cb85c',
                                        backgroundColor: '#5cb85c',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                    {
                                        label: 'Active',
                                        data:
                                            countUserYear.active.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5bc0de',
                                        backgroundColor: '#5bc0de',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                    {
                                        label: 'Block',
                                        data:
                                            countUserYear.block.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#d9534f',
                                        backgroundColor: '#d9534f',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    },
                                ],
                            }}
                        />
                    </Row>
                </Col>
            </Row>
            <Row>
                <Row>
                    <Col md={3}>
                        <DropDown
                            data={yearOption}
                            defaultValueProps={yearDefaultDoughnut}
                            onChange={(event) =>
                                handleYearChangeDoughnut(event)
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <UserDoughnutChart
                            dataChart={{
                                labels: countUserRole.all.map(
                                    (item) => item.role || [],
                                ),
                                datasets: [
                                    {
                                        label: '',
                                        data:
                                            countUserRole.all.map(
                                                (item) => item.count,
                                            ) || [],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(84, 235, 54)',
                                        ],
                                        hoverOffset: 4,
                                    },
                                ],
                            }}
                        />
                        <p>All</p>
                    </Col>
                    <Col md={4}>
                        <UserDoughnutChart
                            dataChart={{
                                labels: countUserRole.active.map(
                                    (item) =>
                                        item.role || ['admin', 'pm', 'admin'],
                                ),
                                datasets: [
                                    {
                                        label: '',
                                        data:
                                            countUserRole.active.map(
                                                (item) => item.count,
                                            ) || [],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(84, 235, 54)',
                                        ],
                                        hoverOffset: 4,
                                    },
                                ],
                            }}
                        />
                        <p>Active</p>
                    </Col>
                    <Col md={4}>
                        <UserDoughnutChart
                            dataChart={{
                                labels: countUserRole.block.map(
                                    (item) => item.role || [],
                                ),
                                datasets: [
                                    {
                                        label: '',
                                        data:
                                            countUserRole.block.map(
                                                (item) => item.count,
                                            ) || [],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(84, 235, 54)',
                                        ],
                                        hoverOffset: 9,
                                    },
                                ],
                            }}
                        />
                        <p>Block</p>
                    </Col>
                </Row>
            </Row>
        </div>
    );
}

export default UserStatistical;
