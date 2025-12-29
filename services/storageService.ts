import { Mahasiswa, Kebiasaan, CatatanHarian, Progres } from '../types';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const KEY_USER = 'sora_user';
const KEY_HABITS = 'sora_habits';
const KEY_LOGS = 'sora_logs';

export const storageService = {
  getUser: (): Mahasiswa | null => {
    const data = localStorage.getItem(KEY_USER);
    return data ? JSON.parse(data) : null;
  },

  saveUser: async (user: Mahasiswa): Promise<Mahasiswa> => {
    await delay(500);
    localStorage.setItem(KEY_USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(KEY_USER);
  },

  getHabits: (userId: string): Kebiasaan[] => {
    const data = localStorage.getItem(KEY_HABITS);
    const allHabits: Kebiasaan[] = data ? JSON.parse(data) : [];
    return allHabits.filter(h => h.id_mahasiswa === userId);
  },

  addHabit: (habit: Kebiasaan): void => {
    const data = localStorage.getItem(KEY_HABITS);
    const allHabits: Kebiasaan[] = data ? JSON.parse(data) : [];
    allHabits.push(habit);
    localStorage.setItem(KEY_HABITS, JSON.stringify(allHabits));
  },

  toggleHabit: (habitId: string): void => {
    const data = localStorage.getItem(KEY_HABITS);
    const allHabits: Kebiasaan[] = data ? JSON.parse(data) : [];
    const updated = allHabits.map(h => 
      h.id_kebiasaan === habitId ? { ...h, selesai_hari_ini: !h.selesai_hari_ini } : h
    );
    localStorage.setItem(KEY_HABITS, JSON.stringify(updated));
  },

  getLogs: (userId: string): CatatanHarian[] => {
    const data = localStorage.getItem(KEY_LOGS);
    const allLogs: CatatanHarian[] = data ? JSON.parse(data) : [];
    return allLogs.filter(l => l.id_mahasiswa === userId).sort((a, b) => 
      new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    );
  },

  addLog: (log: CatatanHarian): void => {
    const data = localStorage.getItem(KEY_LOGS);
    const allLogs: CatatanHarian[] = data ? JSON.parse(data) : [];
    allLogs.push(log);
    localStorage.setItem(KEY_LOGS, JSON.stringify(allLogs));
  },

  deleteLog: (logId: string): void => {
    const data = localStorage.getItem(KEY_LOGS);
    const allLogs: CatatanHarian[] = data ? JSON.parse(data) : [];
    const updated = allLogs.filter(l => l.id_catatan !== logId);
    localStorage.setItem(KEY_LOGS, JSON.stringify(updated));
  },

  getProgressStats: (userId: string): Progres[] => {
    const logs = storageService.getLogs(userId);
    const progressData: Progres[] = logs.map((log, index) => ({
      id_progres: `prog-${index}`,
      id_mahasiswa: userId,
      tanggal: log.tanggal,
      persentase_kebiasaan: Math.floor(Math.random() * 40) + 60
    })).slice(0, 7);
    return progressData.reverse();
  }
};