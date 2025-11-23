<template>
  <div class="race">
    <div class="boxes">
      <div class="positions-container">
        <RacerList :racers="globalStore.activeRace.positions" />
      </div>
      <div class="blocks-container">
        <!-- New Compact HUD -->
        <div class="hud-container">
          <!-- Title -->
          <div class="hud-title">
            {{ globalStore.activeRace.raceName || "MOCK RACE" }}
          </div>

          <!-- Laps and Checkpoints Row -->
          <div class="info-row">
            <div class="info-box">
              <div class="info-label">{{ translate("laps") || "Laps" }}</div>
              <div class="info-value">{{ lapText }}</div>
            </div>
            <div class="info-box">
              <div class="info-label">{{ translate("checkpoints") || "Checkpoints" }}</div>
              <div class="info-value">
                {{ `${globalStore.activeRace.currentCheckpoint}/${globalStore.activeRace.totalCheckpoints}` }}
              </div>
            </div>
          </div>

          <!-- Time Display -->
          <div class="time-display">
            <span>{{ msToHMS(globalStore.activeRace.time) }}</span>
            <div class="icon-wrapper">
              <TimerIcon :size="18" />
            </div>
          </div>

          <!-- Best Lap Time -->
          <div class="time-display">
            <span>{{ msToHMS(globalStore.activeRace.bestLap) }}</span>
            <div class="icon-wrapper">
              <StarIcon :size="18" />
            </div>
          </div>

          <!-- Total Time -->
          <div class="time-display">
            <span>{{ msToHMS(globalStore.activeRace.totalTime) }}</span>
            <div class="icon-wrapper">
              <HourglassIcon :size="18" />
            </div>
          </div>

          <!-- Ghost Indicator -->
          <div class="ghost-container" v-if="globalStore.activeRace.ghosted">
            <div class="ghost-indicator">
              <span>GHOST</span>
              <div class="icon-wrapper-ghost">
                <GhostIcon :size="12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RacerList from "./RacerList.vue";
import { useGlobalStore } from "@/store/global";
import { msToHMS } from "@/helpers/msToHMS";
import { computed } from "vue";
const globalStore = useGlobalStore();
import { translate } from "@/helpers/translate";
import { FlagIcon, HourglassIcon, StarIcon, TimerIcon } from "lucide-vue-next";
import GhostIcon from "@/assets/icons/GhostIcon.vue";

const hudpositionToCss: Record<string, string> = {
  split: "space-between",
  left: "start",
  right: "end",
};

const placement = computed(() =>
  globalStore.baseData?.data?.hudSettings?.location
    ? hudpositionToCss[globalStore.baseData?.data?.hudSettings?.location]
    : "space-between"
);
const direction = computed(() =>
  globalStore.baseData?.data?.hudSettings?.location === "left"
    ? "row-reverse"
    : "row"
);
const lapText = computed(() => {
  if (globalStore.activeRace.totalLaps === 0) return "Sprint";
  else if (globalStore.activeRace.totalLaps === -1)
    return `${globalStore.activeRace.currentLap}/-`;
  return `${globalStore.activeRace.currentLap}/${globalStore.activeRace.totalLaps}`;
});
</script>

<style scoped>
.race {
  position: absolute;
  pointer-events: none;
  top: 3vh;
  left: 0;
  z-index: 10;
}

.boxes {
  color: #ffffffc7;
  font-family: "Poppins", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-transform: uppercase;
  display: flex;
  justify-content: v-bind(placement);
  flex-direction: v-bind(direction);
  width: 100vw;
}

.blocks-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1em;
}

.positions-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 2em;
}

.hud-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
  overflow: hidden;
  margin-right: 1em;
  gap: 3px;
}

.hud-title {
  background: linear-gradient(180deg, rgba(168, 168, 168, 0.95) 0%, rgba(128, 128, 128, 0.95) 100%);
  color: #fff;
  text-align: center;
  padding: 6px 10px;
  font-size: 1.5em;
  font-weight: 200;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px 3px 3px 3px;
}

.info-row {
  display: flex;
  justify-content: stretch;
  gap: 2px;
}

.info-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
  background-color: rgba(38, 38, 38, 0.9);
  color: #fff;
  min-height: 48px;
  border: 1px solid  rgba(38, 38, 38, 0.9);
  border-radius: 3px 3px 3px 3px;
}

.info-label {
  font-size: 0.75em;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #ff8c00;
  margin-bottom: 4px;
  margin-top: -6px;
  background-color: rgba(38, 38, 38, 0.9);
  width: 100%;
  padding: 2px 0;
  text-align: center;
}

.info-value {
  font-size: 1.6em;
  font-weight: 300;
  letter-spacing: 2px;
  color: #fff;
}

.time-display {
  background-color: rgba(38, 38, 38, 0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px;
  font-size: 1em;
  font-weight: 100;
  min-height: 20px;
  border: 1px solid  rgba(38, 38, 38, 0.9);
  border-radius: 3px 3px 3px 3px;
}

.time-display span {
  flex: 1;
  text-align: center;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(38, 38, 38, 0.9);
  padding: 0px;
  min-width: 100px;
  height: 100%;
}

.ghost-container {
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border-radius: 0 0 3px 0;
}

.ghost-indicator {
  background-color: rgba(38, 38, 38, 0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0px 0px 0px 5px ;
  font-size: 0.6em;
  font-weight: 400;
  min-height: 20px;
  border: 1px solid  rgba(38, 38, 38, 0.9);
  border-radius: 3px 3px 3px 3px;
  width: fit-content;
}

.icon-wrapper-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(38, 38, 38, 0.9);
  padding: 3px;
  min-width: 20px;
  min-height: 100%;
}
</style>
