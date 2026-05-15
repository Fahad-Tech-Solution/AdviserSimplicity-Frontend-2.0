import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoBase = "/AdviserSimplicity-Frontend-2.0/";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : repoBase,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}));

//Converted Full Project into Vite Frame Work by copying and Establishing and installing Libraries
