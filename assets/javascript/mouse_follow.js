class mouse_follow {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'mouse_follow';
        document.body.appendChild(this.element);
        
        // Positions
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        // Adjust smoothness (0.1 = fast, 0.9 = slow)
        this.smoothness = 0.1;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });
        
        this.animate();
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    animate() {
        const update = () => {
            // Smooth interpolation
            this.currentX = this.lerp(this.currentX, this.targetX, this.smoothness);
            this.currentY = this.lerp(this.currentY, this.targetY, this.smoothness);
            
            // Apply position with transform to maintain perfect centering
            this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(update);
        };
        update();
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    new mouse_follow();
});