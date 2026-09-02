/**
 * ==========================================
 *  FIREBASE ANALYTICS & LIVE COUNTERS
 * ==========================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 1. Paste your Firebase Web App configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMFIUQU61EipJ_V5PyGJmPhGGiwhcTo9g",
  authDomain: "ai-avlokan-2k26.firebaseapp.com",
  projectId: "ai-avlokan-2k26",
  storageBucket: "ai-avlokan-2k26.firebasestorage.app",
  messagingSenderId: "658722000798",
  appId: "1:658722000798:web:37f5f75c79acf30829108f",
  measurementId: "G-2PM9Y9NL0T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the stats document: analytics/pageStats
const statsDocRef = doc(db, "analytics", "pageStats");

async function recordMetrics() {
  try {
    // UPGRADE: Anti-Spam Quota Protection
    // Prevents malicious users from spamming F5/Refresh to eat up your Firebase write quota.
    if (sessionStorage.getItem("session_view_logged")) return;

    const hasVisitedBefore = localStorage.getItem("site_visitor_logged");

    const updatePayload = {
      totalViews: increment(1) 
    };

    if (!hasVisitedBefore) {
      updatePayload.uniqueVisitors = increment(1); 
      localStorage.setItem("site_visitor_logged", "true");
    }

    // Atomically apply increments
    await setDoc(statsDocRef, updatePayload, { merge: true });
    
    // Lock the view counter for this specific tab session
    sessionStorage.setItem("session_view_logged", "true");

  } catch (error) {
    console.warn("⚠️ [Avlokan Analytics] Tracking blocked or unavailable:", error.message);
  }
}

// UPGRADE: Helper to animate numbers gracefully when they change live
function updateLiveStat(element, newValue) {
  if (!element) return;
  
  const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
  
  // Sync the data-target so main.js animations know the final number
  element.setAttribute('data-target', newValue);

  // If this is a LIVE update (someone else visited while you are staring at the page)
  if (currentValue > 0 && currentValue !== newValue) {
    element.textContent = newValue.toLocaleString();
    
    // Premium Pulse Effect
    element.style.transition = 'color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease';
    element.style.color = '#fff';
    element.style.textShadow = '0 0 20px #22d3ee, 0 0 40px #22d3ee';
    element.style.transform = 'scale(1.08)';
    
    // Remove glow after animation
    setTimeout(() => {
      element.style.color = '';
      element.style.textShadow = '';
      element.style.transform = '';
    }, 800);
  } else if (currentValue === 0) {
    // Initial load - just set the text, let main.js handle the cinematic scroll reveal
    element.textContent = newValue.toLocaleString();
  }
}

// Listen to real-time changes and update the UI
onSnapshot(statsDocRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    updateLiveStat(document.getElementById("totalViews"), data.totalViews || 0);
    updateLiveStat(document.getElementById("uniqueVisitors"), data.uniqueVisitors || 0);
  }
}, (error) => {
  console.warn("⚠️ [Avlokan Analytics] Live updates blocked:", error.message);
});

// Only run the tracker if we are on the index/home page
const pathname = window.location.pathname;
const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || !pathname.includes('.html');

if (isHomePage) {
  recordMetrics();
}
