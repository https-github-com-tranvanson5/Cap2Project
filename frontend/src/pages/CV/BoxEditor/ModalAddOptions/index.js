import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { CV_GROUP_TYPE } from '~/constants/constants';
import { typeUsedContentSelector } from '~/redux/Selectors/cvSelector';
import { cvSlice } from '../../cvSlice';

import styles from './ModalAddOptions.module.scss';

const cx = classNames.bind(styles);

const modalOptions = [
    {
        icon: <ion-icon name="person-outline"></ion-icon>,
        desc: 'Thông tin liên hệ',
        isDisable: true,
    },
    {
        type: CV_GROUP_TYPE.overview,
        icon: <ion-icon name="accessibility-outline"></ion-icon>,
        desc: 'Giới thiệu bản thân',
        isDisable: true,
    },
    {
        type: CV_GROUP_TYPE.goals,
        icon: <ion-icon name="locate-outline"></ion-icon>,
        desc: 'Mục tiêu nghề nghiệp',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.skills,
        icon: <ion-icon name="dice-outline"></ion-icon>,
        desc: 'Kiến thức và Kỹ năng',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.experience,
        icon: <ion-icon name="extension-puzzle-outline"></ion-icon>,
        desc: 'Kinh nghiệm làm việc',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.education,
        icon: <ion-icon name="school-outline"></ion-icon>,
        desc: 'Trình độ học vấn',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.lang,
        icon: <ion-icon name="language-outline"></ion-icon>,
        desc: 'Ngôn ngữ',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.projects,
        icon: <ion-icon name="business-outline"></ion-icon>,
        desc: 'Dự án đã làm',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.certificate,
        icon: <ion-icon name="ribbon-outline"></ion-icon>,
        desc: 'Chứng chỉ',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.prize,
        icon: <ion-icon name="trophy-outline"></ion-icon>,
        desc: 'Giải thưởng',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.activity,
        icon: <ion-icon name="cellular-outline"></ion-icon>,
        desc: 'Hoạt động',
        isDisable: false,
    },
    {
        type: CV_GROUP_TYPE.custome,
        icon: <ion-icon name="options-outline"></ion-icon>,
        desc: 'Tùy chỉnh',
        isDisable: false,
    },
];

function ModalAddOptions({ show, onClose }) {
    const dispatch = useDispatch();
    const typeUsedList = useSelector(typeUsedContentSelector);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const newOptions = modalOptions.map((option) => {
            const isUsed = typeUsedList.find((type) => type === option.type);
            if (isUsed) {
                return { ...option, isDisable: true };
            }
            return option;
        });
        setOptions(newOptions);
    }, [typeUsedList]);

    const handleAddGroup = (type) => {
        dispatch(cvSlice.actions.addGroup({ type }));
    };

    return (
        <Modal show={show} onHide={onClose} className={cx('wrapper')}>
            <Modal.Header className={cx('header')} closeButton>
                <Modal.Title className={cx('title')}>
                    Thêm thành phần mới
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={cx('body')}>
                <Row className={cx('options')}>
                    {options.map((option, index) => {
                        return (
                            <Col key={index} md={3}>
                                {option.isDisable ? (
                                    <div
                                        className={cx(
                                            'options-item',
                                            'disable',
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                'options-item-content',
                                            )}
                                        >
                                            <span
                                                className={cx(
                                                    'options-content-icon',
                                                )}
                                            >
                                                {option.icon}
                                            </span>
                                        </div>
                                        <div
                                            className={cx('options-item-desc')}
                                        >
                                            {option.desc}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('options-item')}>
                                        <div
                                            onClick={() => {
                                                handleAddGroup(option.type);
                                            }}
                                            className={cx(
                                                'options-item-content',
                                            )}
                                        >
                                            <span
                                                className={cx(
                                                    'options-content-icon',
                                                )}
                                            >
                                                {option.icon}
                                            </span>
                                        </div>
                                        <div
                                            className={cx('options-item-desc')}
                                        >
                                            {option.desc}
                                        </div>
                                    </div>
                                )}
                            </Col>
                        );
                    })}
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default ModalAddOptions;
