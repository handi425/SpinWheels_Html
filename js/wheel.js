import GAME_CONFIG from './config.js';
import { elements } from './ui.js';

// === FUNGSI MENGGAMBAR RODA ===
function drawWheel() {
    const ctx = elements.canvas.getContext('2d');
    const centerX = elements.canvas.width / 2;
    const centerY = elements.canvas.height / 2;
    const radius = 180;

    // Bersihkan canvas
    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);

    // Hitung sudut untuk setiap segment
    const totalSegments = GAME_CONFIG.segments.length;
    const anglePerSegment = (Math.PI * 2) / totalSegments;

    // Gambar setiap segment (kembali ke orientasi asli)
    GAME_CONFIG.segments.forEach((segment, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        // Gambar segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        // Warna segment dengan gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, segment.color);
        gradient.addColorStop(1, darkenColor(segment.color, 20));

        ctx.fillStyle = gradient;
        ctx.fill();

        // Border segment
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Teks pada segment
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 18px Poppins';
        ctx.fillText(segment.label, radius * 0.7, -5);
        ctx.font = 'bold 14px Poppins';
        ctx.fillText('🪙', radius * 0.7, 15);
        ctx.restore();
    });

    // Gambar lingkaran tengah dengan gradient
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
    centerGradient.addColorStop(0, '#444');
    centerGradient.addColorStop(1, '#222');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Logo di tengah
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 20px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('🎰', centerX, centerY + 8);
}

// Fungsi untuk menggelapkan warna
function darkenColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export { drawWheel };
