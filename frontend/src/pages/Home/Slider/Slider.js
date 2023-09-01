import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import styles from './Slider.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const dataSlider = [
    {
        thumb: images.backgroundAccounts,
    },
    {
        thumb: images.backgroundAccounts,
    },
    {
        thumb: images.backgroundAccounts,
    },
    {
        thumb: images.backgroundAccounts,
    },
    {
        thumb: images.backgroundAccounts,
    },
];

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 250,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: true,
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                {/* <div className={cx('heading')}>
                    <h2 className={cx('carousel-job')}>
                        Tìm việc làm nhanh 24h, việc làm mới nhất mỗi ngày được
                        cập nhât trên JobCare
                    </h2>
                    <p className={cx('carousel-find')}>
                        Tiếp cận 30,000+ tin tuyển dụng việc làm mới mỗi ngày từ
                        hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div> */}
                <Slider {...settings} className={cx('slider')}>
                    {dataSlider.map((sliderItem, index) => {
                        return (
                            <div key={index} className={cx('slider-item')}>
                                <Link to="/">
                                    <img src={sliderItem.thumb} alt="thumb" />
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </Container>
        </div>
    );
}

export default Carousel;
