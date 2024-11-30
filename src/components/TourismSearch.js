// TourismSearch.js

import React, { useState } from 'react';
import useTourismData from '../hooks/useTourismData';

const TourismSearch = () => {
    const filePath = '/KC_495_LLR_ATRCTN_2023.csv'; // CSV 파일 경로
    const data = useTourismData(filePath); // CSV 데이터 로드
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = () => {
        const results = data.filter(
            (item) =>
                item.POI_NM.includes(searchQuery) ||
                item.CTPRVN_NM.includes(searchQuery) ||
                item.SIGNGU_NM.includes(searchQuery)
        );
        setFilteredData(results);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="명소 또는 지역 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            <ul>
                {filteredData.map((item, index) => (
                    <li key={index}>
                        <h3>{item.POI_NM}</h3>
                        <p>{item.RDNMADR_NM}</p>
                        <p>{item.CL_NM}</p>
                        <p>{item.SIGNGU_NM}, {item.CTPRVN_NM}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourismSearch;
