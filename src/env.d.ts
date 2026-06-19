/// <reference types="astro/client" />

// cytoscape-fcose ships no bundled types. We don't pull @types/cytoscape-fcose
// (a type-only dep we'd never consume — the import is only handed to
// `cytoscape.use(fcose)`). Declaring the module silences TS7016 on the import.
declare module 'cytoscape-fcose';
