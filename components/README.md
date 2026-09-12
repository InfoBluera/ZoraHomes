# Zora Homes — Architectural Component Design System

This directory documents the modular component hierarchy and UI architecture for the **Zora Homes** elite web platform.

## Architecture Structure

```
ZORA_HOME/
├── index.html                 # Core semantic HTML5 application & Schema.org metadata
├── assets/
│   ├── logo/
│   │   └── logo.png           # Master brand logo mark & browser favicon
│   ├── css/
│   │   ├── variables.css      # Luxury color tokens, typography & spacing variables
│   │   ├── main.css           # Core layout, reset, standardized navbar, hero & responsive grid
│   │   ├── components.css     # Team cards, service modules, estimator, quiz, modals
│   │   └── animations.css     # Keyframes, hover micro-interactions, scroll reveals
│   └── js/
│       ├── main.js            # Navbar scroll observer, theme toggle, counter engine
│       ├── interactions.js    # Interactive Scope Estimator, Style Quiz, FAQ accordion
│       └── modal-form.js      # Luxury Booking Modal, input validation & toast feedback
└── components/
    └── README.md              # UI/UX documentation & pattern library
```

---

## Contact & Social Integration
- **Primary Contact Email**: `contact@zorahomes.in`
- **Official Instagram**: [https://www.instagram.com/zora.homes_?stkn=dmNzdTlvbm9sbGJx](https://www.instagram.com/zora.homes_?stkn=dmNzdTlvbm9sbGJx)

---

## Key Component Modules

### 1. Header & Navigation (`.site-header`)
- **Logo Graphic**: Direct asset path `assets/logo/logo.png` with explicit dimension constraints (`width: 44px; height: 44px`) to eliminate Cumulative Layout Shift (CLS).
- **Alignment Geometry**: Standardized flex alignment (`display: flex; align-items: center; justify-content: space-between;`) with `white-space: nowrap;` on all labels.
- **Ergonomic CTA**: `.btn-primary-luxury.btn-sm` constrained to match the 38px baseline height of navigation icons for vertical symmetry.
- **Social Integration**: Dedicated Instagram link icon in the navigation action bar.

### 2. Leadership & Creator Cards (`.team-card`)
- **Sachin (Founder)**: Spatial symmetry, ultra-luxury residential estate development, and client equity value maximization.
- **Devika (Architect)**: Structural engineering innovation, biophilic living choreography, LEED-accredited design.
- **Abijith (Interior Designer)**: Haute-couture material curation, bespoke millwork, Italian marble sourcing.

### 3. Signature Execution Blueprint (`.process-timeline`)
- 5-step numbered chronological roadmap:
  1. *01 Discovery & Spatial Vision*
  2. *02 3D Hyper-Realistic Immersion*
  3. *03 Rare Material Procurement*
  4. *04 Turnkey Precision Engineering*
  5. *05 Curated White-Glove Handover*

### 4. Bespoke Project Scope & Investment Estimator (`.estimator-wrapper`)
- Real-time reactive budget computation:
  - Dynamic Slider: $1,500 - $15,000+ sq ft
  - Tier Selection: Signature Executive ($180/sq ft), Haute Luxury ($290/sq ft), Bespoke Architectural Masterpiece ($460/sq ft)
  - Addon Multipliers: Smart Home Automation, Custom Millwork, Biophilic Courtyard
  - Instant Breakdown: Architectural Fee, Materials Procurement, Master Craftsmanship

### 5. Architectural Style Identity Quiz (`.quiz-box`)
- 3-step interactive preference engine matching clients with:
  - Haute Architectural Minimalism
  - Neoclassical Contemporary Grandeur
  - Organic Biophilic Sanctuary
  - Urban Penthouse Brutalism

### 6. Tactile Material & Palette Library (`.materials-grid`)
- Showcase of Calacatta Gold Marble (Carrara, Italy), Fluted American Walnut (Appalachia, USA), Brushed Champagne Brass (Milan, Italy), and Raw Roman Travertine (Tivoli, Italy).

### 7. VIP Consultation Booking Modal & Toast Notification (`.modal-overlay`, `.toast-notification`)
- Client-side validation, direct contact routing to `contact@zorahomes.in`, accessible keyboard traps, and champagne gold toast alerts.
