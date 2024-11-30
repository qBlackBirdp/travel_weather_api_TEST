// App.js

import React, { useState } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import TourismList from './components/TourismList'; // 관광지 컴포넌트 추가

const App = () => {
    const [searchCity, setSearchCity] = useState(''); // 검색된 도시 이름

    const handleSearch = (cityName) => {
        setSearchCity(cityName); // 검색 결과를 상태로 저장
    };

    return (
        <div>ㅓ
            <h1>여행 & 날씨 정보</h1>

            {/* Search 컴포넌트 */}
            <Search onSearch={handleSearch} />

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                {/* Weather 컴포넌트 */}
                {searchCity && <Weather cityName={searchCity} />}

                {/* TourismList 컴포넌트 */}
                {searchCity && <TourismList cityName={searchCity} />}
            </div>
        </div>
    );
};

export default App;
