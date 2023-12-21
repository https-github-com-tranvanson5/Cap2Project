import React from 'react';
import JobCard from '~/pages/admin/Dashboard/JobStatitiscal/JobCard';
import JobLineChart from '~/pages/admin/Dashboard/JobStatitiscal/JobLineChart';
import CardInfo from '../Card/CardInfo';
import JobCardRanking from './JobCardRanking';
import CareerCardRanking from './CareerCardRanking';

export default function JobStatitiscal() {
    return (
        <div>
            <h1>Thống kê tuyển dụng</h1>
            <JobCard />
            <h1>Thống kê tuyển dụng theo năm</h1>
            <JobLineChart />
            <JobCardRanking />
            <CareerCardRanking />
        </div>
    );
}
