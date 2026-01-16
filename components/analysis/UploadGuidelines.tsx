export const UploadGuidelines = () => {
    return (
        <div className="bg-[#111] border border-gray-800 p-4 rounded-lg mt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Upload Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">▪</span>
                    Use clear images with a single vehicle
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">▪</span>
                    Side or angled views work best
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">▪</span>
                    Avoid heavily cropped or blurred images
                </li>
            </ul>
        </div>
    );
};
