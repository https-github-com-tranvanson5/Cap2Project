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
import config from '~/config';
import { messageRecruiterSelector } from '~/redux/Selectors/recruiterSelector';
import TextEditor from '~/pages/Blogs/EditorContent/EditorContent';
const cx = classNames.bind(styles);
const mucluongData = [
    {
        value: '101',
        name: 'Thoả thuận',
    },
    {
        value: '102',
        name: 'Triệu/tháng',
    },
    {
        value: '103',
        name: 'Từ',
    },
];
const gioitinhData = [
    {
        value: true,
        name: 'Nam',
    },
    {
        value: false,
        name: 'Nữ',
    },
    {
        value: null,
        name: 'Không yêu cầu',
    },
];
const hinhthucData = [
    {
        value: '301',
        name: 'Toàn thời gian',
    },
    {
        value: '302',
        name: 'Bán thời gian',
    },
    {
        value: '303',
        name: 'Linh hoạt',
    },
];
const kinhnghiemData = [
    {
        value: '401',
        name: 'Không yêu cầu',
    },
    {
        value: '402',
        name: 'Trên 6 tháng',
    },
    {
        value: '403',
        name: 'Trên 1 năm',
    },
    {
        value: '404',
        name: 'Trên 2 năm',
    },
    {
        value: '405',
        name: 'Trên 3 năm',
    },
    {
        value: '406',
        name: 'Trên 4 năm',
    },
    {
        value: '407',
        name: 'Trên 5 năm',
    },
    {
        value: '408',
        name: 'Trên 6 năm',
    },
    {
        value: '409',
        name: 'Trên 7 năm',
    },
    {
        value: '410',
        name: 'Trên 8 năm',
    },
    {
        value: '411',
        name: 'Trên 9 năm',
    },
    {
        value: '408',
        name: 'Trên 10 năm',
    },
];

const TYPE_SALARY_DEFAULT = 'Thoả thuận';
function RecruiterPost() {
    // get values dropdown
    const [districtID, setDictricID] = useState('');
    const [selectForm, setSelectForm] = useState({
        salary: '',
        gender: '',
        experience: '',
        city: '',
        district: '',
        workFrom: '',
    });
    // check form
    const [checkboxForm, setCheckboxRule] = useState({
        vip: 'false',
    });
    const toastifyOptions = {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };

    const formikRef = useRef(null);
    const dispatch = useDispatch();
    // Lấy dữ liệu Quận
    const [typeSalary, setTypeSalary] = useState('Mức lương');
    const salaryRef = useRef();
    const handleChangeSelect = (value, name, nameSelect) => {
        switch (nameSelect) {
            case 'salary':
                setTypeSalary(name);
                break;
            case 'city':
                setDictricID(value);
                break;
            default:
                break;
        }
        // console.log(nameSelect, name);
        setSelectForm((prev) => {
            return { ...prev, [nameSelect]: name };
        });
        // console.log(name);
    };
    // Get values của Quận

    // check box rule
    const handleChangeCheckboxRule = () => {
        setCheckboxRule((prev) => {
            return {
                ...prev,
                rule: !prev.rule,
            };
        });
    };

    const message = useSelector(messageRecruiterSelector);
    // console.log({ message });

    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            toast.success('Đăng bài thành công', toastifyOptions);
            // toast.error('🦄 Vui lòng kiểm tra lại thông!', toastifyOptions);
            dispatch(recruiterSlice.actions.restMessage(false));
            navigate(config.routes.recruitersaved);
        }
    }, [message]);

    const handleSubmit = () => {
        // console.log('submit');
        // console.log(formikRef.current.values);
        const formikValues = formikRef.current.values;
        // search timf lỗi formik
        const salary =
            selectForm.salary === TYPE_SALARY_DEFAULT
                ? TYPE_SALARY_DEFAULT
                : formikValues.salary;
        const selectValues = { ...selectForm, salary };
        const data = { ...formikValues, ...selectValues };

        dispatch(fetchPostJobDesc(data));
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        position: '',
                        amount: '',
                        salary: '',
                        level: '',
                        location: '',
                        jobDescription: '',
                        jobRequire: '',
                        welfare: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('Vui lòng nhập ô này')
                            .min(10, 'Tiêu đề phải lớn hơn 10 ký tự')
                            .max(70, 'Tiêu đề không được vượt quá 80 ký tự'),
                        salary: Yup.number()
                            .required('Vui lòng nhập ô này')
                            .typeError('Vui lòng nhập số')
                            .min(1, 'Tối thiểu 1 người'),
                        amount: Yup.number()
                            .required('Vui lòng nhập ô này')
                            .typeError('Vui lòng nhập số')
                            .min(1, 'Tối thiểu 1 người'),
                        level: Yup.string().required('Vui lòng nhập ô này'),
                        location: Yup.string()
                            .required('Vui lòng nhập ô này')
                            .min(10, 'Vui lòng nhập đầy đủ địa chỉ làm việc'),
                        jobDescription: Yup.string()
                            .required('Vui lòng nhập ô này')
                            .min(20, 'Tiêu đề phải lớn hơn 20 ký tự')
                            .max(70, 'Tiêu đề không được vượt quá 80 ký tự'),
                        jobRequire: Yup.string()
                            .required('Vui lòng nhập ô này')
                            .min(20, 'Tiêu đề phải lớn hơn 20 ký tự')
                            .max(70, 'Tiêu đề không được vượt quá 80 ký tự'),
                        welfare: Yup.string()
                            .required('Vui lòng nhập ô này')
                            .min(20, 'Tiêu đề phải lớn hơn 20 ký tự')
                            .max(70, 'Tiêu đề không được vượt quá 80 ký tự'),
                    })}
                >
                    <Form>
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
                                                Vị trí muốn tuyển dụng
                                            </div>
                                            <Field
                                                className={cx('input-text')}
                                                name="title"
                                                type="title"
                                                placeholder="Nhập vị trí bạn muốn tuyển"
                                            />
                                        </div>
                                        <p className={cx('message')}>
                                            <ErrorMessage name="title" />
                                        </p>
                                    </Col>

                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Nhập mức lương
                                            </div>
                                            <div
                                                className={cx('salary-detail')}
                                            >
                                                <Field
                                                    className={cx(
                                                        'input-salary',
                                                        typeSalary ===
                                                            TYPE_SALARY_DEFAULT
                                                            ? 'disable'
                                                            : '',
                                                    )}
                                                    innerRef={salaryRef}
                                                    name="salary"
                                                    type="text"
                                                    placeholder="Nhập mức lương"
                                                />

                                                <div
                                                    className={cx(
                                                        'content-salary',
                                                    )}
                                                >
                                                    <DropDown
                                                        onChangeSelect={(
                                                            value,
                                                            name,
                                                        ) =>
                                                            handleChangeSelect(
                                                                value,
                                                                name,
                                                                'salary',
                                                            )
                                                        }
                                                        data={mucluongData}
                                                        className={cx(
                                                            'dropdown-detail',
                                                        )}
                                                        title="Mức lương"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Số lượng người
                                            </div>
                                            <Field
                                                className={cx('input-text')}
                                                name="amount"
                                                type="text"
                                                placeholder="Số lượng cần tuyển"
                                            />
                                        </div>
                                        <p className={cx('message')}>
                                            <ErrorMessage name="amount" />
                                        </p>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Hình thức làm việc
                                            </div>
                                            <DropDown
                                                onChangeSelect={(value, name) =>
                                                    handleChangeSelect(
                                                        value,
                                                        name,
                                                        'workFrom',
                                                    )
                                                }
                                                data={hinhthucData}
                                                className={cx(
                                                    'dropdown-detail',
                                                )}
                                                title="Chọn hình thức"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Giới tính
                                            </div>
                                            <DropDown
                                                onChangeSelect={(value, name) =>
                                                    handleChangeSelect(
                                                        value,
                                                        name,
                                                        'gender',
                                                    )
                                                }
                                                data={gioitinhData}
                                                className={cx(
                                                    'dropdown-detail',
                                                )}
                                                title="Giới tính"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Vị trí
                                            </div>
                                            <Field
                                                className={cx('input-text')}
                                                name="level"
                                                type="text"
                                                placeholder="Nhập vị trí muốn tuyển dụng"
                                            />
                                        </div>
                                        <p className={cx('message')}>
                                            <ErrorMessage name="level" />
                                        </p>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Kinh nghiệm
                                            </div>
                                            <DropDown
                                                onChangeSelect={(value, name) =>
                                                    handleChangeSelect(
                                                        value,
                                                        name,
                                                        'experience',
                                                    )
                                                }
                                                data={kinhnghiemData}
                                                className={cx(
                                                    'dropdown-detail',
                                                )}
                                                title="Kinh nghiệm"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Thành phố
                                            </div>
                                            <DropDown
                                                title=" Thành phố"
                                                onChangeSelect={(value, name) =>
                                                    handleChangeSelect(
                                                        value,
                                                        name,
                                                        'city',
                                                    )
                                                }
                                                data={getAllProvinces()}
                                                className={cx(
                                                    'dropdown-detail',
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Quận/Huyện
                                            </div>
                                            <DropDown
                                                title="Quận/Huyện"
                                                data={getAllDistricts(
                                                    districtID,
                                                )}
                                                className={cx(
                                                    'dropdown-detail',
                                                )}
                                                onChangeSelect={(value, name) =>
                                                    handleChangeSelect(
                                                        value,
                                                        name,
                                                        'district',
                                                    )
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Địa chỉ làm việc
                                            </div>
                                            <Field
                                                className={cx('input-text')}
                                                name="location"
                                                type="text"
                                                placeholder="Ví dụ: Tầng 6, số 20 Ông Ích Khiêm, Hải Châu, Đà Nẵng"
                                            />
                                        </div>
                                        <p className={cx('message')}>
                                            <ErrorMessage name="location" />
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Nhập mô tả công việc
                                            </div>
                                            <TextEditor
                                                setValue={
                                                    formikRef?.current
                                                        ?.setFieldValue
                                                }
                                                fieldName={'jobDescription'}
                                                isHidderTools={true}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Yêu cầu ứng viên
                                            </div>

                                            <TextEditor
                                                setValue={
                                                    formikRef?.current
                                                        ?.setFieldValue
                                                }
                                                fieldName={'jobRequire'}
                                                isHidderTools={true}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {/* Input job detail textarea */}
                                <Row>
                                    <Col sm={12} md={12} className={'mb-5'}>
                                        <div className={cx('content-input')}>
                                            <div className={cx('detail-name')}>
                                                Quyền lợi
                                            </div>
                                            <TextEditor
                                                setValue={
                                                    formikRef?.current
                                                        ?.setFieldValue
                                                }
                                                fieldName={'welfare'}
                                                isHidderTools={true}
                                                className={cx('text-field')}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* <div className={cx('content-rule')}>
                                <div className={cx('checkbox-rule')}>
                                    <input
                                        type="checkbox"
                                        checked={checkboxForm.rule}
                                        onChange={handleChangeCheckboxRule}
                                    />
                                </div>
                                <div className={cx('rule')}>
                                    Tôi cam kết thông tin mô tả về việc làm là
                                    thật và tuân thủ các quy tắc của JobCare.vn
                                </div>
                            </div> */}
                            <div className={cx('submit-btn')}>
                                <div className={cx('btn-right')}>
                                    <Button saveInput>Lưu nháp</Button>
                                    {/* <ModalDeleted></ModalDeleted> */}
                                    <Button
                                        type="submit"
                                        primary
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                    >
                                        Đăng bài
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Container>
        </div>
    );
}

export default RecruiterPost;
