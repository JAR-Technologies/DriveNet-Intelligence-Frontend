import { useState, useCallback } from 'react';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export const ImageUpload = ({ onImageSelect }: { onImageSelect: (file: File) => void }) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleFile = useCallback((file: File) => {
        setPreviewUrl(URL.createObjectURL(file));
        onImageSelect(file);
    }, [onImageSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div
            className={`relative w-full h-64 border-2 border-dashed rounded-lg transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden
          ${dragActive ? 'border-accent bg-accent-dim/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-500'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                onChange={handleChange}
                accept="image/*"
            />

            {previewUrl ? (
                <div className="absolute inset-0 w-full h-full z-10">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium">Click or Drag to Change</p>
                    </div>
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
