'use client';

import { useState, useCallback, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ImageUpload } from '@/components/analysis/ImageUpload';
import { MetadataSelect } from '@/components/analysis/MetadataSelect';
import { AnalysisResult } from '@/components/analysis/AnalysisResult';
import { UploadGuidelines } from '@/components/analysis/UploadGuidelines';
import { SessionControls } from '@/components/analysis/SessionControls';
import { ContextGuide } from '@/components/analysis/ContextGuide';
import { Toast } from '@/components/ui/Toast';

// --- Type Definitions ---
interface VehicleMetadata {
  groundClearance: string;
  wheelArch: string;
  stance: string;
  wheelSize: string;
}

interface AnalysisSession {
  id: string;
  image: File | null;
  metadata: VehicleMetadata;
  result: {
    final_label: string;
    confidence: number;
    decision: string;
    reason: string;
  } | null;
  status: 'IDLE' | 'ANALYZING' | 'DONE' | 'ERROR';
  timestamp: number;
}

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};


// --- Main Page Component ---
export default function AnalysisPage() {
  // Session History State
  const [sessions, setSessions] = useState<AnalysisSession[]>([{
    id: 'init',
    image: null,
    metadata: {
      groundClearance: 'low',
      wheelArch: 'round',
      stance: 'narrow',
      wheelSize: 'balanced'
    },
    result: null,
    status: 'IDLE',
    timestamp: Date.now()
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Derived State
  const currentSession = sessions[currentIndex];
  const { image, metadata, result, status } = currentSession;

  const [version, setVersion] = useState<string | null>(null);
  const [isSystemOnline, setIsSystemOnline] = useState(false);

  useEffect(() => {
    // Fetch Version and Check System Status
    const fetchSystemDetails = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.DETAILS);
        if (res.ok) {
          const data = await res.json();
          setVersion(data.version);
          setIsSystemOnline(true);
        } else {
          setIsSystemOnline(false);
        }
      } catch (error) {
        console.error("Failed to fetch system details", error);
        setIsSystemOnline(false);
      }
    };
    fetchSystemDetails();
  }, []);

  // Update Current Session Helper
  const updateCurrentSession = (updates: Partial<AnalysisSession>) => {
    setSessions(prev => {
      const newSessions = [...prev];
      newSessions[currentIndex] = { ...newSessions[currentIndex], ...updates };
      return newSessions;
    });
  };

  const handleImageSelect = useCallback((file: File) => {
    updateCurrentSession({ image: file, result: null, status: 'IDLE' });
  }, [currentIndex]);

  const updateMetadata = (key: keyof VehicleMetadata, val: string) => {
    updateCurrentSession({
      metadata: { ...currentSession.metadata, [key]: val },
      status: (status === 'DONE' || status === 'ERROR') ? 'IDLE' : status // Reset status if editing after run
    });
  };

  const isFormValid = image !== null && Object.values(metadata).every(v => v !== '');

  const handleRun = async () => {
    if (!isFormValid || !image) return;

    updateCurrentSession({ status: 'ANALYZING', result: null });

    // Race condition timeout wrapper
    const fetchWithTimeout = (url: string, options: RequestInit, timeout = 10000) => {
      return Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error('Request Timeout')), timeout)
        )
      ]);
    };

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('ground_clearance', metadata.groundClearance);
      formData.append('wheel_arch', metadata.wheelArch);
      formData.append('stance', metadata.stance);
      formData.append('wheel_ratio', metadata.wheelSize);

      const response = await fetchWithTimeout(API_ENDPOINTS.ANALYZE, {
        method: 'POST',
        body: formData,
      }, 15000); // 15s timeout

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      updateCurrentSession({ status: 'DONE', result: data });
      setToast({ message: "Analysis Complete", type: 'success' });

    } catch (error: any) {
      console.error(error);
      const isTimeout = error.message === 'Request Timeout' || error.name === 'AbortError';
      const msg = isTimeout ? "Server unreachable or timed out." : "Analysis failed unexpectedly.";

      updateCurrentSession({ status: 'ERROR' });
      setToast({ message: msg, type: 'error' });
    }
  };

  // Check if the LATEST session is complete to enable/disable "New"
  const latestSession = sessions[sessions.length - 1];
  const isLatestSessionComplete =
    latestSession.image !== null &&
    Object.values(latestSession.metadata).every(v => v !== '') &&
    latestSession.status === 'DONE';

  // Navigation Handlers
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < sessions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleNew = () => {
    if (!isLatestSessionComplete) return;

    setSessions(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        image: null,
        metadata: {
          groundClearance: 'low',
          wheelArch: 'round',
          stance: 'narrow',
          wheelSize: 'balanced'
        },
        result: null,
        status: 'IDLE',
        timestamp: Date.now()
      }
    ]);
    setCurrentIndex(sessions.length);
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen flex items-center justify-center p-6 pt-28 bg-[#050505] overflow-x-hidden"
    >
      <motion.div
        layout
        className="w-full max-w-5xl bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 md:p-12 relative"
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{
          backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-[#00f0ff] rounded-sm"></span>
              ANALYSIS MODULE <span className="text-[10px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded border border-[#00f0ff]/20">V{version || "..."}</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-2 ml-5">
              <span className={`w-2 h-2 rounded-full ${isSystemOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {isSystemOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
            </div>
          </div>

          <SessionControls
            currentIndex={currentIndex}
            totalSessions={sessions.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onNew={handleNew}
            disableNew={!isLatestSessionComplete}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Result Overlay or Section */}
          {status === 'DONE' && result ? (
            <AnalysisResult
              key={`result-${currentSession.id}`}
              result={result}
              image={image}
              onReset={handleNew}
            />
          ) : (
            <motion.div
              key={`form-${currentSession.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10"
            >
              {/* Input Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

                {/* Left Column: Image */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                    VISUAL INPUT
                  </h2>
                  <ImageUpload onImageSelect={handleImageSelect} />
                  <UploadGuidelines />
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

                  <ContextGuide />
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toast
          message={toast?.message ?? null}
          type={toast?.type}
          onClose={() => setToast(null)}
        />
      </motion.div>
    </motion.main>
  );
}
