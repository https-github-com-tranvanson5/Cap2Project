import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '~/components/Button';

function ModalPost({ handleClose, show, onActionRequest }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>THÔNG BÁO !!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xoá bài viết này không !!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button saveInput onClick={handleClose}>
                        Huỷ bỏ
                    </Button>
                    <Button
                        primary
                        onClick={() => {
                            onActionRequest();
                            handleClose();
                        }}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalPost;
