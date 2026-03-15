# Portfolio

A high-performance, responsive portfolio architecture engineered for M. Abhishek Ramesh to document commercial deployments, system engineering capabilities, and operational logistics experience.

## Live Deployment
🟢 **Production Environment:** [Insert Your GitHub Pages or Custom Domain URL Here]

## System Architecture

The UI/UX is built strictly upon **Google Workspace Material Design** principles, ensuring high contrast, accessibility, and an enterprise-grade visual hierarchy. It operates as a zero-dependency static site optimized for rapid core web vitals.

### Technical Stack
* **Frontend:** HTML5, CSS3 (Modular CSS Variables)
* **Logic/Routing:** Vanilla JavaScript (ES6+), jQuery (DOM Manipulation)
* **Data Layer:** Local JSON Fetch API (`skills.json`, `projects.json`)
* **Telemetry:** Google Analytics 4 (GA4)
* **Integrations:** Formspree API (Asynchronous Contact Routing)

### Visual Engines
* `particles.js` - Background node mapping
* `scrollreveal.js` - DOM intersection observer animations
* `vanilla-tilt.js` - 3D card interaction mapping
* `typed.js` - Dynamic text injection

## Repository Structure

```text
├── assets/
│   ├── css/          # Core Material Design stylesheets
│   ├── images/       # Transparent PNGs, vectors, and UI graphics
│   └── js/           # Main logic controllers and animation engines
├── experience/       # Sub-module: Expanded operational work history
├── projects/         # Sub-module: Commercial deployment filtering dashboard
├── index.html        # Root operations dashboard
├── skills.json       # Dynamic data feed for technical stack rendering
├── 404.html          # Fallback routing protocol
└── README.md         # Architecture documentation
