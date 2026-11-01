<script setup lang="ts">
const email = ref('')
const submitted = ref(false)

function subscribe() {
  if (!email.value) return
  submitted.value = true
  email.value = ''
}

const copy = useCopy()
const localePath = useLocalePath()

const companyLinks = computed(() => {
  const labels = copy.value.footer.links
  return [
    { label: labels.about, to: localePath('/about') },
    { label: labels.careers, to: localePath('/about') },
    { label: labels.services, to: localePath('/services') },
    { label: labels.contact, to: localePath('/contact') }
  ]
})

// TEMPORARILY DISABLED — social/LinkedIn icons are hidden for now. To restore, uncomment this list
// and the matching "social links" block in the template below.
// const socials = [
//   { icon: 'i-simple-icons-x', label: 'X', href: 'https://x.com' },
//   { icon: 'i-simple-icons-linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
//   { icon: 'i-simple-icons-github', label: 'GitHub', href: 'https://github.com' },
//   { icon: 'i-simple-icons-youtube', label: 'YouTube', href: 'https://youtube.com' }
// ]
</script>

<template>
  <footer class="border-t border-white/10 bg-navy-950 text-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <AppLogo size="lg" />
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {{ copy.footer.blurb }}
          </p>
          <!-- social links — TEMPORARILY DISABLED, restore together with `socials` in the script
          <div class="mt-6 flex items-center gap-2">
            <UButton
              v-for="social in socials"
              :key="social.label"
              :icon="social.icon"
              :aria-label="social.label"
              :to="social.href"
              target="_blank"
              variant="ghost"
              color="neutral"
              class="text-white/70 hover:bg-white/10 hover:text-white"
            />
          </div>
          -->
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-sm font-semibold text-white">
            {{ copy.footer.company }}
          </h3>
          <ul class="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
            <li
              v-for="link in companyLinks"
              :key="link.label"
            >
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/60 transition-colors hover:text-signal-400"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h3 class="text-sm font-semibold text-white">
            {{ copy.footer.newsletterTitle }}
          </h3>
          <p class="mt-4 text-sm text-white/60">
            {{ copy.footer.newsletterText }}
          </p>
          <form
            class="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col"
            @submit.prevent="subscribe"
          >
            <UInput
              v-model="email"
              type="email"
              dir="ltr"
              placeholder="you@company.com"
              size="lg"
              required
              class="w-full"
              :ui="{ base: 'bg-white/5 ring-white/15 text-white placeholder:text-white/40 focus:ring-signal-400' }"
            />
            <UButton
              type="submit"
              color="primary"
              size="lg"
              class="justify-center"
              block
            >
              {{ submitted ? copy.common.subscribed : copy.common.subscribe }}
            </UButton>
          </form>
        </div>
      </div>

      <div class="mt-14 border-t border-white/10 pt-8">
        <p class="text-center text-xs text-white/50 sm:text-start">
          © {{ new Date().getFullYear() }} {{ copy.footer.rights }}
        </p>
      </div>
    </div>
  </footer>
</template>
