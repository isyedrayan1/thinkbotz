import React, { useState } from 'react';
import { CheckCircle, XCircle, Search } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  event: string;
  date: string;
  status: string;
}

// Dummy data for demonstration
const certificates: Certificate[] = [
  {
    id: 'CERT123',
    name: 'John Doe',
    event: 'Tech Symposium 2025',
    date: '2025-11-20',
    status: 'Valid',
  },
  {
    id: 'CERT456',
    name: 'Jane Smith',
    event: 'AI Workshop 2025',
    date: '2025-09-15',
    status: 'Valid',
  },
];

const CertificateVerification: React.FC = () => {
  const [inputId, setInputId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(cert => cert.id === inputId.trim());
    if (found) {
      setCertificate(found);
      setError('');
    } else {
      setCertificate(null);
      setError('Certificate not found.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-lavender to-brand-purple/40 py-12 px-4">
      <div className="w-full max-w-lg bg-white/90 shadow-xl rounded-3xl p-8 border border-brand-lavender backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent mb-2 tracking-tight">Certificate Verification</h1>
        <p className="text-center text-brand-brinjal/80 mb-8 text-base md:text-lg">Enter your certificate ID/code below to verify its authenticity.</p>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <div className="relative">
            <input
              id="certId"
              type="text"
              value={inputId}
              onChange={e => setInputId(e.target.value)}
              className="w-full border-2 border-brand-lavender focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 rounded-xl px-4 py-3 pr-12 text-lg transition placeholder:text-brand-brinjal/40 bg-white shadow-sm"
              placeholder="e.g. CERT123"
              required
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-purple">
              <Search className="w-5 h-5" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-semibold py-3 rounded-xl shadow hover:scale-[1.03] active:scale-100 transition-all text-lg flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Verify
          </button>
        </form>
        {certificate && (
          <div className="mt-8 bg-gradient-to-br from-brand-lavender/80 to-white border-2 border-brand-purple rounded-2xl p-6 flex flex-col items-center animate-fade-in">
            <CheckCircle className="w-12 h-12 text-green-500 mb-2 animate-bounce-in" />
            <h2 className="text-xl font-bold text-brand-brinjal mb-2">Certificate Details</h2>
            <div className="w-full text-left space-y-1 text-brand-brinjal/90">
              <p><span className="font-semibold">Name:</span> {certificate.name}</p>
              <p><span className="font-semibold">Event:</span> {certificate.event}</p>
              <p><span className="font-semibold">Date:</span> {certificate.date}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-semibold">{certificate.status}</span></p>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-8 bg-red-50 border-2 border-red-300 rounded-2xl p-6 flex flex-col items-center animate-fade-in">
            <XCircle className="w-10 h-10 text-red-500 mb-2 animate-shake" />
            <span className="text-red-700 font-semibold text-lg">{error}</span>
          </div>
        )}
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        .animate-bounce-in { animation: bounceIn 0.7s; }
        .animate-shake { animation: shake 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes bounceIn { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes shake { 0% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default CertificateVerification;
