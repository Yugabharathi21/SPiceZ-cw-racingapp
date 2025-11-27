<template>
  <div class="dock-container">
    <div class="dock">
      <div class="dock-item" 
           v-for="item in items" 
           :key="item.name"
           :class="{ active: globalStore.currentPage === item.name }"
           @click="openPage(item.name)"
           :title="item.title">
        <component :is="item.icon" class="dock-icon" />
      </div>
      <div class="dock-separator"></div>
      <div class="dock-item" 
           :class="{ active: globalStore.currentPage === 'settings' }"
           @click="openPage('settings')"
           :title="translate('settings')">
        <CogIcon class="dock-icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
const globalStore = useGlobalStore();
import { translate } from "@/helpers/translate";
import { Sidebar, SidebarTrigger, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarHeader, SidebarGroupLabel } from "../ui/sidebar";
import SidebarMenuItem from "../ui/sidebar/SidebarMenuItem.vue";
import SidebarMenuButton from "../ui/sidebar/SidebarMenuButton.vue";
import { CogIcon, HomeIcon, Route, ShieldUser, Trophy, User, UserCog } from "lucide-vue-next";
import { computed, ref } from "vue";
import HelmetIcon from "@/assets/icons/HelmetIcon.vue";
import { useSidebar } from "@/components/ui/sidebar";
import SidebarUser from "./SidebarUser.vue";
const sidebarContext = useSidebar();

sidebarContext.setOpen(false);

const isOpen = ref(sidebarContext.open)

const allItems = [
  { name: 'dashboard', icon: HomeIcon, title: translate('dashboard_page'), visible: globalStore.baseData.data.dashboardSettings?.enabled },
  { name: 'racing', icon: HelmetIcon, title: translate('racing'), visible: true },
  { name: 'results', icon: Trophy, title: translate('results'), visible: true },
  { name: 'crew', icon: User, title: translate('crew'), visible: true },
  { name: 'mytracks', icon: Route, title: translate('my_tracks'), visible: globalStore.baseData.data?.auth?.create },
  { name: 'racers', icon: UserCog, title: translate('racers'), visible: globalStore.baseData.data?.auth?.control },
  { name: 'admin', icon: ShieldUser, title: translate('admin'), visible: globalStore.baseData.data?.auth?.adminMenu },
];

const items = computed(() => allItems.filter(item => item.visible))

const noUser = computed(() => !globalStore.baseData.data.currentRacerName &&
    globalStore.baseData.data.racerNames &&
    globalStore.baseData.data.racerNames.length === 0);

const openPage = (page: string) => {
  globalStore.currentPage = page;
};
</script>

<style scoped>
.dock-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  pointer-events: none;
}

.dock {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(38, 38, 38, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  pointer-events: all;
}

.dock-item {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(25, 22, 22, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.dock-item:hover {
  transform: translateY(-12px) scale(1.15);
  background: rgba(48, 48, 48, 0.95);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.dock-item:hover::before {
  content: attr(title);
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  background: rgba(38, 38, 38, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dock-item.active {
  background: rgba(255, 140, 0, 0.9);
  box-shadow: 0 4px 16px rgba(255, 140, 0, 0.4);
}

.dock-item.active:hover {
  background: rgba(255, 140, 0, 0.95);
}

.dock-icon {
  width: 24px;
  height: 24px;
  color: white;
  transition: all 0.2s ease;
}

.dock-item:hover .dock-icon {
  transform: scale(1.1);
}

.dock-separator {
  width: 2px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  margin: 0 4px;
  border-radius: 2px;
}
</style>
