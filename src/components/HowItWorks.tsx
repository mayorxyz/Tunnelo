import { useEffect, useRef } from 'react';
import { FadeUp } from './shared';

export default function HowItWorks() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <FadeUp>
        <h2 className="font-pixel text-[28px] md:text-[36px] text-center mb-10">How it works</h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <HowItWorksDiagram />
      </FadeUp>
    </section>
  );
}

function HowItWorksDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const packets = container.querySelectorAll('.packet');
    packets.forEach((p, i) => {
      const el = p as SVGElement;
      el.style.animationDelay = `${i * 0.4}s`;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="border border-hairline rounded-xl p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* ==================== DESKTOP: HORIZONTAL LAYOUT ==================== */}
      <svg
        viewBox="0 0 1200 500"
        className="hidden md:block w-full h-auto"
        fill="none"
      >
        {/* Left: Visitors */}
        <circle cx="150" cy="250" r="45" fill="#C6F432" opacity="0.1" stroke="#C6F432" strokeWidth="1.5" />
        <circle cx="150" cy="250" r="25" stroke="#C6F432" strokeWidth="1" opacity="0.5" />
        <path d="M125 250h50M150 225v50" stroke="#C6F432" strokeWidth="1" opacity="0.5" />
        <text x="150" y="325" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontFamily="JetBrains Mono">Visitors</text>
        <text x="150" y="342" textAnchor="middle" fill="#737373" fontSize="10" fontFamily="JetBrains Mono">Webhooks / API Calls</text>

        {/* Connector to Network */}
        <path d="M195 250 L360 250" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />

        {/* Center: Tunnelo Network */}
        <rect x="360" y="80" width="480" height="340" rx="12" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <text x="600" y="125" textAnchor="middle" fill="white" fontSize="15" fontFamily="JetBrains Mono" fontWeight="500">Tunnelo Network</text>
        
        {/* Server icon */}
        <rect x="570" y="195" width="60" height="90" rx="4" fill="#1b1b1b" stroke="#C6F432" strokeWidth="1" />
        <rect x="580" y="210" width="14" height="8" rx="1" fill="#C6F432" opacity="0.5" />
        <rect x="580" y="227" width="14" height="8" rx="1" fill="#C6F432" opacity="0.3" />
        <circle cx="590" cy="214" r="2" fill="#3ddc84" />
        <circle cx="590" cy="231" r="2" fill="#3ddc84" />
        
        {/* Labels inside Network */}
        <text x="420" y="360" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">Security</text>
        <text x="530" y="360" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">Access Control</text>
        <text x="690" y="360" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">DDoS Protection</text>

        {/* Connectors out of Network to Right */}
        <path d="M840 250 L880 250 L880 165 L920 165" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />
        <path d="M840 250 L880 250 L880 335 L920 335" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />

        {/* Right Top: Localhost */}
        <rect x="920" y="110" width="220" height="110" rx="6" fill="#1b1b1b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="930" y="120" width="200" height="55" rx="2" fill="#0c0c0c" />
        <rect x="938" y="130" width="20" height="6" rx="1" fill="#C6F432" opacity="0.5" />
        <text x="1030" y="202" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontFamily="JetBrains Mono">Localhost</text>

        {/* Right Bottom: Snapshot */}
        <rect x="920" y="280" width="220" height="110" rx="6" fill="#1b1b1b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="930" y="290" width="200" height="55" rx="2" fill="#0c0c0c" />
        <rect x="938" y="300" width="15" height="6" rx="1" fill="#4c8dff" opacity="0.5" />
        <text x="1030" y="372" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontFamily="JetBrains Mono">Snapshot</text>

        {/* Desktop Packet Animations */}
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M195 250 L360 250" />
        </circle>
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M840 250 L880 250 L880 165 L920 165" begin="0.6s" />
        </circle>
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M840 250 L880 250 L880 335 L920 335" begin="1.2s" />
        </circle>
      </svg>

      {/* ==================== MOBILE: VERTICAL LAYOUT ==================== */}
      <svg
        viewBox="0 0 600 980"
        className="block md:hidden w-full h-auto"
        fill="none"
      >
        {/* Top: Visitors */}
        <circle cx="300" cy="90" r="45" fill="#C6F432" opacity="0.1" stroke="#C6F432" strokeWidth="1.5" />
        <circle cx="300" cy="90" r="25" stroke="#C6F432" strokeWidth="1" opacity="0.5" />
        <path d="M275 90h50M300 65v50" stroke="#C6F432" strokeWidth="1" opacity="0.5" />
        <text x="300" y="155" textAnchor="middle" fill="#a3a3a3" fontSize="13" fontFamily="JetBrains Mono">Visitors</text>
        <text x="300" y="174" textAnchor="middle" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">Webhooks / API Calls</text>

        {/* Connector down to Network */}
        <path d="M300 145 L300 230" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />

        {/* Center: Tunnelo Network (Balanced height) */}
        <rect x="60" y="230" width="480" height="340" rx="12" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <text x="300" y="275" textAnchor="middle" fill="white" fontSize="15" fontFamily="JetBrains Mono" fontWeight="500">Tunnelo Network</text>
        
        {/* Server icon */}
        <rect x="270" y="325" width="60" height="80" rx="4" fill="#1b1b1b" stroke="#C6F432" strokeWidth="1" />
        <rect x="280" y="338" width="14" height="8" rx="1" fill="#C6F432" opacity="0.5" />
        <rect x="280" y="352" width="14" height="8" rx="1" fill="#C6F432" opacity="0.3" />
        <circle cx="290" cy="342" r="2" fill="#3ddc84" />
        <circle cx="290" cy="356" r="2" fill="#3ddc84" />
        
        {/* Labels */}
        <text x="140" y="490" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">Security</text>
        <text x="300" y="490" textAnchor="middle" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">Access Control</text>
        <text x="460" y="490" textAnchor="end" fill="#737373" fontSize="11" fontFamily="JetBrains Mono">DDoS Protection</text>

        {/* Connectors down to bottom */}
        <path d="M300 570 L300 640" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />
        <path d="M300 640 L160 640" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />
        <path d="M300 640 L440 640" stroke="#C6F432" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" opacity="0.6" />

        {/* Bottom Left: Localhost (Enlarged Box) */}
        <rect x="40" y="660" width="240" height="140" rx="8" fill="#1b1b1b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="52" y="672" width="216" height="75" rx="3" fill="#0c0c0c" />
        <rect x="62" y="684" width="25" height="7" rx="1" fill="#C6F432" opacity="0.5" />
        <rect x="62" y="700" width="45" height="5" rx="1" fill="#737373" opacity="0.3" />
        <text x="160" y="776" textAnchor="middle" fill="#a3a3a3" fontSize="13" fontFamily="JetBrains Mono">Localhost</text>
        <text x="160" y="792" textAnchor="middle" fill="#737373" fontSize="10" fontFamily="JetBrains Mono">App on your computer</text>

        {/* Bottom Right: Snapshot (Enlarged Box) */}
        <rect x="320" y="660" width="240" height="140" rx="8" fill="#1b1b1b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="332" y="672" width="216" height="75" rx="3" fill="#0c0c0c" />
        <rect x="342" y="684" width="20" height="7" rx="1" fill="#4c8dff" opacity="0.5" />
        <rect x="342" y="700" width="35" height="5" rx="1" fill="#737373" opacity="0.3" />
        <text x="440" y="776" textAnchor="middle" fill="#a3a3a3" fontSize="13" fontFamily="JetBrains Mono">Snapshot</text>
        <text x="440" y="792" textAnchor="middle" fill="#737373" fontSize="10" fontFamily="JetBrains Mono">Static copy deployed</text>

        {/* Mobile Packet Animations */}
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M300 145 L300 230" />
        </circle>
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M300 640 L160 640" begin="0.5s" />
        </circle>
        <circle r="3" fill="#C6F432" className="packet" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M300 640 L440 640" begin="1s" />
        </circle>
      </svg>
    </div>
  );
}