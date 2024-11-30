// TourismList.js

import React, { useState, useEffect } from 'react';
import useTourismData from '../hooks/useTourismData'; // Custom Hook으로 데이터 로드

const TourismList = ({ cityName }) => {
    const data = useTourismData('/KC_495_LLR_ATRCTN_2023.csv'); // CSV 데이터 경로
    const [filteredTourism, setFilteredTourism] = useState([]);

    useEffect(() => {
        if (cityName && data.length > 0) {
            console.log('Raw data:', data); // 로드된 데이터 확인
            const cityNormalized = cityName.replace('시', ''); // 도시 이름 정규화
            const filtered = data.filter(
                (item) =>
                    (item.CTPRVN_NM && item.CTPRVN_NM.includes(cityNormalized)) ||
                    (item.SIGNGU_NM && item.SIGNGU_NM.includes(cityNormalized))
            );
            setFilteredTourism(filtered);
        }
    }, [cityName, data]);

    console.log(data);

    if (!cityName) return null;

    return (
        <div>
            <h2>{cityName} 관광명소</h2>
            {filteredTourism.length > 0 ? (
                <ul>
                    {filteredTourism.map((item, index) => (
                        <li key={index}>
                            <h3>{item.POI_NM}</h3>
                            <p>{item.RDNMADR_NM || '주소 정보 없음'}</p>
                            <p>{item.CL_NM || '분류 정보 없음'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>관광명소 데이터를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default TourismList;
