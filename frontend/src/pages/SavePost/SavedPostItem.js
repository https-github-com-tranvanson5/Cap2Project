import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '~/components/Card/Card';
export default function SavedPostItem({ data, status , to }) {
    return (
        <Col key={data.id} lg={3} md={4} sm={6}>
            <Card
                data={data}
                saved={<ion-icon name="bag-handle-outline"></ion-icon>}
                titleSaved="Trạng thái"
                id={data.id}
                status={status}
                to = {to}
            ></Card>
        </Col>
    );
}
