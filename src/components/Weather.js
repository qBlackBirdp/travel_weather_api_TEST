// Weather.js

import React, { useEffect, useState } from 'react';
import { fetchCoordinates, fetchWeatherData } from '../services/weatherService';
import './Weather.css';

const Weather = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);

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
            fetchWeather();
        }
    }, [cityName]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>{cityName} 날씨 정보</h2>

            {weatherData.length > 0 ? (
                <ul className="weather-list">
                    {weatherData.map((day, index) => (
                        <li className="weather-item" key={index}>
                            <p>날짜: {day.date.toISOString().split('T')[0]}</p>
                            <p>최저 온도: {day.minTemp}°C</p>
                            <p>최고 온도: {day.maxTemp}°C</p>
                            <p>날씨: {day.description}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                alt={day.description}
                                title={day.description}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>일주일치 날씨 데이터를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default Weather;
