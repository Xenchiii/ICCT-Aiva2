import { QrCode } from 'lucide-react';

const QRCodeGenerator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-sm mx-auto">
      <h3 className="font-bold text-lg text-gray-800 mb-1">Your Digital Ticket</h3>
      <p className="text-xs text-gray-500 mb-6">Scan this at the entrance</p>
      
      {/* Simulation of a QR Code */}
      <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center text-white mb-6">
        <QrCode size={100} />
      </div>

      <div className="text-center">
        <p className="font-black text-xl text-primary">ADMIT ONE</p>
        <p className="text-sm text-gray-400">ID: TKT-2026-8842</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;