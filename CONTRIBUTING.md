# 🤝 Contributing to SpinWheels Game

Terima kasih atas minat Anda untuk berkontribusi pada SpinWheels Game! Kami menyambut kontribusi dari semua orang.

## 📋 Cara Berkontribusi

### 1. Fork Repository
- Fork repository ini ke akun GitHub Anda
- Clone fork Anda ke komputer lokal
```bash
git clone https://github.com/handi425/SpinWheels_Html.git
cd SpinWheels_Html
```

### 2. Setup Development Environment
```bash
# Pastikan Python terinstall (3.6+)
python --version

# Jalankan development server
python server.py

# Atau gunakan alternatif lain
python -m http.server 8000
```

### 3. Buat Branch Baru
```bash
git checkout -b feature/nama-fitur-baru
# atau
git checkout -b fix/nama-bug-yang-diperbaiki
```

### 4. Lakukan Perubahan
- Ikuti coding standards yang ada
- Tulis kode yang clean dan readable
- Tambahkan komentar untuk logika yang kompleks
- Test perubahan Anda secara menyeluruh

### 5. Commit Changes
```bash
git add .
git commit -m "feat: menambahkan fitur baru"
# atau
git commit -m "fix: memperbaiki bug pada sistem koin"
```

### 6. Push dan Create Pull Request
```bash
git push origin feature/nama-fitur-baru
```
Kemudian buat Pull Request di GitHub.

## 🎯 Jenis Kontribusi yang Kami Terima

### 🐛 Bug Reports
- Gunakan template issue yang tersedia
- Sertakan langkah reproduksi yang jelas
- Tambahkan screenshot jika memungkinkan
- Sebutkan browser dan OS yang digunakan

### ✨ Feature Requests
- Jelaskan fitur yang diinginkan dengan detail
- Berikan use case dan alasan mengapa fitur ini berguna
- Diskusikan implementasi yang mungkin

### 🔧 Code Contributions
- **Bug fixes**: Perbaikan bug yang ada
- **New features**: Fitur baru yang berguna
- **Performance improvements**: Optimisasi performa
- **UI/UX improvements**: Perbaikan interface
- **Documentation**: Perbaikan atau penambahan dokumentasi

### 🎨 Design Contributions
- UI/UX improvements
- Icon dan asset design
- Animation improvements
- Color scheme suggestions

## 📝 Coding Standards

### JavaScript
```javascript
// Gunakan ES6+ features
const gameState = {
  coins: 1000,
  level: 1
};

// Arrow functions untuk callbacks
segments.forEach(segment => {
  // Process segment
});

// Async/await untuk operations
async function saveGameData() {
  try {
    await localStorage.setItem('gameData', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save:', error);
  }
}

// Descriptive variable names
const isSpinning = false;
const currentRotation = 0;
```

### CSS
```css
/* Use meaningful class names */
.wheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Mobile-first responsive design */
.game-controls {
  flex-direction: column;
}

@media (min-width: 768px) {
  .game-controls {
    flex-direction: row;
  }
}
```

### HTML
```html
<!-- Semantic HTML -->
<main class="game-container">
  <section class="wheel-section">
    <canvas id="wheelCanvas"></canvas>
  </section>
  
  <section class="controls-section">
    <button type="button" class="spin-button">
      Putar Roda
    </button>
  </section>
</main>
```

## 🧪 Testing Guidelines

### Manual Testing
- Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- Test responsive design di berbagai ukuran layar
- Test keyboard shortcuts
- Test game mechanics (spin, win, bonus)
- Test edge cases (low coins, max level, etc.)

### Performance Testing
- Check loading time
- Monitor memory usage
- Test animation smoothness
- Verify no memory leaks

## 📁 Project Structure

```
SpinWheels/
├── index.html          # Main HTML file
├── server.py           # Development server
├── js/                 # JavaScript modules
│   ├── main.js         # Entry point
│   ├── gameLogic.js    # Core game logic
│   ├── wheel.js        # Wheel rendering
│   ├── ui.js           # UI management
│   └── ...
├── styles/             # CSS modules
│   ├── main.css        # Main styles
│   ├── wheel.css       # Wheel styles
│   └── ...
└── screenshot/         # Game screenshots
```

## 🎮 Game Architecture

### Core Modules
- **main.js**: Entry point dan event listeners
- **gameLogic.js**: Logika permainan dan sistem fair
- **wheel.js**: Rendering roda dengan Canvas
- **ui.js**: Interface dan DOM manipulation
- **gameData.js**: Data management dan localStorage

### Key Concepts
- **Fair System**: Hasil ditentukan oleh posisi arrow yang sebenarnya
- **Modular Design**: Setiap fitur dalam module terpisah
- **Responsive**: Berfungsi di desktop dan mobile
- **Progressive Enhancement**: Fallback untuk fitur yang tidak didukung

## 🚀 Deployment

### Local Development
```bash
# Python server (recommended)
python server.py

# Alternative servers
python -m http.server 8000
npx http-server
php -S localhost:8000
```

### Production Deployment
- Static file hosting (Netlify, Vercel, GitHub Pages)
- No build process required
- All files ready for deployment

## 📋 Pull Request Checklist

- [ ] Code mengikuti style guide yang ada
- [ ] Perubahan telah ditest secara menyeluruh
- [ ] Documentation telah diupdate jika diperlukan
- [ ] Commit messages mengikuti conventional format
- [ ] No breaking changes (kecuali major version)
- [ ] Screenshots disertakan untuk UI changes

## 🎯 Commit Message Format

Gunakan format conventional commits:

```
type(scope): description

feat(wheel): menambahkan animasi bounce pada roda
fix(ui): memperbaiki responsive design pada mobile
docs(readme): menambahkan panduan deployment
style(css): memperbaiki indentasi dan formatting
refactor(logic): mengoptimalkan algoritma deteksi hasil
test(game): menambahkan test untuk sistem bonus
```

### Types:
- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🤔 Butuh Bantuan?

- Buka issue untuk pertanyaan
- Diskusi di GitHub Discussions
- Check existing issues dan PRs
- Baca dokumentasi lengkap di README.md

## 📜 Code of Conduct

- Bersikap hormat dan profesional
- Berikan feedback yang konstruktif
- Bantu newcomers dan jawab pertanyaan
- Focus pada improvement, bukan criticism
- Celebrate contributions dari semua level

Terima kasih telah berkontribusi! 🎉 