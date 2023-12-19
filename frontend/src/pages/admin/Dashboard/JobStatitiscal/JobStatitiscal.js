import React from 'react';
import JobCard from '~/pages/admin/Dashboard/JobStatitiscal/JobCard';
import JobLineChart from '~/pages/admin/Dashboard/JobStatitiscal/JobLineChart';
import CardInfo from '../Card/CardInfo';
import JobCardRanking from './JobCardRanking';
import CareerCardRanking from './CareerCardRanking';

export default function JobStatitiscal() {
    return (
        <div>
            <JobCard />
            <JobLineChart />
            <JobCardRanking />
            <CareerCardRanking />
        </div>
    );
}
