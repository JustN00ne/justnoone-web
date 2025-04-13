// JavaScript
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
      const loadingScreen = document.querySelector('.loading-screen');
      
      setTimeout(() => {
          loadingScreen.classList.add('fade-out');
          
          loadingScreen.addEventListener('transitionend', () => {
              loadingScreen.remove();
              
              // Get backdrop elements
              const bg1 = document.getElementById('bg_b1');
              const bg2 = document.getElementById('bg_b2');
              const bg3 = document.getElementById('bg_b3');
              const mouse = document.getElementsByClassName('mouse_follow')[0];
              
              // Show elements
              [bg1, bg2, bg3, mouse].forEach(el => el.style.display = 'block');
              
              // Trigger animations
              bg1.classList.add('animate-bg-1');
              bg2.classList.add('animate-bg-2');
              bg3.classList.add('animate-bg-3');
              mouse.classList.add('animate-mouse');
          });
      }, 1500);
  });
});