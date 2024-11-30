// App.js

import React, { useState } from 'react';
import './App.css'; // App.css 연결
import Search from './components/Search';
import Weather from './components/Weather';
import TourismList from './components/TourismList';

const App = () => {
    const [searchCity, setSearchCity] = useState('');

    const handleSearch = (cityName) => {
        setSearchCity(cityName);
    };

    return (
        <div className="App">
            <h1>여행 & 날씨 정보</h1>

            <div className="Search">
                <Search onSearch={handleSearch} />
            </div>

            {searchCity && (
                <div style={{ marginTop: '20px' }}>
                    <Weather cityName={searchCity} />
                    <TourismList cityName={searchCity} />
                </div>
            )}
        </div>
    );
};

export default App;
