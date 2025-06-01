# 🎰 SpinWheels - Game Roda Keberuntungan

Game roda keberuntungan yang menyenangkan dengan sistem koin, level, dan bonus harian!

## 🚀 Cara Menjalankan Game

### Metode 1: Menggunakan Server Python (Direkomendasikan)

1. **Pastikan Python terinstall** di komputer Anda
2. **Buka Command Prompt/Terminal** di folder game ini
3. **Jalankan server:**
   ```bash
   python server.py
   ```
4. **Game akan otomatis terbuka** di browser Anda
5. **Untuk menghentikan server:** Tekan `Ctrl+C`

### Metode 2: Menggunakan Live Server (VS Code)

1. **Install extension "Live Server"** di VS Code
2. **Buka folder project** di VS Code
3. **Klik kanan pada `index.html`**
4. **Pilih "Open with Live Server"**

### Metode 3: Menggunakan HTTP Server Lain

```bash
# Node.js (jika terinstall)
npx http-server

# Python 3
python -m http.server 8000

# PHP (jika terinstall)
php -S localhost:8000
```

## 🎮 Cara Bermain

- **🎯 Tujuan:** Putar roda untuk memenangkan koin!
- **💰 Biaya:** 50 koin per putaran
- **🎁 Bonus Harian:** Klaim setiap hari untuk mendapat 200 koin gratis
- **📈 Level:** Naik setiap 10 putaran

### Kontrol Game

- **SPACE** - Putar roda
- **H** - Buka bantuan
- **S** - Buka statistik
- **Mouse/Touch** - Klik tombol untuk bermain

## 🛠️ Masalah yang Diperbaiki

### 1. HTML Syntax Error
- **Masalah:** Tag `</style>` tanpa pembuka di `index.html`
- **Solusi:** Menghapus tag yang tidak perlu

### 2. Missing Import
- **Masalah:** File `ui.js` menggunakan `GAME_CONFIG` tanpa import
- **Solusi:** Menambahkan `import GAME_CONFIG from './config.js'`

### 3. ES6 Modules CORS Issue
- **Masalah:** Browser memblokir ES6 modules saat dibuka dengan `file://`
- **Solusi:** Menyediakan HTTP server untuk development

## 📁 Struktur Project

```
SpinWheels/
├── index.html          # File HTML utama
├── server.py           # Server HTTP untuk development
├── README.md           # Dokumentasi ini
├── js/                 # File JavaScript
│   ├── main.js         # Entry point utama
│   ├── gameLogic.js    # Logika permainan
│   ├── wheel.js        # Rendering roda
│   ├── ui.js           # Interface pengguna
│   ├── gameData.js     # Manajemen data
│   ├── config.js       # Konfigurasi game
│   ├── bonus.js        # Sistem bonus
│   ├── settings.js     # Pengaturan
│   ├── modals.js       # Modal dialogs
│   └── animations.js   # Animasi dan efek
└── styles/             # File CSS
    ├── main.css        # Style utama
    ├── wheel.css       # Style roda
    ├── controls.css    # Style kontrol
    ├── animations.css  # Animasi CSS
    ├── modals.css      # Style modal
    └── responsive.css  # Responsive design
```

## 🎨 Fitur Game

- ✅ **Roda Berputar Animasi** - Canvas HTML5 dengan animasi smooth
- ✅ **Sistem Koin** - Earn dan spend koin untuk bermain
- ✅ **Level System** - Progress tracking dengan level
- ✅ **Bonus Harian** - Klaim bonus setiap hari
- ✅ **Statistik Lengkap** - Track semua progress Anda
- ✅ **Pengaturan** - Customize suara, kecepatan, efek
- ✅ **Responsive Design** - Berfungsi di desktop dan mobile
- ✅ **Local Storage** - Progress tersimpan otomatis
- ✅ **Keyboard Shortcuts** - Kontrol cepat dengan keyboard
- ✅ **Confetti Effects** - Animasi kemenangan yang menyenangkan

## 🎯 Hadiah Roda

| Hadiah | Probabilitas | Warna |
|--------|-------------|-------|
| 25 🪙  | 25%         | Merah |
| 50 🪙  | 20%         | Teal  |
| 75 🪙  | 15%         | Biru  |
| 100 🪙 | 15%         | Hijau |
| 150 🪙 | 10%         | Kuning|
| 250 🪙 | 8%          | Ungu  |
| 500 🪙 | 5%          | Mint  |
| 1000 🪙| 2%          | Emas  |

## 🔧 Troubleshooting

### Game Tidak Bisa Dimuat
- Pastikan menjalankan dengan HTTP server (bukan double-click HTML)
- Check console browser untuk error messages
- Pastikan semua file ada di tempatnya

### Roda Tidak Berputar
- Pastikan ada cukup koin (minimal 50)
- Check apakah sedang dalam proses spinning
- Refresh halaman jika stuck

### Data Hilang
- Data tersimpan di localStorage browser
- Jangan clear browser data jika ingin keep progress
- Gunakan fitur backup/export jika tersedia

## 📱 Kompatibilitas

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 11+
- ✅ **Edge** 79+
- ✅ **Mobile Browsers** (iOS Safari, Chrome Mobile)

## 🤝 Kontribusi

Game ini dibuat untuk hiburan dan pembelajaran. Feel free untuk:
- Report bugs
- Suggest improvements
- Fork dan modify
- Share dengan teman!

## 📄 Lisensi

Dibuat dengan ❤️ untuk hiburan. Tidak menggunakan uang asli.

---

**Selamat bermain dan semoga beruntung! 🍀** 