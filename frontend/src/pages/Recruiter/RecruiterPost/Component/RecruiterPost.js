import moment from 'moment/moment';
import React from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { ref } from 'firebase/storage';
import styles from './RecruiterPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from '~/components/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProvinces, getAllDistricts } from '~/helper/geomap';
import DropDown from '~/components/Input/DropDown/DropDown';
import TextEditor from '~/pages/Blogs/EditorContent';
import { getCareer, postJob } from '~/redux/apiRequest';
import {
    categoryTypeOption,
    categoryGenderOption,
    categoryExperienceOption,
    categoryEducationOption,
    categoryPositionOption,
} from '../Data/DataEntry';
import ImagePreview from '../ImageProcess/Image/ImagePreview';
import FirebaseFileUploader from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/FirebaseFileUploader';
import initializeFirebaseStorage from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/firebaseConfig';

const cx = classNames.bind(styles);

const initialState = {};

function RecruiterPost() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const [skillDescription, setSkillDesccription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [benefit, setBenefit] = useState('');
    const careers = useSelector((state) => state.allJob.career?.careerCurrent);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const nameContact = isAuth.name;
    const emailContact = isAuth.email;
    const formatDate = 'YYYY-MM-DD';
    var date = new Date();
    const starDays = moment(date).format(formatDate);
    const next15Days = moment().add(15, 'days').format(formatDate);
    const [imageUpload, setImageUpload] = useState(null);

    // console.log(next15Days);

    useEffect(() => {
        getCareer(isAuth?.jwt, dispatch);
    }, []);

    const {
        jobEducation,
        jobExperience,
        jobPosition,
        jobType,
        title,
        company,
        jobStatus = 'ACTIVE',
        genderRequest,
        contactAddress,
        address,
        startSalary,
        endSalary,
        recruitmentStartDate = starDays,
        contactPhone,
    } = form;

    const [listCareerId, setListCareerId] = useState([]);

    const handleCheckboxChange = (id) => {
        if (listCareerId.includes(id)) {
            // Nếu đã có, loại bỏ id khỏi listCareerId
            setListCareerId(listCareerId.filter((item) => item !== id));
        } else {
            // Nếu chưa có, thêm id vào danh sách listCareerId
            setListCareerId([...listCareerId, id]);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // const onCareerChange = (e) => {
    //     setCareers({ ...careers, careers: e.target.value });
    // };

    const onCityChange = (e) => {
        setForm({ ...form, contactAddress: e.target.value });
    };

    const onGenderChange = (e) => {
        setForm({ ...form, genderRequest: e.target.value });
    };
    const onEduCationChange = (e) => {
        setForm({ ...form, jobEducation: e.target.value });
    };
    const onJobExperienceChange = (e) => {
        setForm({ ...form, jobExperience: e.target.value });
    };
    const onJobPositionChange = (e) => {
        setForm({ ...form, jobPosition: e.target.value });
    };
    const onJobTypeChange = (e) => {
        setForm({ ...form, jobType: e.target.value });
    };

    const handleSubmit = async (e) => {
        const storageRef = ref(
            initializeFirebaseStorage(),
            `images/${Date.now()}_${imageUpload.name}`,
        );
        e.preventDefault();
        const url = await FirebaseFileUploader(imageUpload, storageRef);
        console.log(url);
        const data = {
            ...form,
            imageUrl: url,
            skillDescription,
            jobDescription,
            companyDescription,
            benefit,
            careers: listCareerId,
            recruitmentEndDate: next15Days,
            recruitmentStartDate,
            jobStatus,
            contactName: nameContact,
            contactEmail: emailContact,
        };
        console.log(data);
        postJob(data, isAuth?.jwt, dispatch);
    };

    const handleCallback = (data) => {
        setImageUpload(data);
    };

    return (
        <Container>
            <div className={cx('wrapper')}>
                <section className={cx('wrapper')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('title-header')}>
                            Tạo bài tuyển dụng mới
                        </div>
                        <div className={cx('post-title')}>Thông tin cơ bản</div>
                        <div className={cx('title-post')}>
                            <div className={cx('content-detail')}>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div>
                                            <ImagePreview
                                                callback={handleCallback}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Tên doanh nghiệp
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="company"
                                                value={company}
                                                type="text"
                                                placeholder="Nhập tên doanh nghiệp của bạn"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Mô tả về doanh nghiệp
                                            </div>
                                            <div className={cx('text-editor')}>
                                                <TextEditor
                                                    setContentBlog={
                                                        setCompanyDescription
                                                    }
                                                    sHidderTools={false}
                                                    isHidderTools={false}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Vị trí muốn tuyển dụng
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="title"
                                                value={title}
                                                type="text"
                                                placeholder="Nhập vị trí bạn muốn tuyển"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Mô tả về công việc
                                            </div>
                                            <div className={cx('text-editor')}>
                                                <TextEditor
                                                    setContentBlog={
                                                        setJobDescription
                                                    }
                                                    sHidderTools={false}
                                                    isHidderTools={false}
                                                    className={cx(
                                                        'item-text-editor',
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <div className={cx('content-input')}>
                                        <div className={cx('detail-name')}>
                                            Thể loại công việc
                                        </div>
                                        {careers?.map((career) => (
                                            <div className={cx('content-rule')}>
                                                <div
                                                    key={career.id}
                                                    className={cx('rule')}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={listCareerId.includes(
                                                            career.id,
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                career.id,
                                                            )
                                                        }
                                                        className={cx(
                                                            'checkbox',
                                                        )}
                                                    />
                                                    <div>{career.name}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Yêu cầu kỹ năng cho công việc
                                            </div>
                                            <div className={cx('text-editor')}>
                                                <TextEditor
                                                    setContentBlog={
                                                        setSkillDesccription
                                                    }
                                                    sHidderTools={false} // Set this to false to show the toolbar
                                                    isHidderTools={false}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Lương khởi điểm
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="startSalary"
                                                value={startSalary}
                                                type="text"
                                                placeholder="Nhập lương khởi điểm"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Lương tối đa
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="endSalary"
                                                value={endSalary}
                                                type="text"
                                                placeholder="Nhập lương tối đa"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row lg={4}>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Thành phố
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={contactAddress}
                                                onChange={onCityChange}
                                            >
                                                <DropDown
                                                    title="Thành phố"
                                                    data={getAllProvinces()}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Địa chỉ
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="address"
                                                value={address}
                                                type="text"
                                                placeholder="Nhập địa chỉ của bạn"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Số điện thoại
                                            </div>
                                            <input
                                                className={cx('input-text')}
                                                name="contactPhone"
                                                value={contactPhone}
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row lg={4}>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Giới tính
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={genderRequest}
                                                onChange={onGenderChange}
                                            >
                                                <DropDown
                                                    title="Giới tính"
                                                    data={categoryGenderOption}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Thời gian làm việc
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={jobType}
                                                onChange={onJobTypeChange}
                                            >
                                                <DropDown
                                                    title="Thời gian làm việc"
                                                    data={categoryTypeOption}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Vị trí công việc
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={jobPosition}
                                                onChange={onJobPositionChange}
                                            >
                                                <DropDown
                                                    title="Vị trí"
                                                    data={
                                                        categoryPositionOption
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row lg={4}>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Bằng cấp
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={jobEducation}
                                                onChange={onEduCationChange}
                                            >
                                                <DropDown
                                                    title="Bằng cấp"
                                                    data={
                                                        categoryEducationOption
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Kinh nghiệm
                                            </div>
                                            <div
                                                className={cx('dropdown')}
                                                value={jobExperience}
                                                onChange={onJobExperienceChange}
                                            >
                                                <DropDown
                                                    title="Kinh nghiệm"
                                                    data={
                                                        categoryExperienceOption
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Quyền lợi
                                            </div>
                                            <div className={cx('text-editor')}>
                                                <TextEditor
                                                    setContentBlog={setBenefit}
                                                    sHidderTools={false}
                                                    isHidderTools={false}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={cx('submit-btn')}>
                            <div className={cx('btn-right')}>
                                <Button saveInput>Lưu nháp</Button>
                                {/* <ModalDeleted></ModalDeleted> */}
                                <Button type="submit" primary>
                                    Đăng bài
                                </Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </Container>
    );
}

export default RecruiterPost;
