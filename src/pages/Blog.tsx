import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PixelArt from '../components/PixelArt';
import { FadeUp } from '../components/shared';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  seed: number;
  content: { h2: string; text: string }[];
  pullQuote: string;
  code: string;
}

const POSTS: BlogPost[] = [
  {
    slug: 'testing-stripe-webhooks-localhost',
    title: 'Testing Stripe webhooks on localhost',
    category: 'Webhooks',
    excerpt: 'Learn how to test Stripe payment webhooks locally without deploying to staging.',
    author: 'Sarah Chen',
    date: 'Oct 12, 2026',
    readTime: '6 min',
    seed: 20,
    content: [
      { h2: 'The problem with webhook testing', text: 'Stripe webhooks require a public HTTPS endpoint. Most developers deploy to staging just to test a payment flow, which slows down iteration.' },
      { h2: 'Setting up a Public URL', text: 'With Tunnelo, you can create a stable HTTPS URL that tunnels to your localhost. Point Stripe\'s webhook settings at this URL and every event lands in your local server.' },
      { h2: 'Using the Inspector', text: 'The Inspector shows every webhook delivery with full headers and body. If a webhook fails, you can see exactly why — no more guessing.' },
      { h2: 'Replaying failed requests', text: 'When you fix a bug, replay the failed webhook instead of triggering a new payment. This saves time and avoids duplicate charges.' },
    ],
    pullQuote: 'Testing webhooks locally used to mean deploying to staging. Now it means opening a terminal.',
    code: 'Tunnelo http 3000\n# → https://random-abc123.Tunnelo.dev\n# Set this as your Stripe webhook URL',
  },
  {
    slug: 'share-build-without-deploying',
    title: 'Share a build without deploying',
    category: 'Previews',
    excerpt: 'Share your localhost build with teammates or clients using a Public URL. No deploy required.',
    author: 'Jordan Kim',
    date: 'Oct 5, 2026',
    readTime: '5 min',
    seed: 21,
    content: [
      { h2: 'Why deploy just to share?', text: 'You\'ve built something cool on localhost. Your teammate wants to see it. Do you push to staging, wait for CI, and share a URL? Or do you just share your screen?' },
      { h2: 'The Public URL approach', text: 'Tunnelo gives you a real HTTPS URL that tunnels to your localhost. Share it with anyone — they see exactly what you see, in real-time.' },
      { h2: 'Snapshots for async review', text: 'When you close your laptop, the tunnel stops. Publish a Snapshot and the same URL serves a static copy. Reviewers can comment directly on the page.' },
      { h2: 'Password protection', text: 'Need to share with a client? Add a password or generate a secret link. Only people with the credentials can access it.' },
    ],
    pullQuote: 'Share localhost like you share a Figma link. No deploy, no staging, no waiting.',
    code: 'Tunnelo http 3000\n# Share the URL with your team\nTunnelo publish ./dist\n# Now it stays online after you close your laptop',
  },
  {
    slug: 'what-is-a-snapshot',
    title: 'What is a Snapshot?',
    category: 'Features',
    excerpt: 'Snapshots deploy a static copy of your app that stays online even when your laptop is closed.',
    author: 'Marcus Webb',
    date: 'Sep 28, 2026',
    readTime: '4 min',
    seed: 22,
    content: [
      { h2: 'Public URLs vs Snapshots', text: 'A Public URL tunnels to your running localhost. When you close your laptop, the tunnel stops. A Snapshot is different — it\'s a static copy deployed from your machine.' },
      { h2: 'How Snapshots work', text: 'You publish a folder (like ./dist) and Tunnelo deploys it to our edge network. The same Public URL now serves the static copy instead of tunneling to localhost.' },
      { h2: 'Inline comments', text: 'Reviewers can pin comments directly on the Snapshot, like in Figma. Resolve threads, export to markdown, and iterate faster.' },
      { h2: 'When to use Snapshots', text: 'Use Snapshots for async review, client demos, or when you need a URL that stays online. Use Public URLs for real-time development and webhook testing.' },
    ],
    pullQuote: 'A Snapshot is a deploy without a deploy pipeline. Just publish a folder and share the URL.',
    code: 'Tunnelo publish ./dist\n# The same Public URL now serves your static app',
  },
  {
    slug: 'local-https-without-certificate-warnings',
    title: 'Local HTTPS without certificate warnings',
    category: 'Security',
    excerpt: 'Use https://myapp.local with automatic certificates and system trust. No more warnings.',
    author: 'Priya Patel',
    date: 'Sep 20, 2026',
    readTime: '7 min',
    seed: 23,
    content: [
      { h2: 'The certificate problem', text: 'Browsers warn about self-signed certificates. You can click through, but it\'s annoying. OAuth callbacks fail. WebAuthn doesn\'t work. You need real HTTPS.' },
      { h2: 'Local domains with Tunnelo', text: 'Tunnelo generates a local CA and adds it to your system trust store. Now https://myapp.local works without warnings. OAuth, WebAuthn, and secure cookies all work.' },
      { h2: 'How it works', text: 'On first run, Tunnelo asks permission to install its root CA. It generates certificates on-demand for any .local domain. No config files, no manual steps.' },
      { h2: 'Cross-browser support', text: 'The CA is added to the system trust store, so it works in Chrome, Firefox, Safari, and Edge. No per-browser config needed.' },
    ],
    pullQuote: 'Local HTTPS should just work. No warnings, no config, no clicking through scary browser screens.',
    code: 'Tunnelo local myapp\n# → https://myapp.local\n# No certificate warnings!',
  },
  {
    slug: 'giving-ai-agents-public-url',
    title: 'Giving AI agents a public URL',
    category: 'AI',
    excerpt: 'AI code assistants need real HTTPS endpoints to test webhooks. Here\'s how Tunnelo helps.',
    author: 'Sam Chen',
    date: 'Sep 12, 2026',
    readTime: '6 min',
    seed: 24,
    content: [
      { h2: 'Why agents need Public URLs', text: 'Claude Code, Cursor, and other AI assistants run in hosted environments. They can\'t receive webhooks on localhost. They need a real HTTPS endpoint.' },
      { h2: 'MCP integration', text: 'Tunnelo exposes a Model Context Protocol server. Agents can create URLs, publish snapshots, and inspect traffic using natural language.' },
      { h2: 'Example workflow', text: 'Ask Claude Code: "Create a Public URL for port 3000 and test the Stripe webhook." The agent creates the URL, triggers a test, and debugs the failure — all in one conversation.' },
      { h2: 'The future of development', text: 'AI agents are changing how we build software. They need tools that work like humans do. Tunnelo gives agents the same localhost experience you have.' },
    ],
    pullQuote: 'AI agents need the same tools humans have. A stable HTTPS URL is table stakes.',
    code: '// ~/.claude/config.json\n{\n  "mcpServers": {\n    "Tunnelo": {\n      "command": "Tunnelo",\n      "args": ["mcp", "serve"]\n    }\n  }\n}',
  },
  {
    slug: 'debugging-oauth-callbacks-locally',
    title: 'Debugging OAuth callbacks locally',
    category: 'OAuth',
    excerpt: 'Test OAuth flows on localhost with real HTTPS. No more "redirect_uri mismatch" errors.',
    author: 'Lin Zhang',
    date: 'Sep 5, 2026',
    readTime: '8 min',
    seed: 25,
    content: [
      { h2: 'The OAuth localhost problem', text: 'OAuth providers require HTTPS redirect URIs. You can\'t use http://localhost:3000/callback. You deploy to staging just to test a login flow.' },
      { h2: 'Local domains solve this', text: 'With Tunnelo\'s local domains, you get https://myapp.local/callback. It\'s real HTTPS with a trusted certificate. OAuth providers accept it.' },
      { h2: 'Public URLs for hosted OAuth', text: 'If you need to test with a real domain (not .local), use a Public URL. Register https://random-abc123.tunnelo.dev/callback in your OAuth settings.' },
      { h2: 'Debugging callback failures', text: 'The Inspector shows every OAuth callback with full query parameters. See the code, state, and any errors. Debug in real-time without deploying.' },
    ],
    pullQuote: 'OAuth on localhost used to be impossible. Now it\'s just a local domain away.',
    code: 'Tunnelo local myapp\n# → https://myapp.local\n# Register https://myapp.local/callback in your OAuth settings',
  },
];

export default function BlogPage() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug) {
    const post = POSTS.find(p => p.slug === slug);
    if (!post) {
      return (
        <>
          <PageShell eyebrow="Blog" title="Post not found" />
          <div className="max-w-[1120px] mx-auto px-6 pb-16">
            <p className="text-[#8a8a8a]"><Link to="/blog" className="text-lime hover:underline">Back to blog</Link></p>
          </div>
        </>
      );
    }
    return <BlogPostView post={post} />;
  }

  return <BlogIndex />;
}

function BlogIndex() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <>
      <PageShell
        eyebrow="Blog"
        title="Blog"
        description="Articles, tutorials, and updates from the Tunnelo team."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Featured post */}
        <FadeUp>
          <Link to={`/blog/${featured.slug}`} className="block border border-hairline rounded-xl overflow-hidden bg-surface hover:border-lime/30 transition-colors mb-8 group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-app p-8 flex items-center justify-center">
                <PixelArt seed={featured.seed} cols={40} rows={40} cellSize={4} shape="blob" className="rounded-lg" />
              </div>
              <div className="p-8">
                <p className="font-mono text-[10px] text-lime mb-2">{featured.category}</p>
                <h2 className="text-[20px] font-semibold text-text mb-3 group-hover:text-lime transition-colors">{featured.title}</h2>
                <p className="text-[13px] text-[#8a8a8a] mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </FadeUp>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.05}>
              <Link to={`/blog/${post.slug}`} className="block border border-hairline rounded-xl overflow-hidden bg-surface hover:border-lime/30 transition-colors group h-full flex flex-col">
                <div className="bg-app p-6 flex items-center justify-center">
                  <PixelArt seed={post.seed} cols={24} rows={24} cellSize={4} shape="wave" className="rounded-lg" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-mono text-[10px] text-lime mb-2">{post.category}</p>
                  <h3 className="text-[15px] font-semibold text-text mb-2 group-hover:text-lime transition-colors">{post.title}</h3>
                  <p className="text-[12px] text-[#8a8a8a] mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </>
  );
}

function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <>
      <PageShell
        eyebrow="Blog"
        title={post.title}
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Author row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-8">
            <PixelArt seed={post.seed + 100} cols={8} rows={8} cellSize={4} shape="blob" palette="avatar" circleCrop className="rounded-full" />
            <div>
              <p className="text-[13px] text-text">{post.author}</p>
              <p className="text-[11px] text-muted">{post.date} · {post.readTime}</p>
            </div>
          </div>
        </FadeUp>

        {/* Cover */}
        <FadeUp delay={0.08}>
          <div className="border border-hairline rounded-xl overflow-hidden bg-app p-12 flex items-center justify-center mb-8">
            <PixelArt seed={post.seed} cols={60} rows={42} cellSize={4} shape="blob" className="rounded-lg" />
          </div>
        </FadeUp>

        {/* Content */}
        <div className="max-w-[680px] mx-auto">
          {post.content.map((section, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.05}>
              <div className="mb-8">
                <h2 className="text-[20px] font-semibold text-text mb-3">{section.h2}</h2>
                <p className="text-[14px] text-[#8a8a8a] leading-relaxed">{section.text}</p>
              </div>
            </FadeUp>
          ))}

          {/* Pull quote */}
          <FadeUp delay={0.3}>
            <blockquote className="border-l-2 border-lime pl-6 py-4 my-8">
              <p className="text-[16px] text-text italic leading-relaxed">{post.pullQuote}</p>
            </blockquote>
          </FadeUp>

          {/* Code snippet */}
          <FadeUp delay={0.35}>
            <pre className="bg-page border border-hairline rounded-lg p-4 font-mono text-[12px] text-[#8a8a8a] overflow-x-auto mb-8 whitespace-pre-wrap">
              {post.code}
            </pre>
          </FadeUp>

          {/* Share */}
          <FadeUp delay={0.4}>
            <div className="border-t border-hairline pt-6 mb-8">
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="text-[12px] text-[#8a8a8a] hover:text-lime transition-colors"
              >
                Copy link
              </button>
            </div>
          </FadeUp>

          {/* Related posts */}
          <FadeUp delay={0.45}>
            <div className="border-t border-hairline pt-8">
              <p className="font-mono text-[11px] text-muted mb-4">RELATED POSTS</p>
              <div className="grid md:grid-cols-2 gap-4">
                {POSTS.filter(p => p.slug !== post.slug).slice(0, 2).map(related => (
                  <Link key={related.slug} to={`/blog/${related.slug}`} className="block border border-hairline rounded-lg p-4 bg-surface hover:border-lime/30 transition-colors group">
                    <p className="font-mono text-[10px] text-lime mb-1">{related.category}</p>
                    <p className="text-[13px] font-semibold text-text group-hover:text-lime transition-colors">{related.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
