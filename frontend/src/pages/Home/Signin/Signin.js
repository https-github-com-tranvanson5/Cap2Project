import { useRef } from 'react';
import classNames from 'classnames/bind';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';

import styles from './Signin.module.scss';
import Input from '~/components/Input/Input/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
export default function Signin() {
    const formikRef = useRef(null);

    const handleSubmit = () => {
        const value = formikRef.current.values;

        console.log('value-signup:', value);
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col className={cx('left')} lg={4} md={4}>
                        <h3 className={cx('left-title')}>Dùng thử ngay</h3>
                        <p className={cx('sub-title')}>
                            Bạn đang đau đầu với vấn đề tuyển dụng và quản lý
                            nhân sự? Điền thông tin ngay để đăng ký dùng thử 14
                            ngày miễn phí cùng JobCare.
                        </p>
                        <Row>
                            <Col>
                                <div className={cx('number')}>40.000+</div>
                                <div>người lao động</div>
                            </Col>
                            <Col>
                                <div className={cx('number')}>360.000+</div>
                                <div>giờ làm việc</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        className={cx('right')}
                        lg={{ span: 5, offset: 3 }}
                        md={{ span: 5, offset: 3 }}
                    >
                        <Formik
                            innerRef={formikRef}
                            initialValues={{
                                fullname: '',
                                email: '',
                                phoneNumber: '',
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={Yup.object({
                                fullname: Yup.string().required(
                                    'Mục này không được để trống!',
                                ),
                                email: Yup.string()
                                    .email('Email không hợp lệ')
                                    .required('Mục này không được để trống!'),
                                phoneNumber: Yup.string().required(
                                    'Mục này không được để trống!',
                                ),
                            })}
                        >
                            {(formik) => (
                                <form
                                    className={cx('form')}
                                    onSubmit={formik.handleSubmit}
                                >
                                    <Row>
                                        <Col
                                            className={cx('input-block')}
                                            md={12}
                                        >
                                            <div className={cx('form-group')}>
                                                <Input
                                                    rounded
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    placeholder="Tên của bạn"
                                                    {...formik.getFieldProps(
                                                        'fullname',
                                                    )}
                                                    leftIcon={
                                                        <ion-icon name="person-add-outline"></ion-icon>
                                                    }
                                                />
                                                <div
                                                    className={cx(
                                                        'error-message',
                                                    )}
                                                >
                                                    <ErrorMessage name="fullname" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col
                                            className={cx('input-block')}
                                            md={12}
                                        >
                                            <div className={cx('form-group')}>
                                                <Input
                                                    rounded
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    {...formik.getFieldProps(
                                                        'email',
                                                    )}
                                                    leftIcon={
                                                        <ion-icon name="mail-outline"></ion-icon>
                                                    }
                                                />
                                                <div
                                                    className={cx(
                                                        'error-message',
                                                    )}
                                                >
                                                    <ErrorMessage name="email" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col
                                            className={cx('input-block')}
                                            md={12}
                                        >
                                            <div className={cx('form-group')}>
                                                <Input
                                                    rounded
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder="Số điện thoại"
                                                    {...formik.getFieldProps(
                                                        'phoneNumber',
                                                    )}
                                                    leftIcon={
                                                        <ion-icon name="call-outline"></ion-icon>
                                                    }
                                                />
                                                <div
                                                    className={cx(
                                                        'error-message',
                                                    )}
                                                >
                                                    <ErrorMessage name="phoneNumber" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <Row className={cx('right-bottom')}>
                                                <Col
                                                    className={cx(
                                                        'right-contact',
                                                    )}
                                                    md={6}
                                                >
                                                    Hỗ trợ: 076 3030 364
                                                </Col>
                                                <Col md={6}>
                                                    <Button
                                                        type="submit"
                                                        right
                                                        primary
                                                        rounded
                                                    >
                                                        Dùng thử ngay
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
