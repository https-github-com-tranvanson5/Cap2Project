import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './CardRanking.css';
const defaultImage = 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';


function CardRanking({ datas = [] }) {
    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1:
                return '#FFD700'; // Gold
            case 2:
                return 'silver';
            case 3:
                return ' #00A9A3'; // Bronze
            default:
                return 'transparent'; // or any default color you want
        }
    };
    return (
        <div>
            {datas.map((data, index) => (
                <Row key={index}>
                    <Col>
                        <div className="card-ranking">
                            <div className="ranking" style={{ backgroundColor: getBackgroundColor(index + 1) }}>{index + 1}</div>
                            <div className="content">
                                <div className="image">
                                    <img src={data.imageSrc || defaultImage} alt={data.title} />
                                </div>
                                <div className="card-info">
                                    <div className="title">{data.title}</div>
                                    <div className="rank-label">
                                        <p>{data.content}</p>
                                        <p>Số lượng: {data.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default CardRanking;
