#!/usr/bin/env node

/**
 * Filter Words Tool
 * 
 * Removes words of specific lengths from data/words/medical.js
 * 
 * Usage:
 *   node tools/filter-words.js --check                    (show word count by length)
 *   node tools/filter-words.js --remove 1 2               (remove words with 1-2 characters)
 *   node tools/filter-words.js --remove 40                (remove words with 40+ characters)
 *   node tools/filter-words.js --remove 1 2 --dry-run     (show what would be removed)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const CHECK_ONLY = args.includes('--check');

// Parse --remove argument
let minLength = 0;
let maxLength = Infinity;
const removeIndex = args.indexOf('--remove');
if (removeIndex !== -1) {
    if (args[removeIndex + 1]) {
        minLength = parseInt(args[removeIndex + 1], 10);
        if (args[removeIndex + 2] && !isNaN(parseInt(args[removeIndex + 2], 10))) {
            maxLength = parseInt(args[removeIndex + 2], 10);
        } else {
            maxLength = minLength;
        }
    }
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

function getLengthStats(words) {
    const stats = {};
    for (const word of Object.keys(words)) {
        const len = word.length;
        stats[len] = (stats[len] || 0) + 1;
    }
    return stats;
}

function filterWords() {
    console.log('🔍 Filter Words Tool\n');
    
    const words = loadJsFile(MEDICAL_FILE);
    const totalWords = Object.keys(words).length;
    
    console.log(`📊 Loaded: ${totalWords.toLocaleString()} words\n`);
    
    // Show length distribution
    const stats = getLengthStats(words);
    const sortedLengths = Object.keys(stats).map(Number).sort((a, b) => a - b);
    
    console.log('📈 Word Count by Length:');
    console.log('   Length | Count');
    console.log('   -------|-------');
    for (const len of sortedLengths) {
        console.log(`   ${String(len).padStart(6)} | ${stats[len].toLocaleString()}`);
    }
    console.log('');
    
    if (CHECK_ONLY) {
        console.log('Use --remove <min> [max] to filter words.');
        return;
    }
    
    if (removeIndex === -1) {
        console.log('❌ No --remove argument provided.');
        console.log('Usage: node tools/filter-words.js --remove <min> [max]');
        console.log('Example: node tools/filter-words.js --remove 1 2');
        return;
    }
    
    // Find words to remove
    const toRemove = [];
    for (const word of Object.keys(words)) {
        const len = word.length;
        if (len >= minLength && len <= maxLength) {
            toRemove.push(word);
        }
    }
    
    console.log(`🎯 Target: Remove words with length ${minLength}${maxLength !== minLength ? ` to ${maxLength}` : ''}`);
    console.log(`📋 Found: ${toRemove.toLocaleString()} words to remove\n`);
    
    if (toRemove.length === 0) {
        console.log('✅ No words found matching criteria.');
        return;
    }
    
    // Show sample of words to remove
    console.log('📝 Sample words to remove:');
    const sample = toRemove.slice(0, 20);
    for (const word of sample) {
        console.log(`   - "${word}" (${word.length} chars)`);
    }
    if (toRemove.length > 20) {
        console.log(`   ... and ${(toRemove.length - 20).toLocaleString()} more`);
    }
    console.log('');
    
    if (DRY_RUN) {
        console.log('🔍 Dry run complete. No files were modified.');
        console.log('Run without --dry-run to apply changes.');
        return;
    }
    
    // Remove words
    for (const word of toRemove) {
        delete words[word];
    }
    
    // Write updated file
    writeJsFile(MEDICAL_FILE, 'medicalWords', words);
    
    console.log('✅ Filter Complete:');
    console.log(`   Removed: ${toRemove.toLocaleString()} words`);
    console.log(`   Remaining: ${Object.keys(words).length.toLocaleString()} words`);
    console.log('');
    console.log(`📁 File updated: ${MEDICAL_FILE}`);
    console.log('💡 Refresh your browser to load the updated dictionary.');
}

filterWords();