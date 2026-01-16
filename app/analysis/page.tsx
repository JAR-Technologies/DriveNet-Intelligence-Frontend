'use client';

import { useState, useCallback } from 'react';

// --- Type Definitions ---
interface VehicleMetadata {
  groundClearance: string;
  wheelArch: string;
  stance: string;
  wheelSize: string;
}

// --- Icons (Simple SVG inline for zero-dep) ---
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- Subcomponents ---

// 1. Image Upload
const ImageUpload = ({ onImageSelect }: { onImageSelect: (file: File) => void }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`relative w-full h-64 border-2 border-dashed rounded-lg transition-all duration-300 flex flex-col items-center justify-center cursor-pointer 
        ${dragActive ? 'border-accent bg-accent-dim/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-500'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept="image/*"
      />

      {fileName ? (
        <div className="text-center z-10">
          <div className="flex items-center gap-2 justify-center mb-2">
            <CheckIcon />
            <span className="text-green-400 font-mono text-sm">IMAGE LOADED</span>
          </div>
          <p className="text-gray-300 font-medium">{fileName}</p>
        </div>
      ) : (
        <div className="text-center z-10 pointer-events-none">
          <div className="flex justify-center"><UploadIcon /></div>
          <p className="text-lg font-medium text-gray-300">Upload a vehicle image</p>
          <p className="text-sm text-gray-500 mt-2">Drag & drop or click to select</p>
        </div>
      )}
    </div>
  );
};

// 2. Metadata Selector
const MetadataSelect = ({
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

// --- Main Page Component ---
export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VehicleMetadata>({
    groundClearance: '',
    wheelArch: '',
    stance: '',
    wheelSize: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'ANALYZING' | 'DONE' | 'ERROR'>('IDLE');

  const updateMetadata = (key: keyof VehicleMetadata, val: string) => {
    setMetadata(prev => ({ ...prev, [key]: val }));
  };

  const isFormValid = image !== null && Object.values(metadata).every(v => v !== '');

  const handleRun = () => {
    if (!isFormValid) return;
    setStatus('ANALYZING');

    // Simulate inference
    setTimeout(() => {
      setStatus('DONE');
      // Here usually we would handle the result
    }, 2500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 md:p-12">

        {/* Header */}
        <header className="mb-10 text-center border-b border-gray-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">DriveNet Intelligence</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-mono">Advanced Vehicle Classification System</p>
        </header>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

          {/* Left Column: Image */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              VISUAL INPUT
            </h2>
            <ImageUpload onImageSelect={setImage} />
          </section>

          {/* Right Column: Physical Metadata */}
          <section className="flex flex-col gap-6">
            <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              PHYSICAL METADATA OBSERVER
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <MetadataSelect
                label="Ground Clearance"
                value={metadata.groundClearance}
                onChange={(v) => updateMetadata('groundClearance', v)}
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" }
                ]}
                helperText="Dist. between body & ground"
              />

              <MetadataSelect
                label="Wheel Arch Design"
                value={metadata.wheelArch}
                onChange={(v) => updateMetadata('wheelArch', v)}
                options={[
                  { label: "Smooth", value: "smooth" },
                  { label: "Pronounced", value: "pronounced" }
                ]}
                helperText="Curvature curvature emphasis"
              />

              <MetadataSelect
                label="Vehicle Stance"
                value={metadata.stance}
                onChange={(v) => updateMetadata('stance', v)}
                options={[
                  { label: "Low Profile", value: "low_profile" },
                  { label: "Normal", value: "normal" },
                  { label: "Tall", value: "tall" }
                ]}
                helperText="Vertical posture"
              />

              <MetadataSelect
                label="Wheel Size"
                value={metadata.wheelSize}
                onChange={(v) => updateMetadata('wheelSize', v)}
                options={[
                  { label: "Small", value: "small" },
                  { label: "Medium", value: "medium" },
                  { label: "Large", value: "large" }
                ]}
                helperText="Relative to body size"
              />
            </div>
          </section>
        </div>

        {/* Action Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col items-center gap-4">
          <button
            onClick={handleRun}
            disabled={!isFormValid || status === 'ANALYZING'}
            className={`w-full md:w-auto px-12 py-4 rounded font-bold text-sm tracking-widest uppercase transition-all duration-300
              ${isFormValid && status !== 'ANALYZING'
                ? 'bg-[var(--accent)] text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
          >
            {status === 'ANALYZING' ? 'PROCESSING GEOMETRY...' : 'RUN DRIVENET INTELLIGENCE'}
          </button>

          {/* Status Text */}
          <div className="h-6">
            {status === 'ANALYZING' && (
              <p className="text-cyan-400 font-mono text-xs animate-pulse">
                Running model inference and physical validation...
              </p>
            )}
            {status === 'DONE' && (
              <p className="text-green-400 font-mono text-xs">
                Analysis complete. Ready for next input.
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
