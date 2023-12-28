import React, { useEffect, useState } from 'react';
import StatisticalLinesChart from '~/pages/admin/Dashboard/StatisticalLinesChart/StatisticalLinesChart';
import { useDispatch, useSelector } from 'react-redux';
import { getCountBlogMonth, getCountBlogYear, getMinMaxYear } from '~/redux/statitiscalApi';
import {
    parseListDataMonth, parseListDataYear, parseYearMinMaxToListOject,
} from '~/pages/admin/Dashboard/processData/processData';
import { Months } from '~/pages/admin/Dashboard/data/data';
import { Col, Row } from 'react-bootstrap';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';

export default function BlogLineChart() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.login?.currentUser);
    let [userStatitiscalMonth, setUserStatitiscalMonth] = useState({});
    let [userStatitiscalYear, setUserStatitiscalYear] = useState({});

    const [yearOption, setYearOption] = useState([]);
    let [yearOptionDefault, setYearOptionDefault] = useState(new Date().getFullYear());

    useEffect(() => {
        getMinMaxYearMethod();
        getCountBlogMonthMethod();
        getCountBlogYearMethod();
    }, []);

    useEffect(() => {
        getCountBlogMonthMethod();
        getCountBlogYearMethod();

    }, [yearOptionDefault]);

    const getCountBlogMonthMethod = async () => {
        const response = parseListDataMonth(await getCountBlogMonth(user?.jwt, dispatch, yearOptionDefault, ''));
        const responseActive = parseListDataMonth(await getCountBlogMonth(user?.jwt, dispatch, yearOptionDefault, 'ACTIVE'));
        const responseDelete = parseListDataMonth(await getCountBlogMonth(user?.jwt, dispatch, yearOptionDefault, 'DELETE'));
        setUserStatitiscalMonth({
            labels: Months, datasets: [{
                label: 'Blog all',
                data: response.map((item) => item.count),
                borderColor: '#4bc0c0',
                backgroundColor: '#4bc0c0',
            }, {
                label: 'Blog active',
                data: responseActive.map((item) => item.count),
                borderColor: '#32a852',
                backgroundColor: '#32a852',
            }, {
                label: 'Blog delete',
                data: responseDelete.map((item) => item.count),
                borderColor: '#a83232',
                backgroundColor: '#a83232',
            }],
        });
    };

    const getMinMaxYearMethod = async () => {
        let response = await getMinMaxYear(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(response));
    };

    const onChangeYearOptionDefault = (value) => {
        setYearOptionDefault(value.target.value);
    };

    const getCountBlogYearMethod = async () => {
        const minYear = yearOption?.reduce(
            (min, option) => (option.value < min ? option.value : min),
            Infinity,
        );
        const response = parseListDataYear(minYear, await getCountBlogYear(user?.jwt, dispatch, '', '', ''));
        const responseActive = parseListDataYear(minYear, await getCountBlogYear(user?.jwt, dispatch, 'ACTIVE', '', ''));
        const responseDelete = parseListDataYear(minYear, await getCountBlogYear(user?.jwt, dispatch, 'DELETE', '', ''));
        setUserStatitiscalYear({
            labels: yearOption.map(item => item.value).sort((a, b) => a - b), datasets: [{
                label: 'Blog all',
                data: response.map((item) => item.count),
                borderColor: '#4bc0c0',
                backgroundColor: '#4bc0c0',
            }, {
                label: 'Blog active',
                data: responseActive.map((item) => item.count),
                borderColor: '#32a852',
                backgroundColor: '#32a852',
            }, {
                label: 'Blog delete',
                data: responseDelete.map((item) => item.count),
                borderColor: '#a83232',
                backgroundColor: '#a83232',
            }],
        });
    };

    return (
        <div>
            <Col md={4}>
                <DropDown
                    data={(yearOption ?? []).sort((a, b) => b.value - a.value)}
                    defaultValueProps={yearOptionDefault}
                    onChange={onChangeYearOptionDefault}
                />
            </Col>
            <Row>
                <Col>
                    <Col style={{ textAlign: 'center' }}>
                        {!yearOptionDefault ? (
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
