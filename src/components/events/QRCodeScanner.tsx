import { useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setScanning(false);
    setResult("Student: Juan Dela Cruz (2023-0001) - VERIFIED");
  };

  const reset = () => {
    setScanning(true);
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white p-6 rounded-3xl h-[500px] flex flex-col items-center justify-between relative overflow-hidden">
      <div className="absolute top-4 left-0 w-full text-center">
        <p className="text-sm font-bold opacity-80">Aiva Scanner Mode</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {scanning ? (
          <div className="relative w-64 h-64 border-2 border-primary rounded-lg flex items-center justify-center bg-white/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
            <Camera size={48} className="opacity-50" />
            <p className="absolute -bottom-8 text-xs text-gray-400">Align QR code within frame</p>
          </div>
        ) : (
          <div className="text-center p-6 bg-white text-gray-900 rounded-xl animate-fade-in">
            <h3 className="font-bold text-lg text-green-600 mb-2">SCAN SUCCESS</h3>
            <p className="font-bold">{result}</p>
          </div>
        )}
      </div>

      <div className="w-full">
        {scanning ? (
          <button 
            onClick={handleSimulateScan}
            className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition"
          >
            Simulate Capture
          </button>
        ) : (
          <button 
            onClick={reset}
            className="w-full bg-primary text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} /> Scan Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;