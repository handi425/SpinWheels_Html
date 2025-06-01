# 🔒 Security Policy

## 🛡️ Supported Versions

Kami mendukung versi terbaru dari SpinWheels Game dengan update keamanan:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🚨 Reporting a Vulnerability

Jika Anda menemukan kerentanan keamanan dalam SpinWheels Game, kami sangat menghargai laporan Anda. Silakan ikuti langkah-langkah berikut:

### 📧 Cara Melaporkan

1. **Jangan** membuat public issue untuk kerentanan keamanan
2. Kirim email ke: **security@spinwheels-game.com** (atau buat private issue)
3. Sertakan informasi berikut:
   - Deskripsi detail tentang kerentanan
   - Langkah-langkah untuk mereproduksi masalah
   - Dampak potensial dari kerentanan
   - Saran perbaikan jika ada

### 📋 Template Laporan

```
Subject: [SECURITY] Kerentanan pada SpinWheels Game

**Deskripsi Kerentanan:**
[Jelaskan kerentanan yang ditemukan]

**Langkah Reproduksi:**
1. [Langkah 1]
2. [Langkah 2]
3. [Langkah 3]

**Dampak:**
[Jelaskan dampak potensial]

**Environment:**
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/macOS/Linux]
- Version: [Versi game]

**Saran Perbaikan:**
[Jika ada saran]
```

### ⏱️ Response Timeline

- **24 jam**: Konfirmasi penerimaan laporan
- **72 jam**: Penilaian awal dan klasifikasi severity
- **7 hari**: Update progress investigasi
- **30 hari**: Target resolusi untuk high/critical issues

### 🏆 Recognition

Kami menghargai security researchers yang bertanggung jawab:

- Credit dalam CHANGELOG untuk kontribusi keamanan
- Mention dalam hall of fame (jika tersedia)
- Koordinasi disclosure timeline yang bertanggung jawab

## 🔐 Security Considerations

### Client-Side Security

SpinWheels adalah game client-side dengan pertimbangan keamanan berikut:

#### ✅ What We Protect
- **Data Integrity**: Game state tersimpan secara lokal
- **Fair Play**: Sistem random yang tidak dapat dimanipulasi
- **User Privacy**: Tidak ada data personal yang dikumpulkan
- **XSS Prevention**: Input sanitization dan CSP headers

#### ⚠️ Known Limitations
- **Local Storage**: Data game dapat dimodifikasi oleh user
- **Client-Side Logic**: Game logic dapat di-inspect di browser
- **No Server Validation**: Tidak ada validasi server-side

### 🛡️ Security Features

#### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

#### Input Sanitization
- Semua user input di-sanitize
- No eval() atau dangerous functions
- Proper event handling

#### Secure Coding Practices
- ES6 modules untuk encapsulation
- No global variables yang sensitive
- Proper error handling
- No hardcoded secrets

## 🚫 Out of Scope

Hal-hal berikut **tidak** dianggap sebagai kerentanan keamanan:

### Expected Behavior
- User dapat memodifikasi local storage (by design)
- Game logic dapat di-inspect (client-side game)
- User dapat menggunakan browser dev tools
- Offline functionality

### Not Security Issues
- UI/UX bugs yang tidak mempengaruhi keamanan
- Performance issues
- Browser compatibility issues
- Feature requests

## 🔧 Security Best Practices untuk Users

### Untuk Pemain
- Gunakan browser yang up-to-date
- Aktifkan auto-update browser
- Jangan install extension yang mencurigakan
- Main di environment yang aman

### Untuk Developers
- Review kode secara regular
- Gunakan linter dan security tools
- Follow secure coding guidelines
- Update dependencies secara berkala

## 📚 Security Resources

### Referensi
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Tools
- Browser Developer Tools
- ESLint security rules
- npm audit (jika menggunakan dependencies)

## 📞 Contact

Untuk pertanyaan keamanan non-urgent:
- GitHub Issues (untuk diskusi umum)
- Email: security@spinwheels-game.com
- GitHub Security Advisories

---

**Terima kasih telah membantu menjaga SpinWheels Game tetap aman!** 🙏 