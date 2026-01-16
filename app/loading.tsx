'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a] relative overflow-hidden">

            {/* Background Grid - subtle like main page */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Radar / HUD Spinner */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                    {/* Outer Ring */}
                    <motion.div
                        className="absolute inset-0 border-2 border-[#00f0ff] rounded-full border-t-transparent border-l-transparent opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Middle Ring - Counter rotating */}
                    <motion.div
                        className="absolute inset-4 border-2 border-dashed border-gray-600 rounded-full opacity-70"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner Core Pulsing */}
                    <motion.div
                        className="w-4 h-4 bg-[#00f0ff] rounded-full shadow-[0_0_15px_#00f0ff]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Text */}
                <div className="text-center">
                    <h2 className="text-[#00f0ff] font-mono text-xl tracking-[0.2em] mb-2 uppercase">Initializing</h2>
                    <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 bottom-0 left-0 bg-[#00f0ff] w-full"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <p className="mt-4 text-xs text-gray-500 font-mono">LOADING NEURAL WEIGHTS...</p>
                </div>
            </div>
        </div>
    );
}
