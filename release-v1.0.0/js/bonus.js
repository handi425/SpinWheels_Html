import GAME_CONFIG from './config.js';
import { gameData, saveGameData } from './gameData.js';
import { elements, updateUI, showResult, updateDailyBonusButton } from './ui.js';
import { createBurstConfetti } from './animations.js';

// === FUNGSI BONUS HARIAN ===
function claimDailyBonus() {
    const today = new Date().toDateString();

    if (gameData.lastDailyBonus !== today) {
        gameData.coins += GAME_CONFIG.dailyBonus;
        gameData.lastDailyBonus = today;
        updateUI();
        saveGameData();

        // Animasi bonus dengan confetti
        showResult('🎁 Bonus Harian Diklaim!', `+${GAME_CONFIG.dailyBonus} koin telah ditambahkan ke saldo Anda!`);

        // Efek visual dengan confetti
        elements.resultDisplay.classList.add('win-animation');
        createBurstConfetti();

        setTimeout(() => {
            elements.resultDisplay.classList.remove('win-animation');
        }, 600);

        // Update tombol bonus
        updateDailyBonusButton();

    } else {
        showResult('⏰ Sudah Diklaim Hari Ini', 'Kembali lagi besok untuk bonus harian berikutnya!');
    }
}

export { claimDailyBonus };
