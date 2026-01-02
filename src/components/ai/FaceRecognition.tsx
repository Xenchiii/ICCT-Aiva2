import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, XCircle, RefreshCw } from 'lucide-react';

const FaceRecognition = () => {
  const [status, setStatus] = useState<'scanning' | 'verified' | 'failed'>('scanning');

  // Simulate scanning process on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('verified'); // Auto-verify after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const resetScan = () => {
    setStatus('scanning');
    setTimeout(() => setStatus('verified'), 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-black rounded-2xl overflow-hidden relative shadow-2xl">
      {/* Fake Camera Viewport */}
      <div className="h-64 bg-gray-900 relative flex items-center justify-center">
        {/* Animated Scanning Frame */}
        {status === 'scanning' && (
          <div className="absolute inset-8 border-2 border-white/30 rounded-lg">
            <div className="w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_infinite]"></div>
          </div>
        )}
        
        {/* Avatar / Feed Placeholder */}
        <img 
          src="https://ui-avatars.com/api/?name=Jame+League&background=333&color=fff&size=128" 
          alt="Camera Feed" 
          className={`rounded-full transition-opacity duration-500 ${status === 'scanning' ? 'opacity-50 blur-sm' : 'opacity-100'}`}
        />

        {/* Status Overlay */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          {status === 'scanning' && (
            <p className="text-white font-mono text-sm animate-pulse">Scanning Biometrics...</p>
          )}
          {status === 'verified' && (
            <div className="flex items-center justify-center gap-2 text-green-400 font-bold bg-black/50 py-1">
              <ShieldCheck size={18} /> IDENTITY VERIFIED
            </div>
          )}
          {status === 'failed' && (
            <div className="flex items-center justify-center gap-2 text-red-400 font-bold bg-black/50 py-1">
              <XCircle size={18} /> NOT RECOGNIZED
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Camera size={14} />
          <span>Cam 01 (Virtual)</span>
        </div>
        <button 
          onClick={resetScan}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
};

export default FaceRecognition;