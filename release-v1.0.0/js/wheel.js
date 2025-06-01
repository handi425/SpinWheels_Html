import GAME_CONFIG from './config.js';
import { elements } from './ui.js';

// === FUNGSI MENGGAMBAR RODA ===
function drawWheel() {
    console.log('🎨 Starting to draw wheel...');

    if (!elements.canvas) {
        console.error('❌ Canvas element not found!');
        return;
    }

    const ctx = elements.canvas.getContext('2d');
    if (!ctx) {
        console.error('❌ Canvas context not available!');
        return;
    }

    console.log('✅ Canvas and context available');
    console.log('📊 Segments to draw:', GAME_CONFIG.segments.length);
    console.log('📏 Canvas size:', elements.canvas.width, 'x', elements.canvas.height);

    const centerX = elements.canvas.width / 2;
    const centerY = elements.canvas.height / 2;
    const radius = 180;

    // Bersihkan canvas
    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    console.log('🧹 Canvas cleared');

    // Gambar background debug
    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
    ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);
    console.log('🔴 Debug background drawn');

    // Hitung sudut untuk setiap segment
    const totalSegments = GAME_CONFIG.segments.length;
    const anglePerSegment = (Math.PI * 2) / totalSegments;

    console.log(`📐 Angle per segment: ${anglePerSegment} radians`);

    // Gambar setiap segment (kembali ke orientasi asli)
    GAME_CONFIG.segments.forEach((segment, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        console.log(`🎨 Drawing segment ${index}: ${segment.label} (${segment.color})`);

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

        // Gunakan fallback font jika Poppins tidak tersedia
        ctx.font = 'bold 18px Poppins, Arial, sans-serif';
        ctx.fillText(segment.label, radius * 0.7, -5);
        ctx.font = 'bold 14px Poppins, Arial, sans-serif';
        ctx.fillText('🪙', radius * 0.7, 15);
        ctx.restore();
    });

    console.log('✅ All segments drawn');

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
    ctx.font = 'bold 20px Poppins, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎰', centerX, centerY + 8);

    console.log('🎯 Wheel drawing completed successfully!');
}

// Fungsi untuk memaksa redraw wheel
function forceRedrawWheel() {
    console.log('🔄 Force redrawing wheel...');
    setTimeout(() => {
        drawWheel();
    }, 50);
}

// Fungsi untuk menggelapkan warna
function darkenColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export { drawWheel, forceRedrawWheel };
