import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  // Broken links and mistyped URLs, with where they came from.
  useEffect(() => {
    trackEvent("page_not_found", { missing_path: location.pathname, referrer: document.referrer || undefined });
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 Not Found"
        description="Page not found"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
        <div className="text-center z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-400 hover:text-blue-300 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
