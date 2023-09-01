import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchAdvance.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Input from '~/components/Input/Input/Input';
import DropDown from '~/components/Input/DropDown/DropDown';
import Button from '~/components/Button';

import { getAllProvinces, getAllDistricts } from '~/helper/geomap';

const cx = classNames.bind(styles);
const nganhngheData = [
    {
        value: '10101',
        name: 'An toàn lao động',
    },
    {
        value: '10101',
        name: 'Công nghệ thông tin',
    },
    {
        value: '10101',
        name: 'Ngôn ngữ anh',
    },
    {
        value: '10101',
        name: 'Ngôn ngữ trung',
    },
];
function SearchAdvance({ data }) {
    const [districtID, setDictricID] = useState('');
    const handleChangeDictrictID = (dictrictID) => {
        setDictricID(dictrictID);
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col className={cx('bounded')}>
                        <div className={cx('search-input')}>
                            <Col lg={12}>
                                <Input
                                    leftIcon={
                                        <ion-icon name="search-outline"></ion-icon>
                                    }
                                    placeholder="Tìm kiếm theo công việc của bạn"
                                    primary
                                />
                            </Col>
                        </div>
                        <div className={cx('search-advanced')}>
                            <div className={cx('advanced-left')}>
                                <Col lg={12}>
                                    <DropDown
                                        data={nganhngheData}
                                        title="Tất cả nghành nghề"
                                    />
                                </Col>
                            </div>
                        </div>
                        <div className={cx('search-btn')}>
                            <Button
                                // onClick={() => {
                                //     handleClickFindJobsBtn();
                                // }}
                                leftIcon={
                                    <ion-icon
                                        name="search-outline"
                                        classname={cx('search-icon')}
                                    ></ion-icon>
                                }
                                primary
                                className={cx('btn')}
                            >
                                <span>Tìm kiếm</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchAdvance;
