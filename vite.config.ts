import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Lazy import lovable-tagger only in local dev to avoid production build issues
function maybeLovable(mode: string) {
  if (mode === 'development') {
    try {
      // dynamic require to avoid static ESM analysis by esbuild during prod build on Render
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { componentTagger } = require("lovable-tagger");
      return componentTagger();
    } catch (e) {
      console.warn("lovable-tagger disabled:", e?.message || e);
    }
  }
  return null;
}

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [
    react(),
    maybeLovable(mode),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
