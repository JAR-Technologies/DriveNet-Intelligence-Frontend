export const MetadataSelect = ({
    label,
    value,
    onChange,
    options,
    helperText
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: { label: string; value: string }[];
    helperText: string;
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#111] border border-gray-700 text-gray-200 rounded p-3 focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
        >
            <option value="" disabled>Select {label}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <p className="text-xs text-gray-600">{helperText}</p>
    </div>
);
