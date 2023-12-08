import React from 'react';
import JobCard from '~/pages/admin/Dashboard/JobStatitiscal/JobCard';
import JobLineChart from '~/pages/admin/Dashboard/JobStatitiscal/JobLineChart';

export default function JobStatitiscal() {
    return (
        <div>
            <JobCard/>
            <JobLineChart/>
        </div>
    );
}
