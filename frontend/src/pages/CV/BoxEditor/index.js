import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import InputEditor from '~/components/Editor/InputEditor';
import { BoxIconStyled } from '../styledComponents/BoxIcon';
import { Title } from '../styledComponents/Title';

import 'tippy.js/dist/tippy.css';
import styles from './BoxEditor.module.scss';
import ModalAddOptions from './ModalAddOptions';
import { cvSlice } from '../cvSlice';

const cx = classNames.bind(styles);

function BoxEditor({ icon, heading, groupId, children, index, length }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        dispatch(cvSlice.actions.deleteGroup({ groupId }));
    };

    const handleAdd = () => {
        setShowModal(true);
    };

    const handleMoveDown = () => {
        dispatch(cvSlice.actions.moveEditor({ groupId, direction: 1 }));
    };

    const handleMoveTop = () => {
        dispatch(cvSlice.actions.moveEditor({ groupId, direction: -1 }));
    };

    return (
        <>
            <ModalAddOptions
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            />
            <div className={cx('wrapper')}>
                <div className={cx('controls')}>
                    <div className={cx('controls-left-list')}>
                        <Tippy theme="material" content="Thêm mục ở trên">
                            <span
                                onClick={() => {
                                    handleAdd();
                                }}
                                className={cx('controls-icon')}
                            >
                                <ion-icon name="add-circle-sharp"></ion-icon>
                            </span>
                        </Tippy>
                        <div>
                            {index === 0 ? (
                                <span
                                    className={cx('controls-icon', 'disable')}
                                >
                                    <ion-icon name="chevron-up-circle-sharp"></ion-icon>
                                </span>
                            ) : (
                                <Tippy
                                    theme="material"
                                    content="Di chuyển lên trên"
                                >
                                    <span
                                        onClick={() => {
                                            handleMoveTop();
                                        }}
                                        className={cx('controls-icon')}
                                    >
                                        <ion-icon name="chevron-up-circle-sharp"></ion-icon>
                                    </span>
                                </Tippy>
                            )}
                            {index === length ? (
                                <span
                                    className={cx('controls-icon', 'disable')}
                                >
                                    <ion-icon name="chevron-down-circle-sharp"></ion-icon>
                                </span>
                            ) : (
                                <Tippy
                                    theme="material"
                                    content="Di chuyển xuống dưới"
                                >
                                    <span
                                        onClick={() => {
                                            handleMoveDown();
                                        }}
                                        className={cx('controls-icon')}
                                    >
                                        <ion-icon name="chevron-down-circle-sharp"></ion-icon>
                                    </span>
                                </Tippy>
                            )}
                        </div>
                        <Tippy theme="material" content="Thêm mục ở dưới">
                            <span
                                onClick={() => {
                                    handleAdd();
                                }}
                                className={cx('controls-icon')}
                            >
                                <ion-icon name="add-circle-sharp"></ion-icon>
                            </span>
                        </Tippy>
                        <Tippy theme="material" content="Gỡ bỏ">
                            <span
                                onClick={() => {
                                    handleDelete();
                                }}
                                className={cx('controls-icon', 'trash-icon')}
                            >
                                <ion-icon name="trash-sharp"></ion-icon>
                            </span>
                        </Tippy>
                    </div>
                </div>
                <div className={cx('controls-mark')}></div>

                {heading && (
                    <div className={cx('header')}>
                        {icon && (
                            <BoxIconStyled className={cx('header-icon')}>
                                {icon}
                            </BoxIconStyled>
                        )}
                        <div className={cx('heading')}>
                            <Title>
                                <InputEditor defaultValue={heading} />
                            </Title>
                        </div>
                    </div>
                )}

                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default BoxEditor;
