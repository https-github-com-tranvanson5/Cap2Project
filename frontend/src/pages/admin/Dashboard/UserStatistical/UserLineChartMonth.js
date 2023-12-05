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
} from '~/redux/statitiscalApi';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { Value } from 'sass';
import { Months } from '../data/data';
import {
    parseListDataMonth,
    parseYearMinMaxToListOject,
} from '../processData/processData';

function UserLineChartMonth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [userStatitiscalMonth, setUserStatitiscalMonth] = useState({});
    const [yearOption, setYearOption] = useState([]);
    let [yearOptionDefault, setYearOptionDefault] = useState({
        userStatistiscalMonthYear: new Date().getFullYear(),
    });

    useEffect(() => {
        getMinMaxYearMethod();
        getUserStatistiscalMonthMethod();
    }, []);
    useEffect(() => {
        getUserStatistiscalMonthMethod();
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
            all: {
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
            },
        });
    };
    const getMinMaxYearMethod = async () => {
        let response = await getUserMinMaxCreateAt(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(response));
    };
    const onChangeValueDropdownMethod = (value) => {
        setYearOptionDefault((prev) => ({
            ...prev,
            userStatistiscalMonthYear: value.target.value,
        }));
    };
    return (
        <div>
            <DropDown
                data={(yearOption ?? []).sort((a, b) => b.value - a.value)}
                defaultValueProps={yearOptionDefault.userStatistiscalMonthYear}
                onChange={(value) => onChangeValueDropdownMethod(value)}
            />
            <StatisticalLinesChart dataChart={userStatitiscalMonth.all} />
        </div>
    );
}

export default UserLineChartMonth;
