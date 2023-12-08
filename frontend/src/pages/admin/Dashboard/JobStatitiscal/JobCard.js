import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getqualityJob, getqualityJobByStatus } from '~/redux/statitiscalApi';
import { Col, Row } from 'react-bootstrap';
import CardInfo from '~/pages/admin/Dashboard/Card/CardInfo';

function JobCard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    const [countQuality, setCountQuality] = useState({});
    useEffect(() => {
        getqualityJobMethod();
    }, []);
    const getqualityJobMethod = async () =>{
        const response = await getqualityJob(user?.jwt,dispatch);
        const reponseActive = await getqualityJobByStatus(user?.jwt,dispatch,'ACTIVE');
        const reponseBlock = await getqualityJobByStatus(user?.jwt,dispatch,'BLOCK');
        const reponseDelete = await getqualityJobByStatus(user?.jwt,dispatch,'DELETE');
        setCountQuality({all: response.count, active: reponseActive.count,block:reponseBlock.count,delete: reponseDelete.count})
        console.log(reponseActive);
    }
    return (
        <div>
            <Row>
                <Col md={3}>
                    <CardInfo value={countQuality.all} title={'Job all'} color={'green'} />
                </Col>
                <Col md={3}>
                    <CardInfo value={countQuality.active} title={'Job active'} color={'blue'} />
                </Col>
                <Col md={3}>
                    <CardInfo value={countQuality.block} title={'Job block'} color={'orange'} />
                </Col>
                <Col md={3}>
                    <CardInfo value={countQuality.delete} title={'Job delete'} color={'red'} />
                </Col>
            </Row>
        </div>
    );
}

export default JobCard;
