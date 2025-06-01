import { gameData } from './gameData.js';

// === FUNGSI CONFETTI ===
function createConfetti() {
    if (!gameData.confettiEnabled) return;

    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';

        // Bentuk confetti yang bervariasi
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '2px';
            confetti.style.width = '6px';
            confetti.style.height = '15px';
        }

        document.body.appendChild(confetti);

        // Hapus confetti setelah animasi selesai
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Confetti dengan efek burst dari tengah
function createBurstConfetti() {
    if (!gameData.confettiEnabled) return;

    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = center.x + 'px';
        confetti.style.top = center.y + 'px';
        confetti.style.position = 'fixed';

        const angle = (i / 30) * Math.PI * 2;
        const velocity = 3 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        confetti.style.animation = 'none';
        document.body.appendChild(confetti);

        // Animasi manual untuk burst effect
        let x = center.x;
        let y = center.y;
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy + 0.5; // gravitasi
            opacity -= 0.02;

            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${x * 2}deg)`;

            if (opacity > 0 && y < window.innerHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }
        };

        setTimeout(() => requestAnimationFrame(animate), i * 20);
    }
}

export { createConfetti, createBurstConfetti };
