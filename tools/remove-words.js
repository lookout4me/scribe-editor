#!/usr/bin/env node

/**
 * Remove Words Tool
 * 
 * Removes words containing specific text from data/words/medical.js
 * 
 * Usage:
 *   node tools/remove-words.js "text"                    (remove words containing "text")
 *   node tools/remove-words.js "text" --exact            (remove only exact matches)
 *   node tools/remove-words.js "text" --dry-run          (show what would be removed)
 *   node tools/remove-words.js --list "text"             (list words containing "text")
 *   node tools/remove-words.js --regex "[0-9]+"          (remove words matching regex)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const EXACT_MATCH = args.includes('--exact');
const LIST_ONLY = args.includes('--list');

// Parse search text or regex
let searchText = null;
let regexPattern = null;

const textIndex = args.findIndex(arg => !arg.startsWith('--'));
if (textIndex !== -1) {
    searchText = args[textIndex];
}

const regexIndex = args.indexOf('--regex');
if (regexIndex !== -1 && args[regexIndex + 1]) {
    regexPattern = args[regexIndex + 1];
}

const MEDICAL_FILE = path.join(__dirname, '../data/words/medical.js');

function loadJsFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            return {};
        }
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/);
        if (match) {
            return JSON.parse(match[1]);
        }
        return {};
    } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
        return {};
    }
}

function writeJsFile(filePath, varName, data) {
    const sorted = Object.keys(data).sort().reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
    }, {});
    
    const content = `window.${varName} = ${JSON.stringify(sorted, null, 4)};`;
    fs.writeFileSync(filePath, content, 'utf8');
}

function removeWords() {
    console.log('🗑️  Remove Words Tool\n');
    
    if (!searchText && !regexPattern) {
        console.log('❌ No search text or regex provided.');
        console.log('');
        console.log('Usage:');
        console.log('  node tools/remove-words.js "text"');
        console.log('  node tools/remove-words.js "text" --exact');
        console.log('  node tools/remove-words.js --regex "[0-9]+"');
        console.log('  node tools/remove-words.js --list "text"');
        return;
    }
    
    const words = loadJsFile(MEDICAL_FILE);
    const totalWords = Object.keys(words).length;
    
    console.log(`📊 Loaded: ${totalWords.toLocaleString()} words\n`);
    
    // Find matching words
    const matches = [];
    let regex = null;
    
    if (regexPattern) {
        try {
            regex = new RegExp(regexPattern, 'i');
            console.log(`🔍 Searching for regex: ${regexPattern}\n`);
        } catch (e) {
            console.error(`❌ Invalid regex: ${regexPattern}`);
            return;
        }
    } else if (EXACT_MATCH) {
        console.log(`🔍 Searching for exact match: "${searchText}"\n`);
    } else {
        console.log(`🔍 Searching for words containing: "${searchText}"\n`);
    }
    
    for (const [key, value] of Object.entries(words)) {
        let found = false;
        
        if (regex) {
            found = regex.test(key) || regex.test(value);
        } else if (EXACT_MATCH) {
            found = key.toLowerCase() === searchText.toLowerCase() || 
                    value.toLowerCase() === searchText.toLowerCase();
        } else {
            found = key.toLowerCase().includes(searchText.toLowerCase()) || 
                    value.toLowerCase().includes(searchText.toLowerCase());
        }
        
        if (found) {
            matches.push({ key, value });
        }
    }
    
    console.log(`📋 Found: ${matches.length.toLocaleString()} matching words\n`);
    
    if (matches.length === 0) {
        console.log('✅ No words found matching criteria.');
        return;
    }
    
    // Show matches
    console.log('📝 Matching words:');
    const sample = matches.slice(0, 50);
    for (const { key, value } of sample) {
        const display = key === value.toLowerCase() ? key : `${key} → ${value}`;
        console.log(`   - "${display}"`);
    }
    if (matches.length > 50) {
        console.log(`   ... and ${(matches.length - 50).toLocaleString()} more`);
    }
    console.log('');
    
    if (LIST_ONLY) {
        console.log('📋 List mode complete. No files were modified.');
        return;
    }
    
    if (DRY_RUN) {
        console.log('🔍 Dry run complete. No files were modified.');
        console.log('Run without --dry-run to apply changes.');
        return;
    }
    
    // Remove words
    for (const { key } of matches) {
        delete words[key];
    }
    
    // Write updated file
    writeJsFile(MEDICAL_FILE, 'medicalWords', words);
    
    console.log('✅ Removal Complete:');
    console.log(`   Removed: ${matches.length.toLocaleString()} words`);
    console.log(`   Remaining: ${Object.keys(words).length.toLocaleString()} words`);
    console.log('');
    console.log(`📁 File updated: ${MEDICAL_FILE}`);
    console.log('💡 Refresh your browser to load the updated dictionary.');
}

removeWords();