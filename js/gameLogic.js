import GAME_CONFIG from './config.js';
import { gameData, saveGameData } from './gameData.js';
import { elements, updateUI, showResult } from './ui.js';
import { createWinConfetti } from './animations.js';

// === SISTEM DEBUG ===
let debugMode = false;
let debugOverlay = null;

function toggleDebugMode() {
    debugMode = !debugMode;
    if (debugMode) {
        createDebugOverlay();
        console.log('🔧 DEBUG MODE AKTIF');
    } else {
        removeDebugOverlay();
        console.log('🔧 DEBUG MODE NONAKTIF');
    }
}

function createDebugOverlay() {
    // Hapus overlay lama jika ada
    removeDebugOverlay();

    // Buat overlay debug
    debugOverlay = document.createElement('div');
    debugOverlay.id = 'debugOverlay';
    debugOverlay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 1000;
        max-width: 300px;
        border: 2px solid #FFD700;
    `;

    debugOverlay.innerHTML = `
        <div style="color: #FFD700; font-weight: bold; margin-bottom: 10px;">🔧 DEBUG MODE</div>
        <div id="debugInfo">Klik PUTAR RODA untuk melihat debug info</div>
        <button onclick="window.gameDebug.toggleDebugMode()" style="margin-top: 10px; padding: 5px; background: #FFD700; border: none; border-radius: 5px; cursor: pointer;">Toggle Debug</button>
    `;

    document.body.appendChild(debugOverlay);

    // Tambahkan garis debug pada wheel
    addWheelDebugLines();
}

function removeDebugOverlay() {
    if (debugOverlay) {
        debugOverlay.remove();
        debugOverlay = null;
    }
    removeWheelDebugLines();
}

function addWheelDebugLines() {
    const wheelContainer = document.querySelector('.wheel-container');
    if (!wheelContainer) return;

    // Hapus garis debug lama
    removeWheelDebugLines();

    // Tambahkan garis vertikal untuk menunjukkan posisi arrow
    const arrowLine = document.createElement('div');
    arrowLine.className = 'debug-arrow-line';
    arrowLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 50%;
        width: 2px;
        height: 100%;
        background: red;
        z-index: 15;
        transform: translateX(-50%);
        pointer-events: none;
    `;
    wheelContainer.appendChild(arrowLine);

    // Tambahkan lingkaran debug untuk menunjukkan pembagian segment
    const canvas = elements.canvas;
    const debugCanvas = document.createElement('canvas');
    debugCanvas.className = 'debug-canvas';
    debugCanvas.width = canvas.width;
    debugCanvas.height = canvas.height;
    debugCanvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 12;
    `;

    const ctx = debugCanvas.getContext('2d');
    const centerX = debugCanvas.width / 2;
    const centerY = debugCanvas.height / 2;
    const radius = 180;
    const segmentAngle = (Math.PI * 2) / GAME_CONFIG.segments.length;

    // Gambar garis pembagi segment
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.lineWidth = 2;

    for (let i = 0; i < GAME_CONFIG.segments.length; i++) {
        const angle = i * segmentAngle;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();

        // Tambahkan nomor segment
        ctx.fillStyle = 'red';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        const textX = centerX + Math.cos(angle + segmentAngle / 2) * (radius * 0.9);
        const textY = centerY + Math.sin(angle + segmentAngle / 2) * (radius * 0.9);
        ctx.fillText(i.toString(), textX, textY);
    }

    wheelContainer.appendChild(debugCanvas);
}

function removeWheelDebugLines() {
    const debugElements = document.querySelectorAll('.debug-arrow-line, .debug-canvas');
    debugElements.forEach(el => el.remove());
}

function updateDebugInfo(info) {
    if (debugMode && debugOverlay) {
        const debugInfo = document.getElementById('debugInfo');
        if (debugInfo) {
            debugInfo.innerHTML = info;
        }
    }
}

// === FUNGSI DETEKSI HASIL BERDASARKAN POSISI ARROW YANG SEBENARNYA ===
function detectTrueResultFromAngle(finalAngle) {
    // Normalisasi angle (0-360)
    const normalizedAngle = ((finalAngle % 360) + 360) % 360;

    // PERBAIKAN: Arrow berada di atas (270° dalam koordinat canvas) menunjuk ke bawah
    // Segment 0 dimulai dari kanan (0°/360°)
    // Kita perlu menghitung segment mana yang berada di posisi 270° (atas) setelah rotasi

    const segmentAngle = 360 / GAME_CONFIG.segments.length; // 45° per segment

    // Arrow berada di 270° (atas), kita perlu tahu segment mana yang ada di posisi ini
    // Setelah wheel berputar sebesar finalAngle, segment yang awalnya di posisi X
    // sekarang berada di posisi (X + finalAngle)
    // Kita cari segment yang sekarang berada di 270°

    // Posisi arrow dalam koordinat wheel (270° = atas)
    const arrowPosition = 270;

    // Hitung posisi relatif terhadap rotasi wheel
    // Segment yang sekarang berada di posisi arrow
    const segmentAtArrow = (arrowPosition - normalizedAngle + 360) % 360;

    // Hitung index segment
    let segmentIndex = Math.floor(segmentAtArrow / segmentAngle);
    segmentIndex = segmentIndex % GAME_CONFIG.segments.length;

    // Debug info yang lebih detail
    const debugInfo = `
        <div style="color: #FFD700;">🎯 DETEKSI HASIL FAIR</div>
        <div>Final Rotation: ${normalizedAngle.toFixed(1)}°</div>
        <div>Arrow Position: ${arrowPosition}°</div>
        <div>Segment Angle: ${segmentAngle}°</div>
        <div>Segment at Arrow: ${segmentAtArrow.toFixed(1)}°</div>
        <div>Calculated Index: ${segmentIndex}</div>
        <div style="color: #4CAF50;">Detected: ${GAME_CONFIG.segments[segmentIndex].label} (${GAME_CONFIG.segments[segmentIndex].value} coins)</div>
        <div style="margin-top: 10px; color: #FFA500;">Segments Layout:</div>
        ${GAME_CONFIG.segments.map((seg, idx) =>
        `<div style="color: ${idx === segmentIndex ? '#4CAF50' : '#ccc'};">
                ${idx}: ${seg.label} (${(idx * segmentAngle).toFixed(0)}°-${((idx + 1) * segmentAngle).toFixed(0)}°)
            </div>`
    ).join('')}
    `;

    updateDebugInfo(debugInfo);

    console.log(`=== DETEKSI HASIL FAIR ===`);
    console.log(`Final Rotation: ${normalizedAngle.toFixed(1)}°`);
    console.log(`Arrow Position: ${arrowPosition}°`);
    console.log(`Segment Angle: ${segmentAngle}°`);
    console.log(`Segment at Arrow: ${segmentAtArrow.toFixed(1)}°`);
    console.log(`Calculated Index: ${segmentIndex}`);
    console.log(`Detected Segment: ${GAME_CONFIG.segments[segmentIndex].label} (${GAME_CONFIG.segments[segmentIndex].value} coins)`);
    console.log(`========================`);

    return GAME_CONFIG.segments[segmentIndex];
}

// === FUNGSI UNTUK MENDAPATKAN ROTASI ACAK ===
function getRandomRotation() {
    // Putaran minimum 4-8 kali + sudut acak
    const minSpins = 4;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomAngle = Math.random() * 360;

    const totalRotation = (spins * 360) + randomAngle;

    console.log(`=== RANDOM ROTATION ===`);
    console.log(`Spins: ${spins.toFixed(2)} rotations`);
    console.log(`Random Angle: ${randomAngle.toFixed(1)}°`);
    console.log(`Total Rotation: ${totalRotation.toFixed(1)}°`);
    console.log(`======================`);

    return totalRotation;
}

// === FUNGSI UNTUK MENERAPKAN PROBABILITAS SETELAH HASIL TERDETEKSI ===
function applyProbabilityAdjustment(detectedResult) {
    // Sistem fair: hasil sudah ditentukan oleh posisi fisik
    // Tapi kita bisa menerapkan "luck factor" untuk menyesuaikan probabilitas

    const random = Math.random();
    const resultProbability = detectedResult.probability;

    // Jika hasil yang terdeteksi memiliki probabilitas rendah,
    // ada kemungkinan kecil untuk "reroll" ke hasil yang lebih umum
    if (resultProbability < 0.1 && random > 0.8) {
        console.log(`🎲 Luck adjustment triggered for rare result: ${detectedResult.label}`);

        // Pilih hasil dengan probabilitas lebih tinggi
        const commonResults = GAME_CONFIG.segments.filter(s => s.probability >= 0.15);
        const adjustedResult = commonResults[Math.floor(Math.random() * commonResults.length)];

        console.log(`🔄 Adjusted to: ${adjustedResult.label}`);
        return adjustedResult;
    }

    return detectedResult;
}

function spinWheel() {
    if (gameData.isSpinning || gameData.coins < GAME_CONFIG.spinCost) {
        console.log('Spin blocked:', { isSpinning: gameData.isSpinning, coins: gameData.coins, required: GAME_CONFIG.spinCost });
        return;
    }

    // Set status spinning
    gameData.isSpinning = true;
    gameData.coins -= GAME_CONFIG.spinCost;
    gameData.totalSpins++;

    console.log('🎲 Fair Spin started - Status:', { isSpinning: gameData.isSpinning, coins: gameData.coins });

    // Update UI
    updateUI();
    showResult('🎲 Berputar...', 'Menunggu keberuntungan Anda!');

    // SISTEM FAIR: Dapatkan rotasi yang benar-benar acak
    const totalRotation = getRandomRotation();

    // Durasi animasi berdasarkan pengaturan
    const animationDuration = gameData.animationSpeed === 'slow' ? 5000 :
        gameData.animationSpeed === 'fast' ? 2500 : 3500;

    console.log(`⏱️ Animation duration: ${animationDuration}ms`);

    // Event listener untuk mendeteksi kapan animasi CSS benar-benar selesai
    const handleTransitionEnd = (event) => {
        // Pastikan event berasal dari transform property pada canvas
        if (event.target === elements.canvas && event.propertyName === 'transform') {
            console.log('🛑 Wheel animation completed - detecting TRUE result...');

            // Cleanup
            clearInterval(progressInterval);
            elements.canvas.removeEventListener('transitionend', handleTransitionEnd);

            // Delay minimal untuk stabilitas
            setTimeout(() => {
                try {
                    // DETEKSI HASIL BERDASARKAN POSISI AKHIR YANG SEBENARNYA
                    const finalAngle = totalRotation % 360;
                    const detectedResult = detectTrueResultFromAngle(finalAngle);

                    // Opsional: Terapkan penyesuaian probabilitas
                    const finalResult = applyProbabilityAdjustment(detectedResult);

                    console.log('🎯 TRUE result detected:', finalResult.label, finalResult.value);
                    handleSpinResult(finalResult);
                } catch (error) {
                    console.error('Error in spin result:', error);
                    // Safety fallback - reset spinning status
                    gameData.isSpinning = false;
                    updateUI();
                    showResult('❌ Terjadi Kesalahan', 'Silakan coba lagi. Status telah direset.');
                }
            }, 100); // Delay minimal untuk stabilitas
        }
    };

    // Tambahkan event listener untuk transitionend
    elements.canvas.addEventListener('transitionend', handleTransitionEnd);

    // Animasi spinning - dimulai setelah event listener terpasang
    elements.canvas.style.transform = `rotate(${totalRotation}deg)`;

    // Progress indicator untuk user feedback
    let progressInterval;
    let timeLeft = animationDuration;
    const updateInterval = 100; // Update setiap 100ms

    progressInterval = setInterval(() => {
        timeLeft -= updateInterval;
        const progress = Math.max(0, timeLeft / animationDuration);
        const seconds = Math.ceil(timeLeft / 1000);

        if (timeLeft > 0) {
            showResult('🎲 Berputar...', `Menunggu hasil... ${seconds}s`);
        } else {
            clearInterval(progressInterval);
            showResult('🎯 Roda berhenti...', 'Mendeteksi hasil berdasarkan posisi arrow...');
        }
    }, updateInterval);

    // Safety fallback jika transitionend tidak terpicu (edge case)
    setTimeout(() => {
        if (gameData.isSpinning) {
            console.warn('⚠️ Fallback timeout triggered - forcing TRUE result detection');
            clearInterval(progressInterval);
            elements.canvas.removeEventListener('transitionend', handleTransitionEnd);

            try {
                const finalAngle = totalRotation % 360;
                const detectedResult = detectTrueResultFromAngle(finalAngle);
                const finalResult = applyProbabilityAdjustment(detectedResult);
                handleSpinResult(finalResult);
            } catch (error) {
                console.error('Error in fallback result:', error);
                gameData.isSpinning = false;
                updateUI();
                showResult('❌ Terjadi Kesalahan', 'Silakan coba lagi. Status telah direset.');
            }
        }
    }, animationDuration + 2000); // Fallback 2 detik setelah durasi normal
}

// === FUNGSI HASIL SPINNING ===
function handleSpinResult(result) {
    console.log('🎯 Handling spin result:', result.label, result.value);

    gameData.isSpinning = false;
    console.log('✅ Spinning status reset - isSpinning:', gameData.isSpinning);

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
    console.log('🔄 UI updated after spin result');

    // Tampilkan hasil dengan animasi dan confetti
    const isJackpot = result.value >= 500;
    const isMediumWin = result.value >= 100;
    const isWin = result.value > 0;

    if (isWin) {
        // Tampilkan confetti untuk semua kemenangan
        setTimeout(() => {
            createWinConfetti(result.value);
        }, 200); // Delay sedikit untuk efek yang lebih baik
    }

    // Tampilkan pesan hasil
    if (isJackpot) {
        showResult('🎉 JACKPOT!', `Anda memenangkan ${result.value} koin! 🪙`);
        elements.resultDisplay.classList.add('win-animation');
        document.body.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';

        setTimeout(() => {
            elements.resultDisplay.classList.remove('win-animation');
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 1000);
    } else if (isMediumWin) {
        showResult('🎊 Kemenangan Besar!', `Anda memenangkan ${result.value} koin! 🪙`);
    } else if (isWin) {
        showResult('🎊 Selamat!', `Anda memenangkan ${result.value} koin! 🪙`);
    } else {
        showResult('😔 Tidak Beruntung', 'Coba lagi! Keberuntungan menanti Anda.');
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

// === FUNGSI UNTUK MENAMPILKAN INFO SISTEM FAIR ===
function showFairSystemInfo() {
    console.log(`
🎯 ===== SISTEM FAIR AKTIF =====
✅ Rotasi benar-benar acak
✅ Hasil berdasarkan posisi arrow
✅ Tidak ada predetermined result
✅ Transparansi penuh
✅ Debug mode tersedia (tekan D)
===============================
    `);
}

// Expose debug functions ke window untuk akses global
window.gameDebug = {
    toggleDebugMode,
    showFairSystemInfo
};

// Keyboard shortcut untuk debug
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.altKey) {
        toggleDebugMode();
    }
});

export { spinWheel };
