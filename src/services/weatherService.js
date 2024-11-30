// weatherService.js

import axios from 'axios';

const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const ONE_CALL_API_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// 1. Geocoding API 호출 - 도시 이름으로 위도와 경도 가져오기
export const fetchCoordinates = async (cityName) => {
    try {
        const response = await axios.get(GEO_API_URL, {
            params: {
                q: cityName,
                limit: 1, // 첫 번째 결과만 가져옴
                appid: WEATHER_API_KEY,
            },
        });

        if (response.data.length === 0) {
            throw new Error('해당 도시를 찾을 수 없습니다.');
        }

        const { lat, lon } = response.data[0]; // 위도와 경도 추출
        return { lat, lon };
    } catch (error) {
        console.error('Geocoding API 호출 오류:', error);
        throw error;
    }
};

// 2. OneCall API 호출 - 위도와 경도로 날씨 정보 가져오기
export const fetchWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(ONE_CALL_API_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                exclude: 'minutely,hourly',
                units: 'metric',
                lang: 'kr',
                appid: WEATHER_API_KEY,
            },
        });

        // API 응답 데이터 반환
        return response.data.daily.map((day) => ({
            date: new Date(day.dt * 1000), // 날짜 변환
            minTemp: day.temp.min,        // 최저 온도
            maxTemp: day.temp.max,        // 최고 온도
            description: day.weather[0].description, // 날씨 설명
            icon: day.weather[0].icon,   // 날씨 아이콘 코드
        }));
    } catch (error) {
        console.error('OneCall API 호출 오류:', error);
        throw error;
    }
};