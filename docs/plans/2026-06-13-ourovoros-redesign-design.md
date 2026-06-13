# Ourovoros.io Redesign — Design Document

Date: 2026-06-13
Status: Validated, ready for implementation

## Goal

Replace the current WordPress/Elementor marketing site with a fast, static,
dark-technical site that positions Ourovoros honestly: two senior engineers
specializing in systems design and low-level efficiency. The only concrete work
shown is the public GitHub tooling. Audit history is background credibility, not
a service offering.

## Positioning

Headline:

> Two senior engineers specializing in systems design and low-level efficiency.

Sub:

> We take novel ideas and turn them into correct, efficient systems.

### Tone

Understated and factual. No superlatives, no aggressive sales language. Avoid
"leading", "elite", "best-in-class", "world-class". The work and the public
repos carry the weight; the copy states facts and links to proof.

### What is and is not on the site

- **On the site:** capabilities described in the abstract (systems design,
  low-level efficiency, delivering novel ideas); the public GitHub repos as the
  only concrete work; a factual "500+ audits behind us" credibility line.
- **Not on the site:** any client project. The AI authentication protocol, the
  Bittensor confidential storage work, and multi-chain monitoring are client
  property and do not appear — not by name and not by veiled reference.

## Information Architecture

Single-page scroll plus sub-pages.

1. **Hero** — ouroboros mark, headline, sub, one primary CTA ("Start a project"),
   secondary text link ("View our tooling").
2. **Proof bar** — quiet monospace credibility: `500+ audits behind us` ·
   `Multi-chain` · `Systems design` · `Open source`.
3. **From audit to build** — short factual narrative: years auditing protocols
   across Ethereum and other chains; today that discipline goes into building.
4. **What we do** — two pillars:
   - `01 / SYSTEMS DESIGN` — architecting novel protocols and systems from the
     ground up.
   - `02 / LOW-LEVEL EFFICIENCY` — performance-critical engineering, in Rust and
     at the compiler/tooling level.
5. **Open-source tooling** (centerpiece) — live repo cards from the GitHub API.
   Flagships first (`sway-analyzer`, `charcoal`, `dyno`), then the rest.
6. **The collective** — Georgios + Camden. ASCII/pixel terminal-style portraits,
   factual one-line bios, GitHub/X links. The two engineers are the
   differentiator, so this section is prominent.
7. **Contact** — single email field + short message, or plain `mailto:`.
   Footer: ouroboros mark, nav, `© 2026 Ourovoros.io`.

Sub-pages: `/tooling` (full repo index). `/work` optional, deferred.

Through-line: two senior engineers -> proven rigor (audits) -> specialty
(systems design + low-level efficiency) -> evidence (public tooling).

## Visual System

Dark, restrained, engineering-grade. Credibility from typography and spacing,
not effects.

### Color

- Background `#0A0B0D`; raised surface `#131519`
- Text `#E6E8EB` primary, `#8B9099` muted
- Single accent `#3FB68B` (calm desaturated teal/green, nods to terminal/Sway
  heritage) — links, active repo card, CTA only
- Borders/hairlines `#22262C`

### Typography

- Headings + body: Inter (or Geist), self-hosted
- Code/labels/stats/section numbers: JetBrains Mono (or Geist Mono), self-hosted
- Self-hosted fonts only — no third-party font calls

### Texture & motion

- Subtle low-contrast dotted-grid / hairline background
- Restrained reveal-on-scroll; no parallax
- Ouroboros mark may do a single slow rotation on hero load
- Signature elements: monospace numbered section labels; ASCII-portrait
  treatment for the two engineers

## Public Repos (proof content)

Source: https://github.com/ourovoros-io (16 public repos). Flagships:

- `sway-analyzer` (Rust) — security-focused static analyzer for Sway
- `charcoal` (Rust) — Solidity -> Sway translator
- `dyno` (Rust) — Fuel compiler dynamometer
- `dynosite` (Rust) — Fuel Dynosite site generator
- `wonder-sway` (Rust) — a developer's journey into Fuel
- Sway libraries: `base64`, `deci-mate`, `sway-hashmap`, `sway-ast-stubs`
- Tooling/infra: `sway-sublime-hl`, `etherscan-rs`, `cryptoprices-rs`,
  `http-file-server`

Cards show: name, description, language, stars, last-updated. Sorted flagships
first then by stars.

## Tech Stack

- **Astro** (latest stable), static output
- **TypeScript**, strict config (per global standards)
- **Tailwind** via `@tailwindcss/vite`
- Lint/format/types: `oxlint`, `oxfmt`, `tsc --noEmit`
- Self-hosted Inter + JetBrains Mono
- GitHub REST API fetched **at build time** in Astro frontmatter; the deployed
  site ships static JSON. A rebuild refreshes stars/descriptions. No client-side
  API calls, no rate-limit exposure.

### Hosting

Static output, provider-agnostic. The user has an existing provider (TBD). Build
must produce a plain static `dist/` deployable anywhere.

### Project structure

```
src/
  components/  Hero, ProofBar, Pillars, ToolingGrid, RepoCard, Collective, Contact
  layouts/     Base.astro
  lib/         github.ts (build-time repo fetch)
  pages/       index.astro, tooling.astro
  styles/
public/        ouroboros.svg, favicon.svg, team/ (ASCII portraits)
```

## Assets

Downloaded from the current site into `public/`:

- `public/ouroboros.svg` — the ouroboros mark
- `public/favicon.svg`
- `public/team/team3.jpg` (800x800) and `public/team/untitled.jpg` (699x837) —
  source portraits to convert to ASCII/pixel style. Mapping (which is Georgios,
  which is Camden) to be confirmed.

## Build Phases

1. Scaffold Astro + TS + Tailwind + oxlint/oxfmt; design tokens (colors, fonts)
2. Base layout + Hero + Proof bar
3. Pillars + "from audit to build" narrative
4. GitHub build-time fetch + Tooling grid/cards
5. Collective (ASCII portraits) + Contact
6. Polish: responsive, motion, meta/OG tags, Lighthouse pass
7. Deploy to chosen provider

## Open Items

- Confirm one-line bios and links (GitHub/X/LinkedIn) for Georgios and Camden
- Confirm photo -> person mapping for the two portraits
- Hosting provider (user to supply)
