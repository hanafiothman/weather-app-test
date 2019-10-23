<template>
  <div id="search-panel" v-click-outside="emptyInput">
    <input class="search-input" type="text" placeholder="Search location by city name" v-model.trim="locationInput"
      v-on:keyup="getLocationSearchResult(locationInput)"
    >
    </input>
    <div class="list-search-result" v-show="showSearchResult">
      <div class="element-list" v-for="location in searchResult" :key="location.woeid" v-on:click="displayLocationData(location)">
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
  methods: {
    getLocationSearchResult(locationInput) {
      console.log(locationInput);
      if(locationInput.length > 1) {
        this.$http.get('https://www.metaweather.com/api/location/search/?query='+locationInput)
        .then(res => {
          res.data.sort(function(a, b) {
            return a.title.length - b.title.length;
          });
          //console.log(res.data);
          this.searchResult = res.data;
        });
      }
      else {
        this.searchResult = [];
      }
    },

    emptyInput() {
      this.locationInput = '';
      this.searchResult = [];
    },

    displayLocationData(location) {
      console.log(location);
      this.emptyInput();
      this.$store.commit('setSelectedLocation', location);

      this.$http.get('https://www.metaweather.com/api/location/'+this.$store.getters.getSelectedLocation.woeid)
      .then(res => {
        console.log(res.data);
        this.$store.commit('setSelectedLocationInfo', res.data);
      });
    }
  },
  computed: {
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
