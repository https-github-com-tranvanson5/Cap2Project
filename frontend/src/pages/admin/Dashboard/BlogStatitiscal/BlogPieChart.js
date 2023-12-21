import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { getCountBlogYear, minMaxYearBlog } from '~/redux/statitiscalApi';
import StatitiscalPieChart from '../StatitiscalPieChart/StatitiscalPieChart';
import { parseYearMinMaxToListOject } from '../processData/processData';

function BlogPieChart() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.login?.currentUser);
    const [yearOption, setYearOption] = useState([]);
    const [yearOptionDefault, setYearOptionDefault] = useState(new Date().getFullYear());
    const [countYear, setCountYear] = useState([]);

    useEffect(() => {
        getMinMaxYearMethod();
    }, []);

    useEffect(() => {
        getBlogYearMethod();
    }, [yearOptionDefault]);

    const getMinMaxYearMethod = async () => {
        const result = await minMaxYearBlog(user?.jwt, dispatch);
        setYearOption(parseYearMinMaxToListOject(result));
    }

    const onchangeDropDown = (value) => {
        setYearOptionDefault(value.target.value);
    }

    const getBlogYearMethod = async () => {
        const resultRoleAdmin = await getCountBlogYear(user?.jwt, dispatch, "ACTIVE", yearOptionDefault, 'ROLE_ADMIN');
        const resultRolePm = await getCountBlogYear(user?.jwt, dispatch, "ACTIVE", yearOptionDefault, 'ROLE_PM');
        const resultRoleUser = await getCountBlogYear(user?.jwt, dispatch, "ACTIVE", yearOptionDefault, 'ROLE_USER');
        const resultActive = [
            {
                name: 'ROLE_ADMIN',
                count: resultRoleAdmin?.[0]?.count || 0
            },
            {
                name: 'ROLE_PM',
                count: resultRolePm?.[0]?.count || 0
            },
            {
                name: 'ROLE_USER',
                count: resultRoleUser?.[0]?.count || 0
            }
        ];

        const resultRoleAdminDelete = await getCountBlogYear(user?.jwt, dispatch, "DELETE", yearOptionDefault, 'ROLE_ADMIN');
        const resultRolePmDelete = await getCountBlogYear(user?.jwt, dispatch, "DELETE", yearOptionDefault, 'ROLE_PM');
        const resultRoleUserDelete = await getCountBlogYear(user?.jwt, dispatch, "DELETE", yearOptionDefault, 'ROLE_USER');
        const resultDelete = [
            {
                name: 'ROLE_ADMIN',
                count: resultRoleAdminDelete?.[0]?.count || 0
            },
            {
                name: 'ROLE_PM',
                count: resultRolePmDelete?.[0]?.count || 0
            },
            {
                name: 'ROLE_USER',
                count: resultRoleUserDelete?.[0]?.count || 0
            }
        ];

        setCountYear({
            active: {
                maintainAspectRatio: false,
                responsive: false,
                labels: resultActive.length === 0 ? ['Unknown'] : resultActive.map((item) => item.name),
                datasets: [
                    {
                        data: resultActive.length === 0 ? [1] : resultActive.map((item) => item.count),
                        backgroundColor: resultActive.length == 0 ? ['gray'] : ['#3437eb', '#5f81fa', '#9bd4fa'],
                        hoverBackgroundColor: resultActive.length === 0 ? ['gray'] : ['#3437eb', '#5f81fa', '#9bd4fa'],
                    },
                ],
            },
            delete: {
                maintainAspectRatio: false,
                responsive: false,
                labels: resultDelete.count === 0 ? ['Unknown'] : resultDelete.map((item) => item.name),
                datasets: [
                    {
                        data: resultDelete.length === 0 ? [1] : resultDelete.map((item) => item.count),
                        backgroundColor: resultDelete.length === 0 ? ['gray'] : ['#3437eb', '#5f81fa', '#9bd4fa'],
                        hoverBackgroundColor: resultDelete.length === 0 ? ['gray'] : ['#3437eb', '#5f81fa', '#9bd4fa'],
                    },
                ],
            },
        });
        
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
                    <StatitiscalPieChart dataChart={countYear.active}/>
                </Col>
                <Col md={6}>
                    <StatitiscalPieChart dataChart={countYear.delete}/>
                </Col>
            </Row>
        </div>
    )
}

export default BlogPieChart;
