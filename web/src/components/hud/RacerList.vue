<template>
  <div class="racers-holder">
    <div
      class="racer-box"
      v-for="(racer, index) in shortenedRacers"
      :class="{ 'is-player': index === globalStore.activeRace.position - 1 }"
      :key="racer.RacerSource"
    >
      <div class="racer-content">
        <div class="racer-position">{{ index + 1 }}</div>
        <div class="racer-name">{{ racer.RacerName }}</div>
      </div>
      <div class="racer-status">
        <span v-if="index === 0 && racer.Finished">{{ translate('winner') }}</span>
        <span v-else-if="racer.Finished">{{ translate('finished') }}</span>
        <span v-else-if="index !== globalStore.activeRace.position-1">{{ getTimeDifference(racers[globalStore.activeRace.position - 1], racer) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { ActiveRacer } from "../../store/types";
import { computed } from "vue";
import { translate } from "@/helpers/translate";
import { CheckIcon } from "lucide-vue-next";

const props = defineProps<{
  racers: ActiveRacer[];
}>();

const globalStore = useGlobalStore();
const shortenedRacers = computed(() =>
  props.racers?.slice(
    0,
    globalStore.baseData?.data?.hudSettings?.maxPositions || 10
  )
);

const formatTimeDifference = (timeDiffMs: number): string => {
  if (timeDiffMs === 0) {
    return "0.000";
  }

  const isAhead = timeDiffMs > 0;
  const absoluteDiffSeconds = Math.abs(timeDiffMs) / 1000;

  // Format to 3 decimal places
  const formattedTime = absoluteDiffSeconds.toFixed(3);

  return isAhead ? `+${formattedTime}` : `-${formattedTime}`;
};

const getTimeDifference = (racer1: ActiveRacer, racer2: ActiveRacer) => {
  const racer1Checkpoints = racer1.CheckpointTimes.length;
  const racer2Checkpoints = racer2.CheckpointTimes.length;

  if (racer1Checkpoints === 0 || racer2Checkpoints === 0) {
    return ''; // Not enough data to compare
  }

  const lastCommonCheckpoint = Math.min(racer1Checkpoints, racer2Checkpoints) - 1;
  const racer1Time = racer1.CheckpointTimes[lastCommonCheckpoint].time;
  const racer2Time = racer2.CheckpointTimes[lastCommonCheckpoint].time;

  const timeDifference = formatTimeDifference(racer2Time - racer1Time);

  return timeDifference;
};

const getBoxStyle = (index: number) => {
  const isPrimary = index === globalStore.activeRace.position - 1;
  return {
    background: isPrimary ? 'var(--primary)' : 'var(--secondary)',
    color: isPrimary ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
  };
}

</script>
<style scoped>
.racers-holder {
  position: absolute;
  top: 5vh;
  left: 1em;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  pointer-events: none;
}

.racer-box {
  display: flex;
  align-items: stretch;
  background-color: transparent;
  color: #fff;
  min-width: 350px;
  gap: 2px;
  border-radius: 3px;
}

.racer-box.is-player .racer-content {
  background: linear-gradient(90deg, rgba(38, 38, 38, 0.9) 0%, rgba(128, 0, 128, 0.9) 100%);
}

.racer-content {
  display: flex;
  align-items: center;
  background-color: rgba(38, 38, 38, 0.9);
  flex: 1;
  gap: 2px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.racer-position {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 0.9em;
  font-weight: 200;
  min-width: 32px;
  min-height: 30px;
  border-radius: 0px opx 3px 3px;
  flex-shrink: 0;
}

.racer-name {
  flex: 1;
  padding: 0 12px;
  font-size: 0.85em;
  font-weight: 200;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.racer-status {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  font-size: 0.8em;
  font-weight: 200;
  min-width: 80px;
  text-align: center;
  background-color: rgba(38, 38, 38, 0.9);
  border-radius: 3px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
