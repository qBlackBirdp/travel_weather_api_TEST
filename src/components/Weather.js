// Weather.js

import React, { useEffect, useState } from 'react';
import { fetchCoordinates, fetchWeatherData } from '../services/weatherService';

const Weather = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 1. 도시 이름 → 위도와 경도 가져오기
                const { lat, lon } = await fetchCoordinates(cityName);

                // 2. 위도와 경도 → 날씨 데이터 가져오기
                const weather = await fetchWeatherData(lat, lon);
                setWeatherData(weather);
            } catch (err) {
                setError('날씨 정보를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (cityName) {
            fetchWeather(); // cityName이 있을 때만 호출
        }
    }, [cityName]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>현재 날씨 정보</h2>
            {weatherData && (
                <div>
                    <p>도시: {cityName}</p>
                    <p>현재 온도: {weatherData.current.temp}°C</p>
                    <p>날씨: {weatherData.current.weather[0].description}</p>
                    <p>습도: {weatherData.current.humidity}%</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
