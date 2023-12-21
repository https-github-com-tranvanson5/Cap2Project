import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FindJobs.module.scss';
import DropDown from '~/components/Input/DropDown/DropDown';
import Input from '~/components/Input/Input/Input';
import findjob from '../../../assets/images/findjob.svg';
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
import { getAllJobs, getCareer } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import {
    categoryEducationOption,
    categoryExperienceOption,
    categoryPositionOption,
    categoryTypeOption,
} from '~/pages/Recruiter/RecruiterPost/Data/DataEntry';

const cx = classNames.bind(styles);

export default function FindJobs() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [query, setQuery] = useState('');
    const debounceSearch = useDebounce(searchText, 500);
    const resultsSearch = useSelector(searchJobListSelector);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [formData, setFormData] = useState('');
    const careers = useSelector((state) => state.allJob.career?.careerCurrent);
    const [selectedId, setSelectedId] = useState('');

    const handleDropdownChange = (event) => {
        const selectedId = event.target.value;
        setSelectedId(selectedId);
        console.log('Selected ID:', selectedId);
        // Perform any other logic based on the selected ID
    };

    const navigate = useNavigate();

    console.log('careers', careers);

    useEffect(() => {
        getCareer(user?.jwt, dispatch);
    }, []);

    console.log(formData);

    const onChangeValue = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // console.log('formData', formData);

    // console.log('jobListData' ,jobListData)
    // console.log('careers' , careers)

    const handleClickFindJobsBtn = (e) => {
        e.preventDefault();
        let newFormData = { ...formData, query: query, careers: selectedId };

        navigate('/recruitmentpage/user', { state: newFormData });

        console.log('newFormData', newFormData);
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
                                                value={query}
                                                onChange={(e) =>
                                                    setQuery(
                                                        e.target.value.toLowerCase(),
                                                    )
                                                }
                                                placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
                                            />
                                            {resultsSearch > 0 &&
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
                                                    <div
                                                        className={cx(
                                                            'dropdown',
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                'content',
                                                            )}
                                                        >
                                                            <select
                                                                value={
                                                                    selectedId
                                                                }
                                                                onChange={
                                                                    handleDropdownChange
                                                                }
                                                                className={cx(
                                                                    'category',
                                                                )}
                                                            >
                                                                <option value="">
                                                                    Công việc
                                                                </option>
                                                                {careers?.map(
                                                                    (
                                                                        option,
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                option.id
                                                                            }
                                                                            value={
                                                                                option.id
                                                                            }
                                                                        >
                                                                            {
                                                                                option.name
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div
                                                        value={formData}
                                                        onChange={(onChange) =>
                                                            onChangeValue(
                                                                'jobPosition',
                                                                onChange.target
                                                                    .value,
                                                            )
                                                        }
                                                    >
                                                        <DropDown
                                                            title="Vị trí"
                                                            data={
                                                                categoryPositionOption
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div
                                                        value={formData}
                                                        onChange={(onChange) =>
                                                            onChangeValue(
                                                                'jobEducation',
                                                                onChange.target
                                                                    .value,
                                                            )
                                                        }
                                                    >
                                                        <DropDown
                                                            title="Học vấn"
                                                            data={
                                                                categoryEducationOption
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div
                                                        value={formData}
                                                        onChange={(onChange) =>
                                                            onChangeValue(
                                                                'jobExperience',
                                                                onChange.target
                                                                    .value,
                                                            )
                                                        }
                                                    >
                                                        <DropDown
                                                            title="Kinh nghiệm"
                                                            data={
                                                                categoryExperienceOption
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div
                                                        value={formData}
                                                        onChange={(onChange) =>
                                                            onChangeValue(
                                                                'jobType',
                                                                onChange.target
                                                                    .value,
                                                            )
                                                        }
                                                    >
                                                        <DropDown
                                                            title="Hình thức làm việc"
                                                            data={
                                                                categoryTypeOption
                                                            }
                                                        />
                                                    </div>
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
                                src={findjob}
                                alt="findjob-img"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
