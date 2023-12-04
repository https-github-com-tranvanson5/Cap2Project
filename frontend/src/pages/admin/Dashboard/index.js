import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    countUserByMonth,
    getYearUserMinMax,
    getCountAllUser,
    getCountAllStatusUser,
    getcountUserYear,
} from '~/redux/apiRequest';
import StatisticalLinesChart from './StatisticalLinesChart/StatisticalLinesChart';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';

import styles from './Dashboard.module.scss';
import './dashBoardStyle.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
        let count = 0; // Initialize count to 0
        const item = data.find((item) => item.year === year);

        if (item) {
            // Check if item is defined
            count = item.count; // Access item.count if item exists
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

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [userByMonthActive, setUserByMonthActive] = useState([]);
    const [userByMonthBlock, setUserByMonthBlock] = useState([]);
    const [userByMonth, setUserByMonth] = useState([]);
    const [yearOption, setYearOption] = useState([]);
    const [yearDefault, setYearDefault] = useState(new Date().getFullYear());
    const [countUser, setCountUser] = useState();
    const [countUserActive, setCountUserActive] = useState();
    const [countUserBlock, setCountUserBlock] = useState();
    useEffect(() => {
        yearOptionMethod();
        getCountAllUserMethod();
        getcountUserYearMethod();
    }, []);

    useEffect(() => {
        getUserByMonth();
    }, [yearDefault]);
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
    const [countUserYear, setCountUserYear] = useState();
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

    const handleYearChange = (selectedYear) => {
        setYearDefault(selectedYear);
        getUserByMonth(); // Call getUserByMonth immediately after updating yearDefault
    };
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={4}>
                            <div id="">
                                <div class="">
                                    <div
                                        class="small-box"
                                        style={{ backgroundColor: '#5cb85c' }}
                                    >
                                        <div class="inner">
                                            <h3>{countUser?.count}</h3>
                                            <p>All User</p>
                                        </div>
                                        <div class="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a href="#" class="small-box-footer">
                                            More info{' '}
                                            <i class="fa fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div id="">
                                <div class="">
                                    <div
                                        class="small-box "
                                        style={{ backgroundColor: '#5bc0de' }}
                                    >
                                        <div class="inner">
                                            <h3>{countUserActive?.count}</h3>

                                            <p>User active</p>
                                        </div>
                                        <div class="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a href="#" class="small-box-footer">
                                            More info{' '}
                                            <i class="fa fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div id="">
                                <div class="">
                                    <div
                                        class="small-box "
                                        style={{ backgroundColor: '#d9534f' }}
                                    >
                                        <div class="inner">
                                            <h3>{countUserBlock?.count}</h3>

                                            <p>User block</p>
                                        </div>
                                        <div class="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <a href="#" class="small-box-footer">
                                            More info{' '}
                                            <i class="fa fa-arrow-circle-right"></i>
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
                                onChange={(selectedValue) =>
                                    handleYearChange(selectedValue.target.value)
                                }
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
                                        borderColor: '#5cb85c', // Set border color
                                        backgroundColor: '#5cb85c', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
                                    },
                                    {
                                        label: 'Active',
                                        data:
                                            userByMonthActive?.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5bc0de', // Set border color
                                        backgroundColor: '#5bc0de', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
                                    },
                                    {
                                        label: 'Block',
                                        data:
                                            userByMonthBlock?.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#d9534f', // Set border color
                                        backgroundColor: '#d9534f', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
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
                                        borderColor: '#5cb85c', // Set border color
                                        backgroundColor: '#5cb85c', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
                                    },
                                    {
                                        label: 'Active',
                                        data:
                                            countUserYear.active.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#5bc0de', // Set border color
                                        backgroundColor: '#5bc0de', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
                                    },
                                    {
                                        label: 'Block',
                                        data:
                                            countUserYear.block.map(
                                                (item) => item.count,
                                            ) || [],
                                        borderColor: '#d9534f', // Set border color
                                        backgroundColor: '#d9534f', // Set background color
                                        borderWidth: 2, // Set border width
                                        borderRadius: 10, // Set border radius
                                    },
                                ],
                            }}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
