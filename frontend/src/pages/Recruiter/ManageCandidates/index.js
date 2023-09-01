import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { getCandidatesApi } from '~/services/recruiterService';

import styles from './ManageCandidates.module.scss';

const cx = classNames.bind(styles);

function ManageCandidates() {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        async function fetchCandidatesData() {
            const candidatesData = await getCandidatesApi();
            if (candidatesData.success) {
                setCandidates(candidatesData.data);
            }
        }
        fetchCandidatesData();
    }, []);

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
                    {candidates.length
                        ? candidates.map((candidate, index) => {
                              return (
                                  <tr key={candidate.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                          {candidate.user_applicants.fullname}
                                      </td>
                                      <td>{candidate.user_applicants.email}</td>
                                      <td>
                                          <a
                                              href={candidate.imageUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                          >
                                              Xem CV
                                          </a>
                                      </td>
                                      <td>{candidate.job_applicants.title}</td>
                                      <td>{candidate.createdAt}</td>
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
