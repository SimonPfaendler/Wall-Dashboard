import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS, de } from 'date-fns/locale';

export function ClockComponent() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="text-[12rem] leading-none font-bold tracking-tighter text-white">
                {format(time, 'HH:mm')}
            </div>
            <div className="text-4xl mt-4 text-gray-400 font-light">
                {format(time, 'EEEE, d. MMMM', { locale: enUS })}
            </div>
        </div>
    );
}
