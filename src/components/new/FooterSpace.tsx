import { StarDust } from './SectionBackdrop';
import './footer-space.css';

/**
 * The footer's backdrop: the end of the page as the edge of space. Star dust
 * above, a planet's lit horizon rising behind the bottom bar, a tilted orbit
 * with a moon, and a shooting star now and then. Same night palette as the
 * hero galaxy (HeroBackdrop.tsx).
 *
 * CSS only, deterministic (prerender matches the client), no motion under
 * prefers-reduced-motion. Decorative: aria-hidden, no pointer events.
 */
export default function FooterSpace() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <StarDust />
            <span className="fs-meteor" />
            <span className="fs-meteor b" />
            <div className="fs-ring">
                <div className="fs-ring-line" />
                <div className="fs-ring-spin">
                    <span className="fs-moon" />
                </div>
            </div>
            <div className="fs-glare" />
            <div className="fs-planet" />
        </div>
    );
}
