import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const GoogleMap = window.google.maps;

export default new Vuex.Store({
  state: {
    GoogleMap,
    markers: [],
    activeMarker: null,
    currentMapCenter: {}
  },
  mutations,
  actions
})
