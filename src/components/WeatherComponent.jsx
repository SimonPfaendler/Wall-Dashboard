import { useWeather } from '../hooks/useWeather';
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, CloudLightning, CloudDrizzle, Wind } from 'lucide-react';

const getWeatherIcon = (code) => {
    if (code === 0) return <Sun className="w-32 h-32 text-yellow-400" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-32 h-32 text-gray-400" />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-32 h-32 text-gray-500" />;
    if (code >= 51 && code <= 55) return <CloudDrizzle className="w-32 h-32 text-blue-400" />;
    if (code >= 61 && code <= 67) return <CloudRain className="w-32 h-32 text-blue-500" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-32 h-32 text-white" />;
    if (code >= 95 && code <= 99) return <CloudLightning className="w-32 h-32 text-yellow-600" />;
    return <Sun className="w-32 h-32 text-yellow-400" />; // Default
};

const getWeatherLabel = (code) => {
    return "";
}

export function WeatherComponent() {
    const { data, error } = useWeather();

    if (error) return <div className="text-red-500">Weather Offline</div>;
    if (!data) return <div className="text-gray-500 animate-pulse">Loading Weather...</div>;

    const current = data.current;
    const daily = data.daily; // Arrays of data

    const todayMax = daily.temperature_2m_max[0];
    const todayMin = daily.temperature_2m_min[0];

    return (
        <div className="flex flex-col items-center justify-center p-6 h-full">
            <div className="mb-6 drop-shadow-2xl">
                {getWeatherIcon(current.weather_code)}
            </div>
            <div className="text-9xl font-bold tracking-tighter text-white">
                {Math.round(current.temperature_2m)}°
            </div>
            <div className="mt-6 flex space-x-8 text-2xl text-gray-400">
                <div className="flex items-center">
                    <span className="mr-2">H:</span>
                    <span className="text-white">{Math.round(todayMax)}°</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">L:</span>
                    <span className="text-white">{Math.round(todayMin)}°</span>
                </div>
            </div>
        </div>
    );
}
