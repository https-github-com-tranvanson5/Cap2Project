import React from 'react';
import './CardInfo.css';

const CardInfo = ({ icon, color, title, value, link }) => {
    return (
        <div>
            <div>
                <div class="">
                    <div class="small-box" style={{ background: color }}>
                        <div class="inner">
                            <h3>{value||0}</h3>

                            <p>{title}</p>
                        </div>
                        <div class="icon">
                            <i className={`fa ${icon}`}></i>
                        </div>
                        <a href={link || '#'} className="small-box-footer">
                            More info{' '}
                            <i className="fa fa-arrow-circle-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
