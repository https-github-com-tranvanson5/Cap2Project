import classNames from 'classnames/bind';
import { useRef } from 'react';

import Content from './Content';

import styles from './Cv.module.scss';
import Suggestor from './Suggestor';
import ToolBar from './ToolBar';

const cx = classNames.bind(styles);

function CV() {
    const contentRef = useRef();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('toolbar')}>
                <ToolBar cvRef={contentRef} />
            </div>
            <div className={cx('content')}>
                <Content ref={contentRef} />
            </div>
            <div className={cx('suggestor')}>
                <Suggestor />
            </div>
        </div>
    );
}

export default CV;
