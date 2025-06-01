import GAME_CONFIG from './config.js';
import { gameData, saveGameData } from './gameData.js';
import { elements, updateUI, showResult } from './ui.js';
import { createBurstConfetti } from './animations.js';

// === FUNGSI SPINNING LOGIC ===
function getRandomResult() {
    const random = Math.random();
    let cumulative = 0;

    for (let segment of GAME_CONFIG.segments) {
        cumulative += segment.probability;
        if (random <= cumulative) {
            return segment;
        }
    }

    // Fallback ke segment pertama
    return GAME_CONFIG.segments[0];
}

function spinWheel() {
    if (gameData.isSpinning || gameData.coins < GAME_CONFIG.spinCost) {
        return;
    }

    // Set status spinning
    gameData.isSpinning = true;
    gameData.coins -= GAME_CONFIG.spinCost;
    gameData.totalSpins++;

    // Update UI
    updateUI();
    showResult('🎲 Berputar...', 'Menunggu keberuntungan Anda!');

    // Tentukan hasil
    const result = getRandomResult();
    const segmentIndex = GAME_CONFIG.segments.indexOf(result);
    const segmentAngle = 360 / GAME_CONFIG.segments.length;

    // Kalkulasi sudut target yang benar
    // Sekarang segment sudah sejajar dengan panah, jadi kalkulasi lebih sederhana
    // Untuk segment index N, kita perlu rotasi agar segment tersebut berada di atas
    const targetAngle = -(segmentIndex * segmentAngle);

    // Hitung rotasi total (beberapa putaran penuh + target)
    const spins = 4 + Math.random() * 4; // 4-8 putaran penuh
    const totalRotation = (spins * 360) + targetAngle;

    // Animasi spinning
    elements.canvas.style.transform = `rotate(${totalRotation}deg)`;

    // Durasi animasi berdasarkan pengaturan
    const animationDuration = gameData.animationSpeed === 'slow' ? 5000 :
        gameData.animationSpeed === 'fast' ? 2500 : 3500;

    // Setelah animasi selesai
    setTimeout(() => {
        handleSpinResult(result);
    }, animationDuration);
}

// === FUNGSI HASIL SPINNING ===
function handleSpinResult(result) {
    gameData.isSpinning = false;

    // Tambah koin kemenangan
    if (result.value > 0) {
        gameData.coins += result.value;
        gameData.totalWins++;
        gameData.totalCoinsWon += result.value;

        // Update jackpot terbesar
        if (result.value > gameData.biggestJackpot) {
            gameData.biggestJackpot = result.value;
        }
    }

    // Update koin maksimum
    if (gameData.coins > gameData.maxCoins) {
        gameData.maxCoins = gameData.coins;
    }

    // Update level berdasarkan total spin
    gameData.level = Math.floor(gameData.totalSpins / 10) + 1;

    // Update UI
    updateUI();

    // Tampilkan hasil dengan animasi
    const isJackpot = result.value >= 500;
    showResult(
        isJackpot ? '🎉 JACKPOT!' : '🎊 Selamat!',
        `Anda memenangkan ${result.value} koin! 🪙`
    );

    // Efek visual untuk kemenangan besar
    if (isJackpot) {
        elements.resultDisplay.classList.add('win-animation');
        document.body.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        createBurstConfetti();

        setTimeout(() => {
            elements.resultDisplay.classList.remove('win-animation');
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 1000);
    }

    // Simpan progress
    saveGameData();

    // Pesan motivasi
    setTimeout(() => {
        if (gameData.coins < GAME_CONFIG.spinCost) {
            showResult('💰 Koin Habis!', 'Klaim bonus harian atau reset game untuk melanjutkan.');
        } else {
            showResult('🎯 Siap untuk putaran berikutnya?', 'Klik tombol di bawah untuk memutar roda lagi!');
        }
    }, 3000);
}

export { spinWheel };
