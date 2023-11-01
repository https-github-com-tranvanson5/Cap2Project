import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';

// import { getCandidatesApi } from '~/services/recruiterService';

import styles from './ManageCandidates.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllApplyJobsRecruiter,
    getAllJobsRecruiter,
} from '~/redux/apiRequest';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function ManageCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [updatedApplyJobListData, setUpdatedApplyJobListData] = useState(null);

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

    // console.log('apply job', applyJobListData?.content);
    // console.log('job list', jobListData?.content);

    const filteredArrayJobTitle = jobListData?.content.filter((obj1) => {
        return applyJobListData?.content.some((obj2) => obj2.job === obj1.id);
    });

    const addArray1ToObjectOfArray2 = (CvAplly, array2) => {
        const updatedArray2 = array2?.map((object) => ({
            ...object,
            CvAplly: CvAplly,
        }));

        return updatedArray2;
    };

    useEffect(() => {
        setUpdatedApplyJobListData(
            addArray1ToObjectOfArray2(applyJobListData, filteredArrayJobTitle),
        );
    }, []);
    console.log('merge', updatedApplyJobListData);

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
                    {updatedApplyJobListData?.length
                        ? updatedApplyJobListData?.map((candidate, index) => {
                            return (
                                <tr key={candidate.id}>
                                    <td>{index + 1}</td>
                                    <td>full name</td>
                                    <td>email</td>
                                    <td>cv</td>
                                    <td> {candidate.title}</td>

                                    {candidate.CvAplly.content.map((date) => (
                                        <td key={date.id} >{date.createAt}</td>
                                    ))}

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
