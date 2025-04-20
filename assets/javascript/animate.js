document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) {
        console.error('Loading screen element not found');
        return;
    }

    const backgroundCont = document.querySelector('.background_cont');
    if (!backgroundCont) {
        console.error('Background container not found');
        return;
    }

    // Create elements and handle mouse element
    const elements = {
        bg1: createBackdropDiv('bg_b1', 'backdrop_div_1'),
        bg2: createBackdropDiv('bg_b2', 'backdrop_div_2'),
        bg3: createBackdropDiv('bg_b3', 'backdrop_div_3'),
        mouse: document.querySelector('.mouse_follow')
    };

    // Check for mouse element existence
    if (!elements.mouse) {
        console.error('Mouse follow element not found');
    }

    // Append backdrop elements (but keep them hidden via opacity in CSS)
    Object.values(elements).forEach(el => {
        if (el && el !== elements.mouse) {
            backgroundCont.appendChild(el);
        }
    });

    // Ensure elements start hidden (opacity: 0, no animation class)
    [elements.bg1, elements.bg2, elements.bg3].forEach(el => {
        if (el) {
            el.style.opacity = "0";
        }
    });
    if (elements.mouse) elements.mouse.style.opacity = "0";

    // Show loading screen, then fade out, then animate backgrounds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');

        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.remove();

            // Use requestAnimationFrame to ensure DOM updates before adding classes
            requestAnimationFrame(() => {
                elements.bg1.classList.add('animate-bg-1');
                elements.bg2.classList.add('animate-bg-2');
                elements.bg3.classList.add('animate-bg-3');
                if (elements.mouse) {
                    elements.mouse.classList.add('animate-mouse');
                }
            });
        }, { once: true });
    }, 2000); // Adjust this delay as needed for your loading screen
});

function createBackdropDiv(id, className) {
    const div = document.createElement('div');
    div.id = id;
    div.className = className;
    return div;
}