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
          v-on:click="selectLocation(location)"
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
    //Synchronise the list of recent locations with the one in the local storage.
    if(localStorage.getItem('recentLocations')) {
      try {
        this.$store.commit('setRecentLocations', JSON.parse(localStorage.getItem('recentLocations')));
      } catch(e) {
        localStorage.removeItem('recentLocations');
      }
    }
  },
  methods: {
    /** Remove the location 'location' from the list of recent locations. */
    removeLocationRecentLocations(location) {
      //Deactivate the event of the parent div.
      window.event.cancelBubble = true;
      if(window.event.stopPropagation) {
        window.event.stopPropagation();
      }
      //If the location to be removed is the selected location
      if(location.woeid == this.$store.getters.getSelectedLocation.woeid) {
        //Initialize the selected location (none is selected)
        this.$store.commit('setSelectedLocationInfo', []);
        this.$store.commit('setSelectedLocation', []);
      }
      this.$store.commit('removeLocationRecentLocations', location);
      //Update the recent locations list in the local storage
      localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));

    },
    /** Select the location 'location'. */
    selectLocation(location) {
      this.$store.commit('setSelectedLocation', location);
      this.$http.get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/'+this.$store.getters.getSelectedLocation.woeid)
      .then(res => {
        console.log(res.data);
        this.$store.commit('setSelectedLocationInfo', res.data);
        //If the selected location is already in the recent locations list
        if(this.$store.getters.getRecentLocations.some(locationObj => locationObj.woeid === res.data.woeid)) {
          //Move the corresponding location to the top of the recent locations list
          this.$store.commit('removeLocationRecentLocations', location);
          this.$store.commit('addLocationRecentLocations', { fullTitle: res.data.title+', '+res.data.parent.title, woeid: res.data.woeid });
        }
        //Update the recent locations list in the local storage
        localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));
      });
    },
    /** Update the list of recent locations in the local storage. */
    updateRecentLocations() {
      localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));
    }
  }

}
</script>
