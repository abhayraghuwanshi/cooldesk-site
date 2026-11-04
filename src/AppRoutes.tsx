import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivacyPolicyStatic from "./components/privacy/PrivacyPolicyStatic";
import Contact from "./pages/Contact";
import FounderPage from "./pages/Founder";
import GalleryPage from "./pages/Gallery";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/Pricing";
import ReleasesPage from "./pages/Releases";
import TermsPage from "./pages/terms";
import UninstallPage from "./pages/Uninstall";
import ComparePage from "./pages/Compare";
import GettingStartedPage from "./pages/GettingStarted";
import NewTabPage from "./pages/NewTab";
import BrowserPage from "./pages/Browser";
import ShellPage from "./pages/Shell";
import ClipboardPage from "./pages/Clipboard";
import FileManagerPage from "./pages/FileManager";
import DockPage from "./pages/Dock";
import SidebarPage from "./pages/Sidebar";
import SpotlightPage from "./pages/Spotlight";
import FeaturesPage from "./pages/Features";
import ResourcesPage from "./pages/Resources";
import VersusPage from "./pages/Versus";
import WidgetStorePage from "./pages/WidgetStore";
import UnderTheHoodPage from "./pages/UnderTheHood";

// react-markdown + remark-gfm + react-syntax-highlighter (for code blocks in
// post content) are only needed on this one page, and together they're the
// single biggest contributor to the shared bundle every other route was
// paying for. Split out so the homepage/comparisons/widgets don't ship it.
const BlogPostPage = lazy(() => import("./pages/BlogPost"));

// The route table, shared between the live client app (App.tsx, wrapped in
// BrowserRouter) and the build-time prerender script (scripts/prerender.tsx,
// wrapped in StaticRouter) — one source of truth for what pages exist.
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            {/* How to Use now lives on the homepage (#how-to-use) */}
            <Route path="/how-to-use" element={<Navigate to="/#how-to-use" replace />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route
                path="/blog/:slug"
                element={
                    <Suspense fallback={null}>
                        <BlogPostPage />
                    </Suspense>
                }
            />
            {/* The tool library is hidden for now (src/pages/Library.tsx is kept). */}
            <Route path="/blog" element={<Navigate to="/resources" replace />} />
            <Route path="/library" element={<Navigate to="/" replace />} />
            <Route path="/search" element={<Navigate to="/" replace />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/under-the-hood" element={<UnderTheHoodPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-details" element={<PrivacyPolicyStatic />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/releases" element={<ReleasesPage />} />
            <Route path="/vs" element={<ComparePage />} />
            <Route path="/vs/:slug" element={<VersusPage />} />
            <Route path="/new-tab" element={<NewTabPage />} />
            {/* The desktop app's parts, one page each (src/config/features.ts), and all of them on /features. */}
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/browser" element={<BrowserPage />} />
            <Route path="/shell" element={<ShellPage />} />
            <Route path="/clipboard" element={<ClipboardPage />} />
            <Route path="/file-manager" element={<FileManagerPage />} />
            <Route path="/dock" element={<DockPage />} />
            <Route path="/sidebar" element={<SidebarPage />} />
            <Route path="/spotlight" element={<SpotlightPage />} />
            <Route path="/widgets" element={<WidgetStorePage />} />
            {/* Chrome opens this when the extension is removed
                (setUninstallURL in the extension's background script). */}
            <Route path="/uninstall" element={<UninstallPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
