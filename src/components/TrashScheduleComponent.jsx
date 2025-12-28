import { useTrash } from '../hooks/useTrash';
import { Trash2, Recycle, Leaf, Box } from 'lucide-react';
import { format, differenceInDays, startOfDay } from 'date-fns';
import { de } from 'date-fns/locale';

export function TrashScheduleComponent() {
    const { nextPickup, error } = useTrash();

    if (error) return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-900/20 rounded-3xl">
            <Trash2 className="w-12 h-12 text-red-500 mb-2" />
            <span className="text-gray-400">Schedule Offline</span>
        </div>
    );

    if (!nextPickup) return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="animate-spin mb-4">
                <Recycle className="w-12 h-12 text-gray-600" />
            </div>
            <span className="text-gray-500">Loading Schedule...</span>
        </div>
    );

    const summary = nextPickup.summary.toLowerCase();

    let colorClass = "bg-gray-800 text-gray-200";
    let Icon = Trash2;

    if (summary.includes("bio")) {
        colorClass = "bg-green-900/40 text-green-100 border-green-800";
        Icon = Leaf;
    } else if (summary.includes("papier") || summary.includes("paper")) {
        colorClass = "bg-blue-900/40 text-blue-100 border-blue-800";
        Icon = Box;
    } else if (summary.includes("gelb") || summary.includes("plastik") || summary.includes("yellow")) {
        colorClass = "bg-yellow-900/40 text-yellow-100 border-yellow-800";
        Icon = Recycle;
    } else if (summary.includes("rest") || summary.includes("hausmüll")) {
        colorClass = "bg-gray-800/80 text-gray-200 border-gray-700";
        Icon = Trash2;
    }

    const daysUntil = differenceInDays(startOfDay(nextPickup.date), startOfDay(new Date()));
    let dayLabel = "";

    if (daysUntil === 0) dayLabel = "Heute";
    else if (daysUntil === 1) dayLabel = "Morgen";
    else dayLabel = `in ${daysUntil} Tagen`;

    return (
        <div className={`flex flex-col opacity-90 items-center justify-center h-full w-full rounded-3xl border-2 ${colorClass} transition-colors duration-500`}>
            <div className="mb-4">
                <Icon className="w-24 h-24 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">
                {dayLabel}
            </div>
            <div className="text-2xl opacity-75">
                {format(nextPickup.date, 'EEEE, d. MMMM', { locale: de })}
            </div>
            <div className="text-xl mt-4 px-4 py-1 bg-black/30 rounded-full font-medium uppercase tracking-wider">
                {nextPickup.summary}
            </div>
        </div>
    );
}
