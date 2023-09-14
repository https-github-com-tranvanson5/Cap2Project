import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';

import styles from './AddAccountModal.module.scss';
import RegisterForm from '~/pages/Accounts/RegisterForm/RegisterForm';

const cx = classNames.bind(styles);

function AddAccountModal({ show, onClose }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <Modal show={show} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            ĐĂNG KÝ TÀI KHOẢN CHO DOANH NGHIỆP
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm adminAddAccountForm />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default AddAccountModal;
