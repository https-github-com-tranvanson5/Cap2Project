import classNames from 'classnames/bind';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styles from './UserDoughnutChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(ArcElement, Tooltip, Legend);

function UserDoughnutChart({ dataChart }) {
    return (
        <div className={cx('wrapper')}>
            <Doughnut datasetIdKey="id" data={dataChart} />
        </div>
    );
}

export default UserDoughnutChart;
