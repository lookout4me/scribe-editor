// ---------- Word Dictionary (loaded from JSON files) ----------
let spellDictionary = new Map(); // lowercase -> final term
let dictionaryLoaded = false;
let dictionaryLoading = false;

// Load dictionary from global variables (loaded via script tags)
function loadDictionary() {
    if (dictionaryLoaded || dictionaryLoading) return;
    dictionaryLoading = true;
    
    try {
        // Check if global variables exist (loaded via script tags)
        if (typeof window.doctorWords === 'undefined' || typeof window.medicalWords === 'undefined') {
            console.warn('Dictionary files not loaded. Make sure data/words/doctor.js and data/words/medical.js are included.');
            dictionaryLoading = false;
            return;
        }
        
        const doctor = window.doctorWords;
        const medical = window.medicalWords;
        
        // Merge into single Map
        Object.entries(doctor).forEach(([key, val]) => spellDictionary.set(key, val));
        Object.entries(medical).forEach(([key, val]) => spellDictionary.set(key, val));
        
        dictionaryLoaded = true;
        console.log(`Dictionary loaded: ${spellDictionary.size} words`);
    } catch (error) {
        console.error('Error loading dictionary:', error);
    } finally {
        dictionaryLoading = false;
    }
}

// ---------- Spell Check Functions ----------
function checkSpelling(text) {
    if (!dictionaryLoaded) return [];
    
    const words = text.match(/[a-zA-Z']+/g) || [];
    const misspelled = [];
    let searchFrom = 0;
    
    words.forEach(word => {
        const lower = word.toLowerCase();
        if (lower.length > 2 && !spellDictionary.has(lower)) {
            const index = text.indexOf(word, searchFrom);
            misspelled.push({
                word: word,
                index: index,
                length: word.length
            });
            searchFrom = index + word.length;
        }
    });
    
    return misspelled;
}

function getSuggestions(word) {
    if (!dictionaryLoaded) return [];
    
    const lower = word.toLowerCase();
    const suggestions = [];
    
    // Find similar words using Levenshtein distance
    for (const [key, value] of spellDictionary) {
        if (key.length >= lower.length - 2 && key.length <= lower.length + 2) {
            const dist = levenshteinDistance(lower, key);
            if (dist <= 2 && dist > 0) {
                suggestions.push({ word: value, distance: dist });
            }
        }
    }
    
    // Sort by distance
    suggestions.sort((a, b) => a.distance - b.distance);
    
    // Return top 5 suggestions
    return suggestions.slice(0, 5).map(s => s.word);
}

function levenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[b.length][a.length];
}

// ---------- Word Popup (triggered by `.`) ----------
window.wordPopup = null;
let wordPopupSelectedIndex = 0;
let wordPopupMatches = [];
let wordPopupDotIndex = -1; // Track the position of the "." that triggered the popup

function createWordPopup() {
    window.wordPopup = document.createElement('div');
    window.wordPopup.id = 'wordPopup';
    window.wordPopup.style.cssText = `
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
    document.body.appendChild(window.wordPopup);

    // Delegated click handler (works after scroll/rerender)
    window.wordPopup.addEventListener('click', (e) => {
        const item = e.target.closest('.word-item');
        if (item && item.dataset.index) {
            insertWord(parseInt(item.dataset.index));
        }
    });

    // Delegated mouse handlers
    window.wordPopup.addEventListener('mouseover', (e) => {
        const item = e.target.closest('.word-item');
        if (item && item.dataset.index) {
            highlightWordItem(parseInt(item.dataset.index));
        }
    });
}

function showWordPopup(query, x, y, dotIndex) {
    if (!dictionaryLoaded) return;
    if (!window.wordPopup) createWordPopup();
    
    // Store the dot position for later use in insertWord
    wordPopupDotIndex = dotIndex;
    
    const queryLower = query.toLowerCase();
    wordPopupMatches = [];
    
    // Find matching words (starts with)
    for (const [key, value] of spellDictionary) {
        if (key.startsWith(queryLower) || value.toLowerCase().startsWith(queryLower)) {
            wordPopupMatches.push(value);
            if (wordPopupMatches.length >= 20) break; // Limit results
        }
    }
    
    if (wordPopupMatches.length === 0) {
        hideWordPopup();
        return;
    }
    
    wordPopupSelectedIndex = 0;
    
    let html = '<div style="padding: 4px 12px; font-size: 0.7rem; color: #6b8b9b; border-bottom: 1px solid #e2edf2;">Words</div>';
    
    wordPopupMatches.forEach((word, i) => {
        const isSelected = i === 0;
        const bgColor = isSelected ? '#e8f4f0' : 'white';
        const borderColor = isSelected ? '#1a6b5e' : 'transparent';
        html += `<div class="word-item" data-index="${i}"
                    style="padding: 6px 12px; cursor: pointer; font-size: 0.85rem; color: #1a2a32; background: ${bgColor}; border-left: 3px solid ${borderColor};"
                    onmouseover="highlightWordItem(${i})"
                    onmouseout="unhighlightWordItem(${i})">
                    ${typeof escapeHtml === 'function' ? escapeHtml(word) : word}
                </div>`;
    });
    
    html += '<div style="padding: 4px 12px; font-size: 0.65rem; color: #95adba; border-top: 1px solid #e2edf2; margin-top: 4px;">↑↓ navigate · Tab to select · Esc to close</div>';
    
    window.wordPopup.innerHTML = html;
    window.wordPopup.style.left = x + 'px';
    window.wordPopup.style.top = y + 'px';
    window.wordPopup.style.display = 'block';
    
    // Add click handlers
    window.wordPopup.querySelectorAll('.word-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            insertWord(index);
        });
    });
}

function highlightWordItem(index) {
    wordPopupSelectedIndex = index;
    updateWordPopupSelection();
}

function unhighlightWordItem(index) {
    // Keep selection on keyboard navigation
}

function updateWordPopupSelection() {
    const items = window.wordPopup.querySelectorAll('.word-item');
    items.forEach((item, i) => {
        const isSelected = i === wordPopupSelectedIndex;
        item.style.background = isSelected ? '#e8f4f0' : 'white';
        item.style.borderLeftColor = isSelected ? '#1a6b5e' : 'transparent';
    });
    
    // Scroll selected item into view
    if (items[wordPopupSelectedIndex]) {
        items[wordPopupSelectedIndex].scrollIntoView({ block: 'nearest' });
    }
}

function hideWordPopup() {
    if (window.wordPopup) {
        window.wordPopup.style.display = 'none';
    }
    wordPopupMatches = [];
    wordPopupSelectedIndex = 0;
    wordPopupDotIndex = -1;
}

function insertWord(index) {
    if (!wordPopupMatches[index]) return;
    const word = wordPopupMatches[index];
    const ta = document.getElementById('editorTextarea');
    
    // When popup is shown, the cursor is right after the typed "." and any query text
    // We need to select from the dot position to current cursor and replace with word
    if (wordPopupDotIndex !== -1) {
        const cursorPos = ta.selectionStart;
        
        // Select from dot to current cursor position (includes the "." and any typed letters)
        ta.selectionStart = wordPopupDotIndex;
        ta.selectionEnd = cursorPos;
        
        // Use execCommand to replace selection with word
        document.execCommand('insertText', false, word);
    }
    
    hideWordPopup();
    if (typeof showStatusMessage === 'function') {
        showStatusMessage("Word inserted");
    }
}

// ---------- Cursor Position Helper ----------
function getCursorXYForWords(textarea, selectionPoint) {
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

// ---------- Initialize Word Popup Events ----------
function initWordPopup() {
    const editorTextarea = document.getElementById('editorTextarea');
    if (!editorTextarea) return;
    
    createWordPopup();
    
    // Word detection (triggered by `.`)
    editorTextarea.addEventListener('input', (e) => {
        const text = editorTextarea.value;
        const cursorPos = editorTextarea.selectionStart;
        const beforeCursor = text.substring(0, cursorPos);
        
         // Find the last ".." before cursor
         const dotIndex = beforeCursor.lastIndexOf('..');
        
        if (dotIndex !== -1) {
             // Check if there's another "/" right before this one (meaning it's "//" for dotphrases)
             // If so, don't show word popup - let phrases.js handle it
             if (dotIndex > 0 && text.charAt(dotIndex - 1) === '/') {
                 hideWordPopup();
                 return;
             }
            
            // Get the query (text after the dot, before cursor)
             const query = beforeCursor.substring(dotIndex + 2);
            
            // Check if query contains a space (would indicate end of word)
            if (query.includes(' ') || query.includes('\n')) {
                hideWordPopup();
                return;
            }
            
            // Only show popup if query has at least 1 character
            if (query.length >= 1) {
                // Position popup at the current cursor location
                const { x, y } = getCursorXYForWords(editorTextarea, cursorPos);
                showWordPopup(query, x, y + 20, dotIndex); // Add 20px offset below, pass dotIndex
            } else {
                hideWordPopup();
            }
        } else {
            hideWordPopup();
        }
    });
    
    // Keyboard navigation for word popup
    editorTextarea.addEventListener('keydown', (e) => {
        if (!window.wordPopup || window.wordPopup.style.display === 'none') return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            wordPopupSelectedIndex = (wordPopupSelectedIndex + 1) % wordPopupMatches.length;
            updateWordPopupSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            wordPopupSelectedIndex = (wordPopupSelectedIndex - 1 + wordPopupMatches.length) % wordPopupMatches.length;
            updateWordPopupSelection();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (wordPopupMatches[wordPopupSelectedIndex]) {
                insertWord(wordPopupSelectedIndex);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            hideWordPopup();
        }
    });
    
    // Hide word popup when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#wordPopup') && !e.target.closest('#editorTextarea')) {
            hideWordPopup();
        }
    });
}

// ---------- Spell Check UI (Double-click on misspelled word) ----------
let spellCheckEnabled = true;
let suggestionPopup = null;

function createSuggestionPopup() {
    suggestionPopup = document.createElement('div');
    suggestionPopup.id = 'spellSuggestionPopup';
    suggestionPopup.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #dce7ef;
        border-radius: 8px;
        padding: 8px 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: none;
        min-width: 150px;
        max-width: 250px;
    `;
    document.body.appendChild(suggestionPopup);
}

function showSuggestions(word, x, y) {
    if (!suggestionPopup) createSuggestionPopup();
    
    const suggestions = getSuggestions(word);
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    let html = '<div style="padding: 4px 12px; font-size: 0.7rem; color: #6b8b9b; border-bottom: 1px solid #e2edf2;">Suggestions</div>';
    
    suggestions.forEach(suggestion => {
        html += `<div class="suggestion-item" onclick="replaceWord('${typeof escapeHtml === 'function' ? escapeHtml(word) : word}','${typeof escapeHtml === 'function' ? escapeHtml(suggestion) : suggestion}')" 
                    style="padding: 6px 12px; cursor: pointer; font-size: 0.85rem; color: #1a2a32;"
                    onmouseover="this.style.background='#f0f7f5'"
                    onmouseout="this.style.background='white'">${typeof escapeHtml === 'function' ? escapeHtml(suggestion) : suggestion}</div>`;
    });
    
    html += `<div style="padding: 4px 12px; font-size: 0.65rem; color: #95adba; border-top: 1px solid #e2edf2; margin-top: 4px;">Click to replace</div>`;
    
    suggestionPopup.innerHTML = html;
    suggestionPopup.style.left = x + 'px';
    suggestionPopup.style.top = y + 'px';
    suggestionPopup.style.display = 'block';
}

function hideSuggestions() {
    if (suggestionPopup) {
        suggestionPopup.style.display = 'none';
    }
}

function replaceWord(oldWord, newWord) {
    const editor = document.getElementById('editorTextarea');
    const text = editor.value;
    const index = text.lastIndexOf(oldWord);
    
    if (index !== -1) {
        editor.focus();
        
        // Select the old word
        editor.selectionStart = index;
        editor.selectionEnd = index + oldWord.length;
        
        // Use execCommand to preserve undo history
        document.execCommand('insertText', false, newWord);
        
        // Position cursor after replaced word
        editor.selectionStart = index + newWord.length;
        editor.selectionEnd = index + newWord.length;
    }
    
    hideSuggestions();
    runSpellCheck();
}

function runSpellCheck() {
    if (!spellCheckEnabled || !dictionaryLoaded) return;
    
    const editor = document.getElementById('editorTextarea');
    const text = editor.value;
    
    // Check spelling - results tracked internally
    const misspelled = checkSpelling(text);
    
    if (misspelled.length > 0) {
        // Could add visual highlighting here with overlay
        // For now, just track internally
    }
}

// ---------- Initialize Spell Check ----------
function initSpellCheck() {
    const editor = document.getElementById('editorTextarea');
    
    if (!editor) return;
    
    // Load dictionary
    loadDictionary();
    
    // Initialize word popup (triggered by `.`)
    initWordPopup();
    
    createSuggestionPopup();
    
    // Check spelling on input
    editor.addEventListener('input', () => {
        runSpellCheck();
        hideSuggestions();
    });
    
    // Show suggestions on double-click on misspelled word
    editor.addEventListener('dblclick', (e) => {
        if (!dictionaryLoaded) return;
        
        const text = editor.value;
        const cursorPos = editor.selectionStart;
        
        // Find word at cursor
        const beforeCursor = text.substring(0, cursorPos);
        const afterCursor = text.substring(cursorPos);
        const wordStart = beforeCursor.lastIndexOf(' ') + 1;
        const wordEnd = afterCursor.indexOf(' ');
        const word = text.substring(wordStart, wordEnd === -1 ? text.length : cursorPos + wordEnd);
        
        const cleanWord = word.replace(/[^a-zA-Z']/g, '');
        
        if (cleanWord.length > 2 && !spellDictionary.has(cleanWord.toLowerCase())) {
            showSuggestions(cleanWord, e.clientX, e.clientY + 20);
        }
    });
    
    // Hide suggestions on click elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#spellSuggestionPopup') && !e.target.closest('#editorTextarea')) {
            hideSuggestions();
        }
    });
}