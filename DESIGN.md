---
name: Sam Johnson
description: Japanese library meets American traditional tattoo shop — tactile systems that carry real weight.
colors:
  primary: "#b64c31"
  secondary: "#263b61"
  tertiary: "#d6a934"
  moss: "#4e5d42"
  cedar: "#805b42"
  neutral-bg: "#f2eadc"
  neutral-bg-light: "#faf5ea"
  neutral-bg-deep: "#dfd1bc"
  neutral-ink: "#191b18"
  neutral-line: "rgba(25, 27, 24, 0.24)"
  neutral-soft-line: "rgba(25, 27, 24, 0.12)"
typography:
  display:
    fontFamily: "var(--font-sans), Arial, sans-serif"
    fontSize: "clamp(48px, 6.5vw, 102px)"
    fontWeight: 650
    lineHeight: 0.85
    letterSpacing: "-0.07em"
  headline:
    fontFamily: "var(--font-sans), Arial, sans-serif"
    fontSize: "clamp(35px, 4vw, 66px)"
    fontWeight: 600
    lineHeight: 0.93
    letterSpacing: "-0.052em"
  title:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(17px, 1.5vw, 23px)"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "var(--font-sans), Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "var(--font-mono), monospace"
    fontSize: "9px"
    fontWeight: 400
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  sm: "2px"
  circle: "50%"
  stamp: "50% 48% 46% 54%"
spacing:
  xs: "6px"
  sm: "10px"
  md: "18px"
  lg: "28px"
  xl: "34px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg-light}"
    rounded: "{rounded.stamp}"
    padding: "18px"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
  tab-catalogue:
    backgroundColor: "{colors.neutral-bg-light}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "18px"
  tab-catalogue-active:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral-ink}"
  nav-rail-item:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "13px 12px"
  nav-rail-item-active:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral-bg-light}"
---

# Design System: Sam Johnson

## Overview

**Creative North Star: "Japanese Library Meets American Traditional Tattoo Shop"**

A deliberate paradox representing the act of crawling the labyrinthine web and cutting past hollow complexity to build software systems that carry real weight. The aesthetic merges the disciplined serenity, architectural grid geometry, and tactile paper density of a classical Japanese reading room with the bold, indelible linework, flash pigment palette, and defiant physical presence of traditional tattooing.

Surfaces reject the generic sanitized gloss and purple gradients of ephemeral AI boilerplate. Instead, the interface establishes an uncompromising sense of physical permanence: unbleached washi paper canvases, sumi tattoo ink rules, woodblock cedar frames, and hand-cut flash stamps in vermilion cinnabar, deep indigo, and ochre gold. Micro-structures feel indexed, archived, and measured with surgical typesetting.

**Key Characteristics:**
- Disciplined, tactile, punchy, and indelible; archival precision meeting high-contrast grit.
- Flat paper planes layered with hard-edge offset drop shadows (zero diffuse blurry elevation).
- Typographic tri-system: tight-tracked display sans, literary Georgia serif italics, and uppercase monospace micro-indices.
- Asymmetrical hand-stamped badges rotated off-axis against rigid structural layout grids.
- Visible tactile noise texture (`mix-blend-mode: multiply`) applied across the entire viewport.

## Colors

The palette draws strictly from flash pigments and archival paper stocks: indelible vermilion and gold accents anchored by deep indigo and sumi ink on warm unbleached paper.

### Primary
- **Vermilion Cinnabar** (#b64c31): The primary flash pigment. Applied to primary call-to-action stamps, emphasis numerals, live accent borders, and brand badges. Represents high-visibility commitment.

### Secondary
- **Deep Indigo** (#263b61): The structural ink tone. Applied to active navigation tabs, major featured system cards, toolsets, and dark-mode monolithic containers. Provides architectural weight.

### Tertiary
- **Ochre Gold** (#d6a934): The flash highlight. Applied to card catalogue active states, star badges (`✦`), circular card seals, and signal indicator beacons.

### Accents
- **Sumi Pine Moss** (#4e5d42): Applied to live operational status indicators and DX capability blocks. Darkened to maintain WCAG AA contrast against washi paper.
- **Aged Cedar** (#805b42): Warm woodblock casing surrounding the primary brand emblem field.

### Neutral
- **Washi Rice Paper** (#f2eadc): The root background canvas; tactile, warm, unbleached, and glare-free.
- **Clean Sheet Paper** (#faf5ea): Elevated resting container surface for cards, reading panels, and interactive elements.
- **Cardstock Deep** (#dfd1bc): Grounding tonal shade for manifesto blocks, offset drop shadows, and resting tab bars.
- **Sumi Tattoo Ink** (#191b18): Dense, uncompromising black for typography, structural borders, and active drop shadows.
- **Hairline Rule** (rgba(25, 27, 24, 0.24)): Outer architectural frame borders and sectional divider grids.
- **Ghost Rule** (rgba(25, 27, 24, 0.12)): Interior column splits and sub-item delimiters.

### Named Rules
**The Flash Rarity Rule.** Vermilion Cinnabar (#b64c31) and Ochre Gold (#d6a934) are high-potency flash pigments. They must occupy ≤10% of any given viewport surface; their rarity preserves their indelible impact.

**The No-Faux-White Rule.** Pure digital white (#ffffff) is strictly prohibited as a background or surface tone. All white space must breathe through warm, unbleached paper stocks (#f2eadc, #faf5ea).

## Typography

The typographic hierarchy combines three distinct voices: an authoritative tight-tracked sans for structural declarations, Georgia serif italics for human reflection, and uppercase monospace micro-labels for navigational and temporal coordinates.

**Display Font:** Geist Sans (`--font-sans`), with Arial fallback.
**Body Font:** Geist Sans (`--font-sans`), with Arial fallback.
**Emphasis/Serif Font:** Georgia, "Times New Roman", serif.
**Label/Mono Font:** Geist Mono (`--font-mono`), with monospace fallback.

**Character:** Technical discipline punctuated by literary warmth and archival taxonomy.

### Hierarchy
- **Display** (Weight 650, `clamp(48px, 6.5vw, 102px)`, Line-height 0.85, Letter-spacing -0.07em): Hero headlines and stage banners. Dense, architectural, and commanding.
- **Headline** (Weight 600, `clamp(35px, 4vw, 66px)`, Line-height 0.93, Letter-spacing -0.052em): Featured system card titles and secondary section leads.
- **Title** (Weight 400, `clamp(17px, 1.5vw, 23px)`, Line-height 1.08): Georgia serif archive project listings and catalogue titles.
- **Body** (Weight 400, 14px, Line-height 1.62): Explanatory paragraphs, case study narratives, and reading room manifesto copy (max line length 65–75ch).
- **Label** (Weight 400, 9px, Letter-spacing 0.12em, Uppercase): Coordinates, index numbers (`01/02/03`), timestamps, status beacons, and ticker items.

### Named Rules
**The Accessible Linotype Rule.** Monospace micro-labels must maintain an accessible floor of 8.5px–10px; sub-8px text is strictly prohibited. Archival density is achieved through generous tracking (`0.12em`) and muted ink opacity, ensuring WCAG AA legibility while preserving catalog taxonomy.

**The Zero-Pulsing-Dot Rule.** Surfaces reject decorative blinking dots and ambient gradient halos. Status indicators are steady, high-contrast marks; animations are reserved solely for genuinely live streaming data channels.

**The Soul in Italics Rule.** Emotional resonance, philosophical stances, and visual emphasis belong in Georgia serif italics (`em`), creating a tactile dialogue with the rigid sans frame.

## Layout

The spatial model is inspired by architectural partition screens (shōji) and physical library shelving: full-viewport master grids subdivided by hairline ink rules.

- **Master Frame Grid:** Fixed viewport shell (`100vw` / `100dvh`, min-height `660px`) divided into:
  - TopBar: `68px` high spanning columns 1 and 2.
  - NavRail: `194px` wide vertical column on the left.
  - Stage: Flexible center canvas (`1fr`).
  - Footer: `38px` high spanning columns 1 and 2.
- **Responsive Adaptability (≤900px):** Transitions from fixed viewport grid to natural vertical document flow:
  - TopBar condenses to `56px`.
  - NavRail converts to a horizontal scrolling ticket ribbon (`56px` high).
  - Stage expands to natural height with touch-friendly paddings.
  - Footer drops ticker text to preserve copyright and contact anchors.
- **Padding & Density:** Compact 10px–12px master margins; internal component paddings range from dense 8px micro-shelves to spacious 34px reading manifesto pads.

## Elevation & Depth

Surfaces live on physical paper sheets and cardstock planes. Elevation is communicated entirely through tonal layering, hairline borders, and hard physical offset drop shadows. Fuzzy, blurry, ambient drop shadows are completely absent.

### Shadow Vocabulary
- **Resting Catalogue Tab Offset** (`4px 4px 0 var(--paper-deep)`): Gives interactive archive cards physical substance lifting off the desk canvas.
- **Hover Lift Offset** (`1px 6px 0 var(--paper-deep)`): Snappy translation (`translate(3px, -3px)`) mimicking a thumb peeling back a library index card.
- **Active Selection Stamp** (`5px 5px 0 var(--ink)`): High-contrast ink shadow stamping the selected catalogue item firmly into the desk.
- **Status Pulse Halo** (`0 0 0 5px rgba(103, 116, 90, 0.12)`): Tonal ring expanding outward from live indicator beacons.

### Named Rules
**The Indelible Offset Rule.** Shadows must have a blur radius of exactly 0px. Elevation is a physical offset cut with a sharp edge, never a blurred Gaussian haze.

**The Tactile Grain Rule.** The entire interface carries an ambient fractal noise overlay (`mix-blend-mode: multiply`, opacity 0.23) fixed over the viewport, grounding digital pixels into raw physical paper fibers.

## Shapes

Form language balances razor-sharp Japanese structural joinery with organic American traditional tattoo flash stamps.

- **Architectural Primitives:** Outer containers, project cards, navigation rails, and modal frames use crisp 2px border radii (`border-radius: 2px`) or unrounded borders (`border-radius: 0px`).
- **Signature Stamp Radii:** Call-to-action badges and center insignias use deliberate asymmetrical border radii (`50% 48% 46% 54%`, `50% 47% 52% 45%`) with a 4°–9° off-axis tilt (`transform: rotate(-4deg)`), evoking hand-pressed wax seals and linocut stamps.
- **Double Hairlines:** Feature stamps and project cards incorporate double-line borders (`4px double` or `inset 1px` frames) mimicking vintage ledger books.

## Components

### Buttons & Round Links
- **Shape:** Asymmetrical hand-cut stamp radius (`50% 48% 46% 54%`), rotated -4°.
- **Primary:** Vermilion Cinnabar (#b64c31) fill, Clean Sheet Paper text, 18px padding, internal hairline ring inset 6px.
- **Hover / Focus:** Transitions to rotate(2deg) translate(4px, -5px) with Deep Indigo (#263b61) fill via `cubic-bezier(.16, 1, .3, 1)`.

### Project Catalogue Tabs
- **Shape:** 2px border radius with `4px 4px 0 var(--paper-deep)` resting offset shadow.
- **Background:** Clean Sheet Paper (#faf5ea) resting; transforms to Ochre Gold (#d6a934) with Sumi Ink (#191b18) border and `5px 5px 0 var(--ink)` shadow when active (`aria-selected="true"`).
- **Internal Padding:** 18px grid layout with uppercase monospace metadata and Georgia serif title.

### Navigation Rail Items
- **Shape:** 2px border radius with 4px left indicator stripe (`::before`).
- **States:** Resting transparent background; hover slides `translateX(3px)` over Clean Sheet Paper; active state fills with Deep Indigo (#263b61) with Vermilion Cinnabar stripe and Ochre Gold numeral.

### Feature System Card
- **Corner Style:** 2px radius with Deep Indigo (#263b61) background.
- **Interior Framing:** Hairline border inset 11px (`rgba(250,245,234,0.22)`).
- **Embellishments:** Gold star glyph (`✦`) in top right, circular rotated stamp seal in bottom right.

### Vertical Capability Shelves
- **Structure:** Monolithic vertical color blocks (Deep Indigo, Vermilion Cinnabar, Sumi Pine Moss) with vertical writing mode (`writing-mode: vertical-rl`) and uppercase monospace tracking.

## Do's and Don'ts

### Do:
- **Do** maintain the master paper and ink contrast ratio across all new surfaces.
- **Do** use hard offset drop shadows (`4px 4px 0`) with zero blur radius for elevated cards.
- **Do** pair tight-tracked sans display typography with Georgia serif italics for reflective emphasis.
- **Do** keep monospace metadata at an accessible 8.5px–10px floor with generous letter-spacing (`0.12em`).
- **Do** rotate signature stamp seals off-axis (-4° to -8°) to preserve the human, hand-pressed character.

### Don't:
- **Don't** use diffuse, blurred Gaussian drop shadows or glow effects anywhere in the system.
- **Don't** introduce decorative pulsing dots, blinking indicators, or ambient gradient halos.
- **Don't** use pure digital white (#ffffff) or sterile corporate grays (#f3f4f6, #9ca3af) for background canvas.
- **Don't** introduce generic floating rounded pills (`rounded-full`) for rectangular buttons or cards.
- **Don't** use arbitrary inline color strings; always reference established CSS variables or design tokens.
- **Don't** create purple-on-white gradients or generic AI-slop visual tropes.
