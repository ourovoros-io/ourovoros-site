# ourovoros-site

The Ourovoros.io website. A static, dark-technical marketing site that positions
Ourovoros as two senior engineers specializing in systems design and low-level
efficiency, with the public open-source tooling as the concrete proof of work.

## Stack

- [Astro](https://astro.build) (static output) + TypeScript (`strictest`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Self-hosted fonts: Bricolage Grotesque (display), Hanken Grotesk (body),
  JetBrains Mono (technical labels)
- `oxlint` + `oxfmt` for lint/format

## Develop

```sh
pnpm install
pnpm dev          # local dev server
pnpm build        # typecheck (astro check) + static build to dist/
pnpm preview      # serve the built site
pnpm lint         # oxlint
pnpm fmt          # oxfmt (use fmt:check in CI)
```

## How the tooling grid works

`src/lib/github.ts` fetches the public `ourovoros-io` repositories from the
GitHub REST API **at build time**, in Astro frontmatter. The deployed site
ships a static repo list — no client-side API calls, no rate-limit exposure for
visitors. A rebuild refreshes stars and descriptions. Set `GITHUB_TOKEN` in the
build environment to raise the rate limit in CI.

## Portraits

The collective portraits are ASCII art generated from real photos
(`public/team/*.jpg`) into `src/data/ascii/*.txt`, rendered in a monospace
`<pre>` whose glyph size is tied to its card width with container-query units so
it always fits.

## Content to finalize

See `docs/plans/2026-06-13-ourovoros-redesign-design.md` for the full design and
the open items (team bios/links, photo→person mapping, contact email, hosting).
