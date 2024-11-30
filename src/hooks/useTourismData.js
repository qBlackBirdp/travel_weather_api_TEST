// useTourismData.js

import Papa from 'papaparse';
import { useState, useEffect } from 'react';

const useTourismData = (filePath) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            Papa.parse(filePath, {
                download: true,
                header: true,
                complete: (results) => {
                    setData(results.data); // CSV 데이터를 JSON으로 변환
                },
            });
        };

        fetchData();
    }, [filePath]);

    return data;
};

export default useTourismData;
