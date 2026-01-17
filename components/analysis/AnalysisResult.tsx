import { motion } from "framer-motion";

interface AnalysisResultProps {
    result: {
        final_label: string;
        confidence: number;
        decision: string;
        reason: string;
    };
    image: File | null;
    onReset: () => void;
}

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const AnalysisResult = ({ result, image, onReset }: AnalysisResultProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="w-full max-w-3xl mx-auto"
        >
            <div className="relative border border-gray-800 bg-[#0c0c0c] rounded-xl p-8 md:p-12 font-mono overflow-hidden shadow-2xl">

                {/* Gloss Effect */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 to-transparent pointer-events-none rotate-45 transform translate-y-12"></div>

                {/* Header: ID and Timestamp */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 border-b border-gray-800 pb-6 relative z-10 gap-4">
                    <div>
                        <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">
                            Analysis ID
                        </div>
                        <div className="text-white text-lg tracking-wider font-bold">
                            DN-{Math.floor(Math.random() * 10000)}-XJ
                        </div>
                    </div>
                    <div className="text-left sm:text-right">
                        <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">
                            Timestamp
                        </div>
                        <div className="text-white text-lg tracking-wider">
                            {new Date().toISOString().split('T')[0]}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">

                    {/* Image */}
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-gray-800">
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Analyzed Vehicle"
                                className="w-full h-full object-cover opacity-80"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <div className="text-xs text-gray-400 font-mono">
                                SOURCE IMAGE
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                                Predicted Geometry
                            </div>
                            <div className="text-4xl font-bold text-white">
                                {result.final_label}
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                                Model Confidence
                            </div>
                            <div className="text-4xl font-bold text-[#00f0ff] flex items-center gap-3">
                                {(result.confidence * 100).toFixed(1)}%
                                <div className="hidden sm:block h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#00f0ff]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.confidence * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decision Logic Box */}
                <div className="bg-gray-900/30 p-6 border-l-2 border-cyan-500 rounded-r mb-8 relative z-10">
                    <div className="text-[10px] text-cyan-500 uppercase tracking-widest mb-2">
                        Constraint Logic Active
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {result.reason || "Logic validated via physical metadata."}
                    </p>
                </div>

                {/* Final Decision */}
                <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${result.decision === 'FLAG_FOR_REVIEW' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${result.decision === 'FLAG_FOR_REVIEW' ? 'text-orange-500' : 'text-green-500'}`}>
                            Decision: {result.decision}
                        </span>
                    </div>

                    <button
                        onClick={onReset}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                    >
                        New Analysis
                    </button>
                </div>

            </div>
        </motion.div>
    );
};
