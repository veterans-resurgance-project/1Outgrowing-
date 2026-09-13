// ==========================================
// AFTI PLATFORM CORE UTILITY (afti-core.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => { initGlobalUI(); });

// --- GLOBAL STATE & HUD SYNC ENGINE ---
function getGlobalXP() { return parseInt(localStorage.getItem('afti_global_xp')) || 400; }

function awardGlobalXP(amount = 50) {
    if (sessionStorage.getItem('afti_test_bypass') === 'true') return getGlobalXP();
    let currentXP = getGlobalXP() + amount;
    localStorage.setItem('afti_global_xp', currentXP);
    updateXPDisplay(currentXP);
    return currentXP;
}function updateXPDisplay(xpValue) {
    document.querySelectorAll('#global-points, #hud-xp, #completion-xp-display').forEach(el => { if (el) el.innerText = xpValue; });
    const activeTrack = localStorage.getItem('afti_track_name') || 'Not Selected';
    if (document.getElementById('hud-track')) { document.getElementById('hud-track').innerText = activeTrack; }
    
    // STIPEND SECURITY RULE: Only show money tracking if on the Foster-Alum pathway
    const stipendEl = document.getElementById('stipend-amount');
    if (stipendEl) {
        if (activeTrack === 'Foster-Alum') {
            stipendEl.innerText = '$' + (localStorage.getItem('afti_earned_stipend') || '0');
            stipendEl.parentElement.style.display = 'inline'; // Ensure visibility
        } else {
            stipendEl.parentElement.style.display = 'none'; // Hide completely for Bootstrap & Capital
        }
    }
}

    // STIPEND SECURITY RULE: Only show money tracking if on the Foster-Alum pathway
    const stipendEl = document.getElementById('stipend-amount');
    if (stipendEl) {
        if (activeTrack === 'Foster-Alum') {
            stipendEl.innerText = '$' + (localStorage.getItem('afti_earned_stipend') || '0');
            stipendEl.parentElement.style.display = 'inline'; // Ensure visibility
        } else {
            stipendEl.parentElement.style.display = 'none'; // Hide completely for Bootstrap & Capital
        }
    }
}


// --- STORY INTERFACES REPAIRED ---
function selectDayCenterOption(type, pts) { selectOption(type, points); } // Bridge fix
function selectOption(type, pts) { awardGlobalXP(pts); }
function selectVocationalOption(type, pts, stip) { adjustStipend(stip); awardGlobalXP(pts); }
function selectMarketOption(type, pts) { awardGlobalXP(pts); }

function adjustStipend(amount) {
    if (sessionStorage.getItem('afti_test_bypass') === 'true') return;
    let currentStipend = parseInt(localStorage.getItem('afti_earned_stipend') || '0', 10) + amount;
    localStorage.setItem('afti_earned_stipend', currentStipend);
    initGlobalUI();
}

// --- MODULE CERTIFICATION KEY GENERATION ---
function generateModulePassKey(modulePrefix = "MOD") {
    const rawString = `${modulePrefix}-${getGlobalXP()}-${window.location.hostname}`;
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) { hash = ((hash << 5) - hash) + rawString.charCodeAt(i); hash |= 0; }
    const secureToken = `${modulePrefix}-PASS-${Math.abs(hash).toString(36).toUpperCase()}`;
    localStorage.setItem(`unlocked_${modulePrefix.toLowerCase()}_key`, secureToken);
    return secureToken;
}

function verifyModuleKey(modulePrefix, inputElementId, errorElementId, successCallback) {
    const inputField = document.getElementById(inputElementId); const errorMsg = document.getElementById(errorElementId);
    const userEnteredKey = inputField ? inputField.value.trim().toUpperCase() : "";
    const expectedKey = localStorage.getItem(`unlocked_${modulePrefix.toLowerCase()}_key`);
    if (sessionStorage.getItem('afti_test_bypass') === 'true' || userEnteredKey === expectedKey) {
        if (errorMsg) errorMsg.style.display = 'none'; awardGlobalXP(75); if (typeof successCallback === 'function') successCallback();
    } else if (errorMsg) {
        errorMsg.innerText = "Invalid or missing token. Complete prerequisite training first."; errorMsg.style.display = 'block';
    }
}

// --- GLOBAL HUD & TEST BYPASS UI HELPER ---
function toggleTestBypass() {
    sessionStorage.setItem('afti_test_bypass', sessionStorage.getItem('afti_test_bypass') !== 'true');
    initGlobalUI();
}

function initGlobalUI() {
    updateXPDisplay(getGlobalXP());
    const btn = document.getElementById('test-mode-btn');
    if (btn) {
        const bp = sessionStorage.getItem('afti_test_bypass') === 'true';
        btn.style.background = bp ? '#f59e0b' : '#334155'; btn.style.color = bp ? '#0f172a' : '#cbd5e1';
        btn.innerText = bp ? 'Bypass Active (Unlocked)' : 'Enable Test Bypass';
    }
}
