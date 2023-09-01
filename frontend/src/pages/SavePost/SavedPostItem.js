import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '~/components/Card/Card';
export default function SavedPostItem({ data }) {
    return (
        <Col key={data.id} lg={3} md={4} sm={6}>
            <Card
                data={data}
                saved={<ion-icon name="heart-outline"></ion-icon>}
                titleSaved="Lưu tin"
                id={data.id}
            ></Card>
        </Col>
    );
}
