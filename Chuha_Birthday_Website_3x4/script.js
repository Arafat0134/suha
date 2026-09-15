function celebrate() {
    // Create confetti
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        createConfetti();
    }
    
    // Trigger animation
    playSound();
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    
    // Animation
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 3 + 2;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            confetti.remove();
            return;
        }
        
        const top = window.innerHeight * progress;
        const rotation = progress * 360;
        
        confetti.style.transform = `translateY(${top}px) rotate(${rotation}deg)`;
        confetti.style.opacity = 1 - progress;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcf7f', '#c984ff', '#ff8c42', '#95e1d3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        celebrate();
    }
});
