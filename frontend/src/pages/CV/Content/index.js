import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { contentCvSelector, themeSelector } from '~/redux/Selectors/cvSelector';
import styles from './Content.module.scss';
import EditorGroup from './Group';
import Overview from './Overview';

const cx = classNames.bind(styles);

function Content(props, ref) {
    const theme = useSelector(themeSelector);
    const contentData = useSelector(contentCvSelector);

    return (
        <ThemeProvider theme={theme}>
            <div ref={ref} className={cx('wrapper')}>
                <Overview />

                {/* Content CV */}
                {contentData?.map((contentItem, index) => {
                    const length = contentData.length - 1;
                    return (
                        <EditorGroup
                            index={index}
                            length={length}
                            key={contentItem.id}
                            groupId={contentItem.id}
                            editorData={contentItem}
                        />
                    );
                })}
            </div>
        </ThemeProvider>
    );
}

export default forwardRef(Content);
