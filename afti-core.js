// ==========================================
// AFTI PLATFORM CORE UTILITY (afti-core.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initGlobalUI();
});

// --- GLOBAL XP & STATE MANAGEMENT ---

function getGlobalXP() {
    return parseInt(localStorage.getItem('afti_global_xp')) || 400;
}

function awardGlobalXP(amount = 50) {
    const bypassActive = sessionStorage.getItem('afti_test_bypass') === 'true';
    if (bypassActive) return getGlobalXP();
    
    let currentXP = getGlobalXP();
    currentXP += amount;
    localStorage.setItem('afti_global_xp', currentXP);
    updateXPDisplay(currentXP);
    return currentXP;
}

function updateXPDisplay(xpValue) {
    const xpElements = document.querySelectorAll('#global-points, #hud-xp, #completion-xp-display');
    xpElements.forEach(el => {
        if (el) el.innerText = xpValue;
    });
}


// --- MODULE CODE GENERATION (For Training Decks) ---

function generateModulePassKey(modulePrefix = "MOD") {
    const currentXP = getGlobalXP();
    const rawString = `${modulePrefix}-${currentXP}-${window.location.hostname}`;
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
        hash = ((hash << 5) - hash) + rawString.charCodeAt(i);
        hash |= 0; 
    }
    const secureToken = `${modulePrefix}-PASS-${Math.abs(hash).toString(36).toUpperCase()}`;
    localStorage.setItem(`unlocked_${modulePrefix.toLowerCase()}_key`, secureToken);
    return secureToken;
}


// --- GATEKEEPER VALIDATION (For Story Engine Nodes) ---

function verifyModuleKey(modulePrefix, inputElementId, errorElementId, successCallback) {
    const inputField = document.getElementById(inputElementId);
    const errorMsg = document.getElementById(errorElementId);
    
    const userEnteredKey = inputField ? inputField.value.trim().toUpperCase() : "";
    const expectedKey = localStorage.getItem(`unlocked_${modulePrefix.toLowerCase()}_key`);
    
    // Check if test bypass is active in session storage
    const bypassActive = sessionStorage.getItem('afti_test_bypass') === 'true';

    if (bypassActive || userEnteredKey === expectedKey) {
        if (errorMsg) errorMsg.style.display = 'none';
        awardGlobalXP(75); 
        if (typeof successCallback === 'function') {
            successCallback();
        }
    } else {
        if (errorMsg) {
            errorMsg.innerText = "Invalid or missing token. Complete the prerequisite training module first (or enable Test Bypass).";
            errorMsg.style.display = 'block';
        }
    }
}


// --- GLOBAL HUD & TEST BYPASS UI HELPER ---

function toggleTestBypass() {
    const currentBypass = sessionStorage.getItem('afti_test_bypass') === 'true';
    sessionStorage.setItem('afti_test_bypass', !currentBypass);
    initGlobalUI();
}

function initGlobalUI() {
    updateXPDisplay(getGlobalXP());
    
    const isBypassed = sessionStorage.getItem('afti_test_bypass') === 'true';
    const btn = document.getElementById('test-mode-btn');
    
    if (btn) {
        if (isBypassed) {
            btn.style.background = '#f59e0b';
            btn.style.color = '#0f172a';
            btn.innerText = 'Bypass Active (Unlocked)';
        } else {
            btn.style.background = '#334155';
            btn.style.color = '#cbd5e1';
            btn.innerText = 'Enable Test Bypass';
        }
    }
}
