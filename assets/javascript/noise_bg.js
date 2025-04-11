document.addEventListener('DOMContentLoaded', () => {
    // Configure settings
    const settings = {
        opacity: 0.25,    // Overall overlay transparency (0-1)
        intensity: 0.3,    // Noise strength (0-1)
        updateRate: 30    // Refresh rate in milliseconds
    };

    // Setup canvas overlay
    const noiseOverlay = document.querySelector('.noise-overlay');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Size handling
    function resize() {
        canvas.width = noiseOverlay.offsetWidth;
        canvas.height = noiseOverlay.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Style overlay
    Object.assign(canvas.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: settings.opacity,
        mixBlendMode: 'overlay'  // Try 'screen' or 'multiply' for different effects
    });
    noiseOverlay.appendChild(canvas);

    // Pre-calculate pixel count
    let pixelCount = 0;
    const resizeObserver = new ResizeObserver(() => {
        pixelCount = canvas.width * canvas.height * 4;
    });
    resizeObserver.observe(noiseOverlay);

    // Noise generation
    function generateNoise() {
        if (!pixelCount) return;
        
        const buffer = new Uint8Array(pixelCount);
        const intensity = Math.floor(settings.intensity * 255);
        
        for (let i = 0; i < buffer.length; i += 4) {
            const value = Math.random() < 0.5 ? 0 : intensity;
            buffer[i] = buffer[i + 1] = buffer[i + 2] = value;
            buffer[i + 3] = 255;
        }

        ctx.putImageData(
            new ImageData(new Uint8ClampedArray(buffer), canvas.width, canvas.height),
            0, 0
        );
    }

    // Animation control
    let lastUpdate = 0;
    function animate(timestamp) {
        if (timestamp - lastUpdate >= settings.updateRate) {
            generateNoise();
            lastUpdate = timestamp;
        }
        requestAnimationFrame(animate);
    }
    animate(0);
});