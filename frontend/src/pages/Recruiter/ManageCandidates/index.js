import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import styles from './ManageCandidates.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllApplyJobsRecruiter,
    getAllJobsRecruiter,
} from '~/redux/apiRequest';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageCandidates() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.login?.currentUser);
    const applyJobListData = useSelector(
        (state) => state.recruitment.applyJobsRecruiter?.allApllyJobsRecruiter,
    );
    const jobListData = useSelector(
        (state) => state.allJob.jobsRecruiter?.allJobsRecruiter,
    );

    useEffect(() => {
        getAllApplyJobsRecruiter(auth?.jwt, dispatch);
    }, []);

    useEffect(() => {
        getAllJobsRecruiter(auth?.jwt, dispatch);
    }, []);

    const filteredArrayJobTitle = jobListData?.content.filter((obj1) => {
        return applyJobListData?.content.some((obj2) => obj2.job === obj1.id);
    });

    const applyJob = applyJobListData?.content;

    const candidate = [];

    // Duyệt qua mảng 1
    filteredArrayJobTitle?.forEach((item1) => {
        // Tìm kiếm item1 trong mảng 2
        const item2 = applyJob.find((item2) => item2.job === item1.id);

        // Nếu tìm thấy item2, thì gộp item1 và item2 lại với nhau
        if (item2) {
            candidate.push({
                ...item1,
                ...item2,
            });
        } else {
            // Nếu không tìm thấy item2, thì thêm item1 vào kết quả
            candidate.push(item1);
        }
    });

    console.log('merge', candidate);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Ứng viên đang chờ</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>CV</th>
                        <th>Công việc ứng tuyển</th>
                        <th>Thời gian</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {candidate?.length
                        ? candidate?.map((candidate, index) => {
                            return (
                                <tr key={candidate.id}>
                                    <td>{index + 1}</td>
                                    <td>ho ten</td>
                                    <td>email</td>
                                    <td>
                                        <Link to={`${candidate.urlCv}`}>
                                            {' '}
                                            Xem CV{' '}
                                        </Link>
                                    </td>
                                    <td> {candidate.title}</td>

                                    <td>{candidate.createAt}</td>

                                    <td>
                                        <ion-icon name="trash-sharp"></ion-icon>
                                    </td>
                                </tr>
                            );
                        })
                        : null}
                </tbody>
            </Table>
        </div>
    );
}

export default ManageCandidates;
