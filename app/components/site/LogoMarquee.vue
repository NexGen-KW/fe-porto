<script setup lang="ts">
const stack = [
  { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
  { name: '.NET', icon: 'i-simple-icons-dotnet' },
  { name: 'Entra ID', icon: 'i-lucide-fingerprint' },
  { name: 'Nuxt UI', icon: 'i-simple-icons-nuxt' },
  { name: 'Azure', icon: 'i-simple-icons-microsoftazure' },
  { name: 'SQL Server', icon: 'i-simple-icons-microsoftsqlserver' },
  { name: 'Clean Architecture', icon: 'i-lucide-layers' }
]

const track = [...stack, ...stack]
</script>

<template>
  <div class="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <div class="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused]">
      <div
        v-for="(tech, i) in track"
        :key="`${tech.name}-${i}`"
        class="flex shrink-0 items-center gap-2.5 text-muted opacity-70 transition-all duration-300 hover:text-primary hover:opacity-100"
      >
        <UIcon
          :name="tech.icon"
          class="size-6 sm:size-7"
        />
        <span class="font-mono text-base font-semibold whitespace-nowrap sm:text-lg">{{ tech.name }}</span>
      </div>
    </div>
  </div>
</template>
