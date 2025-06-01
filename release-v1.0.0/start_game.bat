@echo off
title SpinWheels Game Server
echo.
echo ========================================
echo    🎰 SpinWheels Game Server
echo ========================================
echo.
echo Memulai server HTTP untuk game...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python tidak ditemukan!
    echo 💡 Silakan install Python terlebih dahulu dari https://python.org
    echo.
    pause
    exit /b 1
)

echo ✅ Python ditemukan
echo 🚀 Memulai server...
echo.
echo 📍 Game akan terbuka di: http://localhost:8000
echo ⏹️  Tekan Ctrl+C untuk menghentikan server
echo 🔄 Tutup window ini untuk menghentikan server
echo.

REM Start the server
python server.py

echo.
echo 🛑 Server dihentikan
pause 