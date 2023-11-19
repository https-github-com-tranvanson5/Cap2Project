import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

import images from '~/assets/images';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function AvatarOverview() {
    const inputRef = useRef(null);
    const [visible, setVisible] = useState(true);
    const [file, setFile] = useState({
        preview: '',
        data: '',
    });

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file);
        };
    }, [file]);

    const handleChangeFile = async (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setFile(img);
    };

    return (
        <div className={cx('wrapper')}>
            {visible && (
                <div className={cx('avatar-block')}>
                    {file.preview ? (
                        <img
                            className={cx('avatar-img')}
                            src={file.preview}
                            alt="avatar"
                        />
                    ) : (
                        <img
                            className={cx('avatar-img')}
                            src={images.cvAvatar}
                            alt="avatar"
                        />
                    )}

                    <label htmlFor="file">
                        <input
                            className={cx('input', 'input-file')}
                            name="file"
                            id="file"
                            ref={inputRef}
                            type="file"
                            onChange={handleChangeFile}
                        />
                        <div className={cx('upload-avatar')}>
                            <ion-icon name="push-outline"></ion-icon>
                        </div>
                    </label>
                </div>
            )}
            <div className={cx('controls')}>
                <div className={cx('control-icon')}>
                    <ion-icon name="push-outline"></ion-icon>
                </div>
                <div
                    onClick={() => {
                        setVisible(!visible);
                    }}
                    className={cx('control-icon')}
                >
                    {visible ? (
                        <ion-icon name="eye-off-outline"></ion-icon>
                    ) : (
                        <ion-icon name="eye-sharp"></ion-icon>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AvatarOverview;
