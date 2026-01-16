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

  // Result State
  const [result, setResult] = useState<{
    final_label: string;
    confidence: number;
    decision: string;
    reason: string;
  } | null>(null);

  const updateMetadata = (key: keyof VehicleMetadata, val: string) => {
    setMetadata(prev => ({ ...prev, [key]: val }));
  };

  const isFormValid = image !== null && Object.values(metadata).every(v => v !== '');

  const handleRun = async () => {
    if (!isFormValid || !image) return;
    setStatus('ANALYZING');
    setResult(null); // Reset previous result

    try {
      // 1. Upload Image (or send directly if API supported it, but our API currently expects path string)
      // Actually, we should update the backend to accept a file upload to be robust.
      // But adhering to the current state, `api.py` takes string.
      // I will update the frontend to simulate the "path" if locally or strictly implement upload.
      // Let's implement robust upload in backend first.

      const formData = new FormData();
      formData.append('image', image);
      formData.append('ground_clearance', metadata.groundClearance);
      formData.append('wheel_arch', metadata.wheelArch);
      formData.append('stance', metadata.stance);
      formData.append('wheel_ratio', metadata.wheelSize); // Mapped to wheel_ratio

      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      console.log(data);
      setResult(data);
      setStatus('DONE');
    } catch (error) {
      console.error(error);
      setStatus('ERROR');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 md:p-12">

        {/* Result Overlay or Section */}
        {status === 'DONE' && result && (
          <div className="mb-10 p-6 bg-[#0f0f0f] border border-[var(--accent)] rounded-lg animation-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Analysis Complete</h2>
                <p className="text-xs text-gray-400 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${result.decision === 'AUTO_APPROVE' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'}`}>
                {result.decision.replace(/_/g, ' ')}
              </div>
            </div>

            <div className="flex gap-6 mb-6">
              {/* Image Preview */}
              <div className="w-1/3 rounded-lg overflow-hidden border border-gray-800 relative">
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Analyzed Vehicle"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Class</div>
                  <div className="text-3xl font-bold text-white">{result.final_label}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Confidence</div>
                  <div className="text-3xl font-bold text-[var(--accent)]">{(result.confidence * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 uppercase mb-2">Reasoning Engine</div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed bg-[#050505] p-3 rounded border border-gray-800">
                {result.reason}
              </p>
            </div>

            <button
              onClick={() => { setStatus('IDLE'); setResult(null); setImage(null); setMetadata({ groundClearance: '', wheelArch: '', stance: '', wheelSize: '' }); }}
              className="mt-6 text-xs text-gray-500 hover:text-white underline cursor-pointer"
            >
              Reset and Analyze New Vehicle
            </button>
          </div>
        )}

        {status !== 'DONE' && (
          <>
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

            {/* Guidance Information */}
            <section className="mb-10 p-6 border border-gray-800 bg-[#0d0d0d] rounded-lg">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="text-[var(--accent)]">ℹ</span> Observational Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-500 font-mono leading-relaxed">
                <div>
                  <strong className="text-gray-300 block mb-1">Ground Clearance</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="text-[var(--accent)]">Low</span>: Car sits close to the road</li>
                    <li><span className="text-[var(--accent)]">Medium</span>: Slightly raised (typical crossover)</li>
                    <li><span className="text-[var(--accent)]">High</span>: Clearly raised, off-road capable</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-300 block mb-1">Wheel Arch Design</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="text-[var(--accent)]">Smooth</span>: Rounded, body-colored arches</li>
                    <li><span className="text-[var(--accent)]">Pronounced</span>: Squared or cladded arches (SUV-like)</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-300 block mb-1">Vehicle Stance</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="text-[var(--accent)]">Low Profile</span>: Appears low with a smooth, sloping roof</li>
                    <li><span className="text-[var(--accent)]">Normal</span>: Looks low and flat</li>
                    <li><span className="text-[var(--accent)]">Tall</span>: Looks upright or vertically tall</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-300 block mb-1">Wheel Size Relative to Body</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="text-[var(--accent)]">Small</span>: Compact wheels</li>
                    <li><span className="text-[var(--accent)]">Medium</span>: Balanced</li>
                    <li><span className="text-[var(--accent)]">Large</span>: Big wheels relative to body height</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-gray-600 border-t border-gray-800 pt-4 italic">
                * These inputs help the system resolve ambiguity when visual cues alone are insufficient.
              </p>
            </section>

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

              </div>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
