export const ObservationGuide = () => {
    return (
        <div className="mt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                ℹ Observation Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    {
                        title: "Ground Clearance",
                        desc: "Gap between chassis & road.",
                        color: "text-blue-400",
                    },
                    {
                        title: "Wheel Arch",
                        desc: "Round vs. Boxy/Cladded.",
                        color: "text-purple-400",
                    },
                    {
                        title: "Stance",
                        desc: "Overall vertical posture.",
                        color: "text-green-400",
                    },
                    {
                        title: "Wheel Size",
                        desc: "Ratio to vehicle body.",
                        color: "text-orange-400",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="bg-[#111] border border-gray-800 p-3 rounded hover:border-gray-600 transition-colors"
                    >
                        <div className={`text-xs font-bold mb-1 ${item.color}`}>
                            {item.title}
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight">
                            {item.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
