<template>
  <div class="countdown-container">
    <div class="countdown-holder">
      <transition name="scale" mode="out-in">
        <!-- Green lights when GO (0) -->
        <div v-if="countdownNumber === 0" class="traffic-lights" :key="'go'">
          <div class="light green active"></div>
          <div class="light green active"></div>
          <div class="light green active"></div>
          <div class="light green active"></div>
          <div class="light green active"></div>
        </div>
        
        <!-- Red lights counting down from 5 to 1 -->
        <div v-else-if="countdownNumber >= 1 && countdownNumber <= 5" class="traffic-lights" :key="'red-' + countdownNumber">
          <div class="light red" :class="{ active: countdownNumber <= 5 }"></div>
          <div class="light red" :class="{ active: countdownNumber <= 4 }"></div>
          <div class="light red" :class="{ active: countdownNumber <= 3 }"></div>
          <div class="light red" :class="{ active: countdownNumber <= 2 }"></div>
          <div class="light red" :class="{ active: countdownNumber <= 1 }"></div>
        </div>
        
        <!-- Numbers for countdown > 5 -->
        <div v-else-if="countdownNumber > 5" :key="countdownNumber" class="number-holder">
          <span id="countdown-number">{{ countdownNumber }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/translate";
defineProps<{
  countdownNumber?: number;
}>();

</script>

<style scoped >
.countdown-container {
  color: #fff;
  text-shadow:1px 1px 18px black;
  font-family: "Bebas Neue", sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.countdown-holder {
  text-align: center;
}

.number-holder {
  width: 15vh;
  height: 15vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

#countdown-number {
  font-size: 20em;
   font-weight:100; 
  /* -webkit-text-stroke: 1px #000000; */
  text-transform: uppercase;
}

/* F1 Traffic Lights - Enhanced Modern Design */
.traffic-lights {
  /* Design tokens */
  --light-size: clamp(48px, 4.5vw, 68px);
  --light-gap: clamp(14px, 2vw, 22px);
  --accent-red: #ff3b3b;
  --accent-green: #37ff6b;
  --accent-yellow: #ffd447;

  display: flex;
  gap: var(--light-gap);
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 3vw, 36px) clamp(30px, 5vw, 50px);
  position: relative;
  backdrop-filter: blur(12px);
  isolation: isolate;
}


.light {
  width: var(--light-size);
  height: var(--light-size);
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, rgba(60, 60, 60, 0.9), rgba(15, 15, 15, 0.98)),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.02) 1px,
      rgba(255, 255, 255, 0.02) 2px
    );
  border: 2px solid rgba(0, 0, 0, 0.95);
  box-shadow:
    inset 0 5px 16px rgba(0, 0, 0, 0.95),
    inset 0 -3px 9px rgba(255, 255, 255, 0.04),
    0 3px 12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.02);
  transition:
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.16s ease-out,
    border-color 0.16s ease-out,
    filter 0.16s ease-out;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* If clickable */
  cursor: pointer;
}

/* Lens texture */
.light::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1.5px,
      rgba(0, 0, 0, 0.35) 1.5px,
      rgba(0, 0, 0, 0.35) 3px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1.5px,
      rgba(0, 0, 0, 0.35) 1.5px,
      rgba(0, 0, 0, 0.35) 3px
    );
  background-size: 3px 3px;
  mix-blend-mode: multiply;
  opacity: 0.45;
  pointer-events: none;
}

/* Highlight / reflection */
.light::before {
  content: '';
  position: absolute;
  top: 14%;
  left: 20%;
  width: 44%;
  height: 44%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, transparent 70%);
  opacity: 0;
  filter: blur(2px);
  transition: opacity 0.18s ease-out;
}

.light:active {
  transform: translateY(1px) scale(0.98);
  box-shadow:
    inset 0 6px 18px rgba(0, 0, 0, 1),
    0 2px 6px rgba(0, 0, 0, 0.8);
}

.light:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}

/* ===== ACTIVE STATES ===== */

.light.red.active {
  background:
    radial-gradient(circle at 35% 30%, #ff6666 0%, var(--accent-red) 35%, #c00000 65%, #5a0000 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.06) 1px,
      rgba(255, 255, 255, 0.06) 2px
    );
  border-color: rgba(180, 0, 0, 0.95);
  box-shadow:
    0 0 24px rgba(255, 0, 0, 0.9),
    0 0 60px rgba(255, 0, 0, 0.7),
    0 0 110px rgba(255, 0, 0, 0.4),
    inset 0 3px 12px rgba(0, 0, 0, 0.6),
    inset 0 -3px 10px rgba(255, 100, 100, 0.7),
    0 0 0 1px rgba(255, 100, 100, 0.4);
  transform: scale(1.03);
  filter: saturate(1.2);
}

.light.red.active::before {
  opacity: 1;
}

.light.green.active {
  background:
    radial-gradient(circle at 35% 30%, #7dff9b 0%, var(--accent-green) 35%, #00b84a 65%, #007530 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.06) 1px,
      rgba(255, 255, 255, 0.06) 2px
    );
  border-color: rgba(0, 135, 40, 0.95);
  box-shadow:
    0 0 24px rgba(0, 255, 120, 0.9),
    0 0 60px rgba(0, 255, 120, 0.7),
    0 0 110px rgba(0, 255, 120, 0.4),
    inset 0 3px 12px rgba(0, 0, 0, 0.6),
    inset 0 -3px 10px rgba(120, 255, 170, 0.7),
    0 0 0 1px rgba(140, 255, 190, 0.4);
  transform: scale(1.03);
  filter: saturate(1.2);
}

.light.green.active::before {
  opacity: 1;
}

/* Optional: yellow / amber, if you need it */
.light.yellow.active {
  background:
    radial-gradient(circle at 35% 30%, #ffe9a3 0%, var(--accent-yellow) 35%, #ffb400 65%, #805600 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.06) 1px,
      rgba(255, 255, 255, 0.06) 2px
    );
  border-color: rgba(155, 105, 0, 0.95);
  box-shadow:
    0 0 24px rgba(255, 209, 84, 0.9),
    0 0 60px rgba(255, 209, 84, 0.7),
    0 0 110px rgba(255, 209, 84, 0.4),
    inset 0 3px 12px rgba(0, 0, 0, 0.6),
    inset 0 -3px 10px rgba(255, 230, 160, 0.7),
    0 0 0 1px rgba(255, 230, 160, 0.4);
  transform: scale(1.03);
  filter: saturate(1.2);
}

.light.yellow.active::before {
  opacity: 1;
}

/* Subtle pulsing effect for ACTIVE state (e.g., race start) */
.light.active {
  animation: light-pulse 1.2s ease-in-out infinite;
}

@keyframes light-pulse {
  0% {
    box-shadow:
      0 0 18px rgba(0, 0, 0, 0.8),
      0 0 0 0 rgba(255, 255, 255, 0.25);
  }
  50% {
    box-shadow:
      0 0 28px rgba(255, 255, 255, 0.8),
      0 0 0 8px rgba(255, 255, 255, 0.03);
  }
  100% {
    box-shadow:
      0 0 18px rgba(0, 0, 0, 0.8),
      0 0 0 0 rgba(255, 255, 255, 0.25);
  }
}

/* Respect users that prefer no motion */
@media (prefers-reduced-motion: reduce) {
  .light,
  .light.active,
  .scale-enter-active,
  .scale-leave-active {
    animation: none !important;
    transition: none !important;
  }
}

/* Vue / transition-group scale animation hooks (kept & slightly tuned) */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.18s ease-out;
  transform-origin: center;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.88);
}

/* Optional compact version (e.g., mobile HUD) */
.traffic-lights.compact {
  --light-size: clamp(34px, 3.2vw, 46px);
  --light-gap: 10px;
  padding: 12px 18px;
}

</style>
