import React from 'react';
import StatisticalLinesChart from '../StatisticalLinesChart/StatisticalLinesChart';

import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '~/redux/apiRequest';
import {
    getUserMinMaxCreateAt,
    getUserStatistiscalMonth,
    getUserStatistiscalYear,
} from '~/redux/statitiscalApi';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { Value } from 'sass';
import { Months } from '../data/data';
import {
    parseListDataMonth,
    parseListDataYear,
    parseYearMinMaxToListOject,
} from '../processData/processData';

function UserLineChartMonth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [userStatitiscalMonth, setUserStatitiscalMonth] = useState({});
    let [userStatitiscalYear, setUserStatitiscalYear] = useState([]);

    const [yearOption, setYearOption] = useState([]);
    let [yearOptionDefault, setYearOptionDefault] = useState({
        userStatistiscalMonthYear: new Date().getFullYear(),
    });

    useEffect(() => {
        getMinMaxYearMethod();
        getUserStatistiscalMonthMethod();
        getUserStatistiscalYearMethod();
    }, []);
    useEffect(() => {
        getUserStatistiscalMonthMethod();
        getUserStatistiscalYearMethod();
    }, [yearOptionDefault.userStatistiscalMonthYear]);
    const getUserStatistiscalMonthMethod = async () => {
        let response = await getUserStatistiscalMonth(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatistiscalMonthYear,
            '',
        );
        response = parseListDataMonth(response);
        let responseActive = await getUserStatistiscalMonth(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatistiscalMonthYear,
            'ACTIVE',
        );
        responseActive = parseListDataMonth(responseActive);
        response = parseListDataMonth(response);
        let responseBlock = await getUserStatistiscalMonth(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatistiscalMonthYear,
            'BLOCK',
        );
        responseBlock = parseListDataMonth(responseBlock);
        setUserStatitiscalMonth({
            labels: Months,
            datasets: [
                {
                    label: 'User all',
                    data: response.map((item) => item.count),
                    borderColor: '#4bc0c0',
                    backgroundColor: '#a4f5f5',
                },
                {
                    label: 'User active',
                    data: responseActive.map((item) => item.count),
                    borderColor: '#32a852',
                    backgroundColor: '#32a852',
                },
                {
                    label: 'User block',
                    data: responseBlock.map((item) => item.count),
                    borderColor: '#a83232',
                    backgroundColor: '#a83232',
                },
            ],
        });
    };
    const getMinMaxYearMethod = async () => {
        let response = await getUserMinMaxCreateAt(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(response));
    };
    const getUserStatistiscalYearMethod = async () => {
        try {
            const minYear = yearOption.reduce(
                (min, option) => (option.value < min ? option.value : min),
                Infinity,
            );
            let response = await getUserStatistiscalYear(
                user?.jwt,
                dispatch,
                '',
            );
            
            let parsedData = parseListDataYear(minYear, response);

            let responseActive = await getUserStatistiscalYear(
                user?.jwt,
                dispatch,
                'ACTIVE',
            );
            
            let parsedDataActive = parseListDataYear(minYear, responseActive);
            let responseAblock = await getUserStatistiscalYear(
                user?.jwt,
                dispatch,
                'BLOCK',
            );
            
            let parsedDataBlock = parseListDataYear(minYear, responseAblock);
            setUserStatitiscalYear({
                labels: parsedData.map((item) => item.year) || [],
                datasets: [
                    {
                        label: 'User all',
                        data: parsedData.map((item) => item.count) || [],
                        borderColor: '#4bc0c0',
                        backgroundColor: '#a4f5f5',
                    },
                    {
                        label: 'User active',
                        data: parsedDataActive.map((item) => item.count) || [],
                        borderColor: '#32a852',
                        backgroundColor: '#32a852',
                    },

                    {
                        label: 'User block',
                        data: parsedDataBlock.map((item) => item.count) || [],
                        borderColor: '#a83232',
                        backgroundColor: '#a83232',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        }
    };

    const onChangeValueDropdownMethod = (value) => {
        setYearOptionDefault((prev) => ({
            ...prev,
            userStatistiscalMonthYear: value.target.value,
        }));
    };
    return (
        <div>
            <Row>
                <Col md={4}>
                    <DropDown
                        data={(yearOption ?? []).sort(
                            (a, b) => b.value - a.value,
                        )}
                        defaultValueProps={
                            yearOptionDefault.userStatistiscalMonthYear
                        }
                        onChange={(value) => onChangeValueDropdownMethod(value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col style={{ textAlign: 'center' }}>
                        {!yearOptionDefault.userStatistiscalMonthYear ? (
                            <StatisticalLinesChart
                                dataChart={userStatitiscalYear}
                            />
                        ) : (
                            <StatisticalLinesChart
                                dataChart={userStatitiscalMonth}
                            />
                        )}
                        <b>Thống kê user theo dạng đường</b>
                    </Col>
                </Col>
            </Row>
        </div>
    );
}

export default UserLineChartMonth;
