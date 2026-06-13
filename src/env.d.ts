/// <reference types="astro/client" />

// Fontsource packages are CSS-only side-effect imports with no bundled type
// declarations; this satisfies TypeScript's strictest mode without disabling it.
declare module "@fontsource-variable/*";
