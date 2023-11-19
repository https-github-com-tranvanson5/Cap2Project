import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CalwContent.module.scss';
import Card from '~/components/Card/Card';
import { getAllCalwData } from '~/redux/apiRequest';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '~/components/Loading/Loading';
import SearchAdvance from '~/pages/RecruitmentPage/Search/SearchAdvance/SearchAdvance';
import Carousel from '~/pages/Home/Slider/Slider';
import Search from '~/pages/RecruitmentPage/Search/SearchJob/SearchJob';

const cx = classNames.bind(styles);

export default function CalwContent() {
    const dispatch = useDispatch();
    const [calwListData, setCalwListData] = useState(
        useSelector((state) => state.calw.jobs?.allJobs),
    );
    const loading = useSelector((state) => state.calw.jobs?.isFetching);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        getAllCalwData(dispatch, itemsPerPage, currentPage, setCalwListData);
    }, [currentPage]);

    const handlePageClick = (data) => {
        getAllCalwData(
            dispatch,
            itemsPerPage,
            +data.selected + 1,
            setCalwListData,
        );
        // scroll to the top
        //window.scrollTo(0, 0)
    };

    return (
        <>
            <Search />
            <Carousel />
            <Container>
                <div className={cx('wrapper')}>
                    <h2 className={cx('heading')}>Việc làm nổi bật</h2>
                    <div className={cx('wrapper')}>
                        <Row>
                            {calwListData &&
                                calwListData?.content.map((recruitment) => {
                                    return (
                                        <Col
                                            key={recruitment.id}
                                            lg={3}
                                            md={4}
                                            sm={6}
                                        >
                                            <Card
                                                data={recruitment}
                                                saved={
                                                    <ion-icon name="heart-outline"></ion-icon>
                                                }
                                                titleSaved="Lưu tin"
                                                to={`/recruitmentpage/recruitmentdetail/${recruitment.id}`}
                                            ></Card>
                                        </Col>
                                    );
                                })}
                        </Row>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={calwListData?.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={
                                'pagination justify-content-center'
                            }
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}
