import { gameData, saveGameData, resetGameData } from './gameData.js';
import { openModal, closeModal } from './modals.js';
import { showResult } from './ui.js';

// === EVENT LISTENERS UNTUK PENGATURAN ===
function initSettingsEvents() {
    // Toggle sound
    document.getElementById('soundToggle').addEventListener('change', function () {
        gameData.soundEnabled = this.checked;
        saveGameData();
    });

    // Toggle confetti
    document.getElementById('confettiToggle').addEventListener('change', function () {
        gameData.confettiEnabled = this.checked;
        saveGameData();
    });

    // Speed selector
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Update game data
            gameData.animationSpeed = this.getAttribute('data-speed');
            saveGameData();
        });
    });

    // Reset game button
    document.getElementById('resetGameBtn').addEventListener('click', function () {
        openModal('confirmModal');
    });

    // Confirm reset buttons
    document.getElementById('confirmYes').addEventListener('click', function () {
        resetGameData();
        closeModal('confirmModal');
        closeModal('settingsModal');

        // Tampilkan pesan konfirmasi
        showResult('🔄 Game Direset!', 'Semua data telah dihapus. Halaman akan dimuat ulang...');

        setTimeout(() => {
            location.reload();
        }, 2000);
    });

    document.getElementById('confirmNo').addEventListener('click', function () {
        closeModal('confirmModal');
    });
}

// Sinkronisasi UI pengaturan dengan data tersimpan
function syncSettingsUI() {
    document.getElementById('soundToggle').checked = gameData.soundEnabled;
    document.getElementById('confettiToggle').checked = gameData.confettiEnabled;

    // Set active speed button
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-speed') === gameData.animationSpeed) {
            btn.classList.add('active');
        }
    });
}

export { initSettingsEvents, syncSettingsUI };
