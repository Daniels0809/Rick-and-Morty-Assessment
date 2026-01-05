'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const checkAuth = () => {
        const auth = localStorage.getItem('isAuthenticated') === 'true';
        const user = localStorage.getItem('currentUser');
        setIsAuthenticated(auth);
        if (user) {
            try {
                const parsed = JSON.parse(user);
                setUserName(parsed.name || 'Traveler');
            } catch {
                setUserName('Traveler');
            }
        } else {
            setUserName(null);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleAuthUpdate = () => checkAuth();
        window.addEventListener('auth-update', handleAuthUpdate);
        window.addEventListener('storage', handleAuthUpdate);

        return () => {
            window.removeEventListener('auth-update', handleAuthUpdate);
            window.removeEventListener('storage', handleAuthUpdate);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event("auth-update"));
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] navbar-portal h-24 flex items-center justify-between px-16 border-b border-white/5 shadow-2xl">
            {/* Logo Section */}
            <div className="flex-shrink-0">
                <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-4 hover:opacity-80 transition-all group">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 bg-[var(--primary)] rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-[0_0_20px_rgba(151,206,76,0.3)] flex items-center justify-center border border-white/20 rotate-3 group-hover:rotate-0 transition-transform">
                            <span className="text-black font-black text-[10px] tracking-tighter">C-137</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white leading-none tracking-tighter uppercase">
                            Rick<span className="text-[var(--primary)]">Bakery</span>
                        </span>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em] mt-1">
                            Dimensional Registry
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation Group - Very Spaced Out */}
            <div className="flex items-center gap-24">
                <div className="flex items-center gap-16">
                    <Link
                        href="/"
                        className={`nav-link text-sm font-black tracking-[0.2em] relative py-2 ${pathname === '/' ? 'active' : ''}`}
                    >
                        Multiverse
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/dashboard"
                                className={`nav-link text-sm font-black tracking-[0.2em] relative py-2 ${pathname === '/dashboard' ? 'active' : ''}`}
                            >
                                Control Center
                            </Link>

                            <div className="hidden xl:flex items-center gap-6 pl-8 border-l border-white/10">
                                <div className="text-right">
                                    <p className="text-[9px] text-[var(--secondary)] font-black uppercase tracking-widest leading-none mb-1">Authenticated Operator</p>
                                    <p className="text-sm font-black text-white uppercase tracking-wider">{userName}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] text-sm font-black shadow-[0_0_15px_rgba(151,206,76,0.1)]">
                                    {(userName || 'R').charAt(0)}
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className={`nav-link text-sm font-black tracking-[0.2em] relative py-2 ${pathname === '/login' ? 'active' : ''}`}
                        >
                            Auth Terminal
                        </Link>
                    )}
                </div>

                {/* Main Action Component */}
                <div className="flex-shrink-0">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="px-10 py-3 rounded-full border-2 border-[var(--danger)]/50 text-[var(--danger)] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[var(--danger)] hover:text-white hover:border-[var(--danger)] transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95"
                        >
                            Abort Protocol
                        </button>
                    ) : (
                        <Link
                            href="/register"
                            className="px-10 py-3 rounded-full bg-[var(--primary)] text-black text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 hover:-translate-y-0.5 transition-all shadow-[0_0_30px_rgba(151,206,76,0.4)] active:scale-95"
                        >
                            Enlist Now
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
