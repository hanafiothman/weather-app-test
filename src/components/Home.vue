<template>
  <div id="home">
    <div id="upper-panel">
      <SearchPanel />
    </div>
    <div id="lower-panel">
      <WeatherDisplayPanel v-if="isLocationSelected" />
    </div>

  </div>
</template>

<script>
import SearchPanel from './SearchPanel'
import WeatherDisplayPanel from './WeatherDisplayPanel'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    WeatherDisplayPanel
  },
  methods: {

  },
  computed: {
    isLocationSelected() {
      return this.$store.getters.getSelectedLocation.length !== 0 && this.$store.getters.getSelectedLocationInfo.length !== 0;


    }
  }
}
</script>
