import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/utils/animations";
import { ModelDetails } from "@/types";

interface ModelInfoSectionProps {
    modelDetails: ModelDetails | null;
}

export const ModelInfoSection = ({ modelDetails }: ModelInfoSectionProps) => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="py-32 border-b border-gray-900 bg-[#050505]"
        >
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-bold text-white mb-16 text-center tracking-tight"
                >
                    System <span className="text-gray-600">Specifications</span>
                </motion.h2>
                <motion.div
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono"
                >
                    {[
                        {
                            label: "Architecture",
                            value: modelDetails?.model_type || "Loading...",
                        },
                        {
                            label: "Input Resolution",
                            value: modelDetails?.input_image_size
                                ? `${modelDetails.input_image_size} px`
                                : "Loading...",
                        },
                        {
                            label: "Output Classes",
                            value: modelDetails
                                ? `${modelDetails.number_of_classes} (${modelDetails.classes.join(
                                    ", "
                                )})`
                                : "Loading...",
                        },
                        { label: "Framework", value: "TensorFlow / Keras" },
                        { label: "Backend", value: "FastAPI Python" },
                        { label: "Frontend", value: "Next.js 14 + Framer Motion" },
                    ].map((spec, i) => (
                        <motion.div
                            variants={fadeInUp}
                            key={i}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-800 hover:bg-gray-900/30 transition-colors gap-2 sm:gap-0"
                        >
                            <span className="text-gray-500 uppercase text-xs tracking-wider">
                                {spec.label}
                            </span>
                            <span className="text-[#00f0ff] text-right">{spec.value}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};
