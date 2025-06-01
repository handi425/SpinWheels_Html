import GAME_CONFIG from './config.js';

// === VARIABEL GLOBAL DATA GAME ===
let gameData = {
    coins: GAME_CONFIG.startingCoins,
    level: 1,
    totalSpins: 0,
    totalWins: 0,
    totalCoinsWon: 0,
    biggestJackpot: 0,
    maxCoins: GAME_CONFIG.startingCoins,
    lastDailyBonus: null,
    isSpinning: false,
    soundEnabled: true,
    animationSpeed: 'normal',
    confettiEnabled: true
};

// === FUNGSI UTILITAS DATA ===
// Menyimpan data game ke localStorage
function saveGameData() {
    try {
        localStorage.setItem('spinwheels_data', JSON.stringify(gameData));
    } catch (e) {
        console.warn('Tidak dapat menyimpan data game:', e);
    }
}

// Memuat data game dari localStorage
function loadGameData() {
    try {
        const saved = localStorage.getItem('spinwheels_data');
        if (saved) {
            const loadedData = JSON.parse(saved);
            gameData = { ...gameData, ...loadedData };
        }
    } catch (e) {
        console.warn('Tidak dapat memuat data game:', e);
    }
}

// Reset semua data game
function resetGameData() {
    gameData = {
        coins: GAME_CONFIG.startingCoins,
        level: 1,
        totalSpins: 0,
        totalWins: 0,
        totalCoinsWon: 0,
        biggestJackpot: 0,
        maxCoins: GAME_CONFIG.startingCoins,
        lastDailyBonus: null,
        isSpinning: false,
        soundEnabled: true,
        animationSpeed: 'normal',
        confettiEnabled: true
    };
    localStorage.removeItem('spinwheels_data');
}

export { gameData, saveGameData, loadGameData, resetGameData };
