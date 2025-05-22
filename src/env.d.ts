// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vite/client" />
/// <reference types="../config/types.d.ts" />

declare namespace App {
  // Note: 'import {} from ""' syntax does not work in .d.ts files.
  interface Locals {
    user: import('better-auth').User | null;
    session: import('better-auth').Session | null;
  }
}
