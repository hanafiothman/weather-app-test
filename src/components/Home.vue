<template>
  <div id="home">
    <div id="upper-panel" :style="{ height: heightUpperPanel }">
      <div id="left-upper-panel" :style="{ width: widthLeftUpperPanel }">
        <SearchPanel />
      </div>
      <div id="right-upper-panel" v-if="this.$store.getters.getRecentLocations.length !== 0">
        <RecentLocationPanel />
      </div>
    </div>
    <div id="lower-panel" :style="{ height: heightLowerPanel }">
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
    //Initial synchronisation of the list of recent locations with the one in the local storage.
    if(localStorage.getItem('recentLocations')) {
      try {
        this.$store.commit('setRecentLocations', JSON.parse(localStorage.getItem('recentLocations')));
      } catch(e) {
        localStorage.removeItem('recentLocations');
      }
    }
  },
  computed: {
    /** Boolean to determine if there is a location selected. */
    isLocationSelected() {
      return this.$store.getters.getSelectedLocation.length !== 0 && this.$store.getters.getSelectedLocationInfo.length !== 0;
    },
    /** The width value of HTML element 'left-upper-panel'. */
    widthLeftUpperPanel() {
      if(this.$store.getters.getRecentLocations.length !== 0) {
        return '50%';
      }
      return '100%';
    },
    /** The height value of HTML element 'upper-panel'. */
    heightUpperPanel() {
      if(this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return '50%';
      }
      return '80%';
    },
    /** The height value of HTML element 'lower-panel'. */
    heightLowerPanel() {
      if(this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return '50%';
      }
      return '20%';
    }
  }
}
</script>
