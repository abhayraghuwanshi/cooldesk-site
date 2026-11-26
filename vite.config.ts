import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
// `mode` doubles as the site selector:
//   --mode newtab  -> newtab.kazekit.com (browser extension product, a KazeKit tool)
//   anything else  -> cool-desk.com (full suite, default)
export default defineConfig(({ mode }) => {
  const site = mode === "newtab" ? "newtab" : "cooldesk";
  return {
    define: {
      "import.meta.env.VITE_SITE": JSON.stringify(site),
    },
    server: {
      host: "::",
      port: 8080,
    },
    // react-router-dom has no "exports" map, so its /server subpath (used by
    // scripts/prerender.tsx's StaticRouter) and its main entry can otherwise
    // resolve to two separate module instances under vite-node's SSR
    // pipeline — each with its own React context, which breaks useRoutes()
    // ("may be used only in the context of a <Router>"). Forcing it through
    // Vite's own resolver for SSR keeps it to one instance.
    ssr: {
      noExternal: ["react-router-dom"],
    },
    build: {
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
          }
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
