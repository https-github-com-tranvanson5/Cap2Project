import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import Input from '~/components/Input/Input/Input';

const cx = classNames.bind(styles);
function Comment({ userComment, setUserComment, handleComment }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('comment-amount')}>
                    <span className={cx('comment-report')}>
                        (Nếu thấy bình luận spam, các bạn bấm report giúp admin
                        nhé)
                    </span>
                </div>
                <div className={cx('user-comment')}>
                    <img
                        className={cx('avatar')}
                        src={images.avatarDefault}
                        alt="Avatar"
                    />
                    <div className={cx('comment-input')}>
                        <Input
                            comment
                            placeholder="Viết bình luận của bạn"
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('comment-editor')}></div>
                <div className={cx('comment-btn')}>
                    <Button primary onClick={handleComment}>
                        Bình Luận
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Comment;
