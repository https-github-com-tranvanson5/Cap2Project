import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardRanking from '../Card/CardRanking';
import { rankTopCareer } from '~/redux/statitiscalApi';

function CareerCardRanking() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        getRankTopJobMethod();
    }, []);
    const getRankTopJobMethod = async () => {
        try {
            const result = await rankTopCareer(user?.jwt, dispatch);
            const newData = result.map(item => ({
                id: item.id,
                title: item.name,
                content: item.username,
                quantity: item.count
            }));
            setDatas(newData);
            console.log(newData);
        } catch (error) {
            console.error('Error fetching top job rank:', error);
        }
    };
    return (
        <div>
            <h3>Bảng xếp nghành nghề</h3>
            <CardRanking datas={datas} />
        </div>
    );
}

export default CareerCardRanking