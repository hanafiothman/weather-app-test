<template>
  <fieldset id="recent-location-panel">
    <legend>Recent searches</legend>
    <div id="list-location">
      <Draggable
        :list="$store.getters.getRecentLocations"
        class="list-group"
        ghost-class="ghost"
        @update="updateRecentLocations"
      >
        <div class="element-location" v-for="location in $store.getters.getRecentLocations" :key="location.woeid"
          v-if="$store.getters.getRecentLocations.length"
          v-on:click="displayLocationData(location)"
        >
          {{ location.fullTitle }}
          <div style="padding: 0; text-align: center; float: right" v-on:click="removeLocationRecentLocations(location)">
            <i class="fa fa-trash fa-lg"></i>
          </div>
        </div>
      </Draggable>
    </div>
  </fieldset>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  name: 'RecentLocationPanel',
  data() {
    return {
      newRecentLocations: []
    }
  },
  components: {
    Draggable
  },
  mounted() {
    if(localStorage.getItem('recentLocations')) {
      try {
        this.$store.commit('setRecentLocations', JSON.parse(localStorage.getItem('recentLocations')));
      } catch(e) {
        localStorage.removeItem('recentLocations');
      }
    }
    console.log(this.$store.state.recentLocations);
  },
  methods: {
    removeLocationRecentLocations(location) {

      window.event.cancelBubble = true;
      if(window.event.stopPropagation) {
        window.event.stopPropagation();
      }

      if(location.woeid == this.$store.getters.getSelectedLocation.woeid) {
        this.$store.commit('setSelectedLocationInfo', []);
        this.$store.commit('setSelectedLocation', []);
      }
      this.$store.commit('removeLocationRecentLocations', location);
      localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));

      if(this.$store.getters.getRecentLocations.length == 0) {
        localStorage.removeItem('recentLocations');
      }
    },
    displayLocationData(location) {
      //this.emptyInput();
      this.$store.commit('setSelectedLocation', location);

      this.$http.get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/'+this.$store.getters.getSelectedLocation.woeid)
      .then(res => {
        console.log(res.data);
        this.$store.commit('setSelectedLocationInfo', res.data);
        if(this.$store.getters.getRecentLocations.some(locationObj => locationObj.woeid === res.data.woeid)) {
          this.$store.commit('removeLocationRecentLocations', location);
          this.$store.commit('addLocationRecentLocations', { fullTitle: res.data.title+', '+res.data.parent.title, woeid: res.data.woeid });
        }
        localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));
      });
    },
    updateRecentLocations() {
      localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));
    }
  }

}
</script>
