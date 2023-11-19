import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './BoxEditorItem.module.scss';
import InputEditor from '~/components/Editor/InputEditor';
import { useDispatch } from 'react-redux';
import { cvSlice } from '../../cvSlice';

const cx = classNames.bind(styles);

function BoxEditorItem({
    title,
    editorValue = '',
    timeline,
    index,
    groupId,
    typeBlock,
    boxId,
    length,
}) {
    const dispatch = useDispatch();

    const handleAddNewEditor = () => {
        dispatch(
            cvSlice.actions.addIconicContainerItem({
                index,
                typeBlock,
                boxId,
                groupId,
            }),
        );
    };

    const handleAddNewEditorBefore = () => {
        dispatch(
            cvSlice.actions.addIconicContainerItemBefore({
                index,
                typeBlock,
                boxId,
                groupId,
            }),
        );
    };

    const handleDeleteBoxItem = () => {
        dispatch(
            cvSlice.actions.deleteBoxItem({ index, typeBlock, boxId, groupId }),
        );
    };

    const moveBottom = () => {
        dispatch(
            cvSlice.actions.moveEditor({
                typeBlock,
                boxId,
                groupId,
                direction: 1,
            }),
        );
    };

    const moveTop = () => {
        dispatch(
            cvSlice.actions.moveEditor({
                typeBlock,
                boxId,
                groupId,
                direction: -1,
            }),
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controls-left', 'controls')}>
                <div className={cx('controls-left-list')}>
                    <Tippy
                        theme="material"
                        placement="right"
                        content="Thêm mục ở trên"
                    >
                        <span
                            onClick={() => {
                                handleAddNewEditorBefore();
                            }}
                            className={cx('controls-icon')}
                        >
                            <ion-icon name="add-circle-sharp"></ion-icon>
                        </span>
                    </Tippy>
                    <div>
                        {index === 0 ? (
                            <span className={cx('controls-icon', 'disable')}>
                                <ion-icon name="chevron-up-circle-sharp"></ion-icon>
                            </span>
                        ) : (
                            <Tippy
                                theme="material"
                                placement="right"
                                content="Di chuyển lên trên"
                            >
                                <span
                                    onClick={() => {
                                        moveTop();
                                    }}
                                    className={cx('controls-icon')}
                                >
                                    <ion-icon name="chevron-up-circle-sharp"></ion-icon>
                                </span>
                            </Tippy>
                        )}

                        {length === index ? (
                            <span className={cx('controls-icon', 'disable')}>
                                <ion-icon name="chevron-down-circle-sharp"></ion-icon>
                            </span>
                        ) : (
                            <Tippy
                                theme="material"
                                placement="right"
                                content="Di chuyển xuống dưới"
                            >
                                <span
                                    onClick={() => {
                                        moveBottom();
                                    }}
                                    className={cx('controls-icon')}
                                >
                                    <ion-icon name="chevron-down-circle-sharp"></ion-icon>
                                </span>
                            </Tippy>
                        )}
                    </div>
                    <Tippy
                        theme="material"
                        placement="right"
                        content="Thêm mục ở dưới"
                    >
                        <span
                            onClick={() => {
                                handleAddNewEditor();
                            }}
                            className={cx('controls-icon')}
                        >
                            <ion-icon name="add-circle-sharp"></ion-icon>
                        </span>
                    </Tippy>
                </div>
            </div>
            <div className={cx('controls-right', 'controls')}>
                <Tippy theme="material" placement="right" content="Gỡ bỏ">
                    <span
                        onClick={() => {
                            handleDeleteBoxItem();
                        }}
                        className={cx('controls-icon', 'trash-icon')}
                    >
                        <ion-icon name="trash-sharp"></ion-icon>
                    </span>
                </Tippy>
            </div>
            <div className={cx('controls-mark')}></div>

            {timeline && (
                <div className={cx('timeline-block')}>
                    <span className={cx('title-content')}>
                        <InputEditor defaultValue={timeline} />
                    </span>
                </div>
            )}
            <div className={cx('editor-block')}>
                {title && (
                    <div className={cx('title')}>
                        <span className={cx('title-content')}>
                            <InputEditor defaultValue={title} />
                        </span>
                    </div>
                )}
                {editorValue && (
                    <div className={cx('editor')}>
                        <InputEditor defaultValue={editorValue} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoxEditorItem;
