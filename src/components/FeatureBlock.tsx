import { useState } from 'react';
import { FadeUp, AppWindow } from './shared';
import { FEATURES } from '../lib/content';

const MOCK_REQUESTS = [
  { method: 'POST', path: '/webhooks/stripe', status: 200, time: '2s ago', body: '{"id": "evt_1NqB3", "type": "payment_intent.succeeded", "data": {"object": {"amount": 2000}}}' },
  { method: 'POST', path: '/webhooks/stripe', status: 500, time: '14s ago', body: '{"error": {"message": "Signature verification failed", "type": "invalid_request"}}' },
  { method: 'POST', path: '/auth/callback', status: 200, time: '32s ago', body: '{"code": "abc123", "state": "xyz", "redirect_uri": "https://app.lumora.dev/callback"}' },
];

export default function FeatureBlock() {
  return (
    <div className="space-y-[120px] md:space-y-[120px]">
      <Feature01 />
      <Feature02 />
      <Feature03 />
      <Feature04 />
    </div>
  );
}

function FeatureHeader({ num, title, text, highlight }: { num: string; title: string; text: string; highlight?: string }) {
  return (
    <FadeUp className="max-w-[1120px] mx-auto px-6 mb-8">
      <span className="font-mono text-[48px] md:text-[64px] text-muted/30 font-bold leading-none block mb-4">{num}</span>
      <h2 className="text-[28px] md:text-[32px] font-medium mb-4">
        {highlight ? (
          <>
            {title.split(highlight)[0]}<span className="text-lime">{highlight}</span>{title.split(highlight)[1]}
          </>
        ) : title}
      </h2>
      <p className="text-[14px] text-secondary max-w-[560px] leading-relaxed">{text}</p>
    </FadeUp>
  );
}

function Feature01() {
  const [selected, setSelected] = useState(0);
  const f = FEATURES[0];

  return (
    <div>
      <FeatureHeader num={f.num} title={f.title} text={f.text} />
      <FadeUp className="max-w-[1120px] mx-auto px-6">
        <AppWindow>
          <div className="flex min-h-[400px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-hairline p-3 hidden md:block">
              <p className="text-[11px] text-muted font-mono mb-3 px-2">LUMORA</p>
              <SidebarItem label="Public URLs" />
              <SidebarItem label="Local domains" />
              <SidebarItem label="Inspector" active />
              <div className="mt-4 pt-3 border-t border-hairline">
                <p className="text-[11px] text-lime px-2 cursor-pointer">+ Add project</p>
              </div>
            </div>
            {/* Request list */}
            <div className="flex-1 border-r border-hairline min-w-0">
              <div className="p-3 border-b border-hairline">
                <p className="text-[12px] text-muted font-mono mb-2">Inspect traffic</p>
                <div className="inline-flex items-center gap-1 bg-raised rounded px-2 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  <span className="font-mono text-[11px] text-secondary">lumora.dev</span>
                </div>
              </div>
              <div className="divide-y divide-hairline">
                {MOCK_REQUESTS.map((req, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left px-3 py-2.5 flex items-center gap-2 hover:bg-raised/50 transition-colors ${selected === i ? 'bg-raised' : ''}`}
                  >
                    <span className="font-mono text-[10px] text-muted w-8">{req.method}</span>
                    <span className="font-mono text-[11px] text-secondary truncate flex-1">{req.path}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${req.status === 200 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>{req.status}</span>
                    <span className="text-[10px] text-muted">{req.time}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Detail panel */}
            <div className="w-72 p-3 hidden lg:block">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[11px] text-text">{MOCK_REQUESTS[selected].method} {MOCK_REQUESTS[selected].path}</p>
                <button className="text-[10px] bg-lime text-page px-2 py-1 rounded font-semibold">Replay</button>
              </div>
              <div className="flex gap-3 mb-3 border-b border-hairline pb-2">
                <span className="text-[11px] text-lime font-mono">Headers</span>
                <span className="text-[11px] text-muted font-mono">Body</span>
              </div>
              <div className="space-y-2">
                <HeaderRow k="content-type" v="application/json" />
                <HeaderRow k="user-agent" v="Stripe/1.0" />
                <HeaderRow k="stripe-signature" v="t=1699..." />
                <HeaderRow k="ip" v="203.0.113.42" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-muted font-mono mb-1">Body</p>
                <pre className="text-[10px] font-mono text-secondary bg-page rounded p-2 overflow-x-auto whitespace-pre-wrap break-all">{MOCK_REQUESTS[selected].body}</pre>
              </div>
            </div>
          </div>
        </AppWindow>
      </FadeUp>
    </div>
  );
}

function SidebarItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className={`px-2 py-1.5 rounded text-[11px] mb-0.5 cursor-pointer ${active ? 'bg-lime/10 text-lime' : 'text-secondary hover:text-text'}`}>
      {label}
    </div>
  );
}

function HeaderRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-[10px] font-mono text-muted w-24 truncate">{k}</span>
      <span className="text-[10px] font-mono text-secondary truncate">{v}</span>
    </div>
  );
}

// Feature 02 - Domains mock
function Feature02() {
  const [menuOpen, setMenuOpen] = useState(true);
  const f = FEATURES[1];
  const domains = [
    { project: 'web', local: 'http://localhost:3000', public: 'web.lumora.dev', active: true },
    { project: 'api', local: 'http://localhost:4000', public: 'api.lumora.local', active: true },
    { project: 'preview', local: 'http://localhost:5173', public: 'preview.lumora.dev', active: false },
    { project: 'webhooks', local: 'http://localhost:8080', public: 'hooks.lumora.dev', active: true },
  ];

  return (
    <div>
      <FeatureHeader num={f.num} title={f.title} text={f.text} />
      <FadeUp className="max-w-[1120px] mx-auto px-6">
        <AppWindow>
          <div className="flex min-h-[360px]">
            <div className="w-48 border-r border-hairline p-3 hidden md:block">
              <p className="text-[11px] text-muted font-mono mb-3 px-2">PROJECTS</p>
              {domains.map((d, i) => (
                <div key={i} className={`px-2 py-1.5 rounded text-[11px] mb-0.5 cursor-pointer ${i === 0 ? 'bg-lime/10 text-lime' : 'text-secondary'}`}>
                  {d.project}
                </div>
              ))}
            </div>
            <div className="flex-1 p-4">
              <div className="space-y-2">
                {domains.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded border border-hairline hover:border-white/20 transition-colors">
                    <span className={`w-2 h-2 rounded-full ${d.active ? 'bg-green' : 'bg-muted'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[12px] text-text truncate">{d.public}</p>
                      <p className="font-mono text-[10px] text-muted">{d.local}</p>
                    </div>
                    {i === 0 && (
                      <button onClick={() => setMenuOpen(!menuOpen)} className="text-[10px] text-muted hover:text-text px-2 py-1 border border-hairline rounded">
                        ▾
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {menuOpen && (
                <div className="mt-2 w-52 bg-raised border border-hairline rounded-lg p-1 shadow-xl">
                  <p className="text-[10px] text-muted font-mono px-2 py-1">New Public URL</p>
                  <div className="space-y-0.5">
                    <MenuItem label="staging.lumora.dev" />
                    <MenuItem label="api.lumora.dev" />
                    <div className="border-t border-hairline my-1" />
                    <MenuItem label="Refresh Link" />
                    <MenuItem label="Add Custom Domain..." />
                  </div>
                </div>
              )}
            </div>
          </div>
        </AppWindow>
      </FadeUp>
    </div>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <div className="px-2 py-1.5 text-[11px] text-secondary hover:bg-lime/10 hover:text-lime rounded cursor-pointer transition-colors">
      {label}
    </div>
  );
}

// Feature 03 - Snapshot mock
function Feature03() {
  const f = FEATURES[2];
  return (
    <div>
      <FeatureHeader num={f.num} title={f.title} text={f.text} />
      <FadeUp className="max-w-[1120px] mx-auto px-6">
        <AppWindow>
          <div className="flex min-h-[360px]">
            <div className="w-48 border-r border-hairline p-3 hidden md:block">
              <p className="text-[11px] text-muted font-mono mb-3 px-2">LUMORA</p>
              <SidebarItem label="Public URLs" />
              <SidebarItem label="Local domains" />
              <SidebarItem label="Inspector" />
              <SidebarItem label="Snapshots" active />
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[12px] text-text font-mono">Public URL</p>
                <span className="bg-green/10 text-green text-[10px] px-2 py-0.5 rounded-full font-mono">Live</span>
              </div>
              <div className="border border-hairline rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] text-text">Snapshot</p>
                  <span className="text-[10px] text-muted font-mono">No snapshot</span>
                </div>
                <div className="mb-3">
                  <label className="text-[10px] text-muted font-mono block mb-1">App Folder</label>
                  <div className="bg-page border border-hairline rounded px-2 py-1.5 font-mono text-[11px] text-secondary">./dist</div>
                </div>
                <button className="bg-lime text-page text-[11px] font-semibold px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                  Publish
                </button>
              </div>
              {/* Snapshot info popover */}
              <div className="bg-raised border border-hairline rounded-lg p-3 max-w-xs">
                <p className="text-[11px] text-secondary leading-relaxed">
                  Snapshots deploy a static copy of your app. The same Public URL serves the snapshot when your laptop is closed.
                </p>
              </div>
              {/* Comment pins */}
              <div className="relative mt-4 bg-page border border-hairline rounded-lg h-32 flex items-center justify-center">
                <span className="text-[11px] text-muted font-mono">Page Preview</span>
                <div className="absolute top-4 left-8 w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                  <span className="text-[8px] text-page font-bold">A</span>
                </div>
                <div className="absolute top-8 right-12 w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                  <span className="text-[8px] text-page font-bold">B</span>
                </div>
              </div>
            </div>
          </div>
        </AppWindow>
      </FadeUp>
    </div>
  );
}

// Feature 04 - Agent terminal
function Feature04() {
  const f = FEATURES[3];
  const lines = [
    { type: 'prompt', text: '> Fix the failing Stripe webhook on /webhooks/stripe' },
    { type: 'tool', text: '⚡ tunnelo inspect --last 5' },
    { type: 'table', text: '  POST /webhooks/stripe  500  14s ago' },
    { type: 'table', text: '  POST /webhooks/stripe  200  2m ago' },
    { type: 'diag', text: '⚠ Diagnosis: signature verification failed:' },
    { type: 'diag', text: '  raw body parsed before verification' },
    { type: 'fix', text: '✓ Suggested fix:' },
    { type: 'code', text: '  const sig = req.headers["stripe-signature"];' },
    { type: 'code', text: '  const raw = await req.text();' },
    { type: 'code', text: '  stripe.webhooks.constructEvent(raw, sig, secret);' },
  ];

  return (
    <div>
      <FeatureHeader num={f.num} title={f.title} text={f.text} highlight={f.highlight} />
      <FadeUp className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left pills */}
          <div className="lg:w-64 space-y-2">
            {['Create a Public URL', 'Publish a Snapshot', 'Get an inspector', 'Debug a failing webhook'].map((item, i) => (
              <div key={i} className={`border rounded-lg px-3 py-2.5 text-[12px] ${i === 3 ? 'border-lime/30 bg-lime/5 text-lime' : 'border-hairline text-secondary'}`}>
                {item}
              </div>
            ))}
          </div>
          {/* Terminal */}
          <div className="flex-1 bg-app border border-hairline rounded-xl p-4 font-mono text-[11px] overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} className={`mb-1.5 ${
                line.type === 'prompt' ? 'text-lime' :
                line.type === 'tool' ? 'text-blue' :
                line.type === 'table' ? 'text-secondary' :
                line.type === 'diag' ? 'text-amber' :
                line.type === 'fix' ? 'text-green' :
                'text-muted'
              }`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
