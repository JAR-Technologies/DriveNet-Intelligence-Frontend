import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "@/utils/animations";
import { ModelDetails } from "@/types";

interface CTASectionProps {
    modelDetails: ModelDetails | null;
}

export const CTASection = ({ modelDetails }: CTASectionProps) => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-32 border-t border-gray-900 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#080808] to-black"
        >
            <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">
                Ready to analyze structure?
            </h2>
            <Link
                href="/analysis"
                className="px-12 py-5 bg-white hover:bg-gray-200 text-black font-bold tracking-[0.2em] uppercase text-xs rounded-sm transition-colors shadow-xl"
            >
                Launch Interface
            </Link>
            <p className="mt-12 text-[10px] text-gray-700 font-mono uppercase tracking-widest">
                v{modelDetails?.version || "..."} • DriveNet Intelligence Systems
            </p>
        </motion.section>
    );
};
