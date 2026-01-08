import { useState } from 'react';
import { useBring } from '../hooks/useBring';
import { ShoppingCart, RefreshCw, LogOut } from 'lucide-react';

export function BringComponent() {
    const { isAuthenticated, login, logout, items, loading, error } = useBring();

    // Login Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (!isAuthenticated) {
        return (
            <div className="h-full w-full rounded-[3rem] bg-[#4E2A2A]/40 border border-red-900/50 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-orange-900/10 pointer-events-none" />

                <ShoppingCart className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold text-red-100 mb-4">Bring! Connect</h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-[80%] z-10">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-black/30 border border-red-800/50 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-black/30 border border-red-800/50 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-700/80 hover:bg-red-600 text-white font-medium py-2 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Connecting...' : 'Login'}
                    </button>
                    {error && <span className="text-red-400 text-xs text-center">{error}</span>}
                </form>
            </div>
        );
    }

    return (
        <div className="h-full w-full rounded-[3rem] bg-[#4E2A2A]/40 border border-red-900/50 p-6 flex flex-col relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-orange-900/10 pointer-events-none" />

            <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-full shadow-lg">
                        <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-red-100 font-bold text-xl tracking-tight">Shopping</span>
                </div>
                <button onClick={logout} className="opacity-50 hover:opacity-100 transition-opacity">
                    <LogOut className="w-5 h-5 text-red-300" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto z-10 pr-2 custom-scrollbar">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-50">
                        <span className="text-red-200">List is empty</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center bg-black/20 p-3 rounded-2xl border border-red-900/30">
                                {/* Bring! uses 'specification' for quantity sometimes */}
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                    {/* Ideally we'd map icons here, but initials work for now */}
                                    <span className="text-red-200 font-bold text-lg">
                                        {item.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-lg leading-none">{item.name}</span>
                                    {item.specification && (
                                        <span className="text-red-300 text-sm mt-1">{item.specification}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
