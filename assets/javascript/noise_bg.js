document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const OPACITY = 0.15;    // Overall transparency
    const INTENSITY = 0.6;    // Noise strength (0-1)
    const FPS = 24;           // Frames per second

    // Setup canvas
    const container = document.querySelector('.noise-overlay');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let animationFrame;

    // Size management
    function resize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Style canvas
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        opacity: OPACITY,
        width: '100%',
        height: '100%'
    });
    container.appendChild(canvas);

    // Animation loop
    function generateFrame() {
        if (!canvas.width || !canvas.height) return;

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        const baseAlpha = INTENSITY * 255;

        for(let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = data[i+1] = data[i+2] = value;
            data[i+3] = baseAlpha;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Animation control
    let lastTime = 0;
    const interval = 1000 / FPS;
    
    function animate(timestamp) {
        if (timestamp - lastTime >= interval) {
            generateFrame();
            lastTime = timestamp;
        }
        animationFrame = requestAnimationFrame(animate);
    }

    // Start animation
    animate(0);

    // Cleanup
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
    });
});