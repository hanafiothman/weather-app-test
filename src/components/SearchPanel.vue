<template>
  <div id="search-panel" v-click-outside="emptyInput">
    <input class="search-input" type="text" placeholder="Search location by city name" v-model.trim="locationInput"
      v-on:keyup="getLocationSearchResult(locationInput)"
    >
    </input>
    <div class="list-search-result" v-show="showSearchResult">
      <div class="element-list" v-for="location in searchResult" :key="location.woeid" v-on:click="selectLocation(location)">
        {{ location.title }}
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'SearchPanel',
  data () {
    return {
      locationInput: '',
      searchResult: [],
    }
  },
  watch: {
    locationInput(val) {
      this.locationInput = val;
      if(this.locationInput.length < 2) {
        this.searchResult = [];
      }
    }
  },
  methods: {
    /** Get the location search results (list of location(s)) based on the 'locationInput'. */
    getLocationSearchResult(locationInput) {
      //when user inputs 2 characters
      if(locationInput.length >= 2) {
        this.$http.get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query='+locationInput)
        .then(res => {
          //Sort the list according to the length of the location title
          res.data.sort(function(a, b) {
            return a.title.length - b.title.length;
          });
          //Store the list in an array
          this.searchResult = res.data;
        });
      }
      else {
        this.searchResult = [];
      }
    },

    /** Empty the search input. */
    emptyInput() {
      this.locationInput = '';
      this.searchResult = [];
    },

    /** Select the location 'location' (only one location selected at a time). */
    selectLocation(location) {
      this.emptyInput();
      this.$store.commit('setSelectedLocation', location);

      this.$http.get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/'+this.$store.getters.getSelectedLocation.woeid)
      .then(res => {
        this.$store.commit('setSelectedLocationInfo', res.data);
        //If the selected location is not in the recent locations list
        if(!this.$store.getters.getRecentLocations.some(locationObj => locationObj.woeid === res.data.woeid)) {
          this.$store.commit('addLocationRecentLocations', { fullTitle: res.data.title+', '+res.data.parent.title, woeid: res.data.woeid });
        }
        else {
          //Move the corresponding location to the top of the recent locations list
          this.$store.commit('removeLocationRecentLocations', this.$store.getters.getRecentLocations.find(locationObj => locationObj.woeid === res.data.woeid));
          this.$store.commit('addLocationRecentLocations', { fullTitle: res.data.title+', '+res.data.parent.title, woeid: res.data.woeid });
        }
        //Update the recent locations list in the local storage
        localStorage.setItem('recentLocations', JSON.stringify(this.$store.getters.getRecentLocations));
      });
    }
  },
  computed: {
    /** Boolean to show/hide the search results. */
    showSearchResult() {
      if(this.searchResult.length !== 0) {
        return true;
      }
      return false;
    }
  },
  directives: {
    ClickOutside
  }
}

</script>
