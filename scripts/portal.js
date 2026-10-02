/* ==========================================================================
   शिक्षा सेतु (Shiksha Setu) • Educational Web Translation Engine
   Bilingual Split Toggle, Glossary Highlighting, Theme & Accessibility
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const container = document.getElementById('bilingual-container');
  const panelHindi = document.getElementById('panel-hindi');
  const panelEnglish = document.getElementById('panel-english');
  const modeButtons = document.querySelectorAll('.mode-btn');
  const glossaryToggle = document.getElementById('glossary-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const btnFontIncrease = document.getElementById('font-inc');
  const btnFontDecrease = document.getElementById('font-dec');

  // 1. View Mode Switching (Hindi / English / Split Comparison)
  function setViewMode(mode) {
    modeButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (mode === 'split') {
      container.classList.add('split-mode');
      panelHindi.style.display = 'block';
      panelEnglish.style.display = 'block';
    } else if (mode === 'hindi') {
      container.classList.remove('split-mode');
      panelHindi.style.display = 'block';
      panelEnglish.style.display = 'none';
    } else if (mode === 'english') {
      container.classList.remove('split-mode');
      panelHindi.style.display = 'none';
      panelEnglish.style.display = 'block';
    }

    localStorage.setItem('shiksha_view_mode', mode);
  }

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setViewMode(btn.dataset.mode);
    });
  });

  // Load saved view mode or default to split comparison for client review
  const savedMode = localStorage.getItem('shiksha_view_mode') || 'split';
  setViewMode(savedMode);

  // 2. Glossary Term Highlighting Toggle (Acceptance Criteria #3)
  if (glossaryToggle) {
    glossaryToggle.addEventListener('change', () => {
      if (glossaryToggle.checked) {
        document.body.classList.add('glossary-highlight-active');
      } else {
        document.body.classList.remove('glossary-highlight-active');
      }
    });

    // Default to ACTIVE so the client immediately sees terminology consistency
    document.body.classList.add('glossary-highlight-active');
    glossaryToggle.checked = true;
  }

  // 3. Theme Toggle (Light / Dark)
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const target = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('shiksha_theme', target);
    });

    const savedTheme = localStorage.getItem('shiksha_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // 4. Accessibility Font Sizing
  let currentFontSize = 16;
  if (btnFontIncrease && btnFontDecrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (currentFontSize < 22) {
        currentFontSize += 1;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
      }
    });

    btnFontDecrease.addEventListener('click', () => {
      if (currentFontSize > 13) {
        currentFontSize -= 1;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  // Synchronized scroll between panels in split view
  let isSyncingLeftScroll = false;
  let isSyncingRightScroll = false;

  panelHindi.addEventListener('scroll', () => {
    if (!isSyncingLeftScroll && container.classList.contains('split-mode') && window.innerWidth > 900) {
      isSyncingRightScroll = true;
      panelEnglish.scrollTop = panelHindi.scrollTop;
    }
    isSyncingLeftScroll = false;
  });

  panelEnglish.addEventListener('scroll', () => {
    if (!isSyncingRightScroll && container.classList.contains('split-mode') && window.innerWidth > 900) {
      isSyncingLeftScroll = true;
      panelHindi.scrollTop = panelEnglish.scrollTop;
    }
    isSyncingRightScroll = false;
  });
});
