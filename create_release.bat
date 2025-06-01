@echo off
chcp 65001 >nul
title SpinWheels Release Creator

echo.
echo 🎰 ═══════════════════════════════════════════════════════════════
echo    ███████╗██████╗ ██╗███╗   ██╗██╗    ██╗██╗  ██╗███████╗███████╗██╗     ███████╗
echo    ██╔════╝██╔══██╗██║████╗  ██║██║    ██║██║  ██║██╔════╝██╔════╝██║     ██╔════╝
echo    ███████╗██████╔╝██║██╔██╗ ██║██║ █╗ ██║███████║█████╗  █████╗  ██║     ███████╗
echo    ╚════██║██╔═══╝ ██║██║╚██╗██║██║███╗██║██╔══██║██╔══╝  ██╔══╝  ██║     ╚════██║
echo    ███████║██║     ██║██║ ╚████║╚███╔███╔╝██║  ██║███████╗███████╗███████╗███████║
echo    ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝
echo.                                                                                     
echo                         🎮 RELEASE CREATOR 🎮
echo ═══════════════════════════════════════════════════════════════ 🎰
echo.

echo 🚀 SpinWheels Game Release Creator
echo 📅 %date% %time%
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python tidak terinstall atau tidak ada di PATH
    echo 💡 Silakan install Python dari https://python.org
    echo.
    pause
    exit /b 1
)

echo ✅ Python terdeteksi
echo.

REM Check if release.py exists
if not exist "release.py" (
    echo ❌ File release.py tidak ditemukan
    echo 💡 Pastikan Anda menjalankan script ini di folder SpinWheels
    echo.
    pause
    exit /b 1
)

echo ✅ Release script ditemukan
echo.

echo 🎯 Memulai proses pembuatan rilis...
echo ⏳ Mohon tunggu...
echo.

REM Run the Python release script
python release.py

REM Check if the release was successful
if %errorlevel% equ 0 (
    echo.
    echo 🎉 ═══════════════════════════════════════════════════════════════
    echo    RILIS BERHASIL DIBUAT! 
    echo ═══════════════════════════════════════════════════════════════ 🎉
    echo.
    echo 📦 File rilis telah dibuat dan siap untuk di-deploy
    echo 🌐 Ikuti instruksi deployment yang ditampilkan di atas
    echo.
    echo 💡 LANGKAH SELANJUTNYA:
    echo    1. Upload ke GitHub repository
    echo    2. Deploy ke platform hosting pilihan Anda
    echo    3. Test game di live environment
    echo    4. Share dengan dunia! 🌍
    echo.
) else (
    echo.
    echo 💥 ═══════════════════════════════════════════════════════════════
    echo    RILIS GAGAL!
    echo ═══════════════════════════════════════════════════════════════ 💥
    echo.
    echo ❌ Terjadi error saat membuat rilis
    echo 🔍 Periksa pesan error di atas untuk detail
    echo 💡 Pastikan semua file game ada dan tidak corrupt
    echo.
)

echo.
echo 📋 INFORMASI TAMBAHAN:
echo    - Dokumentasi lengkap: README.md
echo    - Panduan deployment: DEPLOYMENT.md
echo    - Panduan kontribusi: CONTRIBUTING.md
echo.

pause 