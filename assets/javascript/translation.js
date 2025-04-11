document.addEventListener('DOMContentLoaded', () => {
    let translations = {};
    let currentLang = localStorage.getItem('selectedLang') || 'en';

    // Updated file path
    fetch('../assets/lang/translate.tsv')
        .then(response => response.text())
        .then(data => {
            translations = parseTSV(data);
            translatePage(currentLang);
        })
        .catch(error => console.error('Error loading translations:', error));

    document.getElementById('language_switch').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pl' : 'en';
        localStorage.setItem('selectedLang', currentLang);
        translatePage(currentLang);
    });

    function parseTSV(tsvData) {
        const lines = tsvData.split('\n');
        const result = {};
        
        lines.forEach(line => {
            const [key, en, pl] = line.split('\t').map(item => item?.trim());
            if (key && key !== 'key') { // Skip header row if exists
                result[key] = { en, pl };
            }
        });
        
        return result;
    }

    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const translation = translations[key]?.[lang];
            if (translation) {
                element.textContent = translation;
                
                // For input elements, use value instead of textContent
                if (element.tagName.toLowerCase() === 'input') {
                    element.value = translation;
                }
            }
        });

        const button = document.getElementById('language_switch');
        button.textContent = lang === 'en' ? 'PL' : 'EN';
    }
});