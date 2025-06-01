// === KONFIGURASI GAME ===
const GAME_CONFIG = {
    spinCost: 50, // Biaya untuk sekali putar
    startingCoins: 1000, // Koin awal pemain
    dailyBonus: 200, // Bonus harian
    // Definisi segment roda dengan probabilitas berdasarkan PRD
    segments: [
        { label: '25', value: 25, color: '#FF6B6B', probability: 0.25 },
        { label: '50', value: 50, color: '#4ECDC4', probability: 0.2 },
        { label: '75', value: 75, color: '#45B7D1', probability: 0.15 },
        { label: '100', value: 100, color: '#96CEB4', probability: 0.15 },
        { label: '150', value: 150, color: '#FFEAA7', probability: 0.1 },
        { label: '250', value: 250, color: '#DDA0DD', probability: 0.08 },
        { label: '500', value: 500, color: '#98D8C8', probability: 0.05 },
        { label: '1000', value: 1000, color: '#FFD700', probability: 0.02 }
    ]
};

export default GAME_CONFIG;
