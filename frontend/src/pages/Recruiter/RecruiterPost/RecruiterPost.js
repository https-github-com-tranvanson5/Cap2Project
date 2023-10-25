import moment from 'moment/moment';
import React from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './RecruiterPost.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import { getAllProvinces, getAllDistricts } from '~/helper/geomap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DropDown from '~/components/Input/DropDown/DropDown';
// import { fetchPostJobDesc, homeSlice } from '~/pages/Home/homeSlice';

import { fetchPostJobDesc, recruiterSlice } from '../recruiterSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextEditor from '~/pages/Blogs/EditorContent';
import { getCareer, postJob } from '~/redux/apiRequest';
import Input from '~/components/Input/Input/Input';
const cx = classNames.bind(styles);

const initialState = {
    recruitmentEndDate: '',
    jobPosition: '',
    company: '',
    companyLink: '',
    imageUrl: '',
    note: '',
    jobType: '',
};
//Category of carrer

const categoryCareerOption = [
    {
        value: '1',
        name: 'Công nghệ thông tin',
    },
    // {
    //     value: '2',
    //     name: 'Kế toán',
    // },
    // {
    //     value: '3',
    //     name: 'Ngân hàng',
    // },
    // {
    //     value: '4',
    //     name: 'Nhân viên kinh doanh',
    // },
    // {
    //     value: '4',
    //     name: 'Giảng viên',
    // },
    // {
    //     value: '4',
    //     name: 'Điều dưỡng',
    // },
];

//Category of tuye of job
const categoryTypeOption = [
    {
        value: 'PARTTIME',
        name: 'PARTTIME',
    },
    {
        value: 'FULLTIME',
        name: 'FULLTIME',
    },
];

//category gender
const categoryGenderOption = [
    {
        value: 'Nam',
        name: 'Nam',
    },
    {
        value: 'Nữ',
        name: 'Nữ',
    },
    {
        value: 'Cả nam và nữ',
        name: 'Cả nam và nữ',
    },
    {
        value: 'Khác',
        name: 'Khác',
    },
];

//Category of Experience
const categoryExperienceOption = [
    {
        value: 'LESS_THAN_ONE_YEAR',
        name: 'Dưới 1 năm',
    },
    {
        value: 'ONE_TO_TWO_YEARS',
        name: 'Từ 1 đến 2 năm',
    },
    {
        value: 'TWO_TO_FIVE_YEARS',
        name: 'Từ 2 đến 5 năm',
    },
    {
        value: 'FIVE_TO_TEN_YEARS',
        name: 'Từ 5 đến 10 năm',
    },
    {
        value: 'MORE_THAN_TEN_YEARS',
        name: 'Trên 10 năm',
    },
];

//Category of Education
const categoryEducationOption = [
    {
        value: 'JUNIOR_HIGH_SCHOOL',
        name: 'Trung học cơ sở',
    },
    {
        value: 'HIGH_SCHOOL',
        name: 'Trung học phổ thông',
    },
    {
        value: 'CERTIFICATE',
        name: 'Giấy chứng nhận',
    },
    {
        value: 'ASSOCIATE',
        name: 'Kết hợp',
    },
    {
        value: 'BACHELOR',
        name: 'Cử nhân',
    },
    {
        value: 'MASTER',
        name: 'Bậc thầy',
    },
    {
        value: 'DOCTORAL',
        name: 'Tiến sĩ',
    },
];

//category of Position
const categoryPositionOption = [
    {
        value: 'EMPLOYEE',
        name: 'EMPLOYEE',
    },
    {
        value: 'STAFF',
        name: 'STAFF',
    },
    {
        value: 'INTERN',
        name: 'INTERN',
    },
    {
        value: 'FRESHER',
        name: 'FRESHER',
    },
    {
        value: 'JUNIOR',
        name: 'JUNIOR',
    },
    {
        value: 'SENIOR',
        name: 'SENIOR',
    },
    {
        value: 'MANAGER',
        name: 'MANAGER',
    },
    {
        value: 'CHIEF',
        name: 'CHIEF',
    },
];

function RecruiterPost() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const [skillDescription, setSkillDesccription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [benefit, setBenefit] = useState('');
    const careers = useSelector((state) => state.allJob.career?.careerCurrent);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const nameContact = isAuth.name
    const emailContact = isAuth.email
    const formatDate = 'YYYY-MM-DD';
    var date = new Date();
    const starDays = moment(date).format(formatDate);
    const next15Days = moment().add(15, 'days').format(formatDate);
    console.log(next15Days)

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

    const onBenefitChange = (e) => {
        setForm({ ...form, benefit: e.target.value });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            skillDescription,
            jobDescription,
            companyDescription,
            benefit,
            careers: listCareerId,
            recruitmentEndDate : next15Days,
            recruitmentStartDate,
            jobStatus,
            contactName : nameContact,
            contactEmail : emailContact,
            
        };
        console.log(data);
        postJob(data, isAuth?.jwt, dispatch);
    };
    return (
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
                                        <TextEditor
                                            setContentBlog={
                                                setCompanyDescription
                                            }
                                            sHidderTools={false}
                                            isHidderTools={true}
                                        />
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
                                        <TextEditor
                                            setContentBlog={setJobDescription}
                                            sHidderTools={false}
                                            isHidderTools={true}
                                        />
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
                                                    className={cx('checkbox')}
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
                                        <TextEditor
                                            setContentBlog={
                                                setSkillDesccription
                                            }
                                            sHidderTools={false}
                                            isHidderTools={true}
                                        />
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
                            </Row>
                            <Row lg={4}>
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
                            </Row>
                            <Row lg={4}>
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
                                                data={categoryPositionOption}
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
                                                data={categoryEducationOption}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row lg={4}>
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
                                                data={categoryExperienceOption}
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
                                        <TextEditor
                                            setContentBlog={
                                                setBenefit
                                            }
                                            sHidderTools={false}
                                            isHidderTools={true}
                                        />
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
    );
}

export default RecruiterPost;
