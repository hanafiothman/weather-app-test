<template>
  <div id="home">
    <div id="upper-panel" :style="{ height: heightUpperPanel }">
      <div id="left-upper-panel" :style="{ width: widthLeftPanel }">
        <SearchPanel />
      </div>
      <div id="right-upper-panel" v-if="this.$store.getters.getRecentLocations.length !== 0">
        <RecentLocationPanel />
      </div>
    </div>
    <div id="lower-panel">
      <transition name="fade" mode="out-in">
        <WeatherDisplayPanel v-show="$store.getters.getSelectedLocationInfo.length !== 0" />
      </transition>
    </div>

  </div>
</template>

<script>
import SearchPanel from './SearchPanel'
import RecentLocationPanel from './RecentLocationPanel'
import WeatherDisplayPanel from './WeatherDisplayPanel'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    RecentLocationPanel,
    WeatherDisplayPanel
  },
  created() {
    if(localStorage.getItem('recentLocations')) {
      try {
        this.$store.commit('setRecentLocations', JSON.parse(localStorage.getItem('recentLocations')));
      } catch(e) {
        localStorage.removeItem('recentLocations');
      }
    }
  },
  computed: {
    isLocationSelected() {
      return this.$store.getters.getSelectedLocation.length !== 0 && this.$store.getters.getSelectedLocationInfo.length !== 0;
    },
    widthLeftPanel() {
      if(this.$store.getters.getRecentLocations.length !== 0) {
        return '50%';
      }
      return '100%';
    },
    heightUpperPanel() {
      if(this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return '50%';
      }
      return '80%';
    }
  }
}
</script>
