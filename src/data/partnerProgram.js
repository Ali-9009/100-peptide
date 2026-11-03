// SAMPLE PROGRAM CONFIGURATION. Confirm all commercial terms before publishing.
// The example rates and rules below are not verified 100 Peptides commitments.
export const partnerProgram = {
  brand: '100 Peptides Research',
  isLive: false,
  contactEmail: '', // Set a genuine partner-team inbox to enable applications.
  loginUrl: '', // Add your real partner portal URL when ready.
  attributionDays: 45,
  repeatOrderDays: 100,
  payoutMinimum: 50,
  payoutDescription: 'Proposed: net-30, monthly on the 15th',
  tiers: [
    { id: 'associate', name: 'Associate', commission: 10, min: 0, max: 2500, badge: '', perks: ['Referral links and reporting', 'Partner creative resources', 'Available COA documents'] },
    { id: 'partner', name: 'Partner', commission: 12.5, min: 2500, max: 10000, badge: 'Popular example', perks: ['Everything in Associate', 'Optional audience code', 'Priority partner support'] },
    { id: 'senior', name: 'Senior', commission: 15, min: 10000, max: 50000, badge: '', perks: ['Everything in Partner', 'Dedicated contact, if offered', 'New-product announcements'] },
    { id: 'laboratory', name: 'Laboratory', commission: 18, min: 50000, max: Infinity, badge: '', perks: ['Everything in Senior', 'Possible co-branded materials', 'Custom commercial discussion'] },
  ],
  terms: [
    ['Attribution window', 'Proposed: 45 days, last-click'],
    ['Repeat orders', 'Proposed: eligible orders for 100 days'],
    ['Payout schedule', 'Proposed: net-30, monthly on the 15th'],
    ['Minimum payout', 'Proposed: $50; balances roll forward'],
    ['Payment methods', 'To be confirmed'],
    ['Audience discount', 'Optional; not yet configured'],
    ['Restrictions', 'No self-referrals or misleading claims'],
  ],
};
