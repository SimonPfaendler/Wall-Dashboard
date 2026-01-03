import { useCalendar } from '../hooks/useCalendar';
import { Calendar } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';

export function CalendarComponent() {
    const { events, error } = useCalendar();

    if (error) return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-900/20 rounded-3xl">
            <span className="text-gray-400 text-sm">Calendar Error</span>
        </div>
    );

    if (events.length === 0) return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Calendar className="w-8 h-8 text-gray-700 mb-2" />
            <span className="text-gray-600 text-sm">No upcoming events</span>
        </div>
    );

    return (
        <div className="h-full w-full rounded-3xl bg-gray-900/40 border border-gray-800 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4 opacity-70">
                <Calendar className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-medium text-purple-100">Termine</h2>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
                {events.map((event, idx) => (
                    <div key={idx} className="flex flex-col border-l-2 border-purple-500/30 pl-3">
                        <span className="text-white text-lg font-medium leading-tight mb-1">
                            {event.summary}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {format(event.startDate, 'EEEE, d. MMM', { locale: de })}
                            {!event.isAllDay && ` • ${format(event.startDate, 'HH:mm')}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
