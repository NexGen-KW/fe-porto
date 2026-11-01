<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { company } from '~/data/company'

const copy = useCopy()

useSeoMeta({
  title: () => copy.value.meta.contact.title,
  ogTitle: () => copy.value.meta.contact.title,
  description: () => copy.value.meta.contact.description,
  ogDescription: () => copy.value.meta.contact.description
})

// rebuilt per locale so validation messages appear in the visitor's language
const schema = computed(() => {
  const errors = copy.value.contact.form.errors
  return z.object({
    name: z.string().min(2, errors.name),
    email: z.string().email(errors.email),
    company: z.string().optional(),
    message: z.string().min(10, errors.message)
  })
})

type Schema = z.output<typeof schema.value>

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  company: '',
  message: ''
})

// presentation-only helpers for the stepped layout; validation itself still runs through the schema in UForm
const stepState = computed(() => {
  const ok = (field: 'name' | 'email' | 'message') => schema.value.shape[field].safeParse(state[field]).success
  return {
    you: ok('name') && ok('email'),
    company: !!state.company?.trim(),
    project: ok('message'),
    required: [ok('name'), ok('email'), ok('message')].filter(Boolean).length
  }
})
const messageLength = computed(() => state.message?.trim().length ?? 0)

const submitting = ref(false)
const submitted = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  submitting.value = false
  submitted.value = true
  toast.add({
    title: copy.value.contact.form.toastTitle,
    description: fill(copy.value.contact.form.toastText, { name: event.data.name.split(' ')[0] ?? '' }),
    icon: 'i-lucide-check-circle',
    color: 'primary'
  })
}

const faqIcons = ['i-lucide-clock', 'i-lucide-rocket', 'i-lucide-dollar-sign', 'i-lucide-git-merge', 'i-lucide-life-buoy']
const faqs = computed(() => copy.value.contact.faq.items.map((item, i) => ({ ...item, icon: faqIcons[i]! })))

const newsletterEmail = ref('')
const newsletterSubmitted = ref(false)

function subscribeNewsletter() {
  if (!newsletterEmail.value) return
  newsletterSubmitted.value = true
  newsletterEmail.value = ''
}
</script>

<template>
  <div>
    <SitePageHero
      :eyebrow="copy.contact.hero.eyebrow"
      :title="copy.contact.hero.title"
      :highlight="copy.contact.hero.highlight"
      :description="copy.contact.hero.description"
    />

    <section
      id="get-in-touch"
      :data-nav-label="copy.sections.getInTouch"
      class="scroll-mt-16 lg:scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="group/form relative isolate overflow-hidden rounded-3xl border border-default bg-elevated/40 shadow-xl shadow-signal-500/5">
            <span
              class="border-beam absolute inset-0 opacity-40 transition-opacity duration-500 group-focus-within/form:opacity-100"
              aria-hidden="true"
            />
            <div
              class="pointer-events-none absolute -end-32 -top-32 -z-10 size-80 animate-aurora rounded-full bg-signal-500/10 blur-[100px]"
              aria-hidden="true"
            />

            <div class="flex items-center gap-2 border-b border-default bg-navy-950 px-4 py-3">
              <span class="size-2.5 rounded-full bg-[#ff5f56]" />
              <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span class="size-2.5 rounded-full bg-[#27c93f]" />
              <span
                class="ms-1.5 font-mono text-[11px] text-white/40"
              ><bdi dir="ltr">send-message.ts</bdi></span>
              <span class="ms-auto font-mono text-[11px] text-signal-400 tabular-nums">{{ stepState.required }}/3 {{ copy.contact.form.required }}</span>
            </div>
            <div class="h-0.5 bg-navy-950">
              <div
                class="h-full origin-left bg-gradient-to-r from-signal-500 to-signal-300 transition-transform duration-500 ease-out rtl:origin-right rtl:bg-gradient-to-l"
                :style="{ transform: `scaleX(${stepState.required / 3})` }"
              />
            </div>

            <div class="p-6 sm:p-8">
              <h2 class="font-display text-2xl font-bold tracking-tight text-highlighted">
                {{ copy.contact.form.title }}
              </h2>
              <p class="mt-1 text-sm text-muted">
                {{ copy.contact.form.subtitle }}
              </p>

              <UForm
                :schema="schema"
                :state="state"
                class="relative mt-8"
                @submit="onSubmit"
              >
                <!-- line that ties the three steps together -->
                <span
                  class="absolute start-4 top-4 bottom-24 hidden w-px bg-(--ui-border) sm:block"
                  aria-hidden="true"
                />

                <!-- 01 you -->
                <fieldset class="relative sm:ps-14">
                  <legend class="mb-4 flex items-center gap-3 sm:-ms-14">
                    <span
                      class="relative z-10 inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-500"
                      :class="stepState.you ? 'border-primary bg-primary text-inverted' : 'border-default bg-default text-muted'"
                    >
                      <UIcon
                        v-if="stepState.you"
                        name="i-lucide-check"
                        class="size-4 animate-pop-in"
                      />
                      <template v-else>01</template>
                    </span>
                    <span class="font-display text-base font-semibold text-highlighted">{{ copy.contact.form.aboutYou }}</span>
                  </legend>

                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <UFormField
                      :label="copy.contact.form.name"
                      name="name"
                      required
                    >
                      <UInput
                        v-model="state.name"
                        :placeholder="copy.contact.form.namePlaceholder"
                        icon="i-lucide-user-round"
                        size="xl"
                        class="w-full"
                      />
                    </UFormField>

                    <UFormField
                      :label="copy.contact.form.email"
                      name="email"
                      required
                    >
                      <!-- email addresses are always written left-to-right -->
                      <UInput
                        v-model="state.email"
                        type="email"
                        dir="ltr"
                        placeholder="jane@company.com"
                        icon="i-lucide-at-sign"
                        size="xl"
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </fieldset>

                <!-- 02 company -->
                <fieldset class="relative mt-8 sm:ps-14">
                  <legend class="mb-4 flex items-center gap-3 sm:-ms-14">
                    <span
                      class="relative z-10 inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-500"
                      :class="stepState.company ? 'border-primary bg-primary text-inverted' : 'border-default bg-default text-muted'"
                    >
                      <UIcon
                        v-if="stepState.company"
                        name="i-lucide-check"
                        class="size-4 animate-pop-in"
                      />
                      <template v-else>02</template>
                    </span>
                    <span class="font-display text-base font-semibold text-highlighted">{{ copy.contact.form.yourCompany }}</span>
                    <span class="font-mono text-[11px] text-dimmed">{{ copy.contact.form.optional }}</span>
                  </legend>

                  <div class="space-y-5">
                    <UFormField
                      :label="copy.contact.form.company"
                      name="company"
                    >
                      <UInput
                        v-model="state.company"
                        :placeholder="copy.contact.form.companyPlaceholder"
                        icon="i-lucide-building-2"
                        size="xl"
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </fieldset>

                <!-- 03 project -->
                <fieldset class="relative mt-8 sm:ps-14">
                  <legend class="mb-4 flex items-center gap-3 sm:-ms-14">
                    <span
                      class="relative z-10 inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-500"
                      :class="stepState.project ? 'border-primary bg-primary text-inverted' : 'border-default bg-default text-muted'"
                    >
                      <UIcon
                        v-if="stepState.project"
                        name="i-lucide-check"
                        class="size-4 animate-pop-in"
                      />
                      <template v-else>03</template>
                    </span>
                    <span class="font-display text-base font-semibold text-highlighted">{{ copy.contact.form.yourProject }}</span>
                  </legend>

                  <UFormField
                    :label="copy.contact.form.details"
                    name="message"
                    required
                  >
                    <UTextarea
                      v-model="state.message"
                      :placeholder="copy.contact.form.detailsPlaceholder"
                      :rows="5"
                      size="xl"
                      class="w-full"
                    />
                    <template #hint>
                      <span
                        class="font-mono text-[11px] tabular-nums transition-colors duration-300"
                        :class="stepState.project ? 'text-primary' : 'text-dimmed'"
                      >{{ messageLength }} / 10 {{ copy.contact.form.min }}</span>
                    </template>
                  </UFormField>
                </fieldset>

                <div class="mt-8 sm:ps-14">
                  <!-- mousedown.prevent keeps focus in the field being edited: otherwise its blur clears the error text,
                       the button shifts up mid-click and the click (and the submit) is lost -->
                  <UButton
                    type="submit"
                    size="xl"
                    color="primary"
                    block
                    :loading="submitting"
                    :disabled="submitting"
                    :trailing-icon="submitted ? 'i-lucide-check-check' : 'i-lucide-send'"
                    class="group/send transition-transform duration-300 hover:-translate-y-0.5"
                    @mousedown.prevent
                  >
                    {{ submitting ? copy.contact.form.sending : submitted ? copy.contact.form.sendAnother : copy.contact.form.send }}
                  </UButton>
                  <p class="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] text-dimmed">
                    <UIcon
                      name="i-lucide-clock"
                      class="size-3.5 text-primary"
                    />
                    {{ copy.contact.form.responseTime }}
                  </p>
                </div>
              </UForm>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="space-y-4">
            <SiteContactInfo />

            <!-- social links — TEMPORARILY DISABLED (same as the footer); the URLs are still placeholders. Uncomment to restore.
            <div class="flex items-center justify-between rounded-2xl border border-default bg-elevated/40 p-5">
              <span class="font-mono text-xs text-muted">connect --social</span>
              <div class="flex items-center gap-1">
                <UButton
                  icon="i-simple-icons-linkedin"
                  variant="ghost"
                  color="neutral"
                  to="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                />
                <UButton
                  icon="i-simple-icons-x"
                  variant="ghost"
                  color="neutral"
                  to="https://x.com"
                  target="_blank"
                  aria-label="X"
                />
                <UButton
                  icon="i-simple-icons-github"
                  variant="ghost"
                  color="neutral"
                  to="https://github.com"
                  target="_blank"
                  aria-label="GitHub"
                />
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.faq"
      class="border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">
        <SiteSectionHeading
          :eyebrow="copy.contact.faq.eyebrow"
          :title="copy.contact.faq.title"
          :description="copy.contact.faq.description"
        />

        <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <div class="lg:col-span-3">
            <SiteFaqList :items="faqs" />
          </div>

          <!-- intro / escalation card: below the list on mobile, sticky alongside on desktop -->
          <aside class="lg:order-first lg:col-span-2">
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-6 text-white shadow-xl sm:p-7 lg:sticky lg:top-28">
              <span
                class="border-beam absolute inset-0 opacity-70"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute -end-20 -top-20 size-56 animate-aurora rounded-full bg-signal-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute inset-0 opacity-40"
                style="background-image: linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px); background-size: 24px 24px; mask-image: radial-gradient(ellipse at bottom left, black, transparent 70%);"
                aria-hidden="true"
              />

              <div class="relative">
                <span class="inline-flex items-center gap-2 font-mono text-[11px] text-white/50">
                  <UIcon
                    name="i-lucide-file-question"
                    class="size-4 text-signal-400"
                  />
                  <span dir="ltr">faq.md</span> · {{ faqs.length }} {{ copy.contact.faq.entries }}
                </span>

                <h3 class="mt-5 text-2xl font-bold tracking-tight">
                  {{ copy.contact.faq.stillQuestions }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-white/60">
                  {{ copy.contact.faq.stillText }}
                </p>

                <dl class="mt-6 grid grid-cols-2 gap-3">
                  <div class="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <dt class="font-mono text-[11px] text-white/40">
                      {{ copy.contact.faq.avgReply }}
                    </dt>
                    <dd class="mt-1 font-mono text-lg font-bold text-signal-400">
                      {{ copy.contact.faq.avgReplyValue }}
                    </dd>
                  </div>
                  <div class="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <dt class="font-mono text-[11px] text-white/40">
                      {{ copy.contact.faq.kickoff }}
                    </dt>
                    <dd class="mt-1 font-mono text-lg font-bold text-white">
                      {{ copy.contact.faq.kickoffValue }}
                    </dd>
                  </div>
                </dl>

                <div class="mt-6 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                  <UButton
                    href="#get-in-touch"
                    color="primary"
                    trailing-icon="i-lucide-arrow-up"
                    class="flex-1 justify-center"
                  >
                    {{ copy.contact.faq.sendMessage }}
                  </UButton>
                  <UButton
                    :href="`mailto:${company.email}`"
                    variant="outline"
                    color="neutral"
                    icon="i-lucide-mail"
                    class="flex-1 justify-center text-white ring-white/25 bg-white/10 hover:text-navy-700"
                  >
                    {{ copy.contact.faq.emailUs }}
                  </UButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.newsletter"
      class="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div class="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-navy-950 p-8 text-center sm:p-12">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -start-20 -top-20 h-64 w-64 animate-aurora rounded-full bg-signal-500/20 blur-[90px]" />
          <div
            class="absolute -end-20 -bottom-20 h-64 w-64 animate-aurora rounded-full bg-navy-500/30 blur-[90px]"
            style="animation-delay: -7s;"
          />
          <div
            class="absolute inset-0 opacity-[0.06]"
            style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 36px 36px;"
          />
        </div>

        <div class="relative">
          <UIcon
            name="i-lucide-mail-plus"
            class="mx-auto size-8 text-signal-400"
          />
          <h2 class="mt-4 text-2xl font-bold text-white">
            {{ copy.contact.newsletter.title }}
          </h2>
          <p class="mx-auto mt-2 max-w-md text-sm text-white/65">
            {{ copy.contact.newsletter.text }}
          </p>
          <form
            class="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            @submit.prevent="subscribeNewsletter"
          >
            <UInput
              v-model="newsletterEmail"
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
              size="lg"
              color="primary"
              class="justify-center"
            >
              {{ newsletterSubmitted ? copy.common.subscribed : copy.common.subscribe }}
            </UButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
