import { defineConfig } from "vite";
import Refina from "vite-plugin-refina";

export default defineConfig({
  server: {
    fs: {
      allow: [".."],
    }
  },
  plugins: [Refina()],
});
