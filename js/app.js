// ---------- DOM elements ----------
const editorTextarea = document.getElementById('editorTextarea');
const clearEditorBtn = document.getElementById('clearEditorBtn');
const copyEditorBtn = document.getElementById('copyEditorBtn');

// ---------- Utility Functions ----------
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showStatusMessage(msg) {
    // Simple status feedback using the note-helper element
    const noteHelper = document.querySelector('.note-helper');
    if (noteHelper) {
        const originalText = noteHelper.textContent;
        noteHelper.textContent = msg;
        noteHelper.style.color = '#2c7a6e';
        setTimeout(() => {
            noteHelper.textContent = originalText;
            noteHelper.style.color = '#6b8b9b';
        }, 1500);
    }
}

// ---------- Editor Functions ----------
function clearEditor() {
    editorTextarea.value = "";
    editorTextarea.focus();
    showStatusMessage("Editor cleared");
}

function copyEditorContent() {
    const content = editorTextarea.value;
    if (!content.trim()) {
        showStatusMessage("Editor is empty");
        return;
    }
    navigator.clipboard.writeText(content).then(() => {
        showStatusMessage("Copied to clipboard — paste into EHR");
    }).catch(() => {
        showStatusMessage("Copy failed");
    });
}

// ---------- Session Management ----------
function restartSession() {
    if (confirm("Start a new patient session? This will clear the editor.")) {
        editorTextarea.value = "";
        showStatusMessage("New session ready");
    }
}

// ---------- Event Listeners ----------
clearEditorBtn.addEventListener('click', clearEditor);
copyEditorBtn.addEventListener('click', copyEditorContent);

// ---------- Initialize ----------
initPhraseEvents();
initSpellCheck();
editorTextarea.value = "";