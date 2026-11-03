import { useState } from 'react';
import Navbar from '@/components/new/Navbar';
import SEO from '@/components/SEO';
import { CHROME_STORE } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { useSearchParams } from 'react-router-dom';

// Same worker as the desktop app's anonymous ping (cooldesk-extension/worker).
const BYE_ENDPOINT = 'https://cooldesk-analytics.raghuwanshi-abhay405.workers.dev/api/bye';

// Keep in sync with BYE_REASONS in the worker.
const REASONS = [
    { id: 'not_useful', label: "Didn't need it" },
    { id: 'too_complicated', label: 'Too hard to figure out' },
    { id: 'missing_feature', label: 'Missing something I need' },
    { id: 'performance', label: 'Slow or heavy' },
    { id: 'bugs', label: 'Something broke' },
    { id: 'switched', label: 'Using something else' },
    { id: 'just_trying', label: 'Just trying it out' },
    { id: 'other', label: 'Other' },
];

/**
 * Where people land after removing CoolDesk:
 *   • the extension — Chrome opens it via `chrome.runtime.setUninstallURL`,
 *     with `?v=<extension version>`
 *   • the Windows app — the NSIS uninstaller opens it with
 *     `?v=<app version>&from=windows`, only for a real uninstall (never for an
 *     update or reinstall; see src-tauri/nsis/installer-hooks.nsh)
 *
 * One optional tap on a fixed reason, nothing typed and nothing required: the
 * answer is stored anonymously (date, version, where, reason — no id, no IP).
 * noindex: it should never surface in search for people who haven't uninstalled.
 */
const UninstallPage = () => {
    const [params] = useSearchParams();
    const version = params.get('v');
    const desktop = params.get('from') === 'windows';
    const [sent, setSent] = useState<string | null>(null);

    const sendReason = (reason: string) => {
        if (sent) return;
        setSent(reason);
        trackEvent('uninstall_reason', { reason, from: desktop ? 'windows' : 'extension' });
        fetch(BYE_ENDPOINT, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ reason, v: version, os: desktop ? 'windows' : 'extension' }),
            keepalive: true,
        }).catch(() => { /* the thanks is shown either way */ });
    };

    return (
        <main className="min-h-screen text-white">
            <SEO
                title="Uninstalled — CoolDesk"
                description="CoolDesk has been removed."
                noindex={true}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
                <h1 className="text-4xl font-bold tracking-tighter text-neutral-100">
                    Thanks for trying CoolDesk.
                </h1>
                <p className="mt-5 text-lg text-neutral-400">
                    {desktop
                        ? "It's been removed from your PC."
                        : "It's been removed from your browser."}{' '}
                    If something didn't work for you, we'd genuinely like to hear it — it's the
                    fastest way for us to fix it.
                </p>

                <div className="mt-10 w-full">
                    {sent ? (
                        <p className="text-neutral-300">Got it — thank you.</p>
                    ) : (
                        <>
                            <p className="text-sm text-neutral-500">
                                If you have a second: what was the main reason? (optional, anonymous)
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {REASONS.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => sendReason(r.id)}
                                        className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition hover:border-white/30 hover:bg-white/5"
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={desktop ? '/api/download/windows' : CHROME_STORE}
                        className="rounded-lg bg-white px-5 py-2.5 font-medium text-neutral-900 transition hover:bg-neutral-200"
                    >
                        Reinstall
                    </a>
                    <a
                        href="/contact"
                        className="rounded-lg border border-white/15 px-5 py-2.5 font-medium text-neutral-200 transition hover:border-white/30 hover:bg-white/5"
                    >
                        Get in touch
                    </a>
                </div>

                {version && (
                    <p className="mt-12 text-xs text-neutral-600">You had version {version}.</p>
                )}
            </div>
        </main>
    );
};

export default UninstallPage;
