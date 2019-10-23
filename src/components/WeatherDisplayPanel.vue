<template>
  <div id="weather-display-panel">
    <h3>Weather forecast of {{ selectedLocationFullTitle }}</h3>
  </div>
</template>

<script>

export default {
  name: 'WeatherDisplayPanel',
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    selectedLocationFullTitle() {
      if (this.$store.getters.getSelectedLocation.length !== 0) {
        return this.$store.getters.getSelectedLocationInfo.title+', '+this.$store.getters.getSelectedLocationInfo.parent.title;
      }
      return null;
    }
  }

}

</script>
