import { useState } from 'react';
import { FadeUp, AppWindow, PixelAvatar } from './shared';

const MEMBERS = [
  { name: 'Sarah Chen', role: 'Owner', seats: 1, since: 'Jan 2024' },
  { name: 'Marcus Webb', role: 'Admin', seats: 1, since: 'Feb 2024' },
  { name: 'Priya Patel', role: 'Member', seats: 1, since: 'Mar 2024' },
  { name: 'Jake Morrison', role: 'Member', seats: 1, since: 'Mar 2024' },
  { name: 'Lin Zhang', role: 'Admin', seats: 1, since: 'Apr 2024' },
  { name: 'Alex Torres', role: 'Member', seats: 1, since: 'May 2024' },
];

export default function Teams() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
        <FadeUp className="flex-1">
          <p className="text-[20px] leading-relaxed">
            <span className="text-text">Built for Teams.</span>{' '}
            <span className="text-secondary">Flat per-seat billing. Roles and seat control (RBAC). Team-level custom domains. Shared access policies. Okta SSO + SCIM provisioning. Audit log. Founder-led support.</span>
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="shrink-0">
          <a href="#pricing" className="border border-lime text-lime text-[13px] font-semibold px-[18px] py-[10px] rounded-md hover:bg-lime/10 transition-colors inline-block">
            Start a Team Trial
          </a>
          <p className="text-[11px] text-muted mt-2">Free 14-day trial included</p>
        </FadeUp>
      </div>

      <FadeUp delay={0.15}>
        <AppWindow>
          <div className="flex min-h-[420px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-hairline p-3 hidden md:block">
              <p className="text-[11px] text-muted font-mono mb-3 px-2">LUMORA</p>
              <SideItem label="Public URLs" />
              <SideItem label="Members" active />
              <SideItem label="Local domains" />
              <SideItem label="Custom Domains" />
              <SideItem label="Billing" />
              <SideItem label="Team Settings" />
              <SideItem label="Audit Log" />
              <div className="mt-4 pt-3 border-t border-hairline">
                <p className="text-[10px] text-muted font-mono px-2 mb-2">USAGE</p>
                <div className="space-y-1.5 px-2">
                  <UsageRow label="URLs" value="8/10" />
                  <UsageRow label="Seats" value="6/∞" />
                  <UsageRow label="Domains" value="3/3" />
                </div>
              </div>
            </div>
            {/* Main content */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[14px] text-text font-medium">Members</p>
                <button className="bg-lime text-page text-[11px] font-semibold px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                  + Invite Members
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-hairline">
                      <th className="text-left text-[10px] text-muted font-mono pb-2 pr-4">User</th>
                      <th className="text-left text-[10px] text-muted font-mono pb-2 pr-4">Role</th>
                      <th className="text-left text-[10px] text-muted font-mono pb-2 pr-4">Seats</th>
                      <th className="text-left text-[10px] text-muted font-mono pb-2">Member Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MEMBERS.map((m, i) => (
                      <tr key={i} className="border-b border-hairline/50">
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <PixelAvatar seed={i * 7} size={24} />
                            <span className="text-[12px] text-text">{m.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                            m.role === 'Owner' ? 'bg-lime/10 text-lime' :
                            m.role === 'Admin' ? 'bg-blue/10 text-blue' :
                            'bg-white/5 text-secondary'
                          }`}>{m.role}</span>
                        </td>
                        <td className="py-2.5 pr-4 text-[12px] text-secondary font-mono">{m.seats}</td>
                        <td className="py-2.5 text-[12px] text-muted font-mono">{m.since}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AppWindow>
      </FadeUp>
    </section>
  );
}

function SideItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className={`px-2 py-1.5 rounded text-[11px] mb-0.5 cursor-pointer ${active ? 'bg-lime/10 text-lime' : 'text-secondary hover:text-text'} transition-colors`}>
      {label}
    </div>
  );
}

function UsageRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[10px] text-muted">{label}</span>
      <span className="text-[10px] text-secondary font-mono">{value}</span>
    </div>
  );
}
