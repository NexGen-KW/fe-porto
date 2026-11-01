// Product and service structure. The copy (taken from the previous NexGen site, fe-nex-gen-main)
// lives in i18n/locales/*.ts under `catalog`, keyed by slug; `useCatalog()` merges the two for the current locale.
import { useCopy } from '~/composables/useCopy'

export type MotifKind
  = | 'workplace' | 'encryption' | 'smartit' | 'tender' | 'visitor'
    | 'devops' | 'ai' | 'cloud' | 'modernization'

export interface Benefit {
  title: string
  text: string
}

export interface CatalogItem {
  slug: string
  icon: string
  motif: MotifKind
  name: string
  summary: string
  description: string
  /** shortened description for compact cards — trimmed from `description`, no new claims */
  brief?: string
  benefits: Benefit[]
}

const productBase = [
  { slug: 'digital-workplace', icon: 'i-lucide-monitor-smartphone', motif: 'workplace' },
  { slug: 'encryption', icon: 'i-lucide-lock-keyhole', motif: 'encryption' },
  { slug: 'smart-it', icon: 'i-lucide-cpu', motif: 'smartit' },
  { slug: 'tender-management', icon: 'i-lucide-file-check-2', motif: 'tender' },
  { slug: 'visitor-management', icon: 'i-lucide-id-card', motif: 'visitor' }
] as const

const serviceBase = [
  { slug: 'devops', icon: 'i-lucide-infinity', motif: 'devops' },
  { slug: 'ai', icon: 'i-lucide-brain-circuit', motif: 'ai' },
  { slug: 'cloud', icon: 'i-lucide-cloud-cog', motif: 'cloud' },
  { slug: 'modernization', icon: 'i-lucide-layers', motif: 'modernization' }
] as const

/** Product and service catalogs in the current locale. */
export function useCatalog() {
  const copy = useCopy()
  const products = computed<CatalogItem[]>(() => productBase.map(item => ({ ...item, ...copy.value.catalog.products[item.slug] })))
  const services = computed<CatalogItem[]>(() => serviceBase.map(item => ({ ...item, ...copy.value.catalog.services[item.slug] })))
  return { products, services }
}
