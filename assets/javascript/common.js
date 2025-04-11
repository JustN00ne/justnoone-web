// common.js
document.addEventListener('DOMContentLoaded', function() {

    // 2. Set dynamic title (e.g., "Site Name - Page Name")
    const siteName = 'JustNoone';
    const pageTitle = document.title;
    document.title = pageTitle ? `${siteName} - ${pageTitle}` : siteName;
  });