import classNames from 'classnames/bind';
import { ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import CheckBox from '~/pages/Recruiter/RecruiterPost/CheckBox/CheckBox';

import FirebaseFileUploader from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/FirebaseFileUploader';
import initializeFirebaseStorage from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/firebaseConfig';
import ImagePreview from '~/pages/Recruiter/RecruiterPost/ImageProcess/Image/ImagePreview';
import { getUserById, updateById } from '~/redux/userManagerRequest';
import styles from './UserDetail.module.scss';

const cx = classNames.bind(styles);

export default function UserDetail() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [userData, setUserData] = useState();
    const id = useParams().id;
    const [imageUpload, setImageUpload] = useState(null);
    const history = useNavigate();
    const [role, setRole] = useState([]);

    useEffect(() => {
        getGetUserByMethod();
        // console.log(role);
    }, []);
    const getGetUserByMethod = async () => {
        const result = await getUserById(user?.jwt, dispatch, id);
        setUserData(result);
        const getRoles = result.roles.map((item) => item.id);
        setRole(getRoles);
    };
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        const storageRef = ref(
            initializeFirebaseStorage(),
            `images/${Date.now()}_${imageUpload?.name}`,
        );
        const url = await FirebaseFileUploader(imageUpload, storageRef);
        const data = {
            ...userData,
            avatar: url,
            roles: role,
        };
        console.log(data);
        updateById(user?.jwt, id, data, dispatch);
        history(-1);
    };
    const handleCallback = (data) => {
        setImageUpload(data);
    };
    const handleCallbackCheckBox = (data) => {
        setRole(data);
    };

    return (
        <div>
            <Container>
                <div className={cx('wrapper')} onSubmit={handleSubmit}>
                    <form>
                        <h3 className={cx('settings-block-heading')}>
                            Thông tin Chi tiết
                        </h3>
                        <Row>
                            <Col md={6} className={cx('left')}>
                                <div className={cx('content')}>
                                    <div className={cx('settings-block')}>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Họ và tên
                                            </div>
                                            <input
                                                className={cx('input')}
                                                value={userData?.name}
                                                name="name"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Email
                                            </div>

                                            <input
                                                value={userData?.email}
                                                className={cx('input')}
                                                name="email"
                                                type="email"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Địa chỉ
                                            </div>
                                            <input
                                                value={userData?.address}
                                                className={cx('input')}
                                                name="address"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Ngày tháng năm sinh
                                            </div>
                                            <input
                                                value={userData?.dob}
                                                className={cx('input')}
                                                name="dob"
                                                type="date"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Giới tính
                                            </div>
                                            <input
                                                value={userData?.gender}
                                                className={cx('input')}
                                                type="text"
                                                name="gender"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Số điện thoại
                                            </div>
                                            <input
                                                value={userData?.phone}
                                                className={cx('input')}
                                                type="number"
                                                name="phone"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Quyền
                                            </div>
                                            <CheckBox
                                                objects={[
                                                    {
                                                        id: 'admin',
                                                        name: 'Quản trị viên',
                                                    },
                                                    {
                                                        id: 'pm',
                                                        name: 'Nhà tuyển dụng',
                                                    },
                                                    {
                                                        id: 'user',
                                                        name: 'Người dùng',
                                                    },
                                                ]}
                                                checked={role || ''}
                                                onListIdChange={
                                                    handleCallbackCheckBox
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                md={{ span: 4, offset: 2 }}
                                className={cx('right')}
                            >
                                <div>
                                    <ImagePreview
                                        callback={handleCallback}
                                        setValue={userData?.avatar}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Button primary type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
