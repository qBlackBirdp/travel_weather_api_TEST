// TourismList.js

import React, { useState, useEffect } from 'react';
import useTourismData from '../hooks/useTourismData';
import './TourismList.css'; // CSS 파일 연결

const TourismList = ({ cityName }) => {
    const data = useTourismData('/KC_495_LLR_ATRCTN_2023.csv'); // CSV 데이터 경로
    const [filteredTourism, setFilteredTourism] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 10; // 페이지당 항목 수
    const maxPageButtons = 5; // 페이지네이션 버튼 수

    // 도시 이름과 "CL_NM" 필터링 기준 적용
    useEffect(() => {
        if (cityName && data.length > 0) {
            const cityNormalized = cityName.replace('시', ''); // 도시 이름 정규화
            const filtered = data.filter(
                (item) =>
                    (
                        (item.CTPRVN_NM && item.CTPRVN_NM.includes(cityNormalized)) || // CTPRVN_NM 필드 비교
                        (item.SIGNGU_NM && item.SIGNGU_NM.includes(cityNormalized))   // SIGNGU_NM 필드 추가 비교
                    ) &&
                    !(item.CL_NM && ['관광안내소/매표소', '항공사/여행사'].includes(item.CL_NM)) // 제외 조건
            );
            setFilteredTourism(filtered);
            setCurrentPage(1); // 새 검색 시 페이지를 초기화
        }
    }, [cityName, data]);

    // 현재 페이지의 데이터 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredTourism.slice(startIndex, endIndex);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredTourism.length / itemsPerPage);

    // 페이지네이션 버튼 그룹 계산
    const currentButtonGroup = Math.ceil(currentPage / maxPageButtons); // 현재 버튼 그룹
    const startPage = (currentButtonGroup - 1) * maxPageButtons + 1;
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);

            // 현재 페이지가 그룹의 끝이면 다음 그룹으로 이동
            const newGroup = Math.ceil(page / maxPageButtons);
            if (newGroup !== currentButtonGroup) {
                const newStartPage = (newGroup - 1) * maxPageButtons + 1;
                const newEndPage = Math.min(newStartPage + maxPageButtons - 1, totalPages);
                setCurrentPage(newStartPage); // 새 그룹의 첫 번째 페이지로 이동
            }
        }
    };

    if (!cityName) return null;

    return (
        <div>
            <h2>{cityName} 관광명소</h2>
            {currentItems.length > 0 ? (
                <ul className="tourism-list">
                    {currentItems.map((item, index) => (
                        <li className="tourism-item" key={index}>
                            <h3>{item.POI_NM || '명칭 정보 없음'}</h3>
                            <p>법정동: {item.LEGALDONG_NM || '법정동 정보 없음'}</p>
                            <p>분류: {item.CL_NM || '분류 정보 없음'}</p> {/* 분류 정보 추가 */}
                            {/* Google 검색 버튼 */}
                            <button
                                className="search-button"
                                onClick={() => {
                                    const query = item.POI_NM || '관광명소';
                                    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
                                }}
                            >
                                Google에서 보기
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>관광명소 데이터를 찾을 수 없습니다.</p>
            )}

            {/* 페이지네이션 버튼 */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        이전
                    </button>

                    {/* 동적으로 생성된 페이지 번호 */}
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? 'active' : ''}
                        >
                            {page}
                        </button>
                    ))}

                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        다음
                    </button>
                </div>
            )}
        </div>
    );
};

export default TourismList;
