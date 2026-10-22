import { useState } from 'react';
import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

interface MockRequest {
  id: string;
  method: string;
  path: string;
  status: number;
  timestamp: string;
  headers: Record<string, string>;
  body: string;
}

export default function WebhookTesterPage() {
  const [url] = useState(() => `https://hook.tunnelo.dev/${generateId()}`);
  const [requests, setRequests] = useState<MockRequest[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sendTest = () => {
    const methods = ['POST', 'PUT', 'PATCH'];
    const paths = ['/webhooks/stripe', '/webhooks/github', '/webhooks/slack'];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    const status = Math.random() > 0.2 ? 200 : 500;
    const newReq: MockRequest = {
      id: Date.now().toString(),
      method,
      path,
      status,
      timestamp: new Date().toLocaleTimeString(),
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Tunnelo-Tester/1.0',
        'x-webhook-id': generateId(),
      },
      body: JSON.stringify({ event: 'test.event', data: { id: generateId(), amount: Math.floor(Math.random() * 10000) } }, null, 2),
    };
    setRequests([newReq, ...requests]);
    setSelected(newReq.id);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedReq = requests.find(r => r.id === selected);

  return (
    <>
      <PageShell
        eyebrow="Tools"
        title="Free webhook tester"
        description="Test webhooks without deploying. Send test requests and inspect them in real-time."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* URL bar */}
        <FadeUp>
          <div className="border border-hairline rounded-xl p-6 bg-surface mb-8">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 bg-page border border-hairline rounded-lg px-4 py-3 font-mono text-[13px] text-[#8a8a8a] truncate">
                {url}
              </div>
              <button
                onClick={sendTest}
                className="bg-lime text-page text-[13px] font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Send test request
              </button>
              <button
                onClick={copyUrl}
                className="border border-hairline text-[13px] text-[#8a8a8a] hover:text-text px-4 py-3 rounded-md transition-colors"
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>
        </FadeUp>

        {/* Request list */}
        <FadeUp delay={0.08}>
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="border border-hairline rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-hairline">
                <p className="text-[13px] font-semibold text-text">Requests ({requests.length})</p>
                {requests.length > 0 && (
                  <button onClick={() => { setRequests([]); setSelected(null); }} className="text-[11px] text-muted hover:text-text transition-colors">
                    Clear
                  </button>
                )}
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {requests.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-[13px] text-muted">No requests yet. Click "Send test request" to start.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-hairline">
                    {requests.map(req => (
                      <button
                        key={req.id}
                        onClick={() => setSelected(req.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-raised/50 transition-colors ${selected === req.id ? 'bg-raised' : ''}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] text-muted">{req.method}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${req.status === 200 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                            {req.status}
                          </span>
                          <span className="text-[10px] text-muted ml-auto">{req.timestamp}</span>
                        </div>
                        <p className="font-mono text-[11px] text-[#8a8a8a] truncate">{req.path}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Detail panel */}
            <div className="border border-hairline rounded-xl overflow-hidden">
              <div className="p-4 border-b border-hairline">
                <p className="text-[13px] font-semibold text-text">Request detail</p>
              </div>
              {selectedReq ? (
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  <div className="mb-4">
                    <p className="text-[10px] text-muted font-mono mb-2">Headers</p>
                    <div className="space-y-1.5">
                      {Object.entries(selectedReq.headers).map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <span className="text-[11px] font-mono text-muted w-28 truncate">{k}</span>
                          <span className="text-[11px] font-mono text-[#8a8a8a] truncate">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted font-mono mb-2">Body</p>
                    <pre className="bg-page border border-hairline rounded-lg p-3 font-mono text-[11px] text-[#8a8a8a] overflow-x-auto whitespace-pre-wrap">
                      {selectedReq.body}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-[13px] text-muted">Select a request to view details.</p>
                </div>
              )}
            </div>
          </div>
        </FadeUp>

        {/* How it works */}
        <FadeUp delay={0.16}>
          <div className="border border-hairline rounded-xl p-6 mb-8">
            <p className="font-mono text-[12px] text-lime mb-4">HOW IT WORKS</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[14px] font-semibold text-text mb-2">1. Copy your URL</p>
                <p className="text-[12px] text-[#8a8a8a]">Use the generated URL as your webhook endpoint in any service.</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-text mb-2">2. Trigger a webhook</p>
                <p className="text-[12px] text-[#8a8a8a]">Perform an action in your app or click "Send test request" to simulate.</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-text mb-2">3. Inspect the request</p>
                <p className="text-[12px] text-[#8a8a8a]">View headers, body, and debug issues in real-time.</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* FAQ */}
        <FadeUp delay={0.24}>
          <div className="border border-hairline rounded-xl p-6 mb-8">
            <p className="font-mono text-[12px] text-lime mb-4">FAQ</p>
            <div className="space-y-4">
              <div>
                <p className="text-[13px] font-semibold text-text mb-1">Is this really free?</p>
                <p className="text-[12px] text-[#8a8a8a]">Yes. The webhook tester is free to use with no limits.</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text mb-1">How long are URLs kept?</p>
                <p className="text-[12px] text-[#8a8a8a]">URLs are permanent but requests are cleared when you refresh the page.</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text mb-1">Can I use this for production?</p>
                <p className="text-[12px] text-[#8a8a8a]">This is for testing only. For production webhooks, use Tunnelo's full product.</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text mb-1">Is my data private?</p>
                <p className="text-[12px] text-[#8a8a8a]">Requests are not stored on our servers. Everything runs in your browser.</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.32}>
          <div className="text-center border-t border-hairline pt-8">
            <p className="text-[14px] text-[#8a8a8a] mb-4">Need more power? Try Tunnelo's full product.</p>
            <a href="/download" className="inline-block bg-lime text-page text-[13px] font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity">
              Download Tunnelo
            </a>
          </div>
        </FadeUp>
      </div>
    </>
  );
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
