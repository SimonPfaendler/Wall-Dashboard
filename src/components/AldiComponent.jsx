import { useAldi } from '../hooks/useAldi';
import { ShoppingBag, ExternalLink } from 'lucide-react';

export function AldiComponent() {
    const { prospektUrl, coverImage, title } = useAldi();

    return (
        <a
            href={prospektUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col h-full w-full cursor-pointer"
        >
            {/* Background Image (Blurred for fill) */}
            <div className="absolute inset-0 bg-gray-900 overflow-hidden">
                <img
                    src={coverImage}
                    alt=""
                    className="w-full h-full object-cover blur-xl opacity-40 scale-110"
                />
            </div>

            {/* Main Image (Contained for visibility) */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                    src={coverImage}
                    alt="Aldi Prospekt Cover"
                    className="h-full w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/30 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-end h-full p-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-600/20 text-blue-400 p-3 rounded-2xl backdrop-blur-md border border-blue-500/20">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Aktuell
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white leading-tight mb-2 drop-shadow-xl">
                    Wochen<br />Prospekt
                </h2>

                <div className="flex items-center text-blue-300 font-medium group-hover:text-blue-200 transition-colors">
                    <span className="text-lg">Öffnen</span>
                    <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </a>
    );
}
