// ---------- Phrases Data ----------
const phrases = [
    // Templates
    {
        type: "Template",
        description: "New Patient Template - Dr. Mohammad Ani",
        content: "[ Age ] year old [ male/female ] new patient presenting for [ Reason 4 Visit ].\nChest pain is [absent / described as ___ quality, ___ location, without radiation, lasting ___ minutes, provoked by ___ , relieved by ___]. SOB is [absent / present with exertion only / also with orthopnea or PND]. LE edema is [absent / trace / 1+ to 4+, bilateral or unilateral]. Palpitations are [absent / described as racing or fluttering, regular or irregular]. Exercise tolerance is [unlimited / limited to ___ blocks or ___ flights, NYHA class ___].\n\nSocial History: [    ]\nFamily History: [    ]\n\nAllergies: [    ]\nMedications: [    ]\n\nPROCEDURES\nEKG Today: HR: [  ] bpm, [  ]\n\nLABS\n[Date]\nCBC/Chemistry: WBC [  ], Hgb [  ], Platelets [  ], Glucose [  ], BUN [  ], Creatinine [  ]\nElectrolytes: Na [  ], K [  ], Cl [  ], CO2 [  ]\nLiver: AST [  ], ALT [  ]\nLipids: Chol Total [  ], Trigly [  ], HDL [  ], LDL [  ]\nHgbA1c: [  ]\n\nPHYSICAL EXAMINATION\nHeight: [  ]'[  ], Weight: [  ] lbs, BP: [  ]/[  ] mmHg, PR: [  ] bpm, SpO2: [  ]%\nCVS: RRR, normal S1/S2, no murmurs, no rubs, no gallops\nLungs: Clear to auscultation bilaterally\nAbdomen: Soft, non-tender, no hepatosplenomegaly\nExtremities: No clubbing, no cyanosis, no edema\n\nASSESSMENT & PLAN\n[        ]\n\nRECOMMENDATIONS\n[        ]\n\nFollow-up in [X weeks/months].\n\n[MA signature]",
        dotphrase: "new-p-ani"
    },
    {
        type: "Template",
        description: "Follow-up Patient Template - Dr. Mohammad Ani",
        content: "[ Age ] year old [ male/female ] return patient presenting for [ Reason 4 Visit ].\nChest pain is [absent / described as ___ quality, ___ location, without radiation, lasting ___ minutes, provoked by ___ , relieved by ___]. SOB is [absent / present with exertion only / also with orthopnea or PND]. LE edema is [absent / trace / 1+ to 4+, bilateral or unilateral]. Palpitations are [absent / described as racing or fluttering, regular or irregular]. Exercise tolerance is [unlimited / limited to ___ blocks or ___ flights, NYHA class ___].\n\nSocial History: [    ]\nFamily History: [    ]\n\nAllergies: [    ]\nMedications: [    ]\n\nPROCEDURES\nEKG Today: HR: [  ] bpm, [  ]\n\nLABS\n[Date]\nCBC/Chemistry: WBC [  ], Hgb [  ], Platelets [  ], Glucose [  ], BUN [  ], Creatinine [  ]\nElectrolytes: Na [  ], K [  ], Cl [  ], CO2 [  ]\nLiver: AST [  ], ALT [  ]\nLipids: Chol Total [  ], Trigly [  ], HDL [  ], LDL [  ]\nHgbA1c: [  ]\n\nPHYSICAL EXAMINATION\nWeight: [  ] lbs, BP: [  ]/[  ] mmHg, PR: [  ] bpm, SpO2: [  ]%\nCVS: RRR, normal S1/S2, no murmurs, no rubs, no gallops\nLungs: Clear to auscultation bilaterally\nAbdomen: Soft, non-tender, no hepatosplenomegaly\nExtremities: No clubbing, no cyanosis, no edema\n\nASSESSMENT & PLAN\n[        ]\n\nRECOMMENDATIONS\n[        ]\n\nFollow-up in [X weeks/months].\n\n[MA signature]",
        dotphrase: "return-p-ani"
    },
    {
        type: "Template",
        description: "Dr. O'Keefe's Return Patient",
        content: "Previously a patient of Dr. O'Keefe now visiting Dr. [  ].",
        dotphrase: "okeefe"
    },
    {
        type: "Template",
        description: "Clearance",
        content: "CLEARANCE: Patient is medically optimized and cleared for [procedure] from a cardiac standpoint. Recommend [monitoring / follow-up / medication changes / medication compliance]",
        dotphrase: "clearance"
    },
    {
        type: "Template",
        description: "Full Lab Template",
        content: "[Date]\nCBC/Chemistry: WBC [  ], Hgb [  ], Platelets [  ], Glucose [  ], BUN [  ], Creatinine [  ]\nElectrolytes: Na [  ], K [  ], Cl [  ], CO2 [  ]\nLiver: AST [  ], ALT [  ]\nLipids: Chol Total [  ], Triglycerides [  ], HDL [  ], LDL [  ]\nHgbA1c: [  ]",
        dotphrase: "lab"
    },
    // Procedures
    {
        type: "Template",
        description: "EKG",
        content: "EKG: [Date] - HR: [  ] bpm, [NSR/A-fib/Atrial flutter/VT/Bradyarrhythmias],",
        dotphrase: "ekg"
    },
    {
        type: "Template",
        description: "Holter Monitor",
        content: "Holter: [Date] - Duration: [24/48/72] hr, Predominant NSR, [  ] PACs, [  ] PVCs, [  ] A-fib",
        dotphrase: "holter"
    },
    {
        type: "Template",
        description: "Echocardiogram",
        content: "Echo: [Date] - EF: [  ]%, [Trace MR, Mild TR]",
        dotphrase: "echo"
    },
    {
        type: "Template",
        description: "Nuclear Stress Test",
        content: "Nuclear Stress Test: [Date] - [Normal / Ischemia / Arrhythmia / other]",
        dotphrase: "stress"
    },
    {
        type: "Template",
        description: "Cardiac Cath",
        content: "Cath: [Date] - [Coronary artery disease / stenosis / anatomy / other]",
        dotphrase: "cath"
    },
    {
        type: "Template",
        description: "Stent",
        content: "Stent: [Date] - Vessel: [LAD / RCA / LCx / Other], Type: [DES / BMS], [ Findings ]",
        dotphrase: "stent"
    },
    {
        type: "Template",
        description: "Cardiac Device",
        content: "Device: [Date] - Type: [Pacemaker / ICD / CRT-P / CRT-D], [Function / interrogation / other]",
        dotphrase: "device"
    },
    {
        type: "Template",
        description: "TAVR / Valve",
        content: "TAVR: [Date] - Type: [Balloon-expandable / Self-expanding], [Post-procedure EF / other]",
        dotphrase: "tavr"
    },
    // Text Phrases
    {
        type: "Text",
        description: "Rapid Heartbeat Palpitations",
        content: "Patient felt intermittent rapid heartbeat, described as racing or pounding. Occurs with activity or stress. No associated chest pain, syncope, or shortness of breath.",
        dotphrase: "pal-racing"
    },
    {
        type: "Text",
        description: "Irregular or Fluttering Palpitations",
        content: "Patient felt episodes of irregular or fluttering heartbeat, described as quivering in the chest. Occurs intermittently. No associated chest pain, dizziness, or syncope.",
        dotphrase: "pal-irregular"
    },
    {
        type: "Text",
        description: "Skipped Beats or Thumps",
        content: "Patient felt occasional skipped or extra beats, described as thumping in the chest. No associated lightheadedness, chest pain, or syncope.",
        dotphrase: "pal-skip"
    },
    {
        type: "Text",
        description: "Slow Heartbeat or Pauses",
        content: "Patient felt brief pauses or slow heartbeat, described as intermittent slowing or stopping. No associated dizziness, syncope, or exertional intolerance.",
        dotphrase: "pal-slow"
    },
    {
        type: "Text",
        description: "Paroxysmal Palpitations",
        content: "Patient felt intermittent palpitations that come and go, described as brief fluttering or racing beats lasting seconds to minutes. No associated chest pain, shortness of breath, or syncope. Episodes self-terminate.",
        dotphrase: "pal-brief"
    },
    {
        type: "Text",
        description: "Triggered Palpitations",
        content: "Patient felt palpitations triggered by exertion, caffeine, or stress, described as rapid or fluttering. No associated chest pain, dizziness, or syncope.",
        dotphrase: "pal-trigger"
    }
];

// ---------- Phrase Modal Functions ----------
function openMyPhrasesModal() {
    document.getElementById('myPhrasesModal').classList.add('active');
    document.getElementById('phraseSearch').value = '';
    renderPhraseList();
    document.getElementById('phraseSearch').focus();
}

function closeMyPhrasesModal() {
    document.getElementById('myPhrasesModal').classList.remove('active');
}

function renderPhraseList(filter = '') {
    const list = document.getElementById('phraseList');
    const noMsg = document.getElementById('noPhrasesMsg');
    const filterLower = filter.toLowerCase();

    const filtered = filter
        ? phrases.filter(p => p.description.toLowerCase().includes(filterLower))
        : phrases;

    if (filtered.length === 0) {
        list.innerHTML = '';
        noMsg.style.display = 'block';
        return;
    }

    noMsg.style.display = 'none';
    list.innerHTML = filtered.map((p, i) => {
        const preview = p.content.length > 60 ? p.content.substring(0, 60) + '...' : p.content;
        return '<li class="phrase-item" ondblclick="insertPhrase(' + i + ')">' +
            '<div class="phrase-item-desc">' + escapeHtml(p.description) + '</div>' +
            '<div class="phrase-item-type">' + escapeHtml(p.type) + '</div>' +
            '<div class="phrase-item-preview">' + escapeHtml(preview) + '</div>' +
            '</li>';
    }).join('');
}

function insertPhrase(index) {
    if (!phrases[index]) return;
    const content = phrases[index].content;
    const ta = document.getElementById('editorTextarea');
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    
    // Use execCommand to preserve undo history
    document.execCommand('insertText', false, content);
    
    ta.focus();
    closeMyPhrasesModal();
    selectFirstPlaceholder(ta, start, start + content.length);
    if (typeof showStatusMessage === 'function') {
        showStatusMessage("Fill in placeholders — Tab to jump");
    }
}

// ---------- Placeholder Functions ----------
function findPlaceholders(text, rangeStart, rangeEnd) {
    const placeholders = [];
    const regex = /\[([^\]]+)\]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index >= rangeStart && match.index + match[0].length <= rangeEnd) {
            placeholders.push({
                start: match.index,
                end: match.index + match[0].length,
                text: match[0]
            });
        }
    }
    return placeholders;
}

function selectFirstPlaceholder(ta, rangeStart, rangeEnd) {
    const placeholders = findPlaceholders(ta.value, rangeStart, rangeEnd);
    if (placeholders.length > 0) {
        ta.selectionStart = placeholders[0].start;
        ta.selectionEnd = placeholders[0].end;
        return true;
    }
    return false;
}

function selectPlaceholderAtCursor(ta, direction) {
    const cursor = ta.selectionStart;
    const placeholders = findPlaceholders(ta.value, 0, ta.value.length);
    if (placeholders.length === 0) return false;

    if (direction === 'next') {
        // Find first placeholder that starts after cursor
        for (const p of placeholders) {
            if (p.start > cursor) {
                ta.selectionStart = p.start;
                ta.selectionEnd = p.end;
                return true;
            }
        }
        // Wrap around to first placeholder
        ta.selectionStart = placeholders[0].start;
        ta.selectionEnd = placeholders[0].end;
        return true;
    } else if (direction === 'previous') {
        // Find last placeholder that ends before cursor
        for (let i = placeholders.length - 1; i >= 0; i--) {
            if (placeholders[i].end < cursor) {
                ta.selectionStart = placeholders[i].start;
                ta.selectionEnd = placeholders[i].end;
                return true;
            }
        }
        // Wrap around to last placeholder
        ta.selectionStart = placeholders[placeholders.length - 1].start;
        ta.selectionEnd = placeholders[placeholders.length - 1].end;
        return true;
    } else {
        // Select placeholder at current cursor position
        for (const p of placeholders) {
            if (cursor >= p.start && cursor <= p.end) {
                ta.selectionStart = p.start;
                ta.selectionEnd = p.end;
                return true;
            }
        }
    }
    return false;
}

// ---------- Dotphrase Functions ----------
let dotphrasePopup = null;

function createDotphrasePopup() {
    dotphrasePopup = document.createElement('div');
    dotphrasePopup.id = 'dotphrasePopup';
    dotphrasePopup.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #dce7ef;
        border-radius: 8px;
        padding: 8px 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: none;
        min-width: 200px;
        max-width: 350px;
        max-height: 200px;
        overflow-y: auto;
    `;
    document.body.appendChild(dotphrasePopup);
}

let dotphraseSelectedIndex = 0;
let dotphraseMatches = [];

// ---------- Cursor Position Helper ----------
function getCursorXY(textarea, selectionPoint) {
    const computed = getComputedStyle(textarea);
    
    // Create a mirror div that mimics the textarea
    const mirror = document.createElement('div');
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.overflow = 'hidden';
    mirror.style.top = '0';
    mirror.style.left = '0';
    
    // Copy all relevant styles from textarea
    const styleProps = [
        'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
        'letterSpacing', 'textTransform', 'wordSpacing',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
        'boxSizing', 'lineHeight', 'whiteSpace', 'wordWrap', 'overflowWrap'
    ];
    
    styleProps.forEach(prop => {
        mirror.style[prop] = computed[prop];
    });
    
    // Set width to match textarea (important for word wrapping)
    mirror.style.width = computed.width;
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordWrap = 'break-word';
    
    document.body.appendChild(mirror);
    
    // Get text up to cursor
    const textUpToCursor = textarea.value.substring(0, selectionPoint);
    
    // Set the text content
    mirror.textContent = textUpToCursor;
    
    // Create a span to mark cursor position
    const cursorSpan = document.createElement('span');
    cursorSpan.innerHTML = '&nbsp;';
    mirror.appendChild(cursorSpan);
    
    // Get positions
    const rect = textarea.getBoundingClientRect();
    const spanRect = cursorSpan.getBoundingClientRect();
    const mirrorRect = mirror.getBoundingClientRect();
    
    // Calculate actual position
    const x = rect.left + (spanRect.left - mirrorRect.left) - textarea.scrollLeft;
    const y = rect.top + (spanRect.top - mirrorRect.top) - textarea.scrollTop;
    
    document.body.removeChild(mirror);
    
    return { x, y };
}

function showDotphrasePopup(query, x, y) {
    if (!dotphrasePopup) createDotphrasePopup();
    
    const queryLower = query.toLowerCase();
    dotphraseMatches = phrases.filter(p => 
        p.dotphrase && p.dotphrase.toLowerCase().startsWith(queryLower)
    );
    
    if (dotphraseMatches.length === 0) {
        hideDotphrasePopup();
        return;
    }
    
    dotphraseSelectedIndex = 0;
    
    let html = '<div style="padding: 4px 12px; font-size: 0.7rem; color: #6b8b9b; border-bottom: 1px solid #e2edf2;">Dot Phrases</div>';
    
    dotphraseMatches.forEach((phrase, i) => {
        const preview = phrase.content.length > 50 ? phrase.content.substring(0, 50) + '...' : phrase.content;
        const isSelected = i === 0;
        const bgColor = isSelected ? '#e8f4f0' : 'white';
        const borderColor = isSelected ? '#1a6b5e' : 'transparent';
        html += `<div class="dotphrase-item" data-index="${phrases.indexOf(phrase)}" data-match-index="${i}"
                    style="padding: 6px 12px; cursor: pointer; font-size: 0.85rem; color: #1a2a32; background: ${bgColor}; border-left: 3px solid ${borderColor};"
                    onmouseover="highlightDotphraseItem(${i})"
                    onmouseout="unhighlightDotphraseItem(${i})">
                    <div style="font-weight:600;">..${escapeHtml(phrase.dotphrase)}</div>
                    <div style="font-size:0.75rem; color:#6b8b9b; margin-top:2px;">${escapeHtml(phrase.description)}</div>
                    <div style="font-size:0.7rem; color:#95adba; margin-top:2px;">${escapeHtml(preview)}</div>
                </div>`;
    });
    
    html += '<div style="padding: 4px 12px; font-size: 0.65rem; color: #95adba; border-top: 1px solid #e2edf2; margin-top: 4px;">↑↓ navigate · Tab to select · Esc to close</div>';
    
    dotphrasePopup.innerHTML = html;
    dotphrasePopup.style.left = x + 'px';
    dotphrasePopup.style.top = y + 'px';
    dotphrasePopup.style.display = 'block';
    
    // Add click handlers
    dotphrasePopup.querySelectorAll('.dotphrase-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            insertDotphrase(index);
        });
    });
}

function highlightDotphraseItem(index) {
    dotphraseSelectedIndex = index;
    updateDotphraseSelection();
}

function unhighlightDotphraseItem(index) {
    // Keep selection on keyboard navigation
}

function updateDotphraseSelection() {
    const items = dotphrasePopup.querySelectorAll('.dotphrase-item');
    items.forEach((item, i) => {
        const isSelected = i === dotphraseSelectedIndex;
        item.style.background = isSelected ? '#e8f4f0' : 'white';
        item.style.borderLeftColor = isSelected ? '#1a6b5e' : 'transparent';
    });
    
    // Scroll selected item into view
    if (items[dotphraseSelectedIndex]) {
        items[dotphraseSelectedIndex].scrollIntoView({ block: 'nearest' });
    }
}

function hideDotphrasePopup() {
    if (dotphrasePopup) {
        dotphrasePopup.style.display = 'none';
    }
    dotphraseMatches = [];
    dotphraseSelectedIndex = 0;
}

function insertDotphrase(index) {
    if (!phrases[index]) return;
    const content = phrases[index].content;
    const ta = document.getElementById('editorTextarea');
    
    // Find the ".." and replace it with the phrase
    const cursorPos = ta.selectionStart;
    const beforeCursor = ta.value.substring(0, cursorPos);
    const dotIndex = beforeCursor.lastIndexOf('..');
    
    if (dotIndex !== -1) {
        // Select from ".." to cursor position
        ta.selectionStart = dotIndex;
        ta.selectionEnd = cursorPos;
        
        // Use execCommand to preserve undo history
        document.execCommand('insertText', false, content);
    }
    
    hideDotphrasePopup();
    selectFirstPlaceholder(ta, ta.selectionStart - content.length, ta.selectionStart);
    if (typeof showStatusMessage === 'function') {
        showStatusMessage("Fill in placeholders — Tab to jump");
    }
}

// ---------- Initialize Phrase Events ----------
function initPhraseEvents() {
    const editorTextarea = document.getElementById('editorTextarea');
    const phraseSearch = document.getElementById('phraseSearch');
    const myPhrasesModal = document.getElementById('myPhrasesModal');

    document.getElementById('myPhrasesBtn').addEventListener('click', openMyPhrasesModal);

    phraseSearch.addEventListener('input', (e) => {
        renderPhraseList(e.target.value);
    });

    myPhrasesModal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeMyPhrasesModal();
    });

    editorTextarea.addEventListener('click', () => {
        selectPlaceholderAtCursor(editorTextarea, 'current');
        hideDotphrasePopup();
    });

    // Tab key navigates between [placeholders] only when popup is not open
    editorTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && 
            (!dotphrasePopup || dotphrasePopup.style.display === 'none') &&
            (!window.wordPopup || window.wordPopup.style.display === 'none')) {
            e.preventDefault();
            if (e.shiftKey) {
                selectPlaceholderAtCursor(editorTextarea, 'previous');
            } else {
                selectPlaceholderAtCursor(editorTextarea, 'next');
            }
        }
    });

    // Dotphrase detection
    editorTextarea.addEventListener('input', (e) => {
        const text = editorTextarea.value;
        const cursorPos = editorTextarea.selectionStart;
        const beforeCursor = text.substring(0, cursorPos);
        
        // Find the last ".." before cursor
        const dotIndex = beforeCursor.lastIndexOf('..');
        
        if (dotIndex !== -1) {
            const query = beforeCursor.substring(dotIndex + 2);
            
            // Check if query contains a space (would indicate end of dotphrase)
            if (query.includes(' ') || query.includes('\n')) {
                hideDotphrasePopup();
                return;
            }
            
            // Position popup at the current cursor location
            const { x, y } = getCursorXY(editorTextarea, cursorPos);
            
            showDotphrasePopup(query, x, y + 20); // Add 20px offset below
        } else {
            hideDotphrasePopup();
        }
    });

    // Keyboard navigation for dotphrase popup
    editorTextarea.addEventListener('keydown', (e) => {
        if (!dotphrasePopup || dotphrasePopup.style.display === 'none') return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            dotphraseSelectedIndex = (dotphraseSelectedIndex + 1) % dotphraseMatches.length;
            updateDotphraseSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            dotphraseSelectedIndex = (dotphraseSelectedIndex - 1 + dotphraseMatches.length) % dotphraseMatches.length;
            updateDotphraseSelection();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (dotphraseMatches[dotphraseSelectedIndex]) {
                insertDotphrase(phrases.indexOf(dotphraseMatches[dotphraseSelectedIndex]));
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            hideDotphrasePopup();
        }
    });

    // Hide dotphrase popup when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#dotphrasePopup') && !e.target.closest('#editorTextarea')) {
            hideDotphrasePopup();
        }
    });
}