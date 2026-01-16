'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'HOME' },
        { href: '/analysis', label: 'ANALYSIS CONSOLE' },
    ];
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
        >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 rounded-full px-5 py-3 md:px-8 md:py-4 pointer-events-auto shadow-2xl flex items-center gap-4 md:gap-8">

                {/* Logo Mark */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-4 h-4 bg-[#00f0ff] rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                    <span className="font-bold text-white tracking-wider text-sm hidden sm:block">DRIVENET</span>
                </Link>

                {/* Divider */}
                <div className="w-px h-4 bg-gray-700"></div>

                {/* Links */}
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/" className="relative group py-2">
                        <span className={`text-[10px] md:text-xs font-mono font-bold tracking-widest transition-colors ${pathname === '/' ? 'text-[#00f0ff]' : 'text-gray-400 group-hover:text-white'}`}>
                            HOME
                        </span>
                        {pathname === '/' ? (
                            <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                        ) : (
                            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        )}
                    </Link>

                    <Link href="/analysis" className="relative group py-2">
                        <span className={`text-[10px] md:text-xs font-mono font-bold tracking-widest transition-colors ${pathname === '/analysis' ? 'text-[#00f0ff]' : 'text-gray-400 group-hover:text-white'}`}>
                            <span className="md:hidden">ANALYSIS</span>
                            <span className="hidden md:inline">ANALYSIS CONSOLE</span>
                        </span>
                        {pathname === '/analysis' ? (
                            <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                        ) : (
                            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        )}
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
