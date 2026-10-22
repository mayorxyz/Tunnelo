import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

// Docs sections data
const DOCS_SECTIONS = [
  { id: 'quick-start', title: 'Quick start', group: 'Getting started' },
  { id: 'installation', title: 'Installation', group: 'Getting started' },
  { id: 'public-urls', title: 'Public URLs', group: 'Public URLs' },
  { id: 'custom-domains', title: 'Custom domains', group: 'Domains' },
  { id: 'local-domains', title: 'Local domains', group: 'Domains' },
  { id: 'cli', title: 'CLI', group: 'Tools' },
  { id: 'ai-agents', title: 'AI agents', group: 'Tools' },
  { id: 'troubleshooting', title: 'Troubleshooting', group: 'Reference' },
];

// Section content
const SECTION_CONTENT: Record<string, { intro: string; subsections: { title: string; content: string; code?: string }[] }> = {
  'quick-start': {
    intro: 'Get up and running with Tunnelo in under 5 minutes.',
    subsections: [
      { title: 'Install Tunnelo', content: 'Download the desktop app for your platform or install via CLI.', code: 'brew install --cask tunnelo' },
      { title: 'Create your first Public URL', content: 'Open Tunnelo and click "New Public URL". Select your local port (e.g., 3000) and get an HTTPS link instantly.', code: 'tunnelo http 3000' },
      { title: 'Open the Inspector', content: 'Every request to your Public URL appears in the Inspector. View headers, body, replay requests, and debug webhooks.', code: 'tunnelo inspect' },
      { title: 'Publish a Snapshot', content: 'Deploy a static copy of your app that stays online even when your laptop is closed.', code: 'tunnelo publish ./dist' },
    ],
  },
  'installation': {
    intro: 'Install Tunnelo on macOS, Windows, or Linux.',
    subsections: [
      { title: 'macOS', content: 'Download the .dmg file or install via Homebrew. Supports both Intel and Apple Silicon.', code: 'brew install --cask tunnelo' },
      { title: 'Windows', content: 'Download the .exe installer or use winget. Requires Windows 10 (1903+) or later.', code: 'winget install Tunnelo.Tunnelo' },
      { title: 'Linux', content: 'Download the AppImage or install via apt on Ubuntu/Debian.', code: 'sudo apt install tunnelo' },
      { title: 'Updating', content: 'Tunnelo checks for updates automatically. You can also check manually from the menu.', code: 'tunnelo update' },
      { title: 'Uninstalling', content: 'Remove the app like any other application. Configuration is stored in ~/.tunnelo.', code: 'rm -rf ~/.tunnelo' },
    ],
  },
  'public-urls': {
    intro: 'Create stable HTTPS URLs that tunnel to your localhost.',
    subsections: [
      { title: 'Create a Public URL', content: 'Select a local port and Tunnelo generates a random HTTPS URL. The URL stays stable for the session.', code: 'tunnelo http 3000' },
      { title: 'Refresh the link', content: 'Get a new URL without restarting your app. Useful when you need a fresh endpoint.', code: 'tunnelo refresh' },
      { title: 'Password and secret links', content: 'Protect your Public URL with a password or generate a secret link that only works for people with the URL.', code: 'tunnelo http 3000 --password mysecret' },
      { title: 'IP allow rules', content: 'Restrict access to specific IP addresses or CIDR ranges. Great for staging environments.', code: 'tunnelo http 3000 --allow 203.0.113.0/24' },
      { title: 'Session limits', content: 'Free plans have 30-minute sessions. Paid plans offer unlimited sessions with automatic reconnection.', code: '' },
    ],
  },
  'custom-domains': {
    intro: 'Use your own domain with automatic HTTPS.',
    subsections: [
      { title: 'Add a custom domain', content: 'Enter your domain in the dashboard and we\'ll guide you through DNS setup.', code: 'tunnelo domains add api.example.com' },
      { title: 'DNS records', content: 'Add a CNAME record pointing to your Tunnelo endpoint. We\'ll verify automatically.', code: 'CNAME api.example.com → tunnel.tunnelo.dev' },
      { title: 'Verification', content: 'Tunnelo checks DNS propagation and provisions TLS certificates via Let\'s Encrypt.', code: 'tunnelo domains verify api.example.com' },
      { title: 'Troubleshooting TLS', content: 'If certificates fail to provision, check DNS is pointing correctly and wait 5 minutes for propagation.', code: '' },
    ],
  },
  'local-domains': {
    intro: 'Use https://myapp.local with automatic certificates.',
    subsections: [
      { title: 'Create a local domain', content: 'Any .local domain works out of the box. Tunnelo handles DNS and certificates.', code: 'tunnelo local myapp' },
      { title: 'Certificates', content: 'Tunnelo generates a local CA and adds it to your system trust store. No more certificate warnings.', code: 'tunnelo certs install' },
      { title: 'Trust store', content: 'On first run, Tunnelo asks permission to install its root CA. This is required for HTTPS to work.', code: '' },
      { title: 'Ports', content: 'Local domains work on any port. Use standard ports (80, 443) or custom ones.', code: 'tunnelo local myapp --port 8080' },
    ],
  },
  'cli': {
    intro: 'Command-line reference for Tunnelo.',
    subsections: [
      { title: 'Commands', content: 'All commands work without logging in. Use --help for detailed usage.', code: 'tunnelo --help' },
      { title: 'tunnelo up', content: 'Start a tunnel to a local port. Creates a Public URL and opens the Inspector.', code: 'tunnelo up 3000' },
      { title: 'tunnelo list', content: 'List all active tunnels with their URLs and status.', code: 'tunnelo list' },
      { title: 'tunnelo inspect', content: 'Open the Inspector for a specific tunnel. View requests, headers, and replay.', code: 'tunnelo inspect --last 10' },
      { title: 'tunnelo publish', content: 'Publish a Snapshot from a local folder. The same Public URL serves the static copy.', code: 'tunnelo publish ./dist' },
      { title: 'tunnelo domains', content: 'Manage custom domains: add, remove, verify, list.', code: 'tunnelo domains list' },
      { title: 'Exit codes', content: '0 = success, 1 = general error, 2 = invalid arguments, 3 = network error, 4 = auth required.', code: '' },
    ],
  },
  'ai-agents': {
    intro: 'Use Tunnelo with AI code assistants like Claude Code and Cursor.',
    subsections: [
      { title: 'MCP setup', content: 'Tunnelo exposes a Model Context Protocol server. Enable it in the desktop app settings.', code: 'tunnelo mcp enable' },
      { title: 'Claude Code', content: 'Claude Code can create URLs, publish snapshots, and debug webhooks via MCP tools.', code: 'claude "Create a Public URL for port 3000"' },
      { title: 'Cursor', content: 'Cursor integrates with Tunnelo via the MCP server. Use @tunnelo in chat.', code: '@tunnelo inspect the last webhook failure' },
      { title: 'Example prompts', content: 'Try: "Create a Public URL", "Publish a Snapshot", "Debug the failing Stripe webhook".', code: '' },
      { title: 'Tool list', content: 'create_url, publish_snapshot, inspect_requests, list_domains, replay_request.', code: '' },
    ],
  },
  'troubleshooting': {
    intro: 'Common issues and how to fix them.',
    subsections: [
      { title: 'Port already in use', content: 'Another app is using the port. Change the port or stop the other app.', code: 'lsof -i :3000' },
      { title: 'Certificate warnings', content: 'Tunnelo\'s root CA is not trusted. Run the certificate installer from the menu.', code: 'tunnelo certs install' },
      { title: 'Webhook returns 500', content: 'Check the Inspector for the request body and headers. Common issue: signature verification fails if body is parsed before verification.', code: '' },
      { title: 'DNS not propagating', content: 'Custom domains take up to 24 hours to propagate. Use dig or nslookup to check.', code: 'dig api.example.com' },
      { title: 'Session expired', content: 'Free plans have 30-minute sessions. Upgrade for unlimited sessions.', code: '' },
      { title: 'Firewall blocking', content: 'Tunnelo uses ports 443 and 80. Make sure they\'re not blocked by your firewall.', code: '' },
      { title: 'Slow connection', content: 'Check your internet speed. Tunnelo tunnels add minimal overhead (<10ms).', code: '' },
      { title: 'App crashes on startup', content: 'Try reinstalling. If the issue persists, contact support with the crash log.', code: '' },
      { title: 'Can\'t connect to localhost', content: 'Make sure your app is running and listening on the port you specified.', code: 'curl http://localhost:3000' },
      { title: 'Inspector shows no requests', content: 'Refresh the Public URL in your browser. Requests only appear after the tunnel is active.', code: '' },
      { title: 'Snapshot not updating', content: 'Publish a new Snapshot. The old one stays live until you publish a replacement.', code: 'tunnelo publish ./dist --force' },
      { title: 'Team member can\'t access URL', content: 'Check their role. Members can use URLs but not create custom domains. Admins can manage domains.', code: '' },
    ],
  },
};

export default function DocsPage() {
  const { section } = useParams<{ section?: string }>();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentSection = section ? SECTION_CONTENT[section] : null;

  // Filter sections by search
  const filteredSections = search
    ? DOCS_SECTIONS.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        SECTION_CONTENT[s.id]?.intro.toLowerCase().includes(search.toLowerCase())
      )
    : DOCS_SECTIONS;

  if (!section) {
    // Docs index
    return (
      <>
        <PageShell
          eyebrow="Documentation"
          title="Documentation"
          description="Guides, references, and tutorials for Tunnelo."
        />
        <div className="max-w-[1120px] mx-auto px-6 pb-16">
          {/* Search */}
          <FadeUp>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search docs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md bg-surface border border-hairline rounded-lg px-4 py-2.5 text-[13px] text-white placeholder:text-muted focus:outline-none focus:border-lime/40"
              />
            </div>
          </FadeUp>

          {/* Section grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSections.map((s, i) => (
              <FadeUp key={s.id} delay={i * 0.05}>
                <Link
                  to={`/docs/${s.id}`}
                  className="block border border-hairline rounded-xl p-5 bg-surface hover:border-lime/30 transition-colors group"
                >
                  <p className="text-[10px] text-muted font-mono mb-2">{s.group}</p>
                  <p className="text-[15px] font-semibold text-white group-hover:text-lime transition-colors">{s.title}</p>
                  <p className="text-[12px] text-[#8a8a8a] mt-2 line-clamp-2">{SECTION_CONTENT[s.id]?.intro}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!currentSection) {
    return (
      <>
        <PageShell eyebrow="Documentation" title="Section not found" />
        <div className="max-w-[1120px] mx-auto px-6 pb-16">
          <p className="text-[#8a8a8a]">This section doesn't exist. <Link to="/docs" className="text-lime hover:underline">Back to docs</Link></p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageShell
        eyebrow="Documentation"
        title={DOCS_SECTIONS.find(s => s.id === section)?.title || ''}
        description={currentSection.intro}
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex gap-8">
          {/* Left nav */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <p className="text-[10px] text-muted font-mono mb-3">SECTIONS</p>
              <nav className="space-y-1">
                {DOCS_SECTIONS.map(s => (
                  <Link
                    key={s.id}
                    to={`/docs/${s.id}`}
                    className={`block text-[12px] py-1.5 px-2 rounded transition-colors ${
                      s.id === section ? 'bg-lime/10 text-lime' : 'text-[#8a8a8a] hover:text-text'
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-[720px]">
            <div className="space-y-8">
              {currentSection.subsections.map((sub, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <div>
                    <h2 className="text-[18px] font-semibold text-text mb-2">{sub.title}</h2>
                    <p className="text-[13px] text-[#8a8a8a] leading-relaxed mb-3">{sub.content}</p>
                    {sub.code && (
                      <div className="bg-page border border-hairline rounded-lg px-4 py-3 font-mono text-[12px] text-[#8a8a8a] overflow-x-auto">
                        {sub.code}
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Was this helpful? */}
            <FadeUp delay={0.3}>
              <div className="mt-12 pt-6 border-t border-hairline">
                <p className="text-[13px] text-[#8a8a8a] mb-3">Was this helpful?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHelpful('yes')}
                    className={`px-4 py-2 rounded-md text-[12px] transition-colors ${
                      helpful === 'yes' ? 'bg-lime text-page' : 'bg-surface text-[#8a8a8a] hover:text-text'
                    }`}
                  >
                    👍 Yes
                  </button>
                  <button
                    onClick={() => setHelpful('no')}
                    className={`px-4 py-2 rounded-md text-[12px] transition-colors ${
                      helpful === 'no' ? 'bg-lime text-page' : 'bg-surface text-[#8a8a8a] hover:text-text'
                    }`}
                  >
                    👎 No
                  </button>
                </div>
              </div>
            </FadeUp>

            {/* Prev/Next */}
            <FadeUp delay={0.35}>
              <div className="mt-8 flex justify-between">
                {(() => {
                  const idx = DOCS_SECTIONS.findIndex(s => s.id === section);
                  const prev = idx > 0 ? DOCS_SECTIONS[idx - 1] : null;
                  const next = idx < DOCS_SECTIONS.length - 1 ? DOCS_SECTIONS[idx + 1] : null;
                  return (
                    <>
                      {prev ? (
                        <Link to={`/docs/${prev.id}`} className="text-[12px] text-[#8a8a8a] hover:text-lime transition-colors">
                          ← {prev.title}
                        </Link>
                      ) : <div />}
                      {next ? (
                        <Link to={`/docs/${next.id}`} className="text-[12px] text-[#8a8a8a] hover:text-lime transition-colors">
                          {next.title} →
                        </Link>
                      ) : <div />}
                    </>
                  );
                })()}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </>
  );
}
