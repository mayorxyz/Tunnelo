import { useState } from 'react';
import PageShell from '../components/PageShell';
import PixelArt from '../components/PixelArt';
import { FadeUp } from '../components/shared';

type Category = 'New' | 'Improved' | 'Fixed';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  bullets: string[];
  categories: Category[];
  seed: number;
}

const ENTRIES: ChangelogEntry[] = [
  { version: 'v2.4.0', date: 'Oct 15, 2026', title: 'MCP server for AI agents', description: 'Tunnelo now exposes a Model Context Protocol server so agents like Claude Code and Cursor can create URLs and debug webhooks.', bullets: ['MCP server bundled with desktop app', 'Tools: create_url, publish_snapshot, inspect', 'Works with Claude Code, Cursor, Codex', 'Docs at /docs/ai-agents'], categories: ['New'], seed: 1 },
  { version: 'v2.3.0', date: 'Sep 28, 2026', title: 'Snapshots with inline comments', description: 'Publish a Snapshot and reviewers can pin comments directly on the page, like in Figma.', bullets: ['Comment pins with avatars', 'Resolve and thread replies', 'Password-protected snapshots', 'Export comments to markdown'], categories: ['New', 'Improved'], seed: 2 },
  { version: 'v2.2.0', date: 'Sep 10, 2026', title: 'TCP tunnels', description: 'Tunnel any TCP service — databases, SSH, Kubernetes — not just HTTP.', bullets: ['Postgres, MySQL, Redis tunnels', 'SSH box access from anywhere', 'Kubernetes port-forward replacement', 'Bandwidth and connection limits'], categories: ['New'], seed: 3 },
  { version: 'v2.1.0', date: 'Aug 22, 2026', title: 'Custom domain wildcards', description: 'Use wildcard DNS to route any subdomain to your local app.', bullets: ['*.yourdomain.dev support', 'Automatic TLS for all subdomains', 'Per-subdomain routing rules', 'DNS verification helper'], categories: ['New'], seed: 4 },
  { version: 'v2.0.1', date: 'Aug 5, 2026', title: 'Inspector replay improvements', description: 'Replay any request with modified headers or body. Great for debugging flaky webhooks.', bullets: ['Edit headers before replay', 'Retry with exponential backoff', 'Export request as cURL', 'Batch replay up to 50 requests'], categories: ['Improved'], seed: 5 },
  { version: 'v2.0.0', date: 'Jul 18, 2026', title: 'Linux build and new UI', description: 'Tunnelo is now available on Linux with a redesigned desktop app.', bullets: ['AppImage and deb packages', 'New sidebar navigation', 'Dark mode by default', '50% faster startup'], categories: ['New', 'Improved'], seed: 6 },
  { version: 'v1.9.0', date: 'Jun 30, 2026', title: 'SSO + SCIM provisioning', description: 'Teams can now use Okta SSO and automatically provision members via SCIM.', bullets: ['Okta and Azure AD support', 'SCIM 2.0 user provisioning', 'Group-based role mapping', 'Session timeout controls'], categories: ['New'], seed: 7 },
  { version: 'v1.8.0', date: 'Jun 12, 2026', title: 'Audit log', description: 'Full audit trail for team actions: who created what URL, when, and from where.', bullets: ['90-day retention on Pro', 'Unlimited on Teams', 'Export to CSV', 'Filter by user and action'], categories: ['New'], seed: 8 },
  { version: 'v1.7.2', date: 'May 25, 2026', title: 'CLI improvements', description: 'Better error messages, faster startup, and new flags for scripting.', bullets: ['--json output for all commands', 'Non-interactive mode for CI', 'Better error messages with suggestions', 'Shell completions for bash/zsh/fish'], categories: ['Improved'], seed: 9 },
  { version: 'v1.7.1', date: 'May 10, 2026', title: 'Performance and stability', description: 'Under-the-hood improvements for faster tunnels and fewer disconnects.', bullets: ['30% faster tunnel setup', 'Better reconnection on network changes', 'Reduced memory usage', 'Fixed rare crash on sleep/wake'], categories: ['Fixed'], seed: 10 },
  { version: 'v1.7.0', date: 'Apr 22, 2026', title: 'IP allow rules', description: 'Restrict access to your Public URLs by IP address or CIDR range.', bullets: ['Per-URL IP allowlists', 'CIDR range support', 'Team-wide default rules', 'Audit log for blocked requests'], categories: ['New'], seed: 11 },
  { version: 'v1.6.0', date: 'Apr 5, 2026', title: 'Local domains with HTTPS', description: 'Use https://myapp.local with automatic certificates and system trust.', bullets: ['Automatic certificate generation', 'System trust store integration', 'Works on macOS, Windows, Linux', 'No more certificate warnings'], categories: ['New', 'Improved'], seed: 12 },
];

const CATEGORIES: Category[] = ['New', 'Improved', 'Fixed'];

export default function ChangelogPage() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === 'All' ? ENTRIES : ENTRIES.filter(e => e.categories.includes(filter));
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      <PageShell
        eyebrow="Changelog"
        title="Changelog"
        description="Latest updates, features, and improvements to Tunnelo."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Filter chips */}
        <FadeUp>
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setFilter('All')}
              className={`text-[12px] px-3 py-1.5 rounded-md transition-colors ${filter === 'All' ? 'bg-lime text-page font-semibold' : 'bg-surface text-[#8a8a8a] hover:text-white'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[12px] px-3 py-1.5 rounded-md transition-colors ${filter === cat ? 'bg-lime text-page font-semibold' : 'bg-surface text-[#8a8a8a] hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">
          <div className="space-y-8">
            {displayed.map((entry, i) => (
              <FadeUp key={entry.version} delay={i * 0.05}>
                <div className="flex gap-6">
                  {/* Content */}
                  <div className="flex-1 border border-hairline rounded-xl p-6 bg-surface">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-[11px] text-lime">{entry.version}</span>
                          <span className="text-[11px] text-muted">·</span>
                          <span className="text-[11px] text-muted font-mono">{entry.date}</span>
                        </div>
                        <h3 className="text-[16px] font-semibold text-white mb-2">{entry.title}</h3>
                        <p className="text-[13px] text-[#8a8a8a] mb-3">{entry.description}</p>
                        <ul className="space-y-1.5 mb-3">
                          {entry.bullets.map((b, j) => (
                            <li key={j} className="text-[12px] text-[#8a8a8a] flex items-start gap-2">
                              <span className="text-lime mt-0.5">•</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          {entry.categories.map(cat => (
                            <span key={cat} className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                              cat === 'New' ? 'bg-lime/10 text-lime' :
                              cat === 'Improved' ? 'bg-blue/10 text-blue' :
                              'bg-amber/10 text-amber'
                            }`}>{cat}</span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <PixelArt seed={entry.seed} cols={18} rows={18} cellSize={4} shape="grid" className="rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Load more */}
        {!showAll && filtered.length > 6 && (
          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="border border-hairline text-[13px] text-[#8a8a8a] hover:text-white px-6 py-2.5 rounded-md transition-colors"
              >
                Load more
              </button>
            </div>
          </FadeUp>
        )}
      </div>
    </>
  );
}
