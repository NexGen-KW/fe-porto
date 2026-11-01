// Company facts and the structure of the About-page content (icons, numbers).
// Contact details come from the previous NexGen site (fe-nex-gen-main); all copy lives in i18n/locales/*.ts.
import { fill, useCopy } from '~/composables/useCopy'

export const company = {
  name: 'NexGen Solutions',
  founded: 2023,
  email: 'info@nexgen-kw.com',
  phone: '+96597179273',
  phoneDisplay: '+965 9717 9273',
  // from the Google Maps embed on the previous contact page
  geo: { lat: 29.377, lon: 47.982 },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=29.3770512,47.9821427',
  timeZone: 'Asia/Kuwait'
}

export const yearsBuilding = new Date().getFullYear() - company.founded

// icons, in the same order as the matching copy arrays/keys in the locale files
export const whyChooseUsIcons = ['i-lucide-siren', 'i-lucide-users-round', 'i-lucide-sparkles']

export const pillars = [
  { key: 'vision', icon: 'i-lucide-telescope' },
  { key: 'mission', icon: 'i-lucide-target' },
  { key: 'strategy', icon: 'i-lucide-route' }
] as const

export const valueIcons = [
  'i-lucide-lightbulb', 'i-lucide-scale', 'i-lucide-zap', 'i-lucide-shield-check',
  'i-lucide-handshake', 'i-lucide-heart-handshake', 'i-lucide-globe', 'i-lucide-badge-check'
]

// DRAFT — the previous site has no milestone data beyond "2023 · Started Journey". Replace with the real history.
// Only the founding year is pinned; later chapters are phrased as stages, so the timeline never needs a yearly update.
export const milestoneIcons = ['i-lucide-flag', 'i-lucide-blocks', 'i-lucide-package', 'i-lucide-sparkles']

// "Projects done" and "Active clients" are the figures supplied by NexGen (Oct 2026).
// PLACEHOLDER — the engineering figures (pull requests, deployments, code reviews) are not from any source; replace with real numbers.
const metricBase = {
  years: { icon: 'i-lucide-calendar-clock', value: yearsBuilding },
  projects: { icon: 'i-lucide-rocket', value: 10, prefix: '+' },
  clients: { icon: 'i-lucide-users', value: 8, prefix: '+' },
  pullRequests: { icon: 'i-lucide-git-pull-request', value: 4200, suffix: '+' },
  deployments: { icon: 'i-lucide-cloud-upload', value: 1200, suffix: '+' },
  codeReviews: { icon: 'i-lucide-scan-eye', value: 3800, suffix: '+' }
}

export type MetricKey = keyof typeof metricBase

export interface ImpactMetric {
  icon: string
  value: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
}

/** Impact metrics with their labels in the current locale. */
export function useImpactMetrics() {
  const copy = useCopy()
  return computed(() => {
    const labels = copy.value.metrics
    const metrics = {} as Record<MetricKey, ImpactMetric>
    for (const key of Object.keys(metricBase) as MetricKey[]) {
      const { suffix: _suffix, ...text } = labels[key] as { label: string, detail: string, suffix?: string }
      metrics[key] = {
        ...metricBase[key],
        ...text,
        detail: fill(text.detail, { year: company.founded }),
        ...(key === 'years' ? { suffix: labels.years.suffix } : {})
      }
    }
    return metrics
  })
}
