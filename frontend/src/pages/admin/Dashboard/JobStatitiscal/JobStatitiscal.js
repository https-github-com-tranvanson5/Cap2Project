import React from 'react';
import JobCard from '~/pages/admin/Dashboard/JobStatitiscal/JobCard';

export default function JobStatitiscal() {
    return (
        <div>
            {/* Add your content here */}
            <h1>Job Statistics</h1>
            <p>Number of jobs: 10</p>
            <p>Open positions: 5</p>
            <JobCard/>
        </div>
    );
}
