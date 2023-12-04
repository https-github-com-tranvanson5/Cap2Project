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
import { json, useParams } from 'react-router-dom';
import { cvDetail, postCv } from '~/redux/apiRequest';
import { useEffect } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);
const initialState = {};
function Content(props, ref) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const theme = useSelector(themeSelector);
    const contentData = useSelector(contentCvSelector);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const dataDetail = useSelector((state) => state.cvData.data?.cvDetail);
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        if (id) {
            cvDetail(isAuth?.jwt, id, dispatch);
        } else {
            cvDetail(isAuth?.jwt, undefined, dispatch); // Fetch empty job data when creating a new job
        }
    }, [isAuth?.jwt, id]);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                if (dataDetail?.content) {
                    try {
                        const data = JSON.parse(dataDetail.content);
                        setFormData({
                            content: data,
                        });
                        console.log('dataDetail', formData.content);
                        // Rest of your code
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            }
        };
        fetchData();
    }, [id, dataDetail]);

    // console.log('formdata', formData);
    // console.log('contentData', contentData);

    return (
        <ThemeProvider theme={theme}>
            <div ref={ref} className={cx('wrapper')}>
                <Overview />

                {/* Content CV */}
                {id
                    ? formData.content?.content.map((contentItem, index) => {
                        const length = formData.content.content.length - 1;
                        return (
                            <EditorGroup
                                index={index}
                                length={length}
                                key={contentItem.id}
                                groupId={contentItem.id}
                                editorData={contentItem}
                            />
                        );
                    })
                    : contentData.map((contentItem, index) => (
                        <EditorGroup
                            key={contentItem.id}
                            index={index}
                            length={contentData.length - 1}
                            groupId={contentItem.id}
                            editorData={contentItem}
                        />
                    ))}
            </div>
        </ThemeProvider>
    );
}

export default forwardRef(Content);
