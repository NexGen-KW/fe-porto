import type { Messages } from '~~/i18n/locales/en'

type Resolve = (message: never) => string

// vue-i18n may hand back compiled message nodes/functions instead of strings; flatten the whole tree to plain data
function toPlain(value: unknown, rt: Resolve): unknown {
  if (typeof value === 'string') return value
  if (typeof value === 'function') return rt(value as never)
  if (Array.isArray(value)) return value.map(item => toPlain(item, rt))
  if (value && typeof value === 'object') {
    if ('type' in value && ('body' in value || 'b' in value)) return rt(value as never)
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toPlain(item, rt)]))
  }
  return value
}

/**
 * The current locale's site copy as one typed, reactive object: `copy.value.home.why.title`.
 * Strings are used as-is (never compiled), so use `fill()` for `{placeholder}` interpolation.
 */
export function useCopy() {
  const { locale, getLocaleMessage, rt } = useI18n()
  return computed(() => toPlain(getLocaleMessage(locale.value), rt as Resolve) as Messages)
}

/** Replaces `{name}` placeholders: fill('Hi {name}', { name: 'Sara' }). */
export function fill(text: string, vars: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match))
}

/** Locale-aware helpers shared across components. */
export function useLocaleInfo() {
  const { locale, localeProperties } = useI18n()
  const isRtl = computed(() => localeProperties.value.dir === 'rtl')
  // Intl locale for dates/times; numerals stay Latin to match the mono/tech styling
  const intlLocale = computed(() => (locale.value === 'ar' ? 'ar-KW-u-nu-latn' : 'en-GB'))
  return { locale, isRtl, intlLocale }
}
