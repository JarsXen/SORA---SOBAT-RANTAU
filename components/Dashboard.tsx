import React, { useState } from 'react';
import { Mahasiswa, Kebiasaan, CatatanHarian } from '../types';
import { storageService } from '../services/storageService';
import AiCompanion from './AiCompanion';
import { 
  LayoutGrid,
  CheckCircle2,
  Book,
  LogOut, 
  Plus,
  TrendingUp,
  CalendarDays,
  Trash2,
  X,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface DashboardProps {
  user: Mahasiswa;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'habits'>('overview');
  const [logs, setLogs] = useState<CatatanHarian[]>(storageService.getLogs(user.id_mahasiswa));
  const [habits, setHabits] = useState<Kebiasaan[]>(storageService.getHabits(user.id_mahasiswa));
  
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const stats = storageService.getProgressStats(user.id_mahasiswa);
  const todayProgress = stats.length > 0 ? stats[stats.length - 1].persentase_kebiasaan : 0;

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName) return;
    const newHabit: Kebiasaan = {
      id_kebiasaan: `hb-${Date.now()}`,
      id_mahasiswa: user.id_mahasiswa,
      nama_kebiasaan: newHabitName,
      kategori: 'produktivitas',
      durasi_target: 15,
      selesai_hari_ini: false
    };
    storageService.addHabit(newHabit);
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setShowHabitModal(false);
  };

  const handleToggleHabit = (id: string) => {
    storageService.toggleHabit(id);
    setHabits(prev => prev.map(h => h.id_kebiasaan === id ? { ...h, selesai_hari_ini: !h.selesai_hari_ini } : h));
  };

  const handleDeleteHabit = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = habits.filter(h => h.id_kebiasaan !== id);
      setHabits(updated);
      localStorage.setItem('sora_habits', JSON.stringify(updated));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent) return;
    const newNote: CatatanHarian = {
      id_catatan: `cat-${Date.now()}`,
      id_mahasiswa: user.id_mahasiswa,
      tanggal: new Date().toISOString(),
      isi_catatan: noteContent,
      suasana_hati: 'netral'
    };
    storageService.addLog(newNote);
    setLogs(prev => [newNote, ...prev]);
    setNoteContent('');
    setShowNoteModal(false);
  };

  const handleDeleteLog = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Hapus jurnal ini?')) {
       storageService.deleteLog(id);
       setLogs(prev => prev.filter(l => l.id_catatan !== id));
    }
  };

  const NavButton = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 scale-button ${
        activeTab === id 
        ? 'text-blue-500 bg-blue-500/15' 
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
      }`}
    >
      <Icon className={`w-6 h-6 ${activeTab === id ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
      {activeTab === id && (
        <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-blue-500"></span>
      )}
    </button>
  );

  const StatCard = () => (
    <div className="apple-glass rounded-[1.75rem] p-5 h-full flex flex-col justify-between overflow-hidden relative group">
      <div className="flex justify-between items-start z-10">
         <div className="flex flex-col">
            <span className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Aktivitas</span>
            <span className="text-2xl font-bold text-white tracking-tight">{todayProgress}% <span className="text-sm font-medium text-zinc-500">hari ini</span></span>
         </div>
         <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
             <TrendingUp className="w-4 h-4" />
         </div>
      </div>
      
      {/* Chart */}
      <div className="mt-4 flex-1 w-full min-h-[120px] -ml-2">
        <ResponsiveContainer width="105%" height="100%">
          <BarChart data={stats}>
            <XAxis dataKey="tanggal" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip 
               cursor={{fill: 'transparent'}}
               contentStyle={{ 
                  borderRadius: '12px', 
                  background: 'rgba(28, 28, 30, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff',
                  fontSize: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
               }}
               itemStyle={{ color: '#fff' }}
               labelStyle={{ display: 'none' }}
               formatter={(value: number) => [`${value}%`, 'Kebiasaan']}
            />
            <Bar dataKey="persentase_kebiasaan" radius={[4, 4, 4, 4]} maxBarSize={30}>
              {stats.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.persentase_kebiasaan > 75 ? '#0A84FF' : '#3A3A3C'} 
                  className="transition-all duration-500 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const HabitsCard = ({ limit }: { limit?: number }) => {
    const displayHabits = limit ? habits.slice(0, limit) : habits;
    const completedCount = habits.filter(h => h.selesai_hari_ini).length;

    return (
      <div className="apple-glass rounded-[1.75rem] p-5 h-full flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
             <h3 className="text-white text-lg font-bold tracking-tight">Rutinitas</h3>
             <span className="text-zinc-400 text-xs font-medium">{completedCount} dari {habits.length} selesai</span>
          </div>
          <button onClick={() => setShowHabitModal(true)} className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all text-blue-500 hover:text-white scale-button">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto pr-1 no-scrollbar flex-1 -mx-1 px-1">
          {displayHabits.map(h => (
            <div 
              key={h.id_kebiasaan}
              onClick={() => handleToggleHabit(h.id_kebiasaan)}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#1C1C1E]/50 border border-white/5 hover:bg-[#1C1C1E] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all ${h.selesai_hari_ini ? 'bg-blue-500 border-blue-500' : 'border-zinc-600 group-hover:border-zinc-500'}`}>
                  {h.selesai_hari_ini && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-[15px] font-medium ${h.selesai_hari_ini ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>{h.nama_kebiasaan}</span>
              </div>
              <button 
                onClick={(e) => handleDeleteHabit(h.id_kebiasaan, e)}
                className="text-zinc-500 hover:text-red-500 transition-opacity p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {habits.length === 0 && (
             <div className="flex flex-col items-center justify-center h-32 text-zinc-500 text-center">
               <p className="text-sm">Belum ada rutinitas</p>
               <p className="text-xs opacity-60 mt-1">Tekan + untuk menambah</p>
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30 overflow-x-hidden">
      <header className="fixed top-0 w-full z-40 px-6 pt-12 pb-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Sora.</h1>
        </div>
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-10 h-10 rounded-full bg-[#1c1c1e]/80 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-all border border-white/5 scale-button"
        >
          <LogOut className="w-4 h-4 stroke-[2.5px]" />
        </button>
      </header>
      <main className="pt-28 px-5 md:px-8 max-w-7xl mx-auto min-h-screen pb-32">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 h-auto ${activeTab === 'overview' ? '' : 'hidden'}`}>
          <div className="md:col-span-8 h-[75vh] md:h-[800px] w-full">
            <AiCompanion user={user} />
          </div>
          <div className="md:col-span-4 flex flex-col gap-5 h-auto md:h-[800px]">
              <div className="h-56 shrink-0">
                <StatCard />
              </div>
              <div className="h-64 md:flex-1 shrink-0 min-h-[300px]">
                <HabitsCard limit={10} />
              </div>
          </div>
        </div>

        {activeTab === 'habits' && (
          <div className="h-[80vh]">
             <HabitsCard />
          </div>
        )}

        {/* VIEW: JOURNAL */}
        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 gap-5">
            <div className="apple-glass rounded-[2rem] p-6 min-h-[80vh] flex flex-col">
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold tracking-tight">Jurnal</h2>
                 <button onClick={() => setShowNoteModal(true)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20 scale-button transition-all">
                   Tulis Cerita
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
                  {logs.map(log => (
                    <div key={log.id_catatan} className="p-5 rounded-3xl bg-[#1C1C1E]/60 border border-white/5 hover:border-blue-500/30 transition-all cursor-default group relative">
                       <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                             <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                               {new Date(log.tanggal).toLocaleDateString('id-ID', { weekday: 'short' })}
                             </div>
                             <span className="text-zinc-500 text-xs font-medium">
                               {new Date(log.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                             </span>
                          </div>
                          <button 
                            onClick={(e) => handleDeleteLog(log.id_catatan, e)}
                            className="z-20 p-2 -mr-2 text-zinc-600 hover:text-red-500 transition-colors cursor-pointer"
                            title="Hapus jurnal"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                       <p className="text-zinc-200 text-[15px] leading-relaxed line-clamp-4 font-medium">{log.isi_catatan}</p>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-600">
                         <Book className="w-16 h-16 mb-4 opacity-20" strokeWidth={1} />
                         <p className="font-medium">Jurnalmu masih kosong.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}

      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="apple-dock rounded-full px-2 py-2 flex items-center gap-2 shadow-2xl">
          <NavButton id="overview" icon={LayoutGrid} label="Home" />
          <NavButton id="habits" icon={CheckCircle2} label="Habits" />
          <NavButton id="journal" icon={Book} label="Journal" />
        </nav>
      </div>

      {showHabitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="apple-glass bg-[#1c1c1e] rounded-[2rem] p-6 w-full max-w-sm shadow-2xl scale-100">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Tambah Rutinitas</h3>
               <button onClick={() => setShowHabitModal(false)} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
             </div>
             <form onSubmit={handleAddHabit}>
               <input 
                autoFocus
                className="apple-input w-full rounded-2xl p-4 text-lg mb-6 placeholder-zinc-500"
                placeholder="Contoh: Olahraga 15 menit"
                value={newHabitName}
                onChange={e => setNewHabitName(e.target.value)}
               />
               <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl hover:bg-blue-500 scale-button transition-all">Simpan</button>
             </form>
          </div>
        </div>
      )}

      {showNoteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center md:p-6 animate-in fade-in duration-200">
          <div className="apple-glass bg-[#1c1c1e] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 w-full max-w-lg shadow-2xl h-[85vh] md:h-auto flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Tulis Jurnal</h3>
               <button onClick={() => setShowNoteModal(false)} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
             </div>
             <form onSubmit={handleAddNote} className="flex flex-col flex-1">
               <textarea 
                autoFocus
                className="apple-input flex-1 w-full rounded-2xl p-5 text-base mb-6 resize-none placeholder-zinc-500 leading-relaxed"
                placeholder="Apa yang kamu rasakan hari ini?"
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
               />
               <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-500 scale-button transition-all shadow-lg shadow-blue-500/20">Simpan Catatan</button>
             </form>
          </div>
        </div>
      )}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="apple-glass bg-[#1c1c1e] w-full max-w-xs p-6 rounded-[2rem] text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-white/10">
             <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                <AlertCircle className="w-6 h-6 stroke-[2.5px]" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Keluar Aplikasi?</h3>
             <p className="text-zinc-400 mb-6 text-sm font-medium leading-relaxed">
               Kamu perlu masuk kembali nanti untuk mengakses data dan jurnalmu.
             </p>
             <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3.5 rounded-2xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setShowLogoutConfirm(false);
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 font-semibold transition-all text-sm"
                >
                  Keluar
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;