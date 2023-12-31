import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchJob.module.scss';
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
function Search({ setQuery }) {
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
                                    onChange={(e) =>
                                        setQuery(e.target.value.toLowerCase())
                                    }
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
                            <div className={cx('advanced-right')}>
                                <Col lg={12}>
                                    <DropDown
                                        title=" Thành phố"
                                        onChangeDictrictID={
                                            handleChangeDictrictID
                                        }
                                        data={getAllProvinces()}
                                        className={cx('dropdown-detail')}
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
                                Tìm kiếm
                            </Button>
                        </div>
                    </Col>
                </Row>
                <div className={cx('heading')}>
                    <h2 className={cx('carousel-job')}>
                        Tìm việc làm nhanh 24h, việc làm mới nhất mỗi ngày được
                        cập nhât trên JobFinder
                    </h2>
                    <p className={cx('carousel-find')}>
                        Tiếp cận 30,000+ tin tuyển dụng việc làm mới mỗi ngày từ
                        hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default Search;
