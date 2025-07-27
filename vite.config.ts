import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  base: "/test-ictconscript-admission",
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
      prerender: {
        // Enable prerendering
        enabled: true,
        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,
        // How many prerender jobs to run at once
        concurrency: 14,
        // Whether to extract links from the HTML and prerender them also
        crawlLinks: true,
        // Number of times to retry a failed prerender job
        retryCount: 2,
        // Delay between retries in milliseconds
        retryDelay: 1000,
        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
    }),
    viteReact(),
  ],
});

export default config;
