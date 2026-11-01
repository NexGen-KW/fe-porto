<script setup lang="ts">
import type { MotifKind } from '~/data/catalog'

/** Small animated line-art illustration, one per product / service. Decorative only. */
defineProps<{
  kind: MotifKind
}>()
</script>

<template>
  <svg
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    data-m="motif"
    aria-hidden="true"
  >
    <!-- digital workplace: a hub with connected teammates -->
    <template v-if="kind === 'workplace'">
      <g data-m="m-march faint">
        <line
          x1="60"
          y1="60"
          x2="24"
          y2="28"
        />
        <line
          x1="60"
          y1="60"
          x2="96"
          y2="28"
        />
        <line
          x1="60"
          y1="60"
          x2="24"
          y2="92"
        />
        <line
          x1="60"
          y1="60"
          x2="96"
          y2="92"
        />
      </g>
      <rect
        x="44"
        y="46"
        width="32"
        height="24"
        rx="4"
      />
      <line
        x1="52"
        y1="76"
        x2="68"
        y2="76"
      />
      <circle
        cx="24"
        cy="28"
        r="7"
        data-m="m-pulse"
      />
      <circle
        cx="96"
        cy="28"
        r="7"
        data-m="m-pulse"
        style="animation-delay: -0.6s"
      />
      <circle
        cx="24"
        cy="92"
        r="7"
        data-m="m-pulse"
        style="animation-delay: -1.2s"
      />
      <circle
        cx="96"
        cy="92"
        r="7"
        data-m="m-pulse"
        style="animation-delay: -1.8s"
      />
    </template>

    <!-- encryption: a shielded lock inside rotating key rings -->
    <template v-else-if="kind === 'encryption'">
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke-dasharray="3 9"
        data-m="m-spin faint"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke-dasharray="14 8"
        data-m="m-spin-rev faint"
      />
      <path d="M60 30 82 38v20c0 15-9 26-22 32-13-6-22-17-22-32V38z" />
      <circle
        cx="60"
        cy="56"
        r="5"
        data-m="m-pulse"
      />
      <line
        x1="60"
        y1="61"
        x2="60"
        y2="70"
      />
    </template>

    <!-- smart-it: live bars under a trend line -->
    <template v-else-if="kind === 'smartit'">
      <line
        x1="16"
        y1="100"
        x2="104"
        y2="100"
        data-m="faint"
      />
      <rect
        x="22"
        y="70"
        width="12"
        height="30"
        rx="2"
        data-m="m-grow"
      />
      <rect
        x="42"
        y="56"
        width="12"
        height="44"
        rx="2"
        data-m="m-grow"
        style="animation-delay: -0.5s"
      />
      <rect
        x="62"
        y="64"
        width="12"
        height="36"
        rx="2"
        data-m="m-grow"
        style="animation-delay: -1s"
      />
      <rect
        x="82"
        y="40"
        width="12"
        height="60"
        rx="2"
        data-m="m-grow"
        style="animation-delay: -1.5s"
      />
      <path
        d="M22 52 46 36 68 44 98 18"
        pathLength="100"
        data-m="m-draw"
      />
      <circle
        cx="98"
        cy="18"
        r="3.5"
        data-m="m-pulse"
      />
    </template>

    <!-- tender: a document being checked off -->
    <template v-else-if="kind === 'tender'">
      <path d="M34 16h36l18 18v70H34z" />
      <path
        d="M70 16v18h18"
        data-m="faint"
      />
      <line
        x1="44"
        y1="50"
        x2="78"
        y2="50"
        pathLength="100"
        data-m="m-draw"
      />
      <line
        x1="44"
        y1="64"
        x2="78"
        y2="64"
        pathLength="100"
        data-m="m-draw"
        style="animation-delay: -0.6s"
      />
      <line
        x1="44"
        y1="78"
        x2="64"
        y2="78"
        pathLength="100"
        data-m="m-draw"
        style="animation-delay: -1.2s"
      />
      <circle
        cx="86"
        cy="92"
        r="14"
        data-m="m-pulse solid"
      />
      <path d="m80 92 4 4 8-9" />
    </template>

    <!-- visitor: a badge under a scan line -->
    <template v-else-if="kind === 'visitor'">
      <rect
        x="30"
        y="22"
        width="60"
        height="78"
        rx="8"
      />
      <line
        x1="52"
        y1="14"
        x2="68"
        y2="14"
      />
      <line
        x1="60"
        y1="14"
        x2="60"
        y2="22"
      />
      <circle
        cx="60"
        cy="50"
        r="10"
      />
      <path d="M44 80c2-10 8-14 16-14s14 4 16 14" />
      <line
        x1="22"
        y1="30"
        x2="98"
        y2="30"
        data-m="m-scan"
      />
    </template>

    <!-- devops: the continuous delivery loop -->
    <template v-else-if="kind === 'devops'">
      <path
        d="M60 60c-10-16-18-22-28-22a22 22 0 0 0 0 44c10 0 18-6 28-22s18-22 28-22a22 22 0 0 1 0 44c-10 0-18-6-28-22z"
        data-m="faint"
      />
      <path
        d="M60 60c-10-16-18-22-28-22a22 22 0 0 0 0 44c10 0 18-6 28-22s18-22 28-22a22 22 0 0 1 0 44c-10 0-18-6-28-22z"
        stroke-dasharray="10 14"
        stroke-width="2.4"
        data-m="m-march"
      />
      <circle
        cx="32"
        cy="60"
        r="4"
        data-m="m-pulse"
      />
      <circle
        cx="88"
        cy="60"
        r="4"
        data-m="m-pulse"
        style="animation-delay: -1s"
      />
    </template>

    <!-- ai: a small neural network firing -->
    <template v-else-if="kind === 'ai'">
      <g data-m="faint">
        <path d="M24 30 60 20M24 30 60 60M24 30 60 100M24 90 60 20M24 90 60 60M24 90 60 100M60 20 96 60M60 60 96 60M60 100 96 60" />
      </g>
      <circle
        cx="24"
        cy="30"
        r="6"
        data-m="m-pulse solid"
      />
      <circle
        cx="24"
        cy="90"
        r="6"
        data-m="m-pulse solid"
        style="animation-delay: -0.4s"
      />
      <circle
        cx="60"
        cy="20"
        r="6"
        data-m="m-pulse solid"
        style="animation-delay: -0.8s"
      />
      <circle
        cx="60"
        cy="60"
        r="6"
        data-m="m-pulse solid"
        style="animation-delay: -1.2s"
      />
      <circle
        cx="60"
        cy="100"
        r="6"
        data-m="m-pulse solid"
        style="animation-delay: -1.6s"
      />
      <circle
        cx="96"
        cy="60"
        r="8"
        data-m="m-pulse solid"
        style="animation-delay: -2s"
      />
    </template>

    <!-- cloud: data moving up and down -->
    <template v-else-if="kind === 'cloud'">
      <path d="M38 62a16 16 0 0 1 3-31 22 22 0 0 1 42 4 14 14 0 0 1-1 27z" />
      <g data-m="m-march">
        <line
          x1="44"
          y1="74"
          x2="44"
          y2="106"
        />
        <line
          x1="76"
          y1="106"
          x2="76"
          y2="74"
        />
      </g>
      <line
        x1="60"
        y1="72"
        x2="60"
        y2="108"
        data-m="faint"
      />
      <circle
        cx="60"
        cy="90"
        r="3.5"
        data-m="m-bob"
      />
      <rect
        x="34"
        y="106"
        width="52"
        height="6"
        rx="3"
        data-m="faint"
      />
    </template>

    <!-- modernization: layers lifting into a new stack -->
    <template v-else>
      <path
        d="M60 66 96 84 60 102 24 84z"
        data-m="faint"
      />
      <path
        d="M60 46 96 64 60 82 24 64z"
        data-m="m-bob"
        style="animation-delay: -0.6s"
      />
      <path
        d="M60 22 96 40 60 58 24 40z"
        data-m="m-bob solid"
      />
      <path
        d="M60 10v-4M54 12l6-6 6 6"
        data-m="m-pulse"
      />
    </template>
  </svg>
</template>

<style scoped>
[data-m~="motif"] * {
  transform-box: fill-box;
  transform-origin: center;
  vector-effect: non-scaling-stroke;
}
[data-m~="faint"] { opacity: 0.35; }
[data-m~="solid"] { fill: color-mix(in oklab, currentColor 14%, transparent); }

[data-m~="m-spin"] { animation: m-spin 22s linear infinite; }
[data-m~="m-spin-rev"] { animation: m-spin 16s linear infinite reverse; }
[data-m~="m-march"] { stroke-dasharray: 4 8; animation: m-march 1.4s linear infinite; }
[data-m~="m-pulse"] { animation: m-pulse 2.4s ease-in-out infinite; }
[data-m~="m-bob"] { animation: m-bob 3s ease-in-out infinite; }
[data-m~="m-grow"] { transform-origin: bottom; animation: m-grow 2.8s ease-in-out infinite; }
[data-m~="m-draw"] { stroke-dasharray: 100; animation: m-draw 3.6s ease-in-out infinite; }
[data-m~="m-scan"] { animation: m-scan 2.6s ease-in-out infinite; }

@keyframes m-spin { to { transform: rotate(360deg); } }
@keyframes m-march { to { stroke-dashoffset: -24; } }
@keyframes m-pulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
@keyframes m-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes m-grow { 0%, 100% { transform: scaleY(0.55); } 50% { transform: scaleY(1); } }
@keyframes m-draw { 0% { stroke-dashoffset: 100; } 45%, 100% { stroke-dashoffset: 0; } }
@keyframes m-scan { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(62px); } }
</style>
