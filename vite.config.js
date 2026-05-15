import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/AdviserSimplicity-Frontend-2.0/",
  plugins: [react()],
  server: {
    host: true, // ← allows access via IP address
    port: 5173, // optional: choose your port
  },
});

//Converted Full Project into Vite Frame Work by copying and Establishing and installing Libraries
