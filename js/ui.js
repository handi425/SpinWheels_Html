import { gameData } from './gameData.js';
import GAME_CONFIG from './config.js';

// === ELEMEN DOM ===
const elements = {
    canvas: document.getElementById('wheelCanvas'),
    spinButton: document.getElementById('spinButton'),
    coinAmount: document.getElementById('coinAmount'),
    playerLevel: document.getElementById('playerLevel'),
    resultTitle: document.getElementById('resultTitle'),
    resultDescription: document.getElementById('resultDescription'),
    resultDisplay: document.getElementById('resultDisplay'),
    dailyBonus: document.getElementById('dailyBonus'),
    statsButton: document.getElementById('statsButton'),
    settingsButton: document.getElementById('settingsButton'),
    helpButton: document.getElementById('helpButton')
};

// === FUNGSI UTILITAS UI ===
// Memperbarui tampilan UI dengan data terbaru
function updateUI() {
    elements.coinAmount.textContent = gameData.coins.toLocaleString();
    elements.playerLevel.textContent = gameData.level;

    // Update tombol spin berdasarkan kondisi
    updateSpinButton();

    // Update statistik di modal
    updateStatsDisplay();
}

// Update tombol spin berdasarkan kondisi game
function updateSpinButton() {
    if (gameData.isSpinning) {
        elements.spinButton.disabled = true;
        elements.spinButton.innerHTML = `
            <span class="button-text spinning-text">
                <span class="spinner">⚡</span>
                BERPUTAR...
            </span>
            <span class="button-cost">Tunggu sebentar...</span>
        `;
        elements.spinButton.classList.add('spinning');
    } else if (gameData.coins < GAME_CONFIG.spinCost) {
        elements.spinButton.disabled = true;
        elements.spinButton.innerHTML = '<span class="button-text">KOIN TIDAK CUKUP</span>';
        elements.spinButton.classList.remove('spinning');
    } else {
        elements.spinButton.disabled = false;
        elements.spinButton.innerHTML = `
            <span class="button-text">PUTAR RODA</span>
            <span class="button-cost">(-${GAME_CONFIG.spinCost} 🪙)</span>
        `;
        elements.spinButton.classList.remove('spinning');
    }
}

// Update tampilan statistik di modal
function updateStatsDisplay() {
    document.getElementById('totalSpins').textContent = gameData.totalSpins;
    document.getElementById('totalWins').textContent = gameData.totalWins;
    document.getElementById('maxCoins').textContent = gameData.maxCoins.toLocaleString();
    document.getElementById('totalCoinsWon').textContent = gameData.totalCoinsWon.toLocaleString();
    document.getElementById('biggestJackpot').textContent = gameData.biggestJackpot.toLocaleString();

    const winRate = gameData.totalSpins > 0 ?
        ((gameData.totalWins / gameData.totalSpins) * 100).toFixed(1) : 0;
    document.getElementById('winRate').textContent = winRate + '%';
}

// Update status bonus harian
function updateDailyBonusButton() {
    const today = new Date().toDateString();
    if (gameData.lastDailyBonus !== today) {
        elements.dailyBonus.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        elements.dailyBonus.innerHTML = '🎁 Bonus Tersedia!';
    } else {
        elements.dailyBonus.style.background = 'rgba(255, 255, 255, 0.2)';
        elements.dailyBonus.innerHTML = '⏰ Besok Lagi';
    }
}

// Tampilkan pesan di area result
function showResult(title, description) {
    elements.resultTitle.textContent = title;
    elements.resultDescription.textContent = description;
}

export { elements, updateUI, updateSpinButton, updateStatsDisplay, updateDailyBonusButton, showResult };
