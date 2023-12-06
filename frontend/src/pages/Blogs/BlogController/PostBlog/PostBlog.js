import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextEditor from '../../EditorContent/EditorContent';
import styles from './PostBlog.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import { postBlog } from '~/redux/apiRequest';

const initialState = {
    title: '',
    content: '',
    comments: [],
};

const cx = classNames.bind(styles);

function PostBlog() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);

    const [content, setContent] = useState(initialState);

    const { id } = useParams();

    const navigate = useNavigate();

    const { title } = form;

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newFormData = {
            ...form,
            content : content,
        }; // Create a copy of the existing form
        if (id) {
            newFormData.id = id;
            console.log(newFormData);
            // editJob(newFormData, isAuth?.jwt, dispatch);
        } else {
            console.log(newFormData);
            postBlog(newFormData, isAuth?.jwt, dispatch);
            toast.success('Blog đã được tạo thành công');
            navigate(-1);
        }
    };


    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <h3 className={cx('heading-name')}>
                    <span className={cx('heading-text')}>
                        {id ? 'Blog' : 'Blog'}
                    </span>{' '}
                    Nơi chia sẻ và giúp đỡ nhau phát triển
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={cx('content')}>
                    <input
                        className={cx('input-title')}
                        placeholder="Tiêu đề"
                        type="text"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                    <div className={cx('content-blog')}>
                        <TextEditor
                            setContentBlog={setContent}
                            sHidderTools={false}
                        />
                    </div>
                </div>
                <div className={cx('btn')}>
                    <Button primary small>
                        Xuất bản
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PostBlog;
