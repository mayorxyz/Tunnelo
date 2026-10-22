import { useState } from 'react';
import PageShell from '../components/PageShell';
import PricingSection from '../components/Pricing';
import { FadeUp, CheckIcon } from '../components/shared';
import DemoModal from '../components/DemoModal';

const COMPARE_ROWS = [
  { feature: 'Devices', free: '1', solo: '1', pro: '3', teams: '5+' },
  { feature: 'Live Public URLs', free: '1', solo: '5', pro: '10', teams: '10+' },
  { feature: 'Session length', free: '30 min', solo: 'Unlimited', pro: 'Unlimited', teams: 'Unlimited' },
  { feature: 'Snapshots', free: '1', solo: '3', pro: '10', teams: '20' },
  { feature: 'Custom domains', free: '—', solo: '1', pro: '3', teams: 'Unlimited' },
  { feature: 'TCP tunnels', free: '—', solo: '✓', pro: '✓', teams: '✓' },
  { feature: 'Access control', free: '—', solo: 'Password', pro: 'Password + IP', teams: 'Full RBAC' },
  { feature: 'MCP server', free: '—', solo: '✓', pro: '✓', teams: '✓' },
  { feature: 'SSO + SCIM', free: '—', solo: '—', pro: '—', teams: '✓' },
  { feature: 'Audit log', free: '—', solo: '—', pro: '—', teams: '✓' },
  { feature: 'Support', free: 'Community', solo: '48h email', pro: '24h email', teams: 'Priority' },
];

export default function PricingPage() {
  const [demoModal, setDemoModal] = useState(false);

  return (
    <>
      <PageShell
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Start any paid plan with a 14-day free trial. No credit card required."
      />
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-16 w-full overflow-x-hidden flex flex-col items-center">
        {/* Reuse home pricing section */}
        <div className="w-full">
          <PricingSection />
        </div>

        {/* Compare table */}
        <FadeUp className="w-full">
          <div className="mt-12 sm:mt-16 w-full text-center">
            <p className="font-mono text-[12px] font-semibold text-lime-700 dark:text-lime-400 mb-4 sm:mb-6 tracking-wide">
              COMPARE PLANS
            </p>
            <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] table-fixed">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="text-left text-[11px] text-muted-foreground font-mono p-3 sm:p-4 w-[28%]">Feature</th>
                      <th className="text-center text-[11px] text-muted-foreground font-mono p-3 sm:p-4 w-[18%]">Free</th>
                      <th className="text-center text-[11px] text-muted-foreground font-mono p-3 sm:p-4 w-[18%]">Solo</th>
                      <th className="text-center text-[11px] text-lime-700 dark:text-lime-400 font-mono font-bold p-3 sm:p-4 w-[18%] bg-lime-500/10 dark:bg-lime-500/5">
                        Pro
                      </th>
                      <th className="text-center text-[11px] text-muted-foreground font-mono p-3 sm:p-4 w-[18%]">Teams</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="p-3 sm:p-4 text-[12px] text-foreground font-medium text-left break-words whitespace-normal">
                          {row.feature}
                        </td>
                        <td className="p-3 sm:p-4 text-center text-[12px] text-muted-foreground break-words whitespace-normal">
                          {row.free === '✓' ? <span className="inline-flex justify-center"><CheckIcon /></span> : row.free === '—' ? <span className="opacity-50">—</span> : row.free}
                        </td>
                        <td className="p-3 sm:p-4 text-center text-[12px] text-muted-foreground break-words whitespace-normal">
                          {row.solo === '✓' ? <span className="inline-flex justify-center"><CheckIcon /></span> : row.solo === '—' ? <span className="opacity-50">—</span> : row.solo}
                        </td>
                        <td className="p-3 sm:p-4 text-center text-[12px] text-muted-foreground bg-lime-500/10 dark:bg-lime-500/5 break-words whitespace-normal font-medium">
                          {row.pro === '✓' ? <span className="inline-flex justify-center"><CheckIcon /></span> : row.pro === '—' ? <span className="opacity-50">—</span> : row.pro}
                        </td>
                        <td className="p-3 sm:p-4 text-center text-[12px] text-muted-foreground break-words whitespace-normal">
                          {row.teams === '✓' ? <span className="inline-flex justify-center"><CheckIcon /></span> : row.teams === '—' ? <span className="opacity-50">—</span> : row.teams}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-2 block sm:hidden font-mono">
              ← Scroll horizontally to compare all features →
            </p>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.2} className="w-full">
          <div className="mt-12 text-center border-t border-border pt-8 w-full flex flex-col items-center">
            <p className="text-[14px] text-muted-foreground mb-4">Questions about pricing?</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
              <a href="/contact" className="w-full sm:w-auto border border-border text-[13px] text-foreground hover:bg-accent px-6 py-2.5 rounded-md transition-colors text-center">
                Contact sales
              </a>
              <button
                onClick={() => setDemoModal(true)}
                className="w-full sm:w-auto bg-primary text-primary-foreground text-[13px] font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity text-center"
              >
                Start free trial
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
      <DemoModal open={demoModal} onClose={() => setDemoModal(false)} />
    </>
  );
}