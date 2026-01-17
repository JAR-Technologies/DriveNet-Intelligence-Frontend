import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/utils/animations";

export const PreviewSection = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="py-32 bg-[#080808]"
        >
            <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
                <motion.div variants={fadeInUp} className="mb-16 text-center">
                    <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-[#00f0ff] mb-4">
                        Sample Output
                    </h2>
                    <h3 className="text-3xl font-bold text-white">
                        Engineering-Grade Reporting
                    </h3>
                </motion.div>

                {/* Mock Report Card */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="w-full max-w-3xl border border-gray-800 bg-[#0c0c0c] rounded-xl p-8 md:p-12 font-mono relative overflow-hidden shadow-2xl transition-transform duration-500"
                >
                    {/* Gloss Effect */}
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 to-transparent pointer-events-none rotate-45 transform translate-y-12"></div>

                    <div className="flex justify-between items-start mb-12 border-b border-gray-800 pb-6 relative z-10">
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">
                                Analysis ID
                            </div>
                            <div className="text-white text-lg tracking-wider">
                                DN-8842-XJ
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">
                                Timestamp
                            </div>
                            <div className="text-white text-lg tracking-wider">
                                2026-01-16T14:22:01Z
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12 relative z-10">
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                                Predicted Geometry
                            </div>
                            <div className="text-4xl font-bold text-white">SUV</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                                Model Confidence
                            </div>
                            <div className="text-4xl font-bold text-[#00f0ff] flex items-center gap-3">
                                94.8%
                                <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00f0ff] w-[95%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/30 p-6 border-l-2 border-cyan-500 rounded-r mb-8 relative z-10">
                        <div className="text-[10px] text-cyan-500 uppercase tracking-widest mb-2">
                            Constraint Logic Active
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Vision model initially favored{" "}
                            <span className="text-white">Hatchback</span> (58%), but physical
                            constraint logic{" "}
                            <span className="text-gray-500">
                                [High Ground Clearance + Tall Stance]
                            </span>{" "}
                            forced a re-evaluation to{" "}
                            <span className="text-[#00f0ff] font-bold">SUV</span>.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                            Decision: AUTO_APPROVE
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};
