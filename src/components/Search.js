// Search.js

import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [cityName, setCityName] = useState(''); // 입력된 도시 이름

    const handleInputChange = (e) => {
        setCityName(e.target.value); // 사용자 입력값 업데이트
    };

    const handleSearch = () => {
        if (!cityName.trim()) {
            alert('도시 이름을 입력해주세요.'); // 빈 값 방지
            return;
        }
        onSearch(cityName); // 부모 컴포넌트로 검색 값 전달
        setCityName(''); // 입력창 초기화
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="도시 이름 입력 (예: 서울)"
                value={cityName}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default Search;
