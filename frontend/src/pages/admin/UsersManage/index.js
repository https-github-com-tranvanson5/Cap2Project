import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Loading from '~/components/Loading/Loading';
import AddAccountModal from './AddAccountModal';

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteUser } from '~/redux/apiRequest';
import { getAllUsers } from '~/redux/statitiscalApi';
import styles from './UsersManage.module.scss';

const cx = classNames.bind(styles);

function UsersManage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const isLoading = useSelector((state) => state.allUser.users?.isFetching);
    const [userList, setUserList] = useState(null); // Initialize userList as null
    const isErrors = useSelector((state) => state.allUser.users?.error);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState(null);
    const [input, setInput] = useState({
        pageSize:10,
    });
    const [pageNumber, setPageNumber] = useState(0);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteUser = (id) => {
        deleteUser(user?.jwt, dispatch, id);
    };

    useEffect(() => {
        Promise.all([getUsersMethod(), /* Other async operations */])
            .catch(error => console.error('Error:', error));
    }, [dispatch, user?.jwt, input.search, input.role, input.status, pageNumber, input.pageSize]);


    const getUsersMethod = async () => {
        try {
            const result = await getAllUsers(user?.jwt, dispatch, input.search || '', input.role || '', input.status || '', pageNumber, input.pageSize);
            setUserList(result); // Set the userList state with the result
            setPageNumber(result.number)
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        if (isErrors === false) {
            setShowModal(false);
        }
    }, [isErrors]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
        setPageNumber(0);
    };

    const handlePageClick = (value) => {
        setPageNumber(value)
    };
    return (
        <>
            {isLoading && <Loading />}
            <Modal
                className={cx('modal')}
                show={showModalDelete}
                onHide={() => setShowModalDelete(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tiếp tục xóa?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        rounded
                        secondary
                        onClick={() => setShowModalDelete(false)}
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
                <div >
                    <div>
                        <input name='search' type='text' className={cx('input-text')} placeholder='Tìm kiếm' onChange={(e) => onChangeInput(e)} />
                    </div>
                    <div className={cx('filter-container')}>

                        <div className={cx('filter-section')}>
                            <span className={cx('label')}>Filter by Role:</span>
                            <select name="role" className={cx('select')} id="roleFilter" onChange={(e) => onChangeInput(e)}>
                                <option value="">Mặc định</option>
                                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                <option value="ROLE_PM">ROLE_PM</option>
                                <option value="ROLE_USER">ROLE_USER</option>
                            </select>
                        </div>

                        <div className={cx('filter-section')}>
                            <span className={cx('label')}>Filter by Status:</span>
                            <select className={cx('select')} id="statusFilter" name='status' onChange={(e) => onChangeInput(e)}>
                                <option value="">Mặc định</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="BLOCK">BLOCK</option>
                            </select>
                        </div>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Mã người dùng</th>
                                <th>Tên người dùng</th>
                                <th>Ngày tạo</th>
                                <th>Tên đăng nhập</th>
                                <th>Địa chỉ email</th>
                                <th>Quyền người dùng</th>
                                <th>Trạng thái </th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.content.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{(index + 1) + (pageNumber) * userList.size}</td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{new Date(user.createAt).toLocaleString()}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className={cx('roleCell')}>
                                        {user.roles.map((item, index) => (
                                            <React.Fragment key={item.id}>
                                                <div className={cx('roleName', { _ADMIN: item.name === 'ROLE_ADMIN', _USER: item.name === 'ROLE_USER', _PM: item.name === 'ROLE_PM', lastItem: index === user.roles.length - 1 })}>
                                                    {item.name}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </td>
                                    <td className={cx('statusCell')}>
                                        <div className={cx('statusBadge', { activeStatus: user.status === 'ACTIVE', blockStatus: user.status === 'BLOCK' })}>
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className={styles['action-column']}>
                                        <span className={styles['content-icon']}>
                                            <FontAwesomeIcon
                                                icon={faEllipsisH}
                                                style={{
                                                    fontSize: '1em',
                                                    color: 'black',
                                                }}
                                            />
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div>
                        <div className={cx('pageSizeSelector')}>
                            <span>Show: </span>
                            <select name="pageSize" onChange={(e) => onChangeInput(e)} className={cx('pageSizeSelect')} value={input.pageSize}>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span className={cx('pageSizeText')}> entries</span>
                        </div>

                        <div className={cx("pagination")}>
                            <a
                                className={cx("prev", { disabled: pageNumber <= 0 })}
                                onClick={() => pageNumber > 0 && handlePageClick(pageNumber - 1)}
                            >
                                &laquo; Prev
                            </a>
                            <a>
                                {userList && userList.totalPages ? `${pageNumber + 1}/${userList.totalPages}` : '0/0'}
                            </a>
                            <a
                                className={cx("next", { disabled: !userList || pageNumber >= userList.totalPages - 1 })}
                                onClick={() => !userList || pageNumber < userList.totalPages - 1 && handlePageClick(pageNumber + 1)}
                            >
                                Next &raquo;
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default UsersManage;
