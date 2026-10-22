PRD: Website Portofolio Pribadi (SPA MVP)
Gilang Risqi Pratama · Versi 1.0 · Oktober 2026 · Dokumen ini ditulis sebagai instruksi untuk AI Agent pembangun website.
1. Ringkasan
Website portofolio pribadi berbentuk Single Page Application (SPA) yang dibangun dengan Vanilla JavaScript dan Vite, tanpa framework UI. Website menampilkan profil, pengalaman kerja, proyek, pencapaian, pendidikan, dan pelatihan Gilang Risqi Pratama, mahasiswa S1 Teknik Informatika yang memiliki pengalaman di bidang pengembangan aplikasi web serta di bidang operasional dan layanan pelanggan. Konten tersedia dalam dua bahasa (Indonesia dan Inggris) dengan tombol pengalih bahasa. Halaman dirancang seimbang untuk dua jalur karier (teknologi, serta operasional dan layanan), dan setiap kategori konten (Experience, Projects, Achievements, Training, Education) dipisahkan secara eksplisit.
2. Tujuan dan Metrik Keberhasilan
Tujuan utama:
• Membuat recruiter cepat memahami profil, kemampuan, dan bukti pengalaman (teknologi maupun operasional) dalam 30 detik pertama.
• Memberi klien potensial bukti bahwa pemilik portofolio pernah mengerjakan aplikasi web nyata.
• Menyajikan informasi yang jujur, dapat diverifikasi, dan tidak melebih-lebihkan.
Metrik MVP:
• Skor Lighthouse Performance, Accessibility, dan Best Practices masing-masing minimal 90.
• Seluruh section dapat diakses dalam dua bahasa tanpa teks yang hilang atau tercampur.
• Tampilan benar pada lebar layar 360 px hingga 1440 px.
• Tidak ada klaim (angka, penghargaan, teknologi, peran) di luar Lampiran A.
3. Target Pengguna
Pengguna
Kebutuhan
Perilaku
Recruiter IT
Menilai kecocokan untuk peran IT (junior/fresh graduate web developer)
Memindai cepat, mencari teknologi, pengalaman, IPK, dan kontak
Klien freelance
Mencari bukti kemampuan membangun aplikasi web
Melihat proyek, teknologi yang dipakai, dan cara menghubungi
Recruiter non-IT (ritel, F&B, administrasi, operasional)
Menilai pengalaman operasional, pelayanan pelanggan, pencatatan stok, dan koordinasi tim
Memindai cepat, mencari peran, durasi, tanggung jawab, dan kontak
4. Ruang Lingkup MVP
Termasuk (in scope):
• Satu halaman SPA dengan navigasi antar-section berbasis hash.
• Section: Hero, About, Skills, Experience, Projects, Achievements, Training, Education, Contact (setiap kategori konten terpisah).
• Toggle bahasa ID/EN.
• Desain responsif dan aksesibel.
• Konten statis dari file JSON.
• Deployment statis.
Tidak termasuk (out of scope):
• CMS, panel admin, atau backend.
• Blog dan sistem komentar.
• Formulir kontak berbasis server (cukup tautan email dan media sosial).
• Analitik pengguna dan autentikasi.
• Library 3D dan animasi berat (video latar, partikel, scroll-jacking).
5. Arsitektur dan Tech Stack
• Bahasa: JavaScript (ES Modules), HTML5, CSS3.
• Build tool: Vite.
• Framework UI: tidak ada. Komponen dibuat sebagai fungsi JavaScript yang mengembalikan elemen DOM atau template string.
• Routing: hash-based (#/about, #/experience, dan seterusnya) agar dapat di-hosting statis tanpa konfigurasi server. Setiap rute men-scroll atau menampilkan section terkait dan memperbarui document.title.
• Styling: CSS murni dengan CSS variables untuk warna, tipografi, dan spasi. Pendekatan mobile-first.
• Data konten: file JSON terpisah per bahasa, dimuat saat aplikasi dijalankan.
• State: objek sederhana untuk bahasa aktif, disimpan di localStorage dengan kunci lang.
• Hosting: statis (Netlify, Vercel, atau GitHub Pages).
• Dependensi: minimal, hanya yang tercantum pada bagian 5.1 (Vite sebagai dev dependency dan Anime.js sebagai runtime dependency). Tidak menambah library lain tanpa persetujuan pemilik.
5.1 Dependensi dan Package Manager
• Package manager: npm (bawaan Node.js LTS). Berkas package-lock.json wajib ikut di-commit agar versi terkunci. Jangan mencampur dengan yarn atau pnpm.
• Prasyarat: Node.js versi LTS aktif dan npm.
• Skrip di package.json: npm run dev (server pengembangan), npm run build (build produksi), npm run preview (uji hasil build).
Paket
Jenis
Fungsi
Perintah instalasi
vite
devDependency
Dev server dan build
npm install -D vite
animejs
dependency
Animasi dinamis (bagian 5.2)
npm install animejs
eslint
devDependency (opsional)
Pemeriksaan kode
npm install -D eslint
prettier
devDependency (opsional)
Pemformatan kode
npm install -D prettier
• Agent tidak boleh menambah paket di luar tabel ini tanpa persetujuan pemilik.
• Pasang versi stabil terbaru, lalu catat versi yang terpasang di README.
• Baca dokumentasi resmi Anime.js sesuai versi yang terpasang sebelum menulis kode animasi, karena API versi 3 dan versi 4 berbeda. Jangan menebak nama fungsi.
5.2 Animasi dan Interaksi (Anime.js)
Tujuan: memberi kesan dinamis dan modern tanpa mengganggu keterbacaan konten. Seluruh logika animasi berada di src/animations.js; komponen hanya memanggil fungsi pembantu dari modul itu.
Efek
Lokasi
Pemicu
Catatan
Teks masuk bertahap (stagger)
Hero
Halaman dimuat
Total durasi maksimal 1 detik
Fade dan geser ke atas (16-24 px)
Setiap section dan kartu
Elemen masuk viewport (IntersectionObserver)
Berjalan sekali per elemen
Transisi konten
Area konten utama
Pergantian rute hash
Fade 200-300 ms
Crossfade teks
Seluruh teks
Klik toggle bahasa
Maksimal 250 ms, tanpa teks berkedip
Garis timeline tergambar
Experience
Masuk viewport
Opsional
Efek hover dan focus kartu
Projects
Pointer atau keyboard focus
Cukup CSS transition, tanpa Anime.js
Aturan animasi:
• Impor hanya fungsi Anime.js yang dipakai agar bundel tetap kecil.
• Animasikan hanya transform dan opacity. Jangan menganimasikan width, height, top, atau left.
• Durasi 200-600 ms (kecuali Hero), dengan easing yang konsisten di seluruh situs.
• Hormati prefers-reduced-motion: reduce: lewati animasi dan tampilkan elemen langsung pada keadaan akhir.
• Keadaan awal tersembunyi hanya diterapkan oleh JavaScript setelah modul animasi siap, sehingga konten tetap terlihat jika animasi gagal dimuat.
• Animasi tidak boleh menunda tampilan konten utama atau menyebabkan layout shift.
• Hentikan dan bersihkan animasi serta observer saat berpindah rute.
6. Struktur Halaman
1. Hero: nama, judul peran netral yang memuat kedua jalur (misalnya "Web Developer · Operasional & Layanan Pelanggan"), satu kalimat ringkas, tombol ke Experience dan Contact.
2. About: ringkasan singkat berdasarkan Lampiran A yang menyebut kedua jalur secara setara: mahasiswa S1 Teknik Informatika dengan pengalaman pengembangan web serta pengalaman operasional dan layanan pelanggan.
3. Skills: dua kelompok sejajar, Teknis dan Operasional/Interpersonal, hanya dari teknologi dan kompetensi yang tertulis di Lampiran A, tanpa tingkat penguasaan atau persentase.
4. Experience: peran, kegiatan, dan tanggung jawab (apa yang dikerjakan), urutan kronologis terbalik. Semua item memakai kartu dengan ukuran dan struktur yang sama; label jalur (IT atau Operasional & Layanan) hanya penanda kecil, tanpa filter dan tanpa penekanan pada salah satu jalur.
5. Projects: karya spesifik (aplikasi pelaporan harian dan HiPlan), lihat bagian 9 untuk skema.
6. Achievements: hanya hasil atau pengakuan yang dapat diverifikasi (hasil seleksi dan IPK). Tidak boleh memuat jabatan, tugas, jumlah data, pelatihan, atau pengalaman kerja.
7. Training: program pelatihan (Coding Camp powered by DBS Foundation 2025).
8. Education: pendidikan formal (S1 dan SMK).
9. Contact: email, tautan LinkedIn, GitHub, dan CV (nilai diisi pemilik, lihat bagian 14).
7. Kebutuhan Fungsional
ID
Kebutuhan
Prioritas
F1
Navigasi bar tetap (sticky) dengan tautan ke setiap section dan penanda section aktif
Wajib
F2
Toggle bahasa ID/EN yang mengganti seluruh teks tanpa reload halaman
Wajib
F3
Pilihan bahasa tersimpan dan dipulihkan saat kunjungan berikutnya; default mengikuti bahasa browser, fallback ke ID
Wajib
F4
Rendering Experience, Projects, Achievements, Education, dan Training dari data JSON, tanpa hardcode teks di komponen
Wajib
F5
Setiap item pengalaman dan proyek menampilkan penanda kontribusi: Individu, Tim, atau Tidak dirinci
Wajib
F6
Tombol unduh CV (jika berkas CV tersedia)
Opsional
F7
Tautan kontak (mailto dan media sosial) dengan rel="noopener"
Wajib
F8
Meta tag SEO dasar, Open Graph, favicon, dan lang pada elemen <html> yang ikut berubah mengikuti bahasa
Wajib
F9
Mode terang/gelap mengikuti preferensi sistem
Opsional
F10
Animasi dinamis dengan Anime.js sesuai bagian 5.2, termasuk fallback saat reduced-motion aktif
Wajib
F11
Setiap item konten tampil hanya di satu section sesuai pemetaan bagian 9.1 (pengecualian: IPK di Education dan Achievements)
Wajib
F12
Label jalur (IT atau Operasional & Layanan) sebagai penanda kecil pada kartu Experience, tanpa filter dan tanpa perbedaan ukuran atau urutan
Wajib
8. Kebutuhan Non-Fungsional
• Performa: ukuran bundel awal kecil (Anime.js diimpor per modul agar tree-shaking berjalan), animasi tidak menurunkan skor Lighthouse, gambar dioptimalkan (WebP), font dibatasi satu keluarga dengan font-display: swap.
• Aksesibilitas: HTML semantik, kontras warna memadai, navigasi keyboard, teks alt pada gambar, aria-current pada navigasi aktif, prefers-reduced-motion dihormati.
• Kompatibilitas: dua versi terbaru Chrome, Firefox, Safari, dan Edge, termasuk browser mobile.
• Keamanan: tanpa input pengguna; tidak ada penyimpanan data sensitif; konten dari JSON dirender dengan textContent atau di-escape, bukan innerHTML mentah.
• Keterpeliharaan: kode modular, nama berkas jelas, README berisi cara menjalankan, membangun, dan mengubah konten.
9. Model Data Konten
Setiap berkas bahasa (id.json, en.json) memiliki struktur kunci yang sama.
{
  "profile": { "name": "", "headline": "", "summary": "" },
  "experience": [
    {
      "id": "",
      "role": "",
      "organization": "",
      "period": "",
      "track": "it | general",
      "contribution": "individual | team | unspecified",
      "responsibilities": [""],
      "competencies": [""],
      "technologies": [""]
    }
  ],
  "projects": [
    {
      "id": "",
      "title": "",
      "description": "",
      "contribution": "individual | team | unspecified",
      "teamNote": "",
      "technologies": [""],
      "links": { "demo": "", "repo": "" }
    }
  ],
  "achievements": [
    { "id": "", "title": "", "evidence": "", "source": "" }
  ],
  "education": [
    { "institution": "", "program": "", "period": "", "gpa": "", "notes": "" }
  ],
  "training": [
    { "name": "", "program": "", "period": "", "details": [""] }
  ],
  "contact": { "email": "", "linkedin": "", "github": "", "cv": "" },
  "ui": { "nav": {}, "labels": {} }
}
Field yang tidak tersedia datanya dikosongkan dan elemen terkait tidak dirender. Jangan mengisi dengan teks placeholder yang terlihat oleh pengunjung.
9.1 Kategori Konten dan Pemetaan Lampiran A
Setiap item Lampiran A hanya boleh masuk satu kategori. Pemisahan ini wajib dan tercermin pada struktur data (satu array per kategori), komponen, dan tampilan.
Kategori
Definisi
Isi (sumber Lampiran A)
Tidak boleh berisi
Experience
Peran, kegiatan, dan tanggung jawab (apa yang dikerjakan)
A1, A3, A4, A5, A6
Hasil seleksi, nilai akademik, program pelatihan, penghargaan
Projects
Karya spesifik yang dikerjakan
A10 (aplikasi pelaporan harian, HiPlan)
Deskripsi jabatan atau tugas harian
Achievements
Hasil atau pengakuan yang dapat diverifikasi
A9 (hasil seleksi Coding Camp, IPK)
Jabatan, tugas, jumlah anggota tim, jumlah data, jam pelatihan
Training
Program pelatihan
A2 (Coding Camp powered by DBS Foundation 2025)
Hasil seleksi dan proyek (masing-masing punya kategori sendiri)
Education
Pendidikan formal
A7, A8
Pelatihan non-formal
• Pengecualian satu kategori: IPK tampil sebagai data pada Education dan sebagai satu kartu pada Achievements.
• Label jalur pada Experience: IT untuk A1 dan A5; Operasional & Layanan untuk A3, A4, dan A6. Nilai field track adalah it atau general. Label hanya penanda kecil.
• Field competencies: menggantikan field pencapaian pada Experience dan hanya berisi kompetensi yang tertulis di Lampiran A.
• Skills: tambahkan kunci skills pada berkas bahasa dengan bentuk { "technical": [""], "operational": [""] }, diisi hanya dari teknologi dan kompetensi yang tertulis eksplisit di Lampiran A.
10. Aturan Konten untuk AI Agent
Aturan ini bersifat wajib dan lebih tinggi prioritasnya daripada preferensi desain.
1. Sumber tunggal: Lampiran A adalah satu-satunya sumber fakta. Jangan mengarang angka, penghargaan, hasil proyek, teknologi, tanggung jawab, tautan, atau tanggal yang tidak tercantum.
2. Bukti konkret lebih dulu: tampilkan angka dan bukti konkret yang tercantum di Lampiran A pada kategori tempat angka itu berasal (misalnya sekitar 800 catatan data pada Experience, sekitar 900 jam pada Training, hasil seleksi dan IPK pada Achievements).
3. Bedakan tim dan individu: untuk proyek atau pengalaman tim, gunakan frasa seperti "berkontribusi dalam", "bersama tim", atau "terlibat dalam". Jangan menulis "membangun" atau "mengembangkan sendiri" kecuali dinyatakan di Lampiran A.
4. HiPlan: tampilkan sebagai proyek capstone tim. Jangan mengklaim keseluruhan proyek sebagai karya individual dan jangan menyebut peran atau fitur spesifik sampai pemilik melengkapi datanya.
5. Pengalaman tanpa ukuran: untuk HOKBEN, Gerai Air Minum Biru, KKN, dan SMK, tampilkan secara deskriptif (tanggung jawab dan kompetensi). Jangan menambahkan klaim peningkatan penjualan, efisiensi, atau pengurangan selisih stok.
6. Klaim aplikasi masih digunakan: tulis sebagai "berdasarkan informasi terakhir yang diberikan". Jangan menyatakannya sebagai fakta mutlak atau menyebut jumlah pengguna.
7. Jangan menyimpulkan: teknologi hanya ditampilkan pada item tempat teknologi itu disebutkan di Lampiran A.
8. Gaya bahasa: profesional, ringkas, mudah dipindai. Kalimat aktif, tanpa superlatif promosi (misalnya "terbaik", "luar biasa", "ahli"). Versi Inggris adalah terjemahan setara, bukan versi yang lebih membesar-besarkan.
9. Konsistensi dua bahasa: setiap perubahan fakta harus diterapkan di id.json dan en.json sekaligus.
10. Jika data kurang: agent berhenti dan mencatat pertanyaan di README atau bagian 14, bukan mengisi sendiri.
Aturan tambahan: keseimbangan jalur dan pemisahan kategori
• Keseimbangan jalur: pengalaman IT dan pengalaman operasional/layanan diperlakukan setara dalam ukuran kartu, urutan (kronologis terbalik), kedalaman deskripsi, dan gaya bahasa. Jangan menonjolkan, mempersingkat, atau menyamarkan salah satu jalur, dan jangan menggambarkan pengalaman operasional sebagai pengalaman sampingan.
• Tanpa penafsiran ulang: jangan membahasakan pengalaman operasional dengan istilah teknologi, atau pengalaman IT dengan istilah operasional, di luar teks Lampiran A.
• Satu item, satu kategori: setiap item hanya muncul di satu section sesuai tabel 9.1. Dilarang menyalin isi satu section ke section lain (satu-satunya pengecualian adalah IPK).
• Achievements ketat: hanya hasil atau pengakuan yang dapat diverifikasi (A9). Dilarang memasukkan jabatan, tugas, jumlah anggota tim yang dikoordinasi, jumlah data yang diolah, jam pelatihan, atau deskripsi pengalaman kerja. Jika ragu, tempatkan di Experience, bukan di Achievements.
• Experience tanpa klaim penghargaan: berisi peran, kegiatan, tanggung jawab, dan kompetensi saja. Angka seperti sekitar 800 catatan data atau tim tiga orang boleh muncul sebagai konteks pekerjaan, bukan sebagai pencapaian.
11. Struktur Folder
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   ├── favicon.svg
│   └── cv/            # opsional
└── src/
    ├── main.js        # inisialisasi aplikasi
    ├── router.js      # hash router
    ├── i18n.js        # state bahasa, pemuatan JSON, penyimpanan
    ├── components/
    │   ├── navbar.js
    │   ├── hero.js
    │   ├── about.js
    │   ├── experience.js
    │   ├── projects.js
    │   ├── achievements.js
    │   ├── education.js
    │   └── contact.js
    ├── data/
    │   ├── id.json
    │   └── en.json
    └── styles/
        ├── variables.css
        ├── base.css
        └── components.css
Catatan: tambahkan skills.js dan training.js pada src/components/, karena Training dan Education dipisah menjadi dua section.
12. Rencana Implementasi
1. Milestone 1, fondasi: inisialisasi Vite dan instalasi dependensi dengan npm, struktur folder, index.html, CSS variables, router, dan navbar.
2. Milestone 2, i18n dan data: modul i18n.js, berkas id.json dan en.json dari Lampiran A, toggle bahasa.
3. Milestone 3, section konten: Hero, About, Skills, Experience, Projects, Achievements, Training, Education, Contact.
4. Milestone 4, kualitas: animasi Anime.js beserta penanganan reduced-motion, responsivitas, aksesibilitas, SEO, optimasi gambar, audit Lighthouse.
5. Milestone 5, rilis: README, build produksi, deployment, pengecekan tautan.
13. Kriteria Penerimaan
• Mengganti bahasa mengubah semua teks, termasuk label navigasi, judul section, dan lang pada <html>, tanpa reload.
• Memuat ulang halaman mempertahankan pilihan bahasa terakhir.
• Setiap item Experience dan Projects menampilkan penanda kontribusi yang sesuai Lampiran A.
• Pengecekan manual terhadap Lampiran A: tidak ada angka, teknologi, atau klaim yang tidak bersumber.
• Tidak ada teks placeholder, "lorem ipsum", atau tautan kosong yang terlihat.
• Skor Lighthouse memenuhi target pada bagian 2 untuk mobile dan desktop.
• Seluruh navigasi dan tombol dapat dipakai hanya dengan keyboard.
• Seluruh efek pada bagian 5.2 berjalan di Chrome, Firefox, dan Safari; saat prefers-reduced-motion: reduce aktif, tidak ada animasi yang berjalan dan semua konten tetap terlihat.
• Animasi tidak menyebabkan layout shift (CLS maksimal 0,1) dan skor Lighthouse tetap memenuhi target pada bagian 2.
• npm install, npm run dev, dan npm run build berjalan tanpa error pada Node.js LTS, dan hanya paket pada tabel 5.1 yang terpasang.
• Setiap item Lampiran A muncul di tepat satu section sesuai tabel 9.1 (pengecualian: IPK di Education dan Achievements). Tidak ada item Experience, Training, atau Projects yang tampil di Achievements.
• Section Achievements hanya berisi item pada A9; tidak ada jabatan, jumlah anggota tim, jumlah data, atau jam pelatihan.
• Kartu Experience jalur IT dan jalur Operasional & Layanan memiliki ukuran, struktur, dan gaya tampilan yang sama, dan tidak ada filter jalur.
• Hero dan About menyebut kedua jalur secara setara.
14. Data yang Belum Tersedia (Perlu Diisi Pemilik)
• Email, tautan LinkedIn, GitHub, dan berkas CV.
• Foto profil (opsional).
• Kontribusi teknis pribadi pada proyek HiPlan, dan tautan demo atau repositori jika ada.
• Tautan demo atau repositori aplikasi pelaporan harian, jika diizinkan perusahaan untuk ditampilkan.
• Periode KKN dan lokasinya.
• Proyek lain yang ingin ditampilkan (tambahkan pada array projects).
• Pilihan nama domain.
• Judul peran (headline) Hero yang memuat kedua jalur karier, sesuai keinginan pemilik.
Lampiran A: Sumber Faktual
A1. [Experience, jalur IT] Web Application Development Intern, PT. Garasi Creasindo Indonesia (Oktober 2025 – Januari 2026)
• Terlibat dalam pengembangan aplikasi web untuk pencatatan laporan harian dari berbagai departemen di perusahaan percetakan.
• Frontend: HTML, CSS, JavaScript. Backend: Node.js. Basis data: PostgreSQL yang di-host melalui Supabase.
• Mengerjakan fitur input laporan harian dan tampilan rekap laporan bulanan.
• Mengimplementasikan fungsi Update dan Delete untuk pengguna dengan peran admin.
• Berkolaborasi dengan dua anggota tim (kontribusi: tim).
• Hasil aplikasi (masih digunakan perusahaan berdasarkan informasi terakhir yang diberikan) ditampilkan pada Projects (A10), bukan pada Achievements.
A2. [Training] Coding Camp powered by DBS Foundation 2025, program Full-Stack Developer (Februari – Juni 2025)
• Pelatihan intensif Full-Stack Developer & Self Development, sekitar 900 jam: pembelajaran mandiri, sesi bersama praktisi industri, dan bimbingan mentor profesional.
• Materi: HTML, CSS, JavaScript, Node.js, RESTful API; pemecahan masalah, komunikasi, presentasi, adaptabilitas, kerja sama tim.
• Proyek capstone tim HiPlan (ditampilkan pada Projects, A10), aplikasi untuk menjelajahi gunung-gunung di Indonesia (kontribusi: tim; rincian kontribusi pribadi belum tersedia).
• Hasil seleksi (terpilih sekitar 3.000 peserta dari lebih dari 60.000 pendaftar) ditampilkan pada Achievements (A9), bukan pada Training.
A3. [Experience, jalur Operasional & Layanan] Part-Time Crew Store, HOKBEN (Desember 2023 – Juni 2024)
• Memeriksa barang diterima berdasarkan rincian pengiriman; mencatat pengambilan stok dari gudang (stok kering dan chiller).
• Melaporkan aktivitas stok dan operasional shift kepada Head Shift atau Supervisor.
• Memeriksa kelengkapan dan mengemas pesanan; mengoperasikan sistem kasir (POS); membantu pelayanan pelanggan dan proses memasak sesuai kebutuhan operasional.
• Kompetensi: pemeriksaan dan pencatatan stok, ketelitian, penggunaan POS, pelayanan pelanggan, kerja sama tim, pelaksanaan prosedur operasional.
• Tidak ada angka pencapaian atau penghargaan yang tercatat.
A4. [Experience, jalur Operasional & Layanan] Cashier & Shift Leader, Gerai Air Minum Biru (Maret 2022 – April 2023)
• Mencatat pendapatan dan pengeluaran selama shift; memeriksa stok fisik dan mencocokkannya dengan catatan persediaan.
• Memastikan serah terima antarshift berjalan baik.
• Mengoordinasikan operasional satu kasir dan dua staf pengisi ulang air (tim tiga orang).
• Memantau persediaan dan kebutuhan operasional; menyampaikan keluhan pelanggan dan masalah operasional kepada pemilik usaha.
• Tidak ada data terukur tentang peningkatan penjualan, efisiensi, atau pengurangan selisih stok.
A5. [Experience, jalur IT] Data Cleaning dan Pengolahan Data Penelitian
• Memeriksa data kosong, mengidentifikasi dan menghapus data duplikat, menyeragamkan format, menyusun rekap, dan memeriksa konsistensi data.
• Skala pekerjaan: data cleaning terhadap sekitar 800 catatan data (ditampilkan pada Experience, bukan Achievements).
A6. [Experience, jalur Operasional & Layanan] Kuliah Kerja Nyata (KKN), Divisi Perlengkapan
• Mendata kebutuhan perlengkapan kegiatan; membantu pengadaan dan pemeriksaan barang; mengoordinasikan pendistribusian perlengkapan; memastikan perlengkapan tersedia untuk pelaksanaan kegiatan.
A7. [Education] Pendidikan S1 Teknik Informatika, Universitas Islam Syekh-Yusuf Tangerang (Agustus 2022 – Agustus 2026)
• IPK 3,79 / 4,00.
• Landasan pengetahuan: pengembangan perangkat lunak, perancangan sistem informasi, basis data, pengolahan data; menerapkan pengetahuan teknis dalam proyek pengembangan aplikasi web.
A8. [Education] Pendidikan Teknik Komputer dan Jaringan, SMK Persada (2018 – 2021)
• Latar belakang pendidikan vokasi di bidang Teknik Komputer dan Jaringan.
A9. [Achievements] Hasil atau pengakuan yang dapat diverifikasi (bukan pengalaman, pelatihan, atau tugas)
1. Terpilih pada seleksi Coding Camp 2025: sekitar 3.000 dari lebih dari 60.000 pendaftar.
2. IPK 3,79/4,00 pada S1 Teknik Informatika (juga ditampilkan di Education).
A10. [Projects] Karya spesifik
• Aplikasi web pelaporan harian, PT. Garasi Creasindo Indonesia (sumber: A1): pencatatan laporan harian dari berbagai departemen di perusahaan percetakan; fitur input laporan harian, rekap laporan bulanan, serta Update dan Delete untuk admin; teknologi HTML, CSS, JavaScript, Node.js, PostgreSQL (Supabase). Kontribusi: tim (bersama dua anggota tim). Hasil: aplikasi masih digunakan perusahaan berdasarkan informasi terakhir yang diberikan.
• HiPlan (sumber: A2): aplikasi untuk menjelajahi gunung-gunung di Indonesia, proyek capstone tim. Kontribusi: tim. Rincian kontribusi pribadi dan teknologi yang dipakai belum tersedia, jadi jangan diisi.