import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    selectedLocation: [],
    selectedLocationInfo: [],
    recentLocations: []
  },

  getters: {
    getSelectedLocation() {
      return store.state.selectedLocation;
    },
    getSelectedLocationInfo() {
      return store.state.selectedLocationInfo;
    },
    getRecentLocations() {
      return store.state.recentLocations;
    }
  },

  mutations: {
    setSelectedLocation(state, location) {
      state.selectedLocation = location;
    },
    setSelectedLocationInfo(state, locationInfo) {
      state.selectedLocationInfo = locationInfo;
    },
    setRecentLocations(state, locations) {
      state.recentLocations = locations;
    },
    addLocationRecentLocations(state, location) {
      state.recentLocations.unshift(location);
    },
    removeLocationRecentLocations(state, location) {
      state.recentLocations.splice(state.recentLocations.indexOf(location), 1);
    }
  }

});

export default store;
