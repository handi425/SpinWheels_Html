// Test script untuk memeriksa apakah semua modul dapat dimuat
console.log('=== TESTING SpinWheels MODULE LOADING ===');

// Test loading semua modul
async function testModules() {
    try {
        console.log('Testing config.js...');
        const config = await import('./js/config.js');
        console.log('✓ Config loaded:', config.default);

        console.log('Testing gameData.js...');
        const gameData = await import('./js/gameData.js');
        console.log('✓ GameData loaded');

        console.log('Testing ui.js...');
        const ui = await import('./js/ui.js');
        console.log('✓ UI loaded');

        console.log('Testing wheel.js...');
        const wheel = await import('./js/wheel.js');
        console.log('✓ Wheel loaded');

        console.log('Testing animations.js...');
        const animations = await import('./js/animations.js');
        console.log('✓ Animations loaded');

        console.log('Testing modals.js...');
        const modals = await import('./js/modals.js');
        console.log('✓ Modals loaded');

        console.log('Testing gameLogic.js...');
        const gameLogic = await import('./js/gameLogic.js');
        console.log('✓ GameLogic loaded');

        console.log('Testing bonus.js...');
        const bonus = await import('./js/bonus.js');
        console.log('✓ Bonus loaded');

        console.log('Testing settings.js...');
        const settings = await import('./js/settings.js');
        console.log('✓ Settings loaded');

        console.log('Testing main.js...');
        const main = await import('./js/main.js');
        console.log('✓ Main loaded');

        console.log('=== ALL MODULES LOADED SUCCESSFULLY! ===');

    } catch (error) {
        console.error('❌ Error loading modules:', error);
    }
}

// Jalankan test saat halaman dimuat
window.addEventListener('DOMContentLoaded', testModules);
