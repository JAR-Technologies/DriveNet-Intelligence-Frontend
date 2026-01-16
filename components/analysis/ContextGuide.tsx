import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContextCategory = 'clearance' | 'arch' | 'stance' | 'wheels';

const GUIDE_DATA = {
    clearance: {
        title: "Ground Clearance",
        items: [
            { label: "Low", desc: "Car sits close to the road" },
            { label: "Medium", desc: "Slightly raised (typical crossover)" },
            { label: "High", desc: "Clearly raised, off-road capable" }
        ]
    },
    arch: {
        title: "Wheel Arch Design",
        items: [
            { label: "Smooth", desc: "Rounded, body-colored arches" },
            { label: "Pronounced", desc: "Squared or cladded arches (SUV-like)" }
        ]
    },
    stance: {
        title: "Vehicle Stance",
        items: [
            { label: "Low Profile", desc: "Appears low with a smooth, sloping roof" },
            { label: "Normal", desc: "Looks low and flat" },
            { label: "Tall", desc: "Looks upright or vertically tall" }
        ]
    },
    wheels: {
        title: "Wheel Size",
        items: [
            { label: "Small", desc: "Compact wheels" },
            { label: "Medium", desc: "Balanced" },
            { label: "Large", desc: "Big wheels relative to body height" }
        ]
    }
};

export const ContextGuide = () => {
    const [activeTab, setActiveTab] = useState<ContextCategory>('clearance');

    return (
        <div className="mt-6 bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-gray-900/30">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-[var(--accent)]">?</span> How to Use Vehicle Context
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                    These help the system resolve ambiguity. Select a category to see definitions.
                </p>
            </div>

            {/* Tabs / Pills */}
            <div className="flex flex-wrap gap-2 p-3 border-b border-gray-800">
                {(Object.keys(GUIDE_DATA) as ContextCategory[]).map((key) => {
                    // improvements for label clarity
                    let label = GUIDE_DATA[key].title.split(' ')[0];
                    if (key === 'arch') label = 'Arch';
                    if (key === 'wheels') label = 'Wheels';

                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all border
                ${activeTab === key
                                    ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
                                    : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="p-4 min-h-[140px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h4 className="text-xs font-bold text-[var(--accent)] mb-3 uppercase opacity-80">
                            {GUIDE_DATA[activeTab].title}
                        </h4>
                        <ul className="space-y-3">
                            {GUIDE_DATA[activeTab].items.map((item) => (
                                <li key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs">
                                    <span className="font-bold text-gray-200 min-w-[80px] flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        {item.label}
                                    </span>
                                    <span className="text-gray-500 hidden sm:inline">→</span>
                                    <span className="text-gray-400">{item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
