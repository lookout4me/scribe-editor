# 📝 Scribe Editor

**Full-Screen Text Editor for HPI Notes**

A lightweight, browser-based text editor designed for medical professionals to quickly draft **History of Present Illness (HPI)** notes using templates, dotphrases, and spell check, then seamlessly copy-paste them into Electronic Health Record (EHR) systems.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Browser](https://img.shields.io/badge/browser-any-green)

---

## ✨ Features

### Core Features
- **📝 Full-Screen Editor** — Clean, distraction-free text editor for efficient HPI drafting
- **📋 One-Click Copy** — Copy finalized notes directly to clipboard for EHR entry
- **🏥 EHR-Ready Output** — Clean, formatted notes ready to paste directly into Epic, Cerner, or other EHR systems
- **🔒 HIPAA Compliant** — No data storage; nothing is saved locally or transmitted to servers
- **🔄 Session Management** — Clear and reset with a single click for the next patient
- **📱 Responsive Design** — Full-screen layout that adapts to all screen sizes

### Phrases & Templates
- **📝 My Phrases** — Pre-built cardiology templates accessible via button or dotphrase shortcuts
- **⚡ Dotphrase Autocomplete** — Type `..` followed by a phrase code (e.g., `..new-p-ani`, `..lab`, `..ekg`) to auto-insert templates
- **🔍 Placeholder Navigation** — Use Tab/Shift+Tab to jump between `[placeholders]` in templates
- **📋 Quick Insert** — Double-click or select from popup to insert phrases

### Spell Check & Word Suggestions
- **🔤 Medical Spell Check** — Comprehensive medical dictionary with 540,000+ terms (doctors, medications, procedures)
- **💡 Word Suggestions** — Type `.` followed by letters to get word suggestions from the dictionary
- **📊 Real-time Checking** — Continuous spell checking as you type

---

## 📦 Available Phrases

### Templates (dotphrase)
| Code | Description |
|------|-------------|
| `..new-p-ani` | New Patient Template - Dr. Mohammad Ani |
| `..return-p-ani` | Follow-up Patient Template - Dr. Mohammad Ani |
| `..okeefe` | Dr. O'Keefe's Return Patient |
| `..clearance` | Clearance template |
| `..lab` | Full Lab Template |

### Procedures (dotphrase)
| Code | Description |
|------|-------------|
| `..ekg` | EKG |
| `..holter` | Holter Monitor |
| `..echo` | Echocardiogram |
| `..stress` | Nuclear Stress Test |
| `..cath` | Cardiac Cath |
| `..stent` | Stent documentation |
| `..device` | Cardiac Device (Pacemaker/ICD/CRT) |
| `..tavr` | TAVR / Valve |

### Text Phrases (dotphrase)
| Code | Description |
|------|-------------|
| `..pal-racing` | Rapid Heartbeat Palpitations |
| `..pal-irregular` | Irregular or Fluttering Palpitations |
| `..pal-skip` | Skipped Beats or Thumps |
| `..pal-slow` | Slow Heartbeat or Pauses |
| `..pal-brief` | Paroxysmal Palpitations |
| `..pal-trigger` | Triggered Palpitations |

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Edge, Safari, Firefox, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lookout4me/scribe-editor.git
   ```

2. Open the application:
   ```bash
   cd scribe-editor
   open index.html
   ```
   
   Or simply double-click `index.html` to open it in your default browser.

> **No build steps, no dependencies, no server required.**

---

## 📖 How to Use

### Basic Workflow

1. **Type or Use Templates** — Start typing directly, or click `📝 My Phrases` to insert a template
2. **Use Dotphrases** — Type `..` followed by a code (e.g., `..new-p-ani`) to auto-insert templates
3. **Use Word Suggestions** — Type `.` followed by letters to get word suggestions from the medical dictionary
4. **Navigate Placeholders** — Press Tab/Shift+Tab to jump between `[placeholders]` in templates
5. **Fill in Details** — Replace placeholders with patient-specific information
6. **Copy to EHR** — Click `📋 Copy to EHR` to copy your finalized HPI note, then paste directly into your EHR
7. **New Patient** — Click `🗑️ Clear` to reset the editor for the next patient

### Using Phrases

1. **Via Button** — Click `📝 My Phrases` to open the phrase modal
2. **Via Dotphrase** — Type `..` followed by the phrase code (e.g., `..new-p-ani`)
3. **Navigate** — Use ↑↓ arrows to browse, Tab/Enter to select
4. **Fill Placeholders** — After insertion, Tab jumps between `[placeholders]`

### Using Word Suggestions

1. **Type `.`** — Start typing a word after the dot
2. **Browse** — Use ↑↓ arrows to navigate suggestions
3. **Select** — Press Tab to insert the selected word
4. **Cancel** — Press Escape to close the popup

### Controls

| Button | Action |
|--------|--------|
| 📝 My Phrases | Open phrase selection modal |
| 🗑️ Clear | Clear the editor for a new patient |
| 📋 Copy to EHR | Copy editor contents to clipboard |

---

## 🏗️ Architecture

### File Structure

```
scribe-editor/
├── index.html          # Main HTML entry point
├── css/
│   └── style.css       # Styling (responsive, single-panel layout)
├── js/
│   ├── app.js          # Core app logic (editor controls)
│   ├── phrases.js      # Medical phrases/templates, dotphrase autocomplete
│   └── spellcheck.js   # Medical dictionary & word suggestions
├── data/
│   └── words/
│       ├── doctors.js  # Doctor/person names dictionary (1,132 words)
│       └── medical.js  # Medical terms dictionary (540,000+ words)
├── tools/
│   ├── sync-words.js   # Sync words from .bin/data to data/words
│   ├── filter-words.js # Remove words by length
│   └── remove-words.js # Remove words by text/regex
└── README.md           # Documentation
```

### Technology Stack

- **HTML5** — Semantic structure
- **CSS3** — Responsive full-screen layout
- **JavaScript (Vanilla)** — DOM manipulation, clipboard API

### Key Components

- **Header** — App title and branding
- **Editor Panel** — Full-width textarea for editing notes with spell check
- **Phrase Modal** — Quick access to templates and text snippets via search or dotphrases
- **Dotphrase Popup** — Autocomplete suggestions as you type `..` codes
- **Word Popup** — Word suggestions as you type `.` codes

---

## 🎨 Design

### Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Header Background | Dark Teal | `#1a3e44` |
| Accent / Brand | Cardiology Red | `#e03a3e` |
| Primary Button | Forest Green | `#1a6b5e` |
| Background | Soft Blue-Gray | `#eef2f7` |

### Typography

- **Font Family:** Inter, system-ui, -apple-system, Segoe UI, Roboto
- **Monospace (Editor):** SF Mono, monospace

---

## ⚙️ Configuration

The application uses sensible defaults but can be customized by editing the JavaScript files:

### Adding Phrases (js/phrases.js)

Add new phrases to the `phrases` array:

```javascript
{
    type: "Template",  // or "Text"
    description: "Your Phrase Description",
    content: "Your phrase content with [placeholders]",
    dotphrase: "shortcut"  // Type ..shortcut to insert
}
```

### Managing Word Dictionary

Use the tools in the `tools/` directory:

```bash
# Check dictionary stats
node tools/filter-words.js --check

# List words containing "aspirin"
node tools/remove-words.js --list "aspirin"

# Remove words with 2 characters
node tools/filter-words.js --remove 2

# Sync new words from .bin/data
node tools/sync-words.js --merge
```

---

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Edge | ✅ Full |
| Safari | ✅ Full |
| Firefox | ✅ Full |

> **No special permissions required** — works on any modern browser without microphone or camera access.

---

## 📱 Responsive Behavior

- **Desktop** — Full-width editor with comfortable padding
- **Mobile** — Adapted layout with appropriate touch targets

---

## 🔒 Privacy & Security

### HIPAA Compliance

This application is designed with **HIPAA compliance** in mind:

- **No data storage** — Patient information is never saved to disk, database, or local storage
- **No server transmission** — All processing occurs client-side; no data is sent to external servers
- **No cookies or tracking** — No user tracking, analytics, or persistent identifiers
- **Session-only data** — All note data exists only in memory during the active session
- **Complete data disposal** — Closing the browser or clicking Clear immediately clears all data
- **No microphone required** — Works entirely with keyboard input, suitable for restricted clinic environments

### Technical Safeguards

- **No data leaves your browser** — Everything runs client-side
- **No server communication** — No network requests are made
- **No local storage** — Application does not use localStorage, sessionStorage, or cookies
- **Clinic-friendly** — No special permissions needed; works on locked-down hospital computers

> ⚠️ **Note:** While this application is designed to be HIPAA compliant by not storing or transmitting data, organizations should perform their own HIPAA risk assessments before deploying any software in clinical environments.

---

## 🛠️ Development

### Running Locally

```bash
# Option 1: Direct open
open index.html

# Option 2: Python server (if needed)
python3 -m http.server 8000

# Option 3: Node server
npx serve .
```

### Making Changes

- **Styles** — Edit `css/style.css`
- **App Logic** — Edit `js/app.js`
- **Phrases** — Edit `js/phrases.js`
- **Spell Check** — Edit `js/spellcheck.js`
- **Structure** — Edit `index.html`

---

## 📋 Use Cases

- **HPI Documentation** — Draft History of Present Illness notes for patient encounters
- **EHR Entry** — Copy-paste finalized notes directly into Epic, Cerner, Meditech, or other EHR systems
- **Cardiology Consults** — Document cardiac symptoms, history, and clinical findings
- **Rounding Notes** — Efficiently record multi-patient HPI assessments during rounds
- **Urgent Care / ED** — Quickly capture chief complaint and HPI for fast-paced environments
- **Outpatient Clinics** — Streamline visit documentation for clinic patients
- **Restricted Environments** — Works on clinic computers without microphone access

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Inter Font Family** — For clean, modern typography
- **Medical professionals** — For inspiring efficient clinical documentation tools

---

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Ensure you're using a modern web browser

---

<div align="center">

**⚕️ Built for clinicians who value speed, simplicity, and seamless EHR integration**

</div>