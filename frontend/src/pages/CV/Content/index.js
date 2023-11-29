import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import {
    contentCvSelector,
    overviewSelector,
    themeSelector,
} from '~/redux/Selectors/cvSelector';
import styles from './Content.module.scss';
import EditorGroup from './Group';
import Overview from './Overview';
import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import { cvDetail } from '~/redux/apiRequest';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Content(props, ref) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const theme = useSelector(themeSelector);
    const contentData = useSelector(contentCvSelector);
    const overviewData = useSelector(overviewSelector);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const jobDataRecruiterDetail = useSelector(
        (state) => state.cvData.data?.cvDetail,
    );
    useEffect(() => {
        if (id) {
            cvDetail(isAuth?.jwt, id, dispatch);
            console.log('jobDataRecruiterDetail' , jobDataRecruiterDetail);
        } else {
            cvDetail(isAuth?.jwt, undefined, dispatch); // Fetch empty job data when creating a new job
        }
    }, [isAuth?.jwt, id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g. make an API call
        const data = { ...contentData, ...overviewData, userId: isAuth.id };

        const content = {
            content: JSON.stringify(data),
        };
        console.log('Form submitted with data:', data);
        // postCv(content, isAuth?.jwt, dispatch);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <div className={cx('button')} >
                <Button type="submit" primary rounded small >
                    Lưu
                </Button>
                </div>
               
            </ThemeProvider>
        </form>
    );
}

export default forwardRef(Content);
