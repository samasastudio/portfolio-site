---
name: theme-factory
description: Toolkit for styling artifacts with cohesive color and font themes. Includes 10 curated themes (Ocean Depths, Sunset Boulevard, Forest Canopy, Modern Minimalist, Golden Hour, Arctic Frost, Desert Rose, Tech Innovation, Botanical Garden, Midnight Galaxy) or generates custom themes on the fly.
---

# Theme Factory

Use this skill to apply consistent, professional styling, cohesive color palettes, and typographic pairings to web pages, UI components, presentations, and documents.

## Curated Preset Themes

1. **Ocean Depths** — Deep maritime navies (`#0A192F`, `#172A45`), seafoam accents (`#64FFDA`), crisp slate text (`#8892B0`, `#CCD6F6`).
2. **Sunset Boulevard** — Warm dusky oranges (`#FF6B6B`, `#FFA07A`), deep twilight purple (`#2D132C`, `#801336`), creamy sand base.
3. **Forest Canopy** — Deep woodland greens (`#1B3022`, `#2C4C38`), sage midtones (`#8F9E8B`), earthy linen paper (`#F5F3E9`), warm rust accents (`#C86D51`).
4. **Modern Minimalist** — Monochromatic ink and paper (`#111111`, `#1A1A1A`), warm off-white (`#F8F8F6`), neutral stone grays (`#737373`, `#E5E5E5`).
5. **Golden Hour** — Rich amber and honey tones (`#D97706`, `#F59E0B`), warm espresso ink (`#29180E`), soft parchment base (`#FFFBEB`).
6. **Arctic Frost** — Icy blues (`#E0F2FE`, `#38BDF8`), deep glacial navy (`#082F49`, `#0C4A6E`), crisp snow white (`#FFFFFF`).
7. **Desert Rose** — Terracotta and clay (`#C2410C`, `#EA580C`), dusty rose accents (`#FB7185`, `#FDA4AF`), warm sandstone (`#FEF3C7`).
8. **Tech Innovation** — Deep obsidian canvas (`#030712`, `#111827`), electric cyan/emerald accents (`#06B6D4`, `#10B981`), futuristic monospace typography.
9. **Botanical Garden** — Olive and eucalyptus greens (`#3F4E4F`, `#2C3639`), floral peach and cream (`#DCD7C9`, `#A27B5C`).
10. **Midnight Galaxy** — Deep cosmic indigo/violet (`#0F0C29`, `#302B63`, `#24243E`), starlight gold/cyan sparks (`#F6E58D`, `#7ED6DF`).

---

## Applying or Creating a Theme

### Step 1: Palette Definition
Define the theme tokens in CSS variables:
```css
:root {
  --bg-primary: #f5f3e9;
  --bg-surface: #ffffff;
  --text-primary: #1b3022;
  --text-muted: #5c6b5e;
  --accent-primary: #c86d51;
  --accent-secondary: #2c4c38;
  --border-subtle: rgba(27, 48, 34, 0.12);
}
```

### Step 2: Typography Pairing
Pair a bold, characterful heading font with an ultra-readable body font and a technical/accent mono font (e.g. Serif Heading + Geometric Sans Body + Monospace Metadata).

### Step 3: On-the-Fly Custom Themes
When none of the preset themes match the project goals, generate a custom 5-color palette (Background, Surface, Text, Accent, Muted) with explicit contrast ratios ($> 4.5:1$ for body text) and save to CSS variables.
