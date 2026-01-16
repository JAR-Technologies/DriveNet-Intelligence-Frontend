import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, stagger } from "@/utils/animations"; // We'll move animations to a utils file too

export const HeroSection = () => {
    return (
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center p-6 border-b border-gray-900/50 overflow-hidden">
            {/* Animated Background Grid & Scanner */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            ></div>
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent h-[50vh]"
                animate={{ top: ["-50%", "150%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="flex flex-col gap-8 text-center lg:text-left"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-3 self-center lg:self-start px-4 py-1.5 rounded-full border border-cyan-900/30 bg-cyan-950/10 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00f0ff] opacity-80">
                            System Operational
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]"
                    >
                        DRIVENET <br />
                        <span className="text-xl sm:text-3xl md:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500">
                            INTELLIGENCE
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light border-l-2 border-gray-800 pl-6"
                    >
                        Advanced vehicle geometry analysis using deep convolutional neural
                        networks. Enforcing physical constraint validation for precision
                        engineering.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="pt-6 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                    >
                        <Link
                            href="/analysis"
                            className="group relative px-8 py-4 bg-[#00f0ff] text-black font-bold tracking-widest uppercase text-xs overflow-hidden rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]"
                        >
                            <span className="relative z-10">Initialize Analysis</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Abstract Visual - Right Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="hidden lg:flex justify-center items-center relative perspective-1000"
                >
                    {/* Spinning Rings */}
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-gray-800 opacity-30 border-dashed"
                        ></motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-12 rounded-full border border-gray-700 opacity-20"
                        ></motion.div>
                        <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-24 rounded-full border-2 border-cyan-900/30 border-t-[#00f0ff] opacity-50"
                        ></motion.div>

                        {/* Center Core */}
                        <div className="w-[200px] h-[200px] bg-gradient-to-b from-gray-800 to-black rounded-full border border-gray-700 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white">v1.0</div>
                                <div className="text-[10px] uppercase tracking-widest text-[#00f0ff] mt-1">
                                    Stable
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Data Points */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute top-20 right-0 bg-black/80 backdrop-blur border-l-2 border-[#00f0ff] pl-4 py-2"
                    >
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                            Inference Speed
                        </div>
                        <div className="text-xl font-mono text-[#00f0ff]">45ms</div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-20 left-0 bg-black/80 backdrop-blur border-r-2 border-[#00f0ff] pr-4 py-2 text-right"
                    >
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                            Accuracy
                        </div>
                        <div className="text-xl font-mono text-white">98.2%</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
