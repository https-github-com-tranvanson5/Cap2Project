import React, { useEffect, useState } from 'react';
import StatisticalLinesChart from '~/pages/admin/Dashboard/StatisticalLinesChart/StatisticalLinesChart';
import { useDispatch, useSelector } from 'react-redux';
import { getJobMinMaxYear, getQualityJobByYear, getQualityJobMoth } from '~/redux/statitiscalApi';
import {
    parseListDataMonth,
    parseListDataYear,
    parseYearMinMaxToListOject,
} from '~/pages/admin/Dashboard/processData/processData';
import { Months } from '~/pages/admin/Dashboard/data/data';
import { Col, Dropdown, Row } from 'react-bootstrap';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import { getMinYearSuccess } from '~/redux/statitiscalSlice';

function JobStatitiscal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    const [qualityJobMonth, setQualityJobMonth] = useState({});
    const [qualityJobYear, setQualityJobYear] = useState({});
    const [yearOption, setYearOption] = useState([])
    let [yearOptionDefault, setYearOptionDefault] = useState(new Date().getFullYear());

    useEffect(() => {
        getQualityJobMothMethod();
        getMinYearMethod();
        getQualityJobByYearMethod();
    }, []);
    useEffect(() => {
        getQualityJobByYearMethod();
        getQualityJobMothMethod();
    }, [yearOptionDefault]);

    const getQualityJobMothMethod = async () => {
        const response = parseListDataMonth(await getQualityJobMoth(user?.jwt, dispatch, yearOptionDefault, ''));
        const responseActive = parseListDataMonth(await getQualityJobMoth(user?.jwt, dispatch, yearOptionDefault, 'ACTIVE'));
        const responseBLock = parseListDataMonth(await getQualityJobMoth(user?.jwt, dispatch, yearOptionDefault, 'BLOCK'));
        const responseDelete = parseListDataMonth(await getQualityJobMoth(user?.jwt, dispatch, yearOptionDefault, 'DELETE'));
        setQualityJobMonth({
            labels: Months,
            datasets: [
                {
                    label: 'Job all',
                    data: response.map((item) => item.count),
                    borderColor: '#4bc0c0',
                    backgroundColor: '#a4f5f5',
                },
                {
                    label: 'Job active',
                    data: responseActive.map((item) => item.count),
                    borderColor: '#32a852',
                    backgroundColor: '#32a852',
                },
                {
                    label: 'Job block',
                    data: responseBLock.map((item) => item.count),
                    borderColor: '#a88e32',
                    backgroundColor: '#a88e32',
                },
                {
                    label: 'Job delete',
                    data: responseDelete.map((item) => item.count),
                    borderColor: '#a88e32',
                    backgroundColor: '#a88e32',
                },
            ],
        });
    };
    const getMinYearMethod= async ()=>{
        setYearOption(parseYearMinMaxToListOject(await getJobMinMaxYear(user?.jwt,dispatch)));
    }
    const onChangeDropdown = (value)=>{
        setYearOptionDefault(value.target.value);
    };
    const getQualityJobByYearMethod = async () => {
        const minYear = yearOption.reduce(
            (min, option) => (option.value < min ? option.value : min),
            Infinity,
        );
        const response = parseListDataYear(minYear,await getQualityJobByYear(user?.jwt,dispatch,''));
        const responseActive = parseListDataYear(minYear,await getQualityJobByYear(user?.jwt,dispatch,'ACTIVE'));
        const responseBlock = parseListDataYear(minYear,await getQualityJobByYear(user?.jwt,dispatch,'BLOCK'));
        const responseDelete = parseListDataYear(minYear,await getQualityJobByYear(user?.jwt,dispatch,'DELETE'));

        setQualityJobYear({
            labels: yearOption.map(item => item.value).sort((a,b)=> (a-b)),
            datasets: [
                {
                    label: 'Job all',
                    data: response.map((item) => item.count),
                    borderColor: '#4bc0c0',
                    backgroundColor: '#a4f5f5',
                },
                {
                    label: 'Job active',
                    data: responseActive.map((item) => item.count),
                    borderColor: '#32a852',
                    backgroundColor: '#32a852',
                },
                {
                    label: 'Job block',
                    data: responseBlock.map((item) => item.count),
                    borderColor: '#a88e32',
                    backgroundColor: '#a88e32',
                },
                {
                    label: 'Job delete',
                    data: responseDelete.map((item) => item.count),
                    borderColor: '#a88e32',
                    backgroundColor: '#a88e32',
                },
            ],
        });
    }
    return (
        <div>
            <Col md={4}>
                <DropDown data={yearOption.sort((a,b) => (b.value - a.value))}
                          defaultValueProps={yearOptionDefault}
                          onChange={onChangeDropdown}
                />
            </Col>
            <Row>
                <Col>
                    <Col style={{ textAlign: 'center' }}>
                        {yearOptionDefault ? (
                            <StatisticalLinesChart
                                dataChart={qualityJobMonth}
                            />
                        ) : (
                            <StatisticalLinesChart
                                dataChart={qualityJobYear}
                            />
                        )}
                    </Col>
                </Col>
            </Row>
        </div>
    );
}

export default JobStatitiscal;



