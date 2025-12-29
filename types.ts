// Berdasarkan ERD pada gambar

export interface Mahasiswa {
  id_mahasiswa: string;
  nama: string;
  tanggal_daftar: string;
}

export interface Kondisi {
  id_kondisi: string;
  jenis_kondisi: 'homesick' | 'overthinking' | 'stress' | 'kesepian' | 'bahagia' | 'netral';
  deskripsi: string;
}

export interface Kebiasaan {
  id_kebiasaan: string;
  id_mahasiswa: string;
  nama_kebiasaan: string;
  kategori: 'kesehatan' | 'produktivitas' | 'sosial' | 'spiritual';
  durasi_target: number; // dalam menit
  selesai_hari_ini: boolean;
}

export interface CatatanHarian {
  id_catatan: string;
  id_mahasiswa: string;
  tanggal: string; // ISO Date string
  isi_catatan: string;
  suasana_hati: 'sedih' | 'netral' | 'senang' | 'semangat' | 'cemas';
}

export interface Progres {
  id_progres: string;
  id_mahasiswa: string;
  tanggal: string;
  persentase_kebiasaan: number; // 0 - 100
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}