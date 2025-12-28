import { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?latitude=48.015&longitude=12.03&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

export function useWeather() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(WEATHER_API_URL);
                setData(response.data);
                setError(false);
            } catch (err) {
                console.error("Weather API failed", err);
                setError(true);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30 * 60 * 1000); // 30 mins
        return () => clearInterval(interval);
    }, []);

    return { data, error };
}
