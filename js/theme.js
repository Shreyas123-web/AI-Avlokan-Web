/**
 * ==========================================
 *  PREMIUM THEME MANAGER
 * ==========================================
 */
(function() {
  'use strict';

  // UPGRADE: Safe storage wrapper prevents fatal crashes if cookies/storage are disabled by the browser
  const Storage = {
    get: (key) => { try { return localStorage.getItem(key); } catch(e) { return null; } },
    set: (key, val) => { try { localStorage.setItem(key, val); } catch(e) {} }
  };

  const systemPref = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Determine initial theme
  function getInitialTheme() {
    const stored = Storage.get('theme');
    if (stored) return stored;
    return systemPref.matches ? 'dark' : 'light';
  }
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Apply immediately to prevent FOUC (Flash of Unstyled Content)
  applyTheme(getInitialTheme());

  // Expose toggle function
  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    Storage.set('theme', newTheme);
    
    // UPGRADE: Haptic Feedback. Makes the neumorphic button feel like a real hardware switch on mobile.
    if (typeof navigator.vibrate === 'function') {
      navigator.vibrate(40); // Subtle 40ms physical tap
    }
    
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.classList.add('active-state');
      setTimeout(() => toggleBtn.classList.remove('active-state'), 150);
    }
  };

  // UPGRADE: Handle OS preference changes in real-time
  if (typeof systemPref.addEventListener === 'function') {
    systemPref.addEventListener('change', (e) => {
      // Only auto-switch if the user hasn't explicitly saved a manual preference
      if (!Storage.get('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // UPGRADE: Cross-Tab Synchronization
  // If the user has multiple tabs open and changes the theme in one, update the others instantly.
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
      applyTheme(e.newValue);
    }
  });

  // Wait for DOM to attach event listeners
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', window.toggleTheme);
    }
  });
})();
