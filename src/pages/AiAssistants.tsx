import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

export default function AiAssistantsPage() {
  const tools = ['Claude Code', 'Cursor', 'Codex', 'Windsurf'];
  const workflows = [
    { title: 'Preview deploy-free', desc: 'Share localhost with teammates or clients without deploying to staging.' },
    { title: 'Test webhooks', desc: 'Point Stripe, GitHub, or any service at a stable Public URL and debug in the Inspector.' },
    { title: 'Build MCP servers', desc: 'Hosted AI clients need a real public URL. Tunnelo provides it with full request visibility.' },
  ];

  return (
    <>
      <PageShell
        eyebrow="AI"
        title="Public URLs for AI code assistants"
        description="Give your AI agent a stable HTTPS endpoint to test webhooks, share previews, and build MCP servers."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Why agents need URLs */}
        <FadeUp>
          <div className="border border-hairline rounded-xl p-6 mb-8 bg-surface">
            <p className="text-[14px] text-[#8a8a8a] leading-relaxed">
              AI code assistants like Claude Code and Cursor run in hosted environments that can't receive webhooks on localhost. They need a real public HTTPS URL to test payment flows, OAuth callbacks, and webhook integrations. Tunnelo gives agents a stable URL with full request inspection, so they can debug issues without deploying.
            </p>
          </div>
        </FadeUp>

        {/* Supported tools */}
        <FadeUp delay={0.08}>
          <div className="mb-8">
            <p className="font-mono text-[12px] text-lime mb-4">SUPPORTED TOOLS</p>
            <div className="flex flex-wrap gap-3">
              {tools.map(tool => (
                <span key={tool} className="border border-hairline rounded-lg px-4 py-2 text-[13px] text-text bg-surface">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Terminal mock */}
        <FadeUp delay={0.16}>
          <div className="border border-hairline rounded-xl overflow-hidden mb-8">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-hairline bg-app">
              <span className="w-3 h-3 rounded-full bg-[#ff5a5f]" />
              <span className="w-3 h-3 rounded-full bg-[#ffb020]" />
              <span className="w-3 h-3 rounded-full bg-[#3ddc84]" />
            </div>
            <div className="p-4 bg-app font-mono text-[11px] space-y-1.5">
              <p className="text-lime">❯ claude "Create a Public URL for port 3000 and test the Stripe webhook"</p>
              <p className="text-blue">⚡ tunnelo http 3000</p>
              <p className="text-[#8a8a8a]">  → https://random-abc123.tunnelo.dev</p>
              <p className="text-blue">⚡ tunnelo inspect --last 5</p>
              <p className="text-[#8a8a8a]">  POST /webhooks/stripe  500  14s ago</p>
              <p className="text-[#8a8a8a]">  POST /webhooks/stripe  200  2m ago</p>
              <p className="text-amber">⚠ Diagnosis: signature verification failed</p>
              <p className="text-amber">  raw body parsed before verification</p>
              <p className="text-green">✓ Fix applied: read raw body before constructing event</p>
            </div>
          </div>
        </FadeUp>

        {/* Workflow cards */}
        <FadeUp delay={0.24}>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {workflows.map((w, i) => (
              <div key={i} className="border border-hairline rounded-xl p-5 bg-surface">
                <p className="text-[14px] font-semibold text-text mb-2">{w.title}</p>
                <p className="text-[12px] text-[#8a8a8a] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Config snippet */}
        <FadeUp delay={0.32}>
          <div className="border border-hairline rounded-xl p-6 mb-8 bg-surface">
            <p className="font-mono text-[12px] text-lime mb-3">MCP CONFIGURATION</p>
            <pre className="bg-page border border-hairline rounded-lg p-4 font-mono text-[11px] text-[#8a8a8a] overflow-x-auto">
{`// ~/.claude/config.json
{
  "mcpServers": {
    "tunnelo": {
      "command": "tunnelo",
      "args": ["mcp", "serve"]
    }
  }
}`}
            </pre>
          </div>
        </FadeUp>

        {/* Link to docs */}
        <FadeUp delay={0.4}>
          <div className="text-center border-t border-hairline pt-8">
            <p className="text-[13px] text-[#8a8a8a] mb-3">Learn more about AI agent integration</p>
            <a href="/docs/ai-agents" className="text-lime hover:underline text-[13px]">Read the AI agents docs →</a>
          </div>
        </FadeUp>
      </div>
    </>
  );
}
