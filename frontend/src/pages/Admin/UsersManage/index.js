import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Loading from '~/components/Loading/Loading';
import {
    isLoadingSelector,
    isSuccessSelector,
    userListSelector,
} from '~/redux/Selectors/adminSelector';
import { fetchDeleteUser, fetchGetAllUsers } from '../adminSlice';
import AddAccountModal from './AddAccountModal';

import styles from './UsersManage.module.scss';

const cx = classNames.bind(styles);

function UsersManage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);
    const userList = useSelector(userListSelector);
    const isSuccess = useSelector(isSuccessSelector);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteUser = (idUserDelete) => {
        dispatch(fetchDeleteUser(idUserDelete));
    };

    useEffect(() => {
        dispatch(fetchGetAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setShowModal(false);
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading && <Loading />}
            <Modal
                className={cx('modal')}
                show={showModalDelete}
                onHide={() => {
                    setShowModalDelete(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tiếp tục xóa?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        rounded
                        secondary
                        onClick={() => {
                            setShowModalDelete(false);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        primary
                        rounded
                        onClick={() => {
                            handleDeleteUser(idUserDelete);
                            setShowModalDelete(false);
                        }}
                    >
                        Xóa
                    </Button>
                </Modal.Body>
            </Modal>
            <div className={cx('wrapper')}>
                <AddAccountModal show={showModal} onClose={handleClose} />
                <div className={cx('header')}>
                    <h2 className={cx('heading')}>Quản lý người dùng</h2>
                    <div className={cx('header-options')}>
                        <Button
                            onClick={handleShow}
                            leftIcon={<ion-icon name="add-sharp"></ion-icon>}
                            primary
                            rounded
                        >
                            Cấp tài khoản
                        </Button>
                    </div>
                </div>

                <div className={cx('content')}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone Number</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length &&
                                userList.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td className={cx('action-column')}>
                                                <span
                                                    onClick={() => {
                                                        setIdUserDelete(
                                                            user.id,
                                                        );
                                                        setShowModalDelete(
                                                            true,
                                                        );
                                                    }}
                                                    className={cx(
                                                        'content-icon',
                                                    )}
                                                >
                                                    <ion-icon name="trash-sharp"></ion-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default UsersManage;
