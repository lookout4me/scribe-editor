#!/usr/bin/env node

/**
 * Sync Words Tool
 * 
 * Syncs words from .bin/data/medical.json and .bin/data/doctor.json
 * to data/words/medical.js and data/words/doctors.js
 * 
 * Usage:
 *   node tools/sync-words.js
 *   node tools/sync-words.js --check    (just show stats, don't write)
 *   node tools/sync-words.js --merge    (merge new words into existing files)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const MERGE_MODE = args.includes('--merge');

// File paths
const BIN_DOCTOR = path.join(__dirname, '../.bin/data/doctor.json');
const BIN_MEDICAL = path.join(__dirname, '../.bin/data/medical.json');
const OUT_DOCTORS = path.join(__dirname, '../data/words/doctors.js');
const OUT_MEDICAL = path.join(__dirname, '../data/words/medical.js');

function loadJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return {};
        }
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.trim()) {
            console.log(`⚠️  File is empty: ${filePath}`);
            return {};
        }
        return JSON.parse(content);
    } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
        return {};
    }
}

function loadJsFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return {};
        }
        const content = fs.readFileSync(filePath, 'utf8');
        // Extract the object from "window.varName = {...}"
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

function normalizeKey(word) {
    return word.toLowerCase().trim();
}

function formatValue(word) {
    // Keep original casing if it has mixed case, otherwise capitalize
    if (word === word.toUpperCase() || word === word.toLowerCase()) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
}

function syncWords() {
    console.log('📚 Word Sync Tool\n');
    console.log('Loading files...\n');
    
    // Load source files from .bin/data
    const binDoctors = loadJsonFile(BIN_DOCTOR);
    const binMedical = loadJsonFile(BIN_MEDICAL);
    
    // Load existing output files
    const existingDoctors = loadJsFile(OUT_DOCTORS);
    const existingMedical = loadJsFile(OUT_MEDICAL);
    
    // Count words
    const binDoctorCount = Object.keys(binDoctors).length;
    const binMedicalCount = Object.keys(binMedical).length;
    const existingDoctorCount = Object.keys(existingDoctors).length;
    const existingMedicalCount = Object.keys(existingMedical).length;
    
    console.log('📊 Current Stats:');
    console.log(`   .bin/data/doctor.json:  ${binDoctorCount.toLocaleString()} words`);
    console.log(`   .bin/data/medical.json: ${binMedicalCount.toLocaleString()} words`);
    console.log(`   data/words/doctors.js:  ${existingDoctorCount.toLocaleString()} words`);
    console.log(`   data/words/medical.js:  ${existingMedicalCount.toLocaleString()} words`);
    console.log('');
    
    if (CHECK_ONLY) {
        // Find new words
        let newDoctors = 0;
        let newMedical = 0;
        
        for (const key of Object.keys(binDoctors)) {
            if (!existingDoctors[normalizeKey(key)]) {
                newDoctors++;
            }
        }
        
        for (const key of Object.keys(binMedical)) {
            if (!existingMedical[normalizeKey(key)]) {
                newMedical++;
            }
        }
        
        console.log('🆕 New Words Available:');
        console.log(`   Doctors: ${newDoctors.toLocaleString()} new words`);
        console.log(`   Medical: ${newMedical.toLocaleString()} new words`);
        console.log('');
        console.log('Run without --check to sync words.');
        return;
    }
    
    // Merge words
    console.log('🔄 Syncing words...\n');
    
    if (MERGE_MODE) {
        // Merge: Add new words to existing
        let addedDoctors = 0;
        let addedMedical = 0;
        
        for (const [key, value] of Object.entries(binDoctors)) {
            const normalized = normalizeKey(key);
            if (!existingDoctors[normalized]) {
                existingDoctors[normalized] = formatValue(value || key);
                addedDoctors++;
            }
        }
        
        for (const [key, value] of Object.entries(binMedical)) {
            const normalized = normalizeKey(key);
            if (!existingMedical[normalized]) {
                existingMedical[normalized] = formatValue(value || key);
                addedMedical++;
            }
        }
        
        writeJsFile(OUT_DOCTORS, 'doctorsWords', existingDoctors);
        writeJsFile(OUT_MEDICAL, 'medicalWords', existingMedical);
        
        console.log('✅ Sync Complete:');
        console.log(`   Doctors: Added ${addedDoctors.toLocaleString()} new words`);
        console.log(`   Medical: Added ${addedMedical.toLocaleString()} new words`);
        console.log(`   Total doctors: ${Object.keys(existingDoctors).length.toLocaleString()}`);
        console.log(`   Total medical: ${Object.keys(existingMedical).length.toLocaleString()}`);
    } else {
        // Replace: Use .bin/data as source of truth
        const mergedDoctors = { ...existingDoctors };
        const mergedMedical = { ...existingMedical };
        
        for (const [key, value] of Object.entries(binDoctors)) {
            const normalized = normalizeKey(key);
            mergedDoctors[normalized] = formatValue(value || key);
        }
        
        for (const [key, value] of Object.entries(binMedical)) {
            const normalized = normalizeKey(key);
            mergedMedical[normalized] = formatValue(value || key);
        }
        
        writeJsFile(OUT_DOCTORS, 'doctorsWords', mergedDoctors);
        writeJsFile(OUT_MEDICAL, 'medicalWords', mergedMedical);
        
        console.log('✅ Sync Complete:');
        console.log(`   Doctors: ${Object.keys(mergedDoctors).length.toLocaleString()} words`);
        console.log(`   Medical: ${Object.keys(mergedMedical).length.toLocaleString()} words`);
    }
    
    console.log('');
    console.log('📁 Files updated:');
    console.log(`   ${OUT_DOCTORS}`);
    console.log(`   ${OUT_MEDICAL}`);
}

syncWords();