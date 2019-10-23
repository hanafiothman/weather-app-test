import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    selectedLocation: [],
    selectedLocationInfo: []
  },

  getters: {
    getSelectedLocation() {
      return store.state.selectedLocation;
    },
    getSelectedLocationInfo() {
      return store.state.selectedLocationInfo;
    }
  },

  mutations: {
    setSelectedLocation(state, location) {
      state.selectedLocation = location;
    },
    setSelectedLocationInfo(state, locationInfo) {
      state.selectedLocationInfo = locationInfo;
    }
  }

});

export default store;
