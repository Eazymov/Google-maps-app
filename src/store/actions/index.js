export default {
  changeActiveMarker ({ commit, state }, coords) {
    const markers = state.markers;
    const index = markers.findIndex(marker => {
      const { lat, lng } = marker.position;

      return (lat === coords.lat) && (lng === coords.lng);
    })

    commit('setActiveMarker', markers[index]);
  },

  addMarker ({ commit }, marker) {
    commit('addMarker', marker);
    commit('saveMarkers');
    commit('saveCoords', marker.position);
  },

  updateMarker ({ commit }, marker) {
    const { id, title } = marker;
    const updates = {
      id,
      property: 'title',
      value: title
    };

    commit('updateMarker', updates);
    commit('saveMarkers');
  },

  deleteMarker ({ commit }, id) {
    commit('deleteMarker', id);
    commit('saveMarkers');
  },

  addMarkerObject ({ commit }, params) {
    commit('addMarkerObject', params);
    commit('saveMarkers');
  },

  deleteObject ({ commit }, params) {
    commit('deleteObject', params);
    commit('saveMarkers');
  },

  updateObject ({ commit }, params) {
    commit('updateObject', params);
    commit('saveMarkers');
  },

  setMapCenter ({ commit }, coords) {
    commit('setMapCenter', coords);
  },

  loadMarkers ({ commit }) {
    commit('loadMarkers');
  }
}
