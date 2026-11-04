import ReactMarkdown, { type Components } from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import Footer from '../components/new/Footer';
import Navbar from '../components/new/Navbar';
import PageIndex, { type IndexItem } from '../components/new/PageIndex';
import SectionBackdrop from '../components/new/SectionBackdrop';
import SEO from '../components/SEO';
import { trackEvent, useReadTracking, useSectionView } from '../lib/analytics';
import { blogPosts, getBlogPostBySlug, getCategoryLabel } from '../config/blogs';
import { parsePost, slugify, type Tool } from '../lib/parsePost';
import { comparisons } from './Versus';

/**
 * The article page, comparison-first: the answer ("pick by what you want")
 * comes before the reasoning, every tool gets the same card (what it's best
 * at, where others beat it), and the FAQ folds. Posts stay plain markdown;
 * lib/parsePost.ts finds the pieces, and a post that isn't a roundup simply
 * renders as text between the same header and close.
 */

const md: Components = {
    h2: ({ children }) => <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>,
    p: ({ children }) => <p className="mb-5 text-[16.5px] leading-[1.75] text-white/75 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-[16.5px] leading-[1.7] text-white/75 marker:text-white/35">{children}</ul>,
    ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-[16.5px] leading-[1.7] text-white/75 marker:text-white/35">{children}</ol>,
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    a: ({ href = '', children }) => {
        const internal = href.startsWith('/');
        return (
            <a
                href={href}
                {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-sky-200 hover:decoration-sky-200"
            >
                {children}
            </a>
        );
    },
    blockquote: ({ children }) => <blockquote className="my-6 border-l-2 border-white/20 pl-5 text-white/65">{children}</blockquote>,
    code: ({ children }) => <code className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-sky-200">{children}</code>,
    pre: ({ children }) => <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0b0b14] p-5 text-sm">{children}</pre>,
    table: ({ children }) => (
        <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-[15px]">{children}</table>
        </div>
    ),
    th: ({ children }) => <th className="border-b border-white/10 px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-white/[0.06] px-4 py-3 text-white/70">{children}</td>,
    img: ({ src, alt }) => (
        <figure className="my-8">
            <img src={src} alt={alt} className="w-full rounded-xl border border-white/10" />
            {alt && <figcaption className="mt-3 text-center text-sm text-white/45">{alt}</figcaption>}
        </figure>
    ),
    hr: () => <hr className="my-10 border-white/10" />,
};

const Md = ({ children }: { children: string }) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
        {children}
    </ReactMarkdown>
);

/** Inline-only markdown (bold, links) inside a sentence we already wrap. */
const InlineMd = ({ children }: { children: string }) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...md, p: ({ children: c }) => <>{c}</> }}>
        {children}
    </ReactMarkdown>
);

const Tag = ({ children, us = false }: { children: React.ReactNode; us?: boolean }) => (
    <span className={`rounded-md border px-2 py-px font-mono text-[11.5px] leading-[1.7] ${us ? 'border-sky-300/40 text-sky-300' : 'border-white/15 text-white/65'}`}>{children}</span>
);

const initials = (name: string) =>
    name
        .split(/[ /]+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

function ToolCard({ tool }: { tool: Tool }) {
    const H = tool.level === 2 ? 'h2' : 'h3';
    return (
        <article id={tool.id} className={`mt-6 scroll-mt-28 rounded-[20px] border p-6 md:p-7 ${tool.us ? 'border-sky-300/35 bg-sky-400/[0.04]' : 'border-white/10 bg-white/[0.02]'}`}>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] font-mono text-[13px] font-semibold text-white/80">
                    {initials(tool.name)}
                </span>
                <H className="text-2xl font-bold tracking-tight">{tool.name}</H>
                {tool.price && <Tag>{tool.price}</Tag>}
                {tool.style && <Tag>{tool.style}</Tag>}
                {tool.us && <Tag us>that’s us</Tag>}
            </div>
            {tool.summary && (
                <div className="mt-4">
                    <Md>{tool.summary}</Md>
                </div>
            )}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 p-4 md:p-5">
                    <p className="text-sm font-semibold text-emerald-300">Best at</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                        <InlineMd>{tool.best}</InlineMd>
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 p-4 md:p-5">
                    <p className="text-sm font-semibold text-orange-300">Where others beat it</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                        <InlineMd>{tool.beats}</InlineMd>
                    </p>
                </div>
            </div>
            {tool.after && (
                <div className="mt-4 text-[15px]">
                    <Md>{tool.after}</Md>
                </div>
            )}
        </article>
    );
}

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getBlogPostBySlug(slug) : undefined;
    const ctaRef = useSectionView<HTMLElement>('article_close_cta', { page_type: 'blog', slug });
    const readRef = useReadTracking<HTMLDivElement>({ page_type: 'blog', slug });

    if (!post) {
        return (
            <main className="min-h-screen text-white bg-black flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
                    <Link to="/resources" className="text-blue-400 hover:text-blue-300">
                        ← Back to resources
                    </Link>
                </div>
            </main>
        );
    }

    const p = parsePost(post.content);
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const canonicalUrl = `https://cool-desk.com/blog/${post.slug}`;
    const toolById = new Map(p.tools.map((t) => [t.id, t]));
    const picked = p.picks.filter((k) => k.toolId);
    const unpicked = p.picks.filter((k) => !k.toolId);

    // The side index: the answer, then each section and tool in order, then the FAQ.
    const groupId = (title: string) => `s-${slugify(title)}`;
    const index: IndexItem[] = [
        ...(picked.length ? [{ id: 'bp-pick', label: 'The short version' }] : []),
        ...p.blocks.flatMap((b): IndexItem[] =>
            b.kind === 'tool'
                ? [{ id: b.tool.id, label: b.tool.name, nested: b.tool.level === 3 }]
                : b.kind === 'group'
                  ? [{ id: groupId(b.title), label: b.title.replace(/[:?].*$/, '') }]
                  : [],
        ),
        ...(p.faq.length ? [{ id: 'bp-faq', label: 'FAQ' }] : []),
    ];

    // Keep reading: the comparisons this post links to, then other posts.
    const vsLinks = [...new Set([...post.content.matchAll(/\]\(\/vs\/([a-z0-9-]+)\)/g)].map((m) => m[1]))]
        .filter((s) => comparisons[s])
        .slice(0, 3);
    const more = blogPosts.filter((b) => b.category !== 'comparisons' && b.id !== post.id).slice(0, 3);

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            url: canonicalUrl,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            publisher: { '@type': 'Organization', name: 'CoolDesk', logo: { '@type': 'ImageObject', url: 'https://cool-desk.com/favicon.ico' } },
        },
        ...(p.faq.length
            ? [
                  {
                      '@context': 'https://schema.org',
                      '@type': 'FAQPage',
                      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
                  },
              ]
            : []),
    ];

    return (
        <main className="min-h-screen text-white">
            <SEO title={post.title} description={post.description} canonical={canonicalUrl} jsonLd={jsonLd} />
            <Navbar />

            <div className="relative isolate">
                <SectionBackdrop variant="dust" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-300px] -z-10 h-[680px] w-[1200px] -ml-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.14),transparent)]" />

                <article className="container mx-auto max-w-6xl px-6 pt-28 pb-24 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    <PageIndex items={index} accent="sky" />
                    <div ref={readRef} className="min-w-0" data-track-area="article">
                    {/* Title */}
                    <header className="max-w-[820px] pt-6 pb-8">
                        <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
                            <Link to="/resources" className="text-white/60 transition-colors hover:text-white">Resources</Link>
                            {' / '}
                            <a href="/resources#rs-blog" className="text-white/60 transition-colors hover:text-white">Blog</a>
                            {' / '}
                            <span className="text-sky-300">{getCategoryLabel(post.category)}</span>
                        </nav>
                        <h1 className="mt-4 text-[34px] font-bold leading-[1.08] tracking-[-0.03em] md:text-5xl">{post.title}</h1>
                        {p.lede && (
                            <p className="mt-4 text-lg leading-relaxed text-white/65">
                                <InlineMd>{p.lede}</InlineMd>
                            </p>
                        )}
                        <p className="mt-4 font-mono text-[12.5px] text-white/50">
                            {post.updated ? `Updated ${formatDate(post.updated)}` : formatDate(post.date)}
                            {p.tools.length > 1 && ` · ${p.tools.length} tools`}
                        </p>
                    </header>

                    {/* The answer first */}
                    {picked.length > 0 && (
                        <section id="bp-pick" aria-labelledby="bp-pick-h" className="scroll-mt-28 rounded-[22px] border border-white/10 bg-[#0b0b14] p-5 md:p-7">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h2 id="bp-pick-h" className="text-[22px] font-semibold">The short version: pick by what you want</h2>
                                <span className="text-[13px] text-white/45">Read on only if you’re unsure</span>
                            </div>
                            <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
                                {picked.map((k) => {
                                    const t = toolById.get(k.toolId!)!;
                                    return (
                                        <a
                                            key={k.want}
                                            href={`#${t.id}`}
                                            className={`flex min-h-[150px] flex-col gap-2 rounded-2xl border p-4 transition-colors hover:border-white/25 ${t.us ? 'border-sky-300/40 bg-sky-400/[0.06]' : 'border-white/10 bg-white/[0.025]'}`}
                                        >
                                            <span className="text-[13px] leading-snug text-white/60">“{k.want}”</span>
                                            <span className="mt-auto text-[17px] font-semibold leading-snug">{k.name}</span>
                                            {k.note && <span className="text-xs leading-snug text-white/50">{k.note}</span>}
                                            <span className="flex flex-wrap gap-1.5">
                                                {t.price && <Tag>{t.price}</Tag>}
                                                {t.us && <Tag us>that’s us</Tag>}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                            {unpicked.map((k) => (
                                <p key={k.want} className="mt-4 text-[13.5px] text-white/55">
                                    “{k.want}” → {k.name}
                                    {k.note ? ` (${k.note})` : ''}
                                </p>
                            ))}
                        </section>
                    )}

                    {p.disclosure && (
                        <p className="mt-5 max-w-[820px] text-[13.5px] leading-relaxed text-white/50">
                            <span className="font-semibold text-orange-300">Full disclosure:</span> <InlineMd>{p.disclosure}</InlineMd>
                        </p>
                    )}

                    {/* Jump bar: one chip per tool (phones; desktops get the side index) */}
                    {p.tools.length > 1 && (
                        <nav aria-label="Jump to a tool" className="sticky top-[73px] z-20 -mx-6 mt-9 flex lg:hidden gap-2 overflow-x-auto border-y border-white/[0.08] bg-[#07070a]/85 px-6 py-2.5 backdrop-blur-md">
                            {p.tools.map((t) => (
                                <a key={t.id} href={`#${t.id}`} className={`inline-flex min-h-9 shrink-0 items-center rounded-full border px-3.5 text-[13.5px] font-medium ${t.us ? 'border-sky-300/45 text-sky-300' : 'border-white/[0.12] text-white/80 hover:text-white'}`}>
                                    {t.name}
                                </a>
                            ))}
                            {p.faq.length > 0 && (
                                <a href="#bp-faq" className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-white/[0.12] px-3.5 text-[13.5px] font-medium text-white/70 hover:text-white">
                                    FAQ
                                </a>
                            )}
                        </nav>
                    )}

                    {/* Body: intro, then sections and tool cards in the post's order */}
                    <div className="max-w-[820px]">
                        {p.intro && (
                            <div className="mt-10">
                                <Md>{p.intro}</Md>
                            </div>
                        )}
                    </div>
                    {p.blocks.map((b, i) =>
                        b.kind === 'tool' ? (
                            <ToolCard key={b.tool.id} tool={b.tool} />
                        ) : (
                            <div key={i} id={b.kind === 'group' ? groupId(b.title) : undefined} className="max-w-[820px] scroll-mt-28">
                                {b.kind === 'group' && <h2 className="mt-14 mb-4 text-[26px] font-bold tracking-tight">{b.title}</h2>}
                                {b.md && <Md>{b.md}</Md>}
                            </div>
                        ),
                    )}

                    {/* FAQ */}
                    {p.faq.length > 0 && (
                        <section id="bp-faq" aria-labelledby="bp-faq-h" className="mt-14 max-w-[800px] scroll-mt-28">
                            <h2 id="bp-faq-h" className="mb-1.5 text-[26px] font-bold">FAQ</h2>
                            {p.faq.map((f, i) => (
                                <details
                                    key={f.q}
                                    open={i === 0}
                                    className="group border-b border-white/10"
                                    onToggle={(e) => {
                                        if (i > 0 && e.currentTarget.open) trackEvent('blog_faq_open', { page_type: 'blog', slug, question: f.q });
                                    }}
                                >
                                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[16.5px] font-semibold [&::-webkit-details-marker]:hidden">
                                        {f.q}
                                        <span aria-hidden="true" className="shrink-0 text-[22px] font-light text-white/50 transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <div className="pb-4 text-[15.5px]">
                                        <Md>{f.a}</Md>
                                    </div>
                                </details>
                            ))}
                            {p.afterFaq && (
                                <div className="mt-6">
                                    <Md>{p.afterFaq}</Md>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Close: try it */}
                    <section ref={ctaRef} data-track-area="cta" className="relative mt-14 overflow-hidden rounded-[22px] border border-sky-300/25 bg-[#0a0d16] px-6 py-9 md:px-8 md:py-10">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.3),transparent)]" />
                        <h2 className="relative text-[26px] font-bold">Try CoolDesk free</h2>
                        <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">
                            {p.cta ? <InlineMd>{p.cta}</InlineMd> : 'No account, and everything stays on your device.'}
                        </p>
                        <div className="relative mt-6 flex flex-wrap gap-3">
                            <a href="/#downloads" className="inline-flex min-h-12 items-center rounded-xl bg-white px-5 text-[15px] font-semibold text-[#07070a]">
                                Download free
                            </a>
                            <Link to="/resources" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium">
                                More resources →
                            </Link>
                        </div>
                    </section>

                    {/* Keep reading */}
                    <section aria-labelledby="bp-more" data-track-area="related" className="mt-10">
                        <h2 id="bp-more" className="mb-3 text-sm font-medium text-white/50">Keep reading</h2>
                        <div className="flex flex-wrap gap-2">
                            {more.map((b) => (
                                <Link key={b.id} to={b.href ?? `/blog/${b.slug}`} className="inline-flex min-h-9 items-center rounded-full border border-sky-300/30 px-3.5 text-[13.5px] font-medium hover:bg-white/[0.04]">
                                    {b.title.replace(/[:(].*$/, '').trim()}
                                </Link>
                            ))}
                            {vsLinks.map((s) => (
                                <Link key={s} to={`/vs/${s}`} className="inline-flex min-h-9 items-center rounded-full border border-orange-300/30 px-3.5 text-[13.5px] font-medium hover:bg-white/[0.04]">
                                    CoolDesk vs {comparisons[s].name}
                                </Link>
                            ))}
                        </div>
                    </section>
                    </div>
                </article>
            </div>

            <Footer />
        </main>
    );
}
