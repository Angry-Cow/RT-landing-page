import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    publicDir: "./static",
    base: "./",
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      __SUPABASE_URL__: JSON.stringify(
        env.VITE_SUPABASE_URL || "https://dfchziajttrastbfggii.supabase.co",
      ),
      __SUPABASE_ANON_KEY__: JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY ||
          "sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK",
      ),
      __ANIMA_API_KEY__: JSON.stringify(env.VITE_ANIMA_API_KEY || ""),
    },
  };
});
