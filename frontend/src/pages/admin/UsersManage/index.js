import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Loading from '~/components/Loading/Loading';
import AddAccountModal from './AddAccountModal';

import styles from './UsersManage.module.scss';
import { deleteUser, getAllUsers } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function UsersManage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const isLoading = useSelector((state) => state.allUser.users?.isFetching);
    const userList = useSelector((state) => state.allUser.users?.allUsers);
    console.log(userList);
    const isErrors = useSelector((state) => state.allUser.users?.error);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteUser = (id) => {
        deleteUser(user?.jwt, dispatch, id);
    };

    useEffect(() => {
        getAllUsers(user?.jwt, dispatch);
    }, []);

    useEffect(() => {
        if (isErrors === false) {
            setShowModal(false);
        }
    }, [isErrors]);

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
                            {userList?.content.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.roles[0].id}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td className={cx('action-column')}>
                                            <span
                                                onClick={() => {
                                                    setIdUserDelete(user.id);
                                                    setShowModalDelete(true);
                                                }}
                                                className={cx('content-icon')}
                                            >
                                                <ion-icon name="trash-outline"></ion-icon>
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
