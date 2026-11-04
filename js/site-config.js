// site-config.js - Dynamic site name and logo loader
// Include this script on all pages to load site configuration from Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration (same as main.js)
const firebaseConfig = {
    apiKey: "AIzaSyBY42ucaZku8mcFg-a94j_mkigBOtXefnk",
    authDomain: "rivki-2c061.firebaseapp.com",
    databaseURL: "https://rivki-2c061-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "rivki-2c061",
    storageBucket: "rivki-2c061.firebasestorage.app",
    messagingSenderId: "200676632779",
    appId: "1:200676632779:web:bea7faf2c90f2e02f4d34e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Load and apply site configuration
function applySiteConfig() {
    const siteConfigRef = ref(db, 'site_config');

    onValue(siteConfigRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Update site name in all elements with class 'site-name'
            if (data.siteName) {
                document.querySelectorAll('.site-name').forEach(el => {
                    el.textContent = data.siteName;
                });
                // Update page title
                const titleParts = document.title.split(' - ');
                if (titleParts.length > 1) {
                    document.title = `${data.siteName} - ${titleParts.slice(1).join(' - ')}`;
                } else {
                    document.title = data.siteName;
                }
            }

            // Update logo in all elements with class 'site-logo'
            if (data.logoUrl) {
                document.querySelectorAll('.site-logo').forEach(el => {
                    if (el.tagName === 'IMG') {
                        el.src = data.logoUrl;
                    }
                });
            }
        }
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteConfig);
} else {
    applySiteConfig();
}
