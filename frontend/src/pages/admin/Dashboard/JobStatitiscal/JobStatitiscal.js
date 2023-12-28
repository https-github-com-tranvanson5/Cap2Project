import { Col, Row } from 'react-bootstrap';
import JobCard from '~/pages/admin/Dashboard/JobStatitiscal/JobCard';
import JobLineChart from '~/pages/admin/Dashboard/JobStatitiscal/JobLineChart';
import CareerCardRanking from './CareerCardRanking';
import JobCardRanking from './JobCardRanking';

export default function JobStatitiscal() {
    return (
        <div>
            <JobCard />
            <br></br>
            <JobLineChart />
            <br></br>
            <Row>
                <Col md={6}><JobCardRanking /></Col>
                <Col md={6}><CareerCardRanking /></Col>
            </Row>
        </div>
    );
}