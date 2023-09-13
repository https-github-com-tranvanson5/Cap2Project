import React from 'react';
import classNames from 'classnames/bind';
import styles from './RuleBottom.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default function RuleBottom({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <div className={cx('content')}>
                    <h2 className={cx('content-header')}>
                        Tại sao nên sử dụng JobCare
                    </h2>
                    <div className={cx('content-rule')}>
                        <h3>
                            Cơ hội ứng tuyển việc làm với đãi ngộ hấp dẫn tại
                            các công ty hàng đầu
                        </h3>
                        <p>
                            Trước sự phát triển vượt bậc của nền kinh tế, rất
                            nhiều ngành nghề trở nên khan hiếm nhân lực hoặc
                            thiếu nhân lực giỏi. Vì vậy, hầu hết các trường Đại
                            học đều liên kết với các công ty, doanh nghiệp, cơ
                            quan để tạo cơ hội cho các bạn sinh viên được học
                            tập, rèn luyện bản thân và làm quen với môi trường
                            làm việc từ sớm. Trong danh sách việc làm trên đây,
                            TopCV mang đến cho bạn những cơ hội việc làm tại
                            những môi trường làm việc năng động, chuyên nghiệp.
                        </p>
                    </div>
                    <div className={cx('content-rule')}>
                        <h3>Việc làm Chất lượng</h3>
                        <p>
                            Hàng ngàn tin tuyển dụng chất lượng cao được cập
                            nhật thường xuyên để đáp ứng nhu cầu tìm việc của
                            ứng viên. Hệ thống thông minh tự động gợi ý các công
                            việc phù hợp theo CV của bạn.
                        </p>
                    </div>
                </div>
                <div className={cx('content-box')}>
                    <Row>
                        <Col>
                            <div className={cx('number-use')}>{data}3000+</div>
                            <div className={cx('detail-name')}>
                                Ứng viên đang bật tìm việc trung bình/thời điểm
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('number-use')}>{data}3000+</div>
                            <div className={cx('detail-name')}>
                                Doanh nghiệp đang sử dụng
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('number-use')}>{data}3000+</div>
                            <div className={cx('detail-name')}>
                                Số lượng việc làm đa dạng
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('number-use')}>{data}3000+</div>
                            <div className={cx('detail-name')}>
                                Lượt ứng viên truy cập hàng tháng
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
