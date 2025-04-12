document.addEventListener('DOMContentLoaded', function() {
    // Configure elements and their specific animations
    const animationConfig = [
      { id: 'bg_b1', animationClass: 'bg_1' },
      { id: 'bg_b2', animationClass: 'bg_2' },
      { id: 'bg_b3', animationClass: 'bg_3' }
    ];
  
    animationConfig.forEach(config => {
      const element = document.getElementById(config.id);
      if (!element) return;
  
      // Reset animation
      element.classList.remove(config.animationClass);
      void element.offsetWidth;
  
      // Start animation
      element.classList.add(config.animationClass);
  
      // Cleanup
      element.addEventListener('animationend', () => {
        element.classList.remove(config.animationClass);
      });
    });
  });