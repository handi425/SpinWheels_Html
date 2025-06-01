import GAME_CONFIG from './config.js';
import { gameData, saveGameData } from './gameData.js';
import { elements, updateUI, showResult } from './ui.js';
import { createBurstConfetti } from './animations.js';

// === FUNGSI DETEKSI HASIL BERDASARKAN POSISI RODA ===
function detectResultFromAngle(finalAngle) {
    // Normalisasi angle (0-360)
    const normalizedAngle = ((finalAngle % 360) + 360) % 360;

    // Panah berada di atas (270° dalam koordinat roda)
    // Hitung sudut relatif dari panah
    const angleFromTop = (normalizedAngle + 90) % 360; // Konversi ke koordinat dengan top = 0°

    // Setiap segment = 45°, hitung index segment
    const segmentAngle = 360 / GAME_CONFIG.segments.length;
    let segmentIndex = Math.floor(angleFromTop / segmentAngle);

    // Pastikan index dalam range yang valid
    segmentIndex = segmentIndex % GAME_CONFIG.segments.length;

    // Debug log yang lebih jelas
    console.log(`=== DETEKSI HASIL ===`);
    console.log(`Final Angle: ${normalizedAngle.toFixed(1)}°`);
    console.log(`Angle from Top: ${angleFromTop.toFixed(1)}°`);
    console.log(`Segment Index: ${segmentIndex}`);
    console.log(`Detected: ${GAME_CONFIG.segments[segmentIndex].label} (${GAME_CONFIG.segments[segmentIndex].value} coins)`);
    console.log(`==================`);

    return GAME_CONFIG.segments[segmentIndex];
}

// === FUNGSI RANDOM DENGAN PROBABILITAS ===
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

    // Tentukan hasil berdasarkan probabilitas
    const targetResult = getRandomResult();
    const targetIndex = GAME_CONFIG.segments.indexOf(targetResult);

    // Hitung angle yang diperlukan untuk membawa segment target ke panah
    const segmentAngle = 360 / GAME_CONFIG.segments.length;
    const segmentCenterAngle = targetIndex * segmentAngle + (segmentAngle / 2);

    // Target angle untuk membawa segment ke top (panah)
    const targetAngle = 360 - segmentCenterAngle - 90; // -90 untuk offset panah

    // Tambahkan putaran penuh dan sedikit randomness
    const spins = 4 + Math.random() * 4;
    const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.6);
    const totalRotation = (spins * 360) + targetAngle + randomOffset;

    console.log(`=== TARGET ===`);
    console.log(`Target: ${targetResult.label} (Index: ${targetIndex})`);
    console.log(`Target Angle: ${targetAngle.toFixed(1)}°`);
    console.log(`Total Rotation: ${totalRotation.toFixed(1)}°`);
    console.log(`==============`);

    // Animasi spinning
    elements.canvas.style.transform = `rotate(${totalRotation}deg)`;

    // Durasi animasi berdasarkan pengaturan
    const animationDuration = gameData.animationSpeed === 'slow' ? 5000 :
        gameData.animationSpeed === 'fast' ? 2500 : 3500;

    // Setelah animasi selesai, deteksi hasil berdasarkan posisi akhir
    setTimeout(() => {
        const finalAngle = totalRotation % 360;
        const result = detectResultFromAngle(finalAngle);
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
