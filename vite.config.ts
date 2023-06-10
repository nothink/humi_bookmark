// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";

import manifest from "./src/manifest.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  test: {
    environment: "happy-dom",
  },
});
