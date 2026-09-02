/**
 * ==========================================
 *  GLOBAL CONFIGURATION & DYNAMIC BINDINGS
 * ==========================================
 */
'use strict';

const AppConfig = {
    // Set your master registration URL here
    REGISTRATION_URL: "https://www.google.com/", 
    
    // Set your master logo URL here
    LOGO_URL: "assets/images/AI_AVLOKAN_LOGO.png", 
    
    // Set your master General Rules PDF URL here
    GENERAL_RULES_URL: "assets/events/rulebook/AI_EMERGING_QUIZ.pdf"
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Update Registration Buttons (with Security Best Practices)
    const regButtons = document.querySelectorAll('.registration-btn');
    regButtons.forEach(btn => {
        btn.href = AppConfig.REGISTRATION_URL;
        btn.target = "_blank";
        // Security best practice when using target="_blank"
        btn.rel = "noopener noreferrer"; 
    });

    // 2. Update Dynamic Logos (with Graceful Fade-In & Error Handling)
    const dynamicLogos = document.querySelectorAll('.dynamic-logo');
    dynamicLogos.forEach(logo => {
        // Prepare for smooth fade-in to prevent harsh popping
        logo.style.opacity = '0';
        logo.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        logo.onload = () => {
            logo.style.opacity = '1';
        };
        
        logo.onerror = () => {
            console.warn('⚠️ [Avlokan Config] Failed to load logo at:', AppConfig.LOGO_URL);
            // Fallback opacity just in case
            logo.style.opacity = '1'; 
        };
        
        // Trigger the load
        logo.src = AppConfig.LOGO_URL;
    });

    // 3. Update General Rules PDF Button
    const generalRulesBtn = document.querySelector('.general-rules-btn');
    if (generalRulesBtn) {
        generalRulesBtn.href = "#";
        generalRulesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Premium micro-interaction: Subtle click scale
            generalRulesBtn.style.transform = 'scale(0.95)';
            setTimeout(() => generalRulesBtn.style.transform = '', 150);

            // Graceful degradation for PDF viewer
            if (typeof window.openPDF === 'function') {
                window.openPDF(AppConfig.GENERAL_RULES_URL);
            } else {
                window.open(AppConfig.GENERAL_RULES_URL, '_blank', 'noopener,noreferrer');
            }
        });
    }

    // 4. Premium Console Signature (Matches the Cyber Theme)
    console.log(
        '%c ⚡ SYSTEM INITIALIZED %c Configuration loaded successfully.',
        'background: #7c3aed; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; letter-spacing: 1px;',
        'color: #22d3ee; font-style: italic;'
    );
});
