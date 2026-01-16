import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/utils/animations";

export const AboutSection = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="py-32 border-b border-gray-900 bg-[#080808] relative"
        >
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div variants={fadeInUp} className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                        Deconstructing{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-cyan-600">
                            Vision
                        </span>
                    </h2>
                    <div className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
                        <p>
                            DriveNet Intelligence moves beyond simple pixel matching. It
                            deconstructs visual data into structural components—clearance,
                            stance, and geometry—to build a robust understanding of vehicle
                            morphology.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
                    <motion.div
                        variants={fadeInUp}
                        className="p-8 bg-gradient-to-br from-[#111] to-black border border-gray-800 rounded-2xl relative overflow-hidden group hover:border-gray-600 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-gray-700 select-none">
                            01
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 z-10 relative">
                            Constraint Logic
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light z-10 relative">
                            Conventional CNNs can be fooled by cosmetic features. We implement
                            a secondary logic layer that validates predictions against
                            physical realities—ensuring an SUV isn't miss-classified just
                            because it's small.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="p-8 bg-gradient-to-bl from-[#111] to-black border border-gray-800 rounded-2xl relative overflow-hidden group hover:border-gray-600 transition-colors"
                    >
                        <div className="absolute top-0 left-0 p-4 opacity-10 font-black text-6xl text-gray-700 select-none">
                            02
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 z-10 relative text-right">
                            Shape &gt; Brand
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light z-10 relative text-right">
                            Our model ignores badges and grille patterns. Instead, it measures
                            ground clearance ratios, wheel arch geometry, and roofline slopes
                            to determine the true body style.
                        </p>
                    </motion.div>
                </div>

                <motion.h3
                    variants={fadeInUp}
                    className="text-xs font-mono uppercase tracking-[0.2em] text-center text-gray-500 mb-12"
                >
                    Target Architectures
                </motion.h3>

                <motion.div
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    {[
                        {
                            name: "Sedan",
                            desc: "Three-box configuration. Low clearance.",
                            icon: "S",
                        },
                        {
                            name: "SUV",
                            desc: "Two-box design. High ground clearance.",
                            icon: "M",
                        },
                        {
                            name: "Hatchback",
                            desc: "Two-box design. Rear door access.",
                            icon: "H",
                        },
                    ].map((style) => (
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 30px -10px rgba(0,240,255,0.1)",
                            }}
                            key={style.name}
                            className="p-8 bg-[#0a0a0a] border border-gray-800/50 rounded-xl hover:border-[#00f0ff]/30 transition-all group"
                        >
                            <div className="w-10 h-10 mb-6 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-[#00f0ff] font-bold font-mono group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
                                {style.icon}
                            </div>
                            <div className="text-xl font-bold text-white mb-2">
                                {style.name}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {style.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};
