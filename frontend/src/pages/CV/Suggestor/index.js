import classNames from 'classnames/bind';
import styles from './Suggestor.module.scss';

const cx = classNames.bind(styles);

function Suggestor() {
    return (
        <div className={cx('wrapper')}>
            <h3>Suggestor</h3>
        </div>
    );
}

export default Suggestor;
