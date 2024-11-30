// Search.js

import React, { useState } from 'react';
import './Search.css'; // CSS 파일 연결

const Search = ({ onSearch }) => {
    const [cityName, setCityName] = useState(''); // 입력된 도시 이름

    const majorCities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '제주']; // 주요 도시 목록

    const handleInputChange = (e) => {
        setCityName(e.target.value); // 사용자 입력값 업데이트
    };

    const handleSearch = (city = cityName) => {
        if (!city.trim()) {
            alert('도시 이름을 입력해주세요.'); // 빈 값 방지
            return;
        }
        onSearch(city); // 부모 컴포넌트로 검색 값 전달
        setCityName(''); // 입력창 초기화
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="도시 이름 입력 (예: 서울)"
                value={cityName}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
            <button onClick={() => handleSearch()} className="search-button hidden">
                검색
            </button>

            {/* 주요 도시 버튼 */}
            <div className="major-cities-container">
                <h3>주요 도시</h3>
                <div className="major-cities">
                    {majorCities.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => handleSearch(city)}
                            className="major-city-button"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
