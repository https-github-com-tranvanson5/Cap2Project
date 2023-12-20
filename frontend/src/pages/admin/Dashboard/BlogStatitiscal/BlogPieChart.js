import React, { useEffect, useState } from 'react'
import StatitiscalPieChart from '../StatitiscalPieChart/StatitiscalPieChart';
import { Col, Row } from 'react-bootstrap';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { getCountBlogYear, minMaxYearBlog } from '~/redux/statitiscalApi';
import { parseYearMinMaxToListOject } from '../processData/processData';
import { useDispatch, useSelector } from 'react-redux';

function BlogPieChart() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.login?.currentUser);
    const [yearOption, setYearOption] = useState([]);
    const [yearOptionDefault, setYearOptionDefault] = useState(new Date().getFullYear());
    useEffect(() => {
        getMinMaxYearMethod();
    }, [])
    useEffect(() => {
        getBlogYearMethod();
    }, [yearOptionDefault])
    const getMinMaxYearMethod = async () => {
        const result = await minMaxYearBlog(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(result));
    }
    const onchangeDropDown = (value) => {
        setYearOptionDefault(value.target.value);
    }
    const getBlogYearMethod = async () => {
        const result = await getCountBlogYear(user?.jwt, dispatch, 2023, yearOptionDefault, 'ACTIVE',);
        console.log(result);
    }
    return (
        <div>
            <Row>
                <Col md={4}>
                    <DropDown
                        data={(yearOption ?? []).sort((a, b) => b.value - a.value)}
                        defaultValueProps={yearOptionDefault}
                        onChange={onchangeDropDown}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <StatitiscalPieChart />
                </Col>
                <Col md={6}>
                    <StatitiscalPieChart />
                </Col>

            </Row>

        </div>
    )
}

export default BlogPieChart;