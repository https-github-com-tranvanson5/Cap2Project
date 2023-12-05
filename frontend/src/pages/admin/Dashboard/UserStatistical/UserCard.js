import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardInfo from '../Card/CardInfo';
import 'font-awesome/css/font-awesome.min.css';
import { Row, Col } from 'react-bootstrap';
import { getUserCount } from '~/redux/statitiscalApi';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UserCard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [userCount,setCountUser] = useState({})
    useEffect(()=>{
        getUserCountMethod();
    },[])
    const getUserCountMethod = async()=>{
        const response = await getUserCount(user?.jwt,dispatch,'');
        const responseActive = await getUserCount(user?.jwt,dispatch,'ACTIVE');
        const responseBlock = await getUserCount(user?.jwt,dispatch,'BLOCK');
        setCountUser({all: response.userCount, active:responseActive.userCount,block:responseBlock.userCount});
    }
    return (
        <div>
            <Row>
                <Col md={4}>
                    <CardInfo
                        icon={'fa-solid fa-user'}
                        color={'#009900'}
                        title={'User all'}
                        value={userCount.all}
                    />
                </Col>
                <Col md={4}>
                    <CardInfo
                        icon={'fa-solid fa-user'}
                        color={'#0033ff'}
                        title={'User active'}
                        value={userCount.active}
                    />
                </Col>
                <Col md={4}>
                    <CardInfo
                        icon={'fa-solid fa-user'}
                        color={'#ff0000'}
                        title={'User block'}
                        value={userCount.block}
                    />
                </Col>
            </Row>
        </div>
    );
}
