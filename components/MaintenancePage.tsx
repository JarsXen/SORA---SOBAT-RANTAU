import React, { useState, useEffect } from 'react';
import { Sparkles, Timer, Wrench, Heart, Code, Coffee, Pizza, Zap, BatteryCharging, Music } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [mascotState, setMascotState] = useState<'sleeping' | 'awake' | 'annoyed' | 'rage' | 'panicked'>('sleeping');
  const [dreamIndex, setDreamIndex] = useState(0);

  // Rotasi mimpi si Sora
  const dreams = [
    { icon: Code, color: "text-blue-400" },
    { icon: Pizza, color: "text-orange-400" },
    { icon: Coffee, color: "text-amber-700" },
    { icon: BatteryCharging, color: "text-green-400" },
    { icon: Music, color: "text-purple-400" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDreamIndex((prev) => (prev + 1) % dreams.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePoke = () => {
    setClickCount(prev => prev + 1);
    
    // Logika reaksi mascot yang lebih DRAMATIS
    if (clickCount === 0) {
        setMascotState('awake');
    } else if (clickCount > 1 && clickCount < 5) {
        setMascotState('annoyed');
    } else if (clickCount >= 5 && clickCount < 10) {
        setMascotState('rage');
    } else if (clickCount >= 10) {
        setMascotState('panicked');
    }

    // Reset logic if user stops clicking
    if (window.clickTimeout) clearTimeout(window.clickTimeout);
    window.clickTimeout = setTimeout(() => {
        setClickCount(0);
        setMascotState('sleeping');
    }, 3000);
  };

  const getMascotMessage = () => {
    if (mascotState === 'sleeping') return "Zzz... 10010101... Zzz...";
    if (mascotState === 'awake') return "HAH?! ERROR DIMANA?!";
    if (mascotState === 'annoyed') return "Woi, tombolnya sensitif tau!";
    if (mascotState === 'rage') return "FAJAR! TULUNG! AKU DISERANG!";
    if (mascotState === 'panicked') return "AMPUN BANG JAGO! TANGAN KRITING!";
    return "";
  };

  const getGabutLevel = () => {
      if (clickCount > 15) return "Level: Pengangguran Elite 🏅";
      if (clickCount > 10) return "Level: Butuh Kerjaan";
      if (clickCount > 5) return "Level: Iseng Aja";
      return "";
  };

  const DreamIcon = dreams[dreamIndex].icon;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black selection:bg-pink-500/30 transition-all duration-100 ${mascotState === 'rage' ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''}`}>
      
      {/* Dynamic Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute bg-white rounded-full opacity-20 animate-pulse" 
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                }}
            ></div>
        ))}
        {/* Nebulas */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        {mascotState === 'rage' && <div className="absolute inset-0 bg-red-500/10 animate-pulse z-0"></div>}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* Badge Maintenance */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] mb-12 shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 ${mascotState === 'rage' ? 'bg-red-500 text-white border-red-500 animate-bounce' : 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse'}`}>
            <Wrench className={`w-3 h-3 ${mascotState === 'rage' ? 'animate-spin' : ''}`} />
            {mascotState === 'rage' ? 'SYSTEM OVERLOAD' : 'Under Maintenance'}
        </div>
        
        {/* Interactive Mascot Area */}
        <div className="relative h-64 flex items-center justify-center group cursor-pointer" onClick={handlePoke}>
            
            {/* Dream Bubble (Only when sleeping) */}
            <div className={`absolute -top-16 left-1/2 -translate-x-12 transition-all duration-500 ${mascotState === 'sleeping' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="relative">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                        <DreamIcon className={`w-8 h-8 ${dreams[dreamIndex].color} drop-shadow-lg`} />
                    </div>
                    <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-5 right-2 w-2 h-2 bg-white/10 rounded-full"></div>
                </div>
            </div>

            {/* Speech Bubble */}
            <div className={`absolute -top-10 -right-4 bg-white text-black px-6 py-4 rounded-2xl rounded-bl-none text-xs font-bold transform transition-all duration-200 shadow-[0_10px_30px_rgba(255,255,255,0.2)] z-30 ${mascotState === 'sleeping' ? 'opacity-0 scale-50 translate-y-8' : 'opacity-100 scale-100 rotate-2'}`}>
                {getMascotMessage()}
            </div>

            {/* THE MASCOT */}
            <div className={`relative w-44 h-44 transition-all duration-200 ${mascotState === 'sleeping' ? 'animate-[float_6s_ease-in-out_infinite]' : 'scale-110'}`}>
                
                {/* Body Glow */}
                <div className={`absolute inset-0 blur-2xl rounded-full transition-colors duration-300 ${mascotState === 'rage' ? 'bg-red-500/60' : 'bg-blue-400/30'}`}></div>
                
                {/* Body Shape - Morphing based on state */}
                <div className={`w-full h-full bg-gradient-to-br shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] border-4 border-white/10 relative overflow-hidden transition-all duration-300 
                    ${mascotState === 'sleeping' ? 'from-indigo-400 to-blue-600 rounded-[45%_55%_70%_30%/40%_50%_60%_50%]' : ''}
                    ${mascotState === 'awake' ? 'from-blue-400 to-cyan-400 rounded-[40%_60%_60%_40%/50%_50%_50%_50%] scale-105' : ''}
                    ${mascotState === 'annoyed' ? 'from-orange-400 to-red-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] scale-95' : ''}
                    ${mascotState === 'rage' ? 'from-red-600 to-rose-600 rounded-2xl rotate-3 scale-110 border-red-200 animate-[shake_0.2s_infinite]' : ''}
                    ${mascotState === 'panicked' ? 'from-purple-500 to-pink-500 rounded-[50%_50%_30%_30%/60%_60%_40%_40%] scale-90 animate-pulse' : ''}
                `}>
                    
                    {/* Face Container */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-14 flex justify-between items-center px-2">
                        
                        {/* Left Eye */}
                        <div className={`bg-white rounded-full relative overflow-hidden transition-all duration-200 ${mascotState === 'rage' ? 'w-8 h-8 shadow-[0_0_10px_white]' : 'w-6 h-6'}`}>
                            {mascotState === 'sleeping' && <div className="absolute top-0 left-0 w-full h-3 bg-indigo-500 transition-all"></div>}
                            {mascotState === 'annoyed' && <div className="absolute -top-2 left-0 w-full h-5 bg-red-600 rotate-[25deg]"></div>}
                            {mascotState === 'rage' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black"></div>}
                            {mascotState === 'panicked' && <div className="absolute inset-0 bg-black scale-50 rounded-full animate-ping"></div>}
                        </div>
                        
                        {/* Mouth */}
                        <div className={`transition-all duration-200 ${
                            mascotState === 'sleeping' ? 'w-4 h-4 border-2 border-transparent border-b-white/70 rounded-full' : 
                            mascotState === 'awake' ? 'w-4 h-4 bg-black rounded-full' :
                            mascotState === 'annoyed' ? 'w-8 h-1 bg-white rotate-[-5deg] rounded-full' :
                            mascotState === 'rage' ? 'w-10 h-6 bg-black rounded-md border-2 border-white animate-[pulse_0.1s_infinite]' : // Mulut kotak glitch
                            'w-8 h-8 bg-black rounded-full border-2 border-white animate-bounce' // Panicked
                        }`}></div>

                        {/* Right Eye */}
                        <div className={`bg-white rounded-full relative overflow-hidden transition-all duration-200 ${mascotState === 'rage' ? 'w-8 h-8 shadow-[0_0_10px_white]' : 'w-6 h-6'}`}>
                            {mascotState === 'sleeping' && <div className="absolute top-0 left-0 w-full h-3 bg-indigo-500 transition-all"></div>}
                            {mascotState === 'annoyed' && <div className="absolute -top-2 left-0 w-full h-5 bg-red-600 rotate-[-25deg]"></div>}
                            {mascotState === 'rage' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black"></div>}
                            {mascotState === 'panicked' && <div className="absolute inset-0 bg-black scale-50 rounded-full animate-ping delay-75"></div>}
                        </div>
                    </div>
                </div>

                {/* Effect Particles when Rage */}
                {mascotState === 'rage' && (
                     <>
                        <Zap className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-bounce fill-yellow-400" />
                        <Zap className="absolute top-1/2 -left-8 w-6 h-6 text-yellow-400 animate-pulse fill-yellow-400 delay-75" />
                     </>
                )}
            </div>
            
            <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-zinc-500 text-[10px] tracking-widest uppercase opacity-50 animate-pulse">
                    (Jangan diklik, nanti bangun)
                </span>
                {clickCount > 0 && (
                     <span className="text-orange-500 text-[10px] font-bold mt-1 animate-in fade-in slide-in-from-top-1">
                        {getGabutLevel()}
                     </span>
                )}
            </div>
        </div>

        {/* Text Content */}
        <div className="mt-12 space-y-6 px-4 animate-in slide-in-from-bottom-5 duration-700 delay-150">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl leading-tight">
              Sora Lagi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-gradient">Healing.</span>
            </h1>
            
            <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-medium">
                  Tenang, <span className="text-white font-black bg-blue-600/20 px-1 rounded">FAJAR</span> lagi ngebut benerin kok.
                  <br className="my-2 block" />
                  Katanya sih lagi nyari <i>titik koma (;)</i> yang ilang sambil ngeluarin <span className="text-yellow-400 font-bold italic">Jurus 10 Jari Buta.</span>
                  <br/>
                  <span className="text-sm text-zinc-500 mt-2 block">Sabar ya, nanti Sora balik lagi <span className="text-pink-400 font-bold">se-gemoy kamu</span> <Heart className="w-3 h-3 inline fill-pink-400 animate-bounce" /></span>
                </p>
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-black/40 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/5 transition-colors group">
                    <Timer className="w-4 h-4 text-orange-400 group-hover:animate-spin" />
                    <span className="text-xs font-mono text-zinc-400 font-bold group-hover:text-white transition-colors">
                        Estimasi: Sampai Fajar kehabisan kopi ☕
                    </span>
                </div>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-8 py-3.5 bg-white text-black rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-2 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Cek Udah Siuman Belum
                </button>
            </div>
        </div>

        {/* Footer */}
        <p className="fixed bottom-6 left-0 w-full text-center text-zinc-600 text-[10px] font-medium tracking-widest uppercase">
            Sora &bull; Made with 💔 & Kopi Sachet
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-move 3s ease infinite;
        }
        @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
      `}</style>

        {/* Add typescript global augmentation for custom window property if needed, 
            but for this snippet we assume it works in the component context 
        */}
    </div>
  );
};

// Add this to make typescript happy with the window property
declare global {
    interface Window {
        clickTimeout?: number;
    }
}

export default MaintenancePage;
