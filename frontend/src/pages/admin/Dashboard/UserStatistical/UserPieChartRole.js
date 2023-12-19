import React, { useEffect } from 'react';
import StatitiscalPieChart from '../StatitiscalPieChart/StatitiscalPieChart';
import { Row, Col } from 'react-bootstrap';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { Months } from '../data/data';
import {
    getUserMinMaxCreateAt,
    getUserCountRole,
} from '~/redux/statitiscalApi';
import { useDispatch, useSelector } from 'react-redux';
import { parseYearMinMaxToListOject } from '../processData/processData';
import { useState } from 'react';

function UserPieChartRole() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [yearOption, setYearOption] = useState([]);
    const [yearOptionDefault, setYearOptionDefault] = useState({
        userStatitiscalRole: new Date().getFullYear(),
    });
    const [userCountRole, setUserCountRole] = useState({});

    useEffect(() => {
        getMinMaxYearMethod();
    }, []);
    useEffect(() => {
        getUserCountRoleMethod(); // Removed conditional call for clarity
    }, [yearOptionDefault.userStatitiscalRole]);

    const getMinMaxYearMethod = async () => {
        let response = await getUserMinMaxCreateAt(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(response));
    };

    const onChangeValueDropdownMethod = (value) => {
        setYearOptionDefault((prev) => ({
            ...prev,
            userStatitiscalRole: value.target.value,
        }));
    };

    const getUserCountRoleMethod = async () => {
        // Check for user and yearOption before API call
        if (!user || !yearOptionDefault) return;

        const response = await getUserCountRole(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatitiscalRole,
            '',
        );
        const responseAcitve = await getUserCountRole(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatitiscalRole,
            'ACTIVE',
        );
        const responseBlock = await getUserCountRole(
            user?.jwt,
            dispatch,
            yearOptionDefault.userStatitiscalRole,
            'BLOCK',
        );
        // Check for response before accessing its properties
        if (!response) {
            console.warn('No user data found for selected year.');
            return;
        }

        // Handle actual response as usual
        setUserCountRole({
            all: {
                maintainAspectRatio: false,
                responsive: false,
                labels:
                    response?.length === 0
                        ? ['Unkown']
                        : response.map((item) => item.role),
                datasets: [
                    {
                        data:
                            response?.length === 0
                                ? [1]
                                : response.map((item) => item.count),
                        backgroundColor:
                            response?.length === 0
                                ? ['gray']
                                : ['#3437eb', '#5f81fa', '#9bd4fa'],
                        hoverBackgroundColor:
                            response?.length === 0
                                ? ['gray']
                                : ['#3437eb', '#5f81fa', '#9bd4fa'],
                    },
                ],
            },
            active: {
                maintainAspectRatio: false,
                responsive: false,
                labels:
                    responseAcitve?.length === 0
                        ? ['Unkown']
                        : responseAcitve.map((item) => item.role),
                datasets: [
                    {
                        data:
                            responseAcitve?.length === 0
                                ? [1]
                                : responseAcitve.map((item) => item.count),
                        backgroundColor:
                            responseAcitve?.length === 0
                                ? ['gray']
                                : ['#059913', '#40f551', '#8df7a9'],
                        hoverBackgroundColor:
                            responseAcitve?.length === 0
                                ? ['gray']
                                : ['#059913', '#40f551', '#8df7a9'],
                    },
                ],
            },
            block: {
                maintainAspectRatio: false,
                responsive: false,
                labels:
                    responseBlock?.length === 0
                        ? ['Unkown']
                        : responseBlock.map((item) => item.role),
                datasets: [
                    {
                        data:
                            responseBlock?.length === 0
                                ? [1]
                                : responseBlock.map((item) => item.count),
                        backgroundColor:
                            responseBlock?.length === 0
                                ? ['gray']
                                : ['#990606', '#ff6363', '#b06666'],
                        hoverBackgroundColor:
                            responseBlock?.length === 0
                                ? ['gray']
                                : ['#990606', '#ff6363', '#b06666'],
                    },
                ],
            },
        });
    };

    return (
        <div>
            <Row>
                <Col md={3}>
                    <DropDown
                        data={(yearOption || []).sort(
                            (a, b) => b.value - a.value,
                        )}
                        defaultValueProps={
                            yearOptionDefault.userStatitiscalRole
                        }
                        onChange={(value) => onChangeValueDropdownMethod(value)}
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: 'center' }}>
                <Col md={4} style={{ textAlign: 'center' }}>
                    <StatitiscalPieChart dataChart={userCountRole.all} />
                    <span>User all</span>
                </Col>
                <Col md={4} style={{ textAlign: 'center' }}>
                    <StatitiscalPieChart dataChart={userCountRole.active} />
                    <span>User active</span>
                </Col>
                <Col md={4} style={{ textAlign: 'center' }}>
                    <StatitiscalPieChart dataChart={userCountRole.block} />
                    <span>User block</span>
                </Col>
                <b>Thống kê user theo role</b>
            </Row>
        </div>
    );
}

export default UserPieChartRole;
