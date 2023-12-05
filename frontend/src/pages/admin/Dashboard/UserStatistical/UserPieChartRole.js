// UserDoughnutChartRole.js
import React, { useEffect } from 'react';
import StatitiscalPieChart from '../StatitiscalPieChart/StatitiscalPieChart';
import { Row, Col } from 'react-bootstrap';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { Months } from '../data/data';
import { getUserMinMaxCreateAt } from '~/redux/statitiscalApi';
import { useDispatch, useSelector } from 'react-redux';
import { parseYearMinMaxToListOject } from '../processData/processData';
import { useState } from 'react';

function UserPieChartRole() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [yearOption, setYearOption] = useState([]);
    let [yearOptionDefault, setYearOptionDefault] = useState({
        userStatistiscalMonthYear: new Date().getFullYear(),
    });

    useEffect(() => {
        getMinMaxYearMethod();
    });
    const getMinMaxYearMethod = async () => {
        let response = await getUserMinMaxCreateAt(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(response));
    };
    const onChangeValueDropdownMethod = (value) => {
      console.log(value.target.value);
        setYearOptionDefault((prev) => ({
            ...prev,
            userStatitiscalRole: value.target.value,
        }));
    };
    return (
        <div>
            <Row>
                <Col md={3}>
                    <DropDown
                        data={(yearOption ?? []).sort(
                            (a, b) => b.value - a.value,
                        )}
                        defaultValueProps={
                            yearOptionDefault.userStatitiscalRole
                        }
                        onChange={(value) => onChangeValueDropdownMethod(value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <StatitiscalPieChart />
                </Col>
                <Col md={4}>
                    <StatitiscalPieChart />
                </Col>
                <Col md={4}>
                    <StatitiscalPieChart />
                </Col>
            </Row>
        </div>
    );
}

export default UserPieChartRole;
