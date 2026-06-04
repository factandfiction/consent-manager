import { defineConfig } from "tsup";

export default defineConfig([
  // ─── Client bundle ────────────────────────────────────────────────────────
  // "use client" is prepended so Next.js recognises the boundary even after
  // tsup merges all source files into a single output file.
  {
    entry: { index: "src/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    external: ["react", "react-dom", "next"],
    banner: {
      js: '"use client";',
    },
    sourcemap: true,
    clean: true,
  },

  // ─── Server bundle ────────────────────────────────────────────────────────
  // No "use client" banner — these helpers run in Server Components and
  // middleware. Importing from "@factandfiction/consent-manager/server" keeps them
  // out of the client bundle entirely.
  {
    entry: { server: "src/server.ts" },
    format: ["cjs", "esm"],
    dts: true,
    external: ["react", "react-dom", "next"],
    sourcemap: true,
  },
]);
