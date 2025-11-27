<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <div class="time-display">
        <span class="time-label">TIME</span>
        <span class="time-value">{{ currentTime }}</span>
      </div>
    </div>
    
    <div class="taskbar-center">
      <div class="user-capsule">
        <div class="user-info">
          <span class="username">{{ globalStore.baseData?.data?.currentRacerName }}</span>
          <span v-if="globalStore.baseData?.data?.currentCrewName" class="crew-name">
            [{{ globalStore.baseData.data.currentCrewName }}]
          </span>
        </div>
        <div class="crypto-info" v-if="globalStore.baseData?.data?.isUsingRacingCrypto">
          <span class="crypto-label">RAC</span>
          <span class="crypto-amount">{{ formatCrypto(globalStore.baseData?.data?.currentCrypto) }}</span>
        </div>
      </div>
    </div>
    
    <div class="taskbar-right">
      <div class="user-details">
        <div class="detail-item" v-if="globalStore.baseData?.data?.currentRacerAuth">
          <span class="detail-label">AUTH</span>
          <span class="detail-value">{{ translate('auth_type_' + globalStore.baseData.data.currentRacerAuth) }}</span>
        </div>
        <div class="detail-item" v-if="globalStore.baseData?.data?.currentVehicle?.model">
          <span class="detail-label">VEHICLE</span>
          <span class="detail-value">
            {{ globalStore.baseData.data.currentVehicle.model }}
            <span v-if="globalStore.baseData?.data?.currentVehicle?.class" class="vehicle-class">
              [{{ globalStore.baseData.data.currentVehicle.class }}]
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { ref, onMounted, onUnmounted } from "vue";
import { translate } from "@/helpers/translate";

const globalStore = useGlobalStore();
const currentTime = ref('00:00');

const formatCrypto = (value: number | undefined): string => {
  if (value === undefined || value === null) return '0';
  return value.toLocaleString();
};

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
};

let timeInterval: number;

onMounted(() => {
  updateTime();
  timeInterval = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<style scoped>
.taskbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(38, 38, 38, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
  font-family: 'Poppins', sans-serif;
}

.taskbar-left,
.taskbar-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.taskbar-right {
  justify-content: flex-end;
}

.taskbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.time-label {
  color: rgba(255, 140, 0, 0.9);
  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-value {
  color: white;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.user-capsule {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 3px;
  padding-right: 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.username {
  color: white;
  font-size: 10px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.crew-name {
  color: rgba(255, 140, 0, 0.9);
  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.crypto-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.crypto-label {
  color: rgba(255, 140, 0, 0.9);
  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.crypto-amount {
  color: white;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-label {
  color: rgba(255, 140, 0, 0.9);
  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  color: white;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.vehicle-class {
  color: rgba(255, 140, 0, 0.9);
  font-size: 9px;
}
</style>
