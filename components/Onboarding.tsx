import React, { useState } from 'react';
import { Mahasiswa } from '../types';
import { storageService } from '../services/storageService';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: Mahasiswa) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: Mahasiswa = {
      id_mahasiswa: `mhs-${Date.now()}`,
      nama: nama,
      tanggal_daftar: new Date().toISOString()
    };

    await storageService.saveUser(newUser);
    setLoading(false);
    onComplete(newUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center animate-in fade-in duration-700">
        <div className="space-y-8 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            Sobat Rantau
          </div>
          
          <div className="space-y-2">
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-none">
              SORA.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-md">
              Teman cerita dan produktivitas untukmu yang jauh dari rumah.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
             <div className="h-1.5 w-12 rounded-full bg-blue-600"></div>
             <div className="h-1.5 w-3 rounded-full bg-zinc-700"></div>
             <div className="h-1.5 w-3 rounded-full bg-zinc-700"></div>
          </div>
        </div>

        {/* Right: Glass Form Card */}
        <div className="apple-glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden order-1 md:order-2 shadow-2xl">
          {/* Background Gradient Blob */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 tracking-tight text-white">Halo.</h2>
            <p className="text-zinc-400 mb-10 text-lg">Siapa nama panggilanmu?</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 text-4xl font-bold text-white py-4 focus:outline-none focus:border-blue-500 transition-all placeholder-zinc-700"
                  placeholder="Ketik disini..."
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading || !nama.trim()}
                  className="group flex items-center gap-4 text-white hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg font-semibold">Masuk Aplikasi</span>
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                    {loading ? (
                       <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                       <ArrowRight className="w-6 h-6" />
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase md:block hidden">
        Designed for Students
      </div>
    </div>
  );
};

export default Onboarding;