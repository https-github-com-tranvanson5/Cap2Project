import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import styles from './ManageCandidates.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeStatus,
    getAllApplyJobsRecruiter,
} from '~/redux/apiRequest';
import { Link } from 'react-router-dom';
import { categoryStatus } from './dataEntry';
import { useState } from 'react';
import DropDown from '~/components/Input/DropDown/DropDown';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ManageCandidates() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.login?.currentUser);
    const applyJobListData = useSelector(
        (state) => state.recruitment.applyJobsRecruiter?.allApllyJobsRecruiter,
    );
    const [status, setStatus] = useState('');

    function getNameByValueStatus(value) {
        const option = categoryStatus.find((option) => option.value === value);
        return option ? option.name : '';
    }

    useEffect(() => {
        getAllApplyJobsRecruiter(auth?.jwt, dispatch);
    }, []);
    console.log('applyJobListData', applyJobListData);

    const onChangeValue = (field, value , id) => {
        setStatus({ ...status, [field]: value , id });
        changeStatus(auth?.jwt , dispatch , value , id , applyJobListData) 
        toast.success('Thay đổi trạng thái thành công') 
    };

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
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {applyJobListData?.content?.length
                        ? applyJobListData?.content?.map((candidate, index) => {
                            return (
                                <tr key={candidate.id}>
                                    <td>{index + 1}</td>
                                    <td>{candidate?.name}</td>
                                    <td>{candidate?.email}</td>
                                    <td>
                                        <Link to={`${candidate.urlCv}`}>
                                            {' '}
                                            Xem CV{' '}
                                        </Link>
                                    </td>
                                    <td> {candidate.title}</td>

                                    <td>{candidate.createAt}</td>

                                    <td>
                                        <div
                                            className={cx('dropdown')}
                                            value={candidate?.status}
                                            onChange={(onChange) => onChangeValue("status", onChange.target.value , candidate?.id)}
                                        >
                                            <DropDown
                                                title="Thành phố"
                                                data={categoryStatus}
                                                defaultValueProps={getNameByValueStatus(candidate?.status)}
                                            />
                                        </div>
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
