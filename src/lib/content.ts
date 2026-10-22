export const NAV_LINKS = [
  { label: 'Docs', href: '/docs' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Pricing', href: '/pricing' },
];

export const TRUSTED_BY = ['Datatim', 'Spectro Cloud', 'FLIP', '◼', 'Primer'];

export const FRAMEWORKS = ['Next.js', 'Vercel', 'Fastify', 'Adonis', '⬡', 'Bun', 'Nuxt', 'Node.js'];

export const TESTIMONIAL_BAND = {
  quote: 'I was banging my head against the wall for hours trying to get a local cluster to trust our identity provider deployed inside it. With Tunnelo, I was able to replicate a production deployment locally within minutes. We pretty much use all of its features.',
  highlight: 'replicate a production deployment locally within minutes',
  name: 'Sample Person',
  title: 'Head of Platform, Sample Co',
};

export const FEATURES = [
  {
    num: '01',
    title: 'Test webhooks and OAuth callbacks',
    text: 'Point Stripe, Clerk, or GitHub at a stable Public URL and watch every delivery land in the inspector. Replay a failed request instead of re-triggering the payment.',
  },
  {
    num: '02',
    title: 'Share it without deploying',
    text: 'Built with Cursor or Claude Code and it runs on localhost. Send a real HTTPS link now, with no commit, no build pipeline, and no hosting account.',
  },
  {
    num: '03',
    title: 'Share the link, get feedback',
    text: 'Publish a Snapshot and the same Public URL serves a deployed version. Lock it with a password or a secret link. Others can add comments right on the page, like in Figma.',
  },
  {
    num: '04',
    title: 'Everything above, agents can do',
    highlight: 'agents',
    text: 'Over MCP or the CLI, from Claude Code, Cursor, or any agent.',
  },
];

export const EXTRA_CARDS = [
  {
    title: 'EXPOSE TCP SERVICES',
    text: 'Tunnel databases, SSH boxes, and Kubernetes clusters. Anything that speaks TCP, not just HTTP/S.',
  },
  {
    title: 'TEST ON REAL DEVICES',
    text: 'Open your localhost build on an actual device with real HTTPS, no deploy and no certificate warnings.',
  },
  {
    title: 'BUILD MCP SERVERS',
    text: 'Hosted AI clients need a real public URL, and you need to see every payload they send. Tunnelo does both.',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'For ephemeral Public URLs and local development',
    cta: 'Sign Up Free',
    outline: true,
    popular: false,
    features: [
      'Desktop app + CLI',
      'Mac / Windows / Linux',
      '1 live Public URL',
      '30 min sessions',
      'Snapshots (1) with a watermark',
      'Local domains',
      'Automatic HTTPS',
      'Inspector',
      'Replay requests',
    ],
  },
  {
    name: 'Solo',
    price: { monthly: 8, yearly: 6 },
    desc: 'For solo development with one device',
    cta: 'Start Free Trial',
    outline: false,
    popular: false,
    features: [
      'Everything in Free, plus:',
      '1 device',
      'Mac / Windows / Linux',
      '5 live Public URLs',
      'HTTP/S + TCP tunnels',
      'Snapshots (3 apps)',
      'Custom domains (1)',
      'Password and secret links',
      'MCP server for AI agents',
      '48h email support',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 12, yearly: 10 },
    desc: 'For developers with multiple projects',
    cta: 'Start Free Trial',
    outline: false,
    popular: true,
    features: [
      'Everything in Solo, plus:',
      '3 devices',
      '10 live Public URLs',
      'Snapshots (10 apps)',
      '3 custom domains',
      'Access control (password, secret link, IP rules)',
      'MCP server for AI agents',
      '24h email support',
    ],
  },
  {
    name: 'Teams',
    price: { monthly: 45, yearly: 36 },
    desc: 'For teams of any size',
    cta: 'Start Free Trial',
    outline: false,
    popular: false,
    features: [
      'Everything in Pro, plus:',
      '5 seats included',
      'Team-level custom domains',
      'Unlimited team members',
      'Snapshots (20 apps)',
      'Team access policies',
      'RBAC and seat control',
      'Okta SSO + SCIM',
      'Audit log',
    ],
  },
];

export const FAQ_ITEMS = [
  { q: 'Can AI agents like Claude Code use Tunnelo?', a: 'Yes. Tunnelo exposes an MCP server and a CLI that any agent can call. Create URLs, publish snapshots, and inspect traffic from within your agent workflow.' },
  { q: 'Can I use Tunnelo without a subscription?', a: 'The Free plan gives you one Public URL with 30-minute sessions, local domains, and the inspector. No credit card required to start.' },
  { q: 'How does pricing work for a team?', a: 'Flat per-seat billing. You pay once for the whole team and manage seats, roles, and custom domains from a single dashboard.' },
  { q: 'What does Tunnelo store, and is my traffic private?', a: 'Traffic is encrypted end-to-end and never stored on our servers. We only log metadata (timestamps, status codes) for the inspector.' },
  { q: 'What is the difference between a Public URL and a Snapshot?', a: 'A Public URL tunnels to your running localhost. A Snapshot is a static copy deployed from your machine that stays online even after you close your laptop.' },
  { q: 'Can I use my own domain?', a: 'Yes. Add any custom domain and we provision TLS automatically. Team plans support team-level custom domains shared by all members.' },
  { q: 'Do our custom domains and URLs stay with the team when someone leaves?', a: 'Yes. All resources belong to the team, not the individual. When a seat is removed, the URLs and domains remain active.' },
  { q: 'Can everyone on the team use it, not just CLI users?', a: 'Absolutely. The dashboard lets anyone on the team manage URLs, view inspector traffic, and publish snapshots without touching the terminal.' },
  { q: 'Do you offer SSO and enterprise security?', a: 'Teams plan includes Okta SSO, SCIM provisioning, RBAC, and a full audit log. Contact us for custom security requirements.' },
  { q: 'What roles and permissions do teams get?', a: 'Owner, Admin, and Member roles with granular permissions. Owners manage billing and seats; Admins manage URLs and domains; Members use the tools.' },
  { q: 'How many team members can I invite?', a: 'Unlimited. You pay per active seat. Remove a member and reassign the seat to someone else at any time.' },
  { q: 'How do I add or remove members and seats?', a: 'From the Team Settings page. Invite by email, change roles, or deactivate seats. Changes take effect immediately.' },
  { q: 'Can I get an invoice for the whole team?', a: 'Yes. All billing is consolidated into a single invoice. You can add your company details and VAT number in Billing settings.' },
  { q: 'Can I switch plans?', a: 'Yes. Upgrade or downgrade at any time from the dashboard. Credits are prorated and applied to your next invoice.' },
];

export const DEV_QUOTES = [
  { name: 'Alex Rivera', handle: '@alexdev', quote: 'Finally stopped fighting with ngrok config files. Tunnelo just works — webhooks land in the inspector and I can replay them instantly.' },
  { name: 'Jordan Kim', handle: '@jordank', quote: 'I share localhost previews with clients using Snapshots. They leave comments like Figma. No more "can you push to staging?" emails.' },
  { name: 'Sam Chen', handle: '@samchen', quote: 'Claude Code creates a Public URL, tests the webhook, and fixes the bug — all in one conversation. My agent workflow is 10x faster.' },
  { name: 'Morgan Lee', handle: '@mlee', quote: 'TCP tunnels for my local Postgres saved me hours. I can demo the full stack on my iPad without deploying anything.' },
];

export const FOOTER_COLS = [
  {
    label: 'Product',
    links: [
      { label: 'Download', href: '/download' },
  { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Tunnelo Blog', href: '/blog' },
      { label: 'Free webhook tester', href: '/tools/webhook-tester' },
      { label: 'AI code assistants', href: '/ai-code-assistants' },
      { label: 'Local domains', href: '/docs/local-domains' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'DPA', href: '/dpa' },
    ],
  },
  {
    label: 'Documentation',
    links: [
      { label: 'Quick start', href: '/docs/quick-start' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Public URLs', href: '/docs/public-urls' },
      { label: 'Custom domains', href: '/docs/custom-domains' },
      { label: 'Local domains', href: '/docs/local-domains' },
      { label: 'CLI', href: '/docs/cli' },
      { label: 'AI agents', href: '/docs/ai-agents' },
      { label: 'Troubleshooting', href: '/docs/troubleshooting' },
    ],
  },
  {
    label: 'Alternatives',
    links: [
      { label: 'Ngrok alternative', href: '/alternatives/ngrok' },
      { label: 'Cloudflare Tunnel alternative', href: '/alternatives/cloudflare-tunnel' },
      { label: 'Tunnelo vs Tailscale Funnel', href: '/alternatives/tailscale-funnel' },
    ],
  },
];
