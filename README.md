# 🌌 SORA - Sobat Rantau

![Sora Banner](https://via.placeholder.com/1200x600/000000/0A84FF?text=SORA+Dashboard+Preview)
*(Ganti link di atas dengan screenshot aplikasi kamu nanti)*

> **Teman cerita dan produktivitas untukmu yang jauh dari rumah.**

## 📖 Tentang SORA

**SORA (Sobat Rantau)** adalah aplikasi web berbasis React yang dirancang khusus untuk membantu kesehatan mental dan produktivitas mahasiswa perantauan. Merantau seringkali membawa tantangan seperti *homesickness*, kesepian, dan kesulitan mengatur rutinitas baru.

SORA hadir sebagai teman virtual yang siap mendengarkan (berbasis AI), mencatat perjalanan emosionalmu, dan menjaga produktivitas harianmu tetap teratur dengan antarmuka yang tenang dan modern.

## ✨ Fitur Utama

*   **🤖 AI Companion (Sora):** Chatbot cerdas yang didukung oleh **Google Gemini API**. Sora bertindak sebagai teman curhat yang suportif, memberikan validasi emosi, dan saran praktis tanpa menghakimi.
*   **📝 Jurnal Harian:** Ruang aman untuk menuliskan keluh kesah, cerita bahagia, atau refleksi harian.
*   **✅ Pelacak Kebiasaan (Habit Tracker):** Bangun rutinitas positif (seperti belajar, olahraga, ibadah) dan pantau progres harianmu.
*   **📊 Statistik Aktivitas:** Visualisasi progres kebiasaanmu dalam bentuk grafik yang intuitif.
*   **🎨 Premium UI/UX:** Desain antarmuka **Glassmorphism** (Apple-style) dengan tema gelap (*Deep Space Ambient*) yang nyaman di mata.
*   **🔒 Privasi:** Saat ini data disimpan secara lokal di browser (Local Storage), menjaga privasi catatan pribadimu.

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi web modern:

*   **Frontend:** [React](https://react.dev/) (TypeScript)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Build Tool:** Vite (atau Create React App)

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah ini untuk menjalankan proyek di komputermu:

1.  **Clone repositori ini**
    ```bash
    git clone https://github.com/username-kamu/sora-app.git
    cd sora-app
    ```

2.  **Install dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi API Key**
    Buat file `.env` di root folder dan tambahkan API Key dari [Google AI Studio](https://aistudio.google.com/):
    ```env
    API_KEY=masukkan_api_key_gemini_disini
    ```

4.  **Jalankan aplikasi**
    ```bash
    npm start
    # atau jika menggunakan Vite:
    npm run dev
    ```

5.  Buka browser di `http://localhost:3000` (atau port yang tertera).

## 🔮 Roadmap Masa Depan

*   [ ] Integrasi Database Cloud (Firebase/Supabase) untuk sinkronisasi antar perangkat.
*   [ ] Fitur Login/Auth yang lebih aman.
*   [ ] Mode suara (Voice chat) dengan AI.
*   [ ] Notifikasi pengingat kebiasaan.

## 🤝 Kontribusi

Kontribusi selalu terbuka! Jika kamu ingin menambahkan fitur atau memperbaiki bug:

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahanmu (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---
*Dibuat dengan ❤️ untuk seluruh anak rantau di Indonesia.*
