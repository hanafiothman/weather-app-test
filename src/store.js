/***
  Centralized storage zone (Vuex) of the web.
**/

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  /**
    Attributes to be shared by components (shared state).
  */
  state: {
    selectedLocation: [], //The basic information of the selected location.
    selectedLocationInfo: [], //The detailed information of the selected location.
    recentLocations: [] //The list of recent locations.
  },

  /**
    Getter functions of each attribute (state).
  */
  getters: {
    /** Get the state of the 'selectedLocation' attribute. */
    getSelectedLocation() {
      return store.state.selectedLocation;
    },
    /** Get the state of the 'selectedLocationInfo' attribute. */
    getSelectedLocationInfo() {
      return store.state.selectedLocationInfo;
    },
    /** Get the state of the 'recentLocations' attribute. */
    getRecentLocations() {
      return store.state.recentLocations;
    }
  },

  /**
    Mutator functions of state attribute.
  */
  mutations: {
    /** Mutate the state of the 'selectedLocation' attribute. */
    setSelectedLocation(state, location) {
      state.selectedLocation = location;
    },
    /** Mutate the state of the 'selectedLocationInfo' attribute. */
    setSelectedLocationInfo(state, locationInfo) {
      state.selectedLocationInfo = locationInfo;
    },
    /** Mutate the state of the 'recentLocations' attribute. */
    setRecentLocations(state, locations) {
      state.recentLocations = locations;
    },
    /** Add a location to the list of recent locations. */
    addLocationRecentLocations(state, location) {
      state.recentLocations.unshift(location);
    },
    /** Remove a location from the list of recent locations. */
    removeLocationRecentLocations(state, location) {
      state.recentLocations.splice(state.recentLocations.indexOf(location), 1);
    }
  }

});

export default store;
