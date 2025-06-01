import { loadGameData } from './gameData.js';
import { elements, updateUI, updateDailyBonusButton, showResult } from './ui.js';
import { drawWheel } from './wheel.js';
import { spinWheel } from './gameLogic.js';
import { claimDailyBonus } from './bonus.js';
import { openModal, closeModal, initModalEvents } from './modals.js';
import { initSettingsEvents, syncSettingsUI } from './settings.js';
import { createConfetti } from './animations.js';
import { gameData, saveGameData } from './gameData.js';

// === EVENT LISTENERS UTAMA ===
function initEventListeners() {
    // Tombol utama game
    elements.spinButton.addEventListener('click', spinWheel);
    elements.dailyBonus.addEventListener('click', claimDailyBonus);
    elements.statsButton.addEventListener('click', () => openModal('statsModal'));
    elements.helpButton.addEventListener('click', () => openModal('helpModal'));
    elements.settingsButton.addEventListener('click', () => openModal('settingsModal'));

    // Tombol debug
    const debugButton = document.getElementById('debugButton');
    if (debugButton) {
        debugButton.addEventListener('click', () => {
            if (window.gameDebug && window.gameDebug.toggleDebugMode) {
                window.gameDebug.toggleDebugMode();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameData.isSpinning) {
            e.preventDefault();
            spinWheel();
        } else if (e.code === 'KeyH') {
            openModal('helpModal');
        } else if (e.code === 'KeyS') {
            openModal('statsModal');
        }
    });

    // Initialize modal dan settings events
    initModalEvents();
    initSettingsEvents();
}

// === INISIALISASI GAME ===
function initGame() {
    console.log('🚀 Initializing game...');

    drawWheel();
    // Load data terlebih dahulu
    loadGameData();

    // Safety check - pastikan tidak ada status spinning yang tertinggal
    if (gameData.isSpinning) {
        console.warn('⚠️ Found leftover spinning status, resetting...');
        gameData.isSpinning = false;
        saveGameData();
    }

    // Update UI
    updateUI();
    updateDailyBonusButton();
    syncSettingsUI();

    console.log('🎮 Game initialized - Status:', {
        coins: gameData.coins,
        level: gameData.level,
        isSpinning: gameData.isSpinning
    });

    // Info sistem fair
    console.log(`
🎯 ===== SISTEM FAIR AKTIF =====
✅ Rotasi benar-benar acak
✅ Hasil berdasarkan posisi arrow
✅ Tidak ada predetermined result
✅ Transparansi penuh
===============================
    `);

    // Selamat datang untuk pemain baru
    if (gameData.totalSpins === 0) {
        setTimeout(() => {
            showResult('🎯 Selamat Datang di SpinWheels!', 'Game menggunakan sistem FAIR - hasil ditentukan oleh posisi arrow! (💡 Tekan H untuk bantuan)');

            // Confetti welcome untuk pemain baru
            if (gameData.confettiEnabled) {
                createConfetti();
            }
        }, 1000);
    }
}

// === FUNGSI GLOBAL UNTUK HTML ===
// Fungsi yang diperlukan oleh event onclick di HTML
window.closeModal = closeModal;

// === MULAI GAME ===
// Mulai game saat halaman dimuat
window.addEventListener('load', () => {
    initGame();
    initEventListeners();
});

// Simpan game sebelum menutup halaman
window.addEventListener('beforeunload', saveGameData);
