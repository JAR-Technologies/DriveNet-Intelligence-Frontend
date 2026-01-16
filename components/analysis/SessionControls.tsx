import { motion } from "framer-motion";

interface SessionControlsProps {
    currentIndex: number;
    totalSessions: number;
    onPrev: () => void;
    onNext: () => void;
    onNew: () => void;
    disableNew?: boolean;
}

export const SessionControls = ({
    currentIndex,
    totalSessions,
    onPrev,
    onNext,
    onNew,
    disableNew = false,
}: SessionControlsProps) => {
    return (
        <div className="flex items-center gap-4 bg-[#111] p-2 rounded-lg border border-gray-800">
            <div className="flex items-center gap-1">
                <button
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                    className="p-2 hover:bg-gray-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous Vehicle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <span className="text-xs font-mono text-gray-400 min-w-[60px] text-center select-none">
                    {currentIndex + 1} / {totalSessions}
                </span>

                <button
                    onClick={onNext}
                    disabled={currentIndex === totalSessions - 1}
                    className="p-2 hover:bg-gray-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Next Vehicle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            <div className="h-4 w-px bg-gray-800"></div>

            <button
                onClick={onNew}
                disabled={disableNew}
                className={`text-xs font-bold px-3 py-1.5 rounded transition-colors uppercase tracking-wider flex items-center gap-2
          ${disableNew
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-[#00f0ff] hover:bg-[#00f0ff]/10'
                    }`}
                title={disableNew ? "Complete the current session first" : "Start New Analysis"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className="hidden sm:inline">New Vehicle</span>
            </button>
        </div>
    );
};
