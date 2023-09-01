import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FindJobs.module.scss';
import DropDown from '~/components/Input/DropDown/DropDown';
import Input from '~/components/Input/Input/Input';

import images from '~/assets/images';
import Button from '~/components/Button';
import {
    fetchCategoriesSearch,
    fetchJobListSearch,
} from '~/redux/GlobalSlices/searchSlice';
import {
    searchCategoriesSelector,
    searchJobListSelector,
} from '~/redux/Selectors/searchSelector';
import useDebounce from '~/hooks/useDebounce';
import SearchResults from './SearchResults/SearchResults';

const cx = classNames.bind(styles);

export default function FindJobs() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const debounceSearch = useDebounce(searchText, 500);
    const resultsSearch = useSelector(searchJobListSelector);

    const { cityCategories, jobCategories, workFrom } = useSelector(
        searchCategoriesSelector,
    );

    useEffect(() => {
        dispatch(fetchCategoriesSearch());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchText.trim()) {
            dispatch(fetchJobListSearch(searchText));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch]);

    const handleChangeSearchText = (e) => {
        setSearchText(e.target.value);
    };

    const handleClickFindJobsBtn = (e) => {
        e.preventDefault();
        console.log('handleClickFindJobsBtn', searchText);
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <h1 className={cx('heading')}>Tìm việc phù hợp với bạn</h1>
                <Row>
                    <Col lg={8}>
                        <div className={cx('left')}>
                            <form onSubmit={handleClickFindJobsBtn}>
                                <Row>
                                    <Col lg={9}>
                                        <div className={cx('search')}>
                                            <Input
                                                leftIcon={
                                                    <ion-icon name="search-outline"></ion-icon>
                                                }
                                                value={searchText}
                                                onChange={
                                                    handleChangeSearchText
                                                }
                                                placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
                                            />
                                            {resultsSearch.length > 0 &&
                                                searchText.trim() !== '' && (
                                                    <SearchResults
                                                        data={resultsSearch}
                                                    />
                                                )}
                                        </div>
                                        <div className={cx('advanced')}>
                                            <h5
                                                className={cx('advanced-title')}
                                            >
                                                Tìm kiếm nâng cao
                                            </h5>
                                            <Row>
                                                <Col lg={6}>
                                                    <DropDown
                                                        title="Nghành nghề"
                                                        data={jobCategories}
                                                    />
                                                </Col>
                                                <Col lg={6}>
                                                    <DropDown
                                                        title="Thành phố"
                                                        data={cityCategories}
                                                    />
                                                </Col>
                                                <Col lg={6}>
                                                    <DropDown
                                                        title="Hình thức làm việc"
                                                        data={workFrom}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col lg={3}>
                                        <div className={cx('controls-block')}>
                                            <Button
                                                type="submit"
                                                className={cx('btn')}
                                                onClick={handleClickFindJobsBtn}
                                                primary
                                            >
                                                Tìm việc ngay
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className={cx('right')}>
                            <img
                                className={cx('box-search-img')}
                                src={images.findJobs}
                                alt="findjob-img"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
