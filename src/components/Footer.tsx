'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer-portal">
            <div className="footer-container">
                <div className="footer-grid">

                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="w-6 h-6 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"></div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                RICK<span className="text-[var(--primary)] text-shadow-glow">BAKERY</span>
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                            Explorando el multiverso un personaje a la vez. No pienses en ello, Morty. Solo disfruta el viaje.
                        </p>
                    </div>

                    {/* Dimensions Links */}
                    <div>
                        <h4 className="footer-section-title">Dimensiones</h4>
                        <nav>
                            <Link href="/dashboard" className="footer-link">Multiverse Hub</Link>
                            <Link href="/dashboard" className="footer-link">Control Center</Link>
                            <Link href="/dashboard" className="footer-link">Personnel Files</Link>
                        </nav>
                    </div>

                    {/* Legal / Citadel */}
                    <div>
                        <h4 className="footer-section-title">La Ciudadela</h4>
                        <nav>
                            <span className="footer-link cursor-help">Leyes Interdimensionales</span>
                            <span className="footer-link cursor-help">Protocolo C-137</span>
                            <span className="footer-link cursor-help">Términos del Consejo</span>
                        </nav>
                    </div>

                    {/* Tech Status */}
                    <div>
                        <h4 className="footer-section-title">Estado del Portal</h4>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_8px_var(--success)]"></div>
                            <span className="text-xs font-mono text-zinc-300">Fluid Level: Optimal</span>
                        </div>
                        <div className="p-4 rounded-lg bg-[#1a1c20] border border-white/5">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Last Sync</p>
                            <p className="text-xs font-mono text-[var(--secondary)]">Dimension-C137 :: Stable</p>
                        </div>
                    </div>

                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 font-medium">
                        © 2026 BAKERY CITADEL <span className="mx-2 opacity-20">|</span> ALL RIGHTS RESERVED BY RICK
                    </div>
                    <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-600 font-medium">
                        <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Interdimensional-Net</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
