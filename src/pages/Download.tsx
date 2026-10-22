import { useState, useEffect } from 'react';
import PageShell from '../components/PageShell';
import PixelArt from '../components/PixelArt';
import DemoModal from '../components/DemoModal';
import { FadeUp } from '../components/shared';

export default function DownloadPage() {
  const [demoModal, setDemoModal] = useState(false);
  const [detectedOs, setDetectedOs] = useState<'mac' | 'windows' | 'linux'>('mac');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    const p = navigator.platform.toLowerCase();
    if (p.includes('win')) setDetectedOs('windows');
    else if (p.includes('linux')) setDetectedOs('linux');
    else setDetectedOs('mac');
  }, []);

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const osCards = [
    { id: 'mac' as const, name: 'macOS', file: 'Tunnelo-2.4.0.dmg', size: '84.2 MB', arch: 'Universal (Intel + Apple Silicon)' },
    { id: 'windows' as const, name: 'Windows', file: 'Tunnelo-Setup-2.4.0.exe', size: '72.6 MB', arch: 'x64' },
    { id: 'linux' as const, name: 'Linux', file: 'tunnelo-2.4.0.AppImage', size: '68.1 MB', arch: 'x86_64' },
  ];

  const installCmds = [
    { label: 'Homebrew', cmd: 'brew install --cask tunnelo' },
    { label: 'winget', cmd: 'winget install Tunnelo.Tunnelo' },
    { label: 'apt', cmd: 'sudo apt install tunnelo' },
  ];

  return (
    <>
      <PageShell
        eyebrow="Download"
        title="Download Tunnelo"
        description="Get the desktop app for your platform. Free 14-day trial included, no credit card required."
      />
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-12 w-full overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16">
          <FadeUp>
            <div className="space-y-3">
              {osCards.map((os) => (
                <div
                  key={os.id}
                  className={`border rounded-xl p-4 sm:p-5 transition-colors ${
                    detectedOs === os.id ? 'border-lime/40 bg-lime/[0.03]' : 'border-hairline bg-surface'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-[16px] font-semibold text-text">{os.name}</p>
                        {detectedOs === os.id && (
                          <span className="text-[10px] bg-lime/10 text-lime px-2 py-0.5 rounded-full font-mono">Detected</span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#8a8a8a] font-mono break-all">{os.file}</p>
                      <p className="text-[11px] text-muted mt-1">{os.size} · {os.arch}</p>
                    </div>
                    <button
                      onClick={() => setDemoModal(true)}
                      className="bg-lime text-page text-[12px] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity shrink-0 w-full sm:w-auto text-center mt-1 sm:mt-0"
                    >
                      Download
                    </button>
                  </div>
                  <p className="text-[10px] text-muted font-mono mt-3 break-all">SHA256: {generateChecksum(os.id)}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="border border-hairline rounded-xl overflow-hidden flex items-center justify-center bg-app p-6 sm:p-8 min-h-[220px]">
              <PixelArt seed={42} cols={60} rows={60} cellSize={4} shape="silhouette" />
            </div>
          </FadeUp>
        </div>

        {/* System requirements */}
        <FadeUp>
          <div className="border border-hairline rounded-xl p-4 sm:p-6 mb-8">
            <p className="font-mono text-[12px] text-lime mb-4">SYSTEM REQUIREMENTS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-[12px]">
              <div><span className="text-muted block mb-1">macOS</span><span className="text-[#8a8a8a]">12.0+ (Monterey), Apple Silicon or Intel</span></div>
              <div><span className="text-muted block mb-1">Windows</span><span className="text-[#8a8a8a]">10 (1903+) or 11, x64</span></div>
              <div><span className="text-muted block mb-1">Linux</span><span className="text-[#8a8a8a]">Ubuntu 20.04+, Fedora 36+, x86_64</span></div>
            </div>
          </div>
        </FadeUp>

        {/* Install snippets */}
        <FadeUp delay={0.08}>
          <p className="font-mono text-[12px] text-lime mb-4">PACKAGE MANAGERS</p>
          <div className="space-y-2 mb-8">
            {installCmds.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-surface border border-hairline rounded-lg px-4 py-3">
                <span className="text-[11px] text-muted font-mono w-16 shrink-0">{item.label}</span>
                <code className="text-[12px] font-mono text-[#8a8a8a] flex-1 break-all sm:truncate w-full">{item.cmd}</code>
                <button
                  onClick={() => copy(item.cmd, i)}
                  className="text-[11px] text-muted hover:text-text transition-colors shrink-0 self-end sm:self-auto pt-1 sm:pt-0"
                >
                  {copiedIdx === i ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* CLI only */}
        <FadeUp delay={0.16}>
          <div className="border border-hairline rounded-xl p-4 sm:p-6 mb-8">
            <p className="font-mono text-[12px] text-lime mb-3">CLI ONLY</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-page border border-hairline rounded-lg px-4 py-3">
              <div className="overflow-x-auto w-full flex-1 py-1">
                <code className="text-[12px] font-mono text-[#8a8a8a] whitespace-nowrap sm:whitespace-normal break-all">curl -fsSL https://tunnelo.dev/install.sh | sh</code>
              </div>
              <button onClick={() => copy('curl -fsSL https://tunnelo.dev/install.sh | sh', 99)} className="text-[11px] text-muted hover:text-text transition-colors shrink-0 self-end sm:self-auto">
                {copiedIdx === 99 ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-hairline pt-6">
            <div>
              <a href="/changelog" className="text-[13px] text-lime hover:underline">View release notes →</a>
              <p className="text-[11px] text-muted mt-1">Free 14-day trial included. No credit card required.</p>
            </div>
          </div>
        </FadeUp>
      </div>
      <DemoModal open={demoModal} onClose={() => setDemoModal(false)} />
    </>
  );
}

function generateChecksum(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  return Math.abs(hash).toString(16).padStart(8, '0').repeat(8).slice(0, 64);
}