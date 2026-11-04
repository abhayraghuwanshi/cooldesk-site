// Build-time static prerendering.
//
// This is a pure client-rendered SPA — nothing but an empty <div id="root">
// exists in the HTML until React runs. Most AI/answer-engine crawlers
// (GPTBot, ClaudeBot, PerplexityBot) and a good chunk of classic search
// crawling don't reliably execute JS, so every route beyond the homepage was
// effectively invisible to them. This script renders every known route to
// real HTML (via react-dom/server) after `vite build` and writes it to
// dist/<route>/index.html, with the correct <title>/meta/JSON-LD baked in —
// no headless browser needed, since react-dom/server does the same render
// the client would, synchronously, in plain Node.
//
// Run via `vite-node` (not plain node) so it gets the exact same TS/JSX/`@/`
// alias/`?raw` resolution as the app itself — see package.json's `build` script.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PassThrough } from "node:stream";
import { fileURLToPath } from "node:url";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "../src/AppRoutes";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { blogPosts } from "../src/config/blogs";
import { ssrHead, ssrJsonLd } from "../src/lib/ssrHead";
import { comparisons } from "../src/pages/Versus";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const templatePath = join(distDir, "index.html");

if (!existsSync(templatePath)) {
    console.error("[prerender] dist/index.html not found — run `vite build` first.");
    process.exit(1);
}

// Read the pristine build output once, before anything (including the "/"
// route) overwrites dist/index.html — every route renders from this same
// in-memory template.
const template = readFileSync(templatePath, "utf8");

const rootDivMatch = template.match(/<div id="root">[\s\S]*?<\/div>/);
if (!rootDivMatch) {
    console.error('[prerender] Could not find `<div id="root">...</div>` in dist/index.html — template shape changed?');
    process.exit(1);
}
const rootDivMarker = rootDivMatch[0];

function escapeHtml(str: string) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function replaceTag(html: string, pattern: RegExp, replacement: string) {
    return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

// Routes with no params, mirroring AppRoutes.tsx (minus the pure redirects
// and the catch-all NotFound, which have nothing worth prerendering).
const staticRoutes = [
    "/",
    "/pricing",
    "/getting-started",
    "/founder",
    "/under-the-hood",
    "/gallery",
    "/contact",
    "/privacy-details",
    "/terms",
    "/releases",
    "/widgets",
    "/features",
    "/new-tab",
    "/browser",
    "/shell",
    "/clipboard",
    "/file-manager",
    "/dock",
    "/sidebar",
    "/spotlight",
    "/uninstall",
    "/vs",
    "/resources",
];

const comparisonRoutes = Object.keys(comparisons).map((slug) => `/vs/${slug}`);
// Entries with `href` are link-only cards pointing at /vs/... — no /blog/:slug page exists for them.
const blogRoutes = blogPosts.filter((p) => !p.href).map((p) => `/blog/${p.slug}`);

const routes = [...staticRoutes, ...comparisonRoutes, ...blogRoutes];

function routeToFilePath(route: string) {
    if (route === "/") return join(distDir, "index.html");
    const clean = route.replace(/^\/+/, "");
    return join(distDir, clean, "index.html");
}

// AppRoutes.tsx lazy-loads BlogPost.tsx (see its comment — that page alone
// pulls in react-markdown/remark-gfm/react-syntax-highlighter), which means
// plain synchronous renderToString would either throw or capture the
// Suspense fallback instead of real content. renderToPipeableStream +
// onAllReady waits for every Suspense boundary to actually resolve before we
// read the output, so prerendered blog posts still get their full HTML.
function renderToStringAsync(element: ReactNode): Promise<string> {
    return new Promise((resolve, reject) => {
        let html = "";
        const sink = new PassThrough();
        sink.on("data", (chunk) => {
            html += chunk;
        });
        sink.on("end", () => resolve(html));
        sink.on("error", reject);

        const { pipe } = renderToPipeableStream(element, {
            onAllReady() {
                pipe(sink);
            },
            onError(err) {
                reject(err);
            },
        });
    });
}

const prerendered: string[] = [];

for (const route of routes) {
    ssrHead.current = null;
    ssrJsonLd.length = 0;

    const queryClient = new QueryClient();
    const bodyHtml = await renderToStringAsync(
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <StaticRouter location={route}>
                    <AppRoutes />
                </StaticRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );

    const head = ssrHead.current;
    if (!head || !head.title) {
        console.warn(`[prerender] SKIP ${route} — no <SEO> title was captured (route mismatch?)`);
        continue;
    }

    let html = template;

    html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(head.title)}</title>`);
    if (head.description) {
        html = replaceTag(
            html,
            /<meta name="description" content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escapeHtml(head.description)}" />`
        );
        html = replaceTag(
            html,
            /<meta property="og:description" content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${escapeHtml(head.description)}" />`
        );
        html = replaceTag(
            html,
            /<meta name="twitter:description" content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`
        );
    }
    html = replaceTag(
        html,
        /<meta property="og:title" content="[^"]*"\s*\/>/,
        `<meta property="og:title" content="${escapeHtml(head.title)}" />`
    );
    html = replaceTag(
        html,
        /<meta name="twitter:title" content="[^"]*"\s*\/>/,
        `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`
    );
    if (head.canonical) {
        html = replaceTag(
            html,
            /<meta property="og:url" content="[^"]*"\s*\/>/,
            `<meta property="og:url" content="${escapeHtml(head.canonical)}" />`
        );
    }

    // robots + canonical aren't in the static template at all (SEO.tsx adds
    // them client-side) — and per-route JSON-LD never is — so these get
    // freshly inserted, right before </head>, alongside the static
    // site-wide schemas that already live in the template.
    const robotsContent = head.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const extraHead = [
        `<meta name="robots" content="${escapeHtml(robotsContent)}" />`,
        head.canonical ? `<link rel="canonical" href="${escapeHtml(head.canonical)}" />` : "",
        ...ssrJsonLd.map(
            (schema) =>
                `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`
        ),
    ]
        .filter(Boolean)
        .join("\n  ");
    html = html.replace("</head>", `  ${extraHead}\n</head>`);

    html = html.replace(rootDivMarker, `<div id="root">${bodyHtml}</div>`);

    const outPath = routeToFilePath(route);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    prerendered.push(route);
}

console.log(`[prerender] wrote ${prerendered.length}/${routes.length} routes`);

// Regenerate dist/serve.json so serve-handler serves these real files instead
// of rewriting every request back to the generic SPA shell. serve-handler
// only resolves a directory's index.html when a rewrite rule's destination
// points straight at it (see node_modules/serve-handler's findRelated) — with
// cleanUrls:false there's no automatic directory-index fallback — so each
// prerendered route needs its own exact rewrite.
//
// applyRewrites() re-checks the *remaining* rules against a rewrite's own
// target (to support chained rewrites), so a leftover wildcard rule for the
// same prefix — e.g. the original "/vs/** -> /index.html" fallback — matches
// AGAIN on that second pass and clobbers our "/vs/spotlight ->
// /vs/spotlight/index.html" rewrite right back to the SPA shell. So any
// original wildcard rule whose prefix we've now fully prerendered has to be
// dropped, not just out-prioritized by rule order. Exact (non-wildcard)
// original rules, and wildcards for prefixes we didn't touch, are untouched
// and still serve as the fallback for anything not in this build's route list
// (e.g. a future /vs/:slug or /blog/:slug not yet added to comparisons/blogs.ts).
const serveJsonPath = join(distDir, "serve.json");
const serveConfig = JSON.parse(readFileSync(serveJsonPath, "utf8"));
const specificRewrites = prerendered
    .filter((route) => route !== "/")
    .map((route) => ({ source: route, destination: `${route}/index.html` }));

function wildcardRuleCoversAPrerenderedRoute(rule: { source: string }) {
    const starIndex = rule.source.indexOf("*");
    if (starIndex === -1) return false;
    const prefix = rule.source.slice(0, starIndex);
    return prerendered.some((route) => route !== "/" && route.startsWith(prefix));
}

const originalRewrites = (serveConfig.rewrites ?? []).filter(
    (rule: { source: string }) => !wildcardRuleCoversAPrerenderedRoute(rule)
);
serveConfig.rewrites = [...specificRewrites, ...originalRewrites];
writeFileSync(serveJsonPath, JSON.stringify(serveConfig, null, 2) + "\n");

console.log(`[prerender] updated dist/serve.json with ${specificRewrites.length} route-specific rewrites`);
