export default {
  loadMarkers (state) {
    const markersJSON = localStorage.getItem('markers') || '[]';

    state.markers = JSON.parse(markersJSON);
  },

  addMarker (state, marker) {
    state.markers.unshift(marker);
  },

  setActiveMarker (state, marker) {
    state.activeMarker = marker;
  },

  setMapCenter (state, coords) {
    state.currentMapCenter = coords;
  },

  updateMarker (state, { id, property, value }) {
    const markers = state.markers;
    const index = markers.findIndex(marker => marker.id === id);

    state.markers[index][property] = value;
  },

  deleteMarker (state, id) {
    const markers = state.markers;
    const index = markers.findIndex(marker => marker.id === id);

    state.markers.splice(index, 1);
  },

  saveMarkers (state) {
    const markersJSON = JSON.stringify(state.markers);

    localStorage.setItem('markers', markersJSON);
  },

  saveCoords (state, coords) {
    const position = [coords.lat, coords.lng];

    localStorage.setItem('lastCoords', JSON.stringify(position));
  },

  addMarkerObject (state, { markerID, object }) {
    const markers = state.markers;
    const index = markers.findIndex(marker => marker.id === markerID);

    state.markers[index].objects.unshift(object);
  },

  deleteObject (state, { markerID, objectID }) {
    const markers = state.markers;
    const marker = markers.find(marker => marker.id === markerID);
    const objects = marker.objects;
    const index = objects.findIndex(object => object.id === objectID);

    objects.splice(index, 1);
  },

  updateObject (state, { markerID, objectID, objectName }) {
    const markers = state.markers;
    const marker = markers.find(marker => marker.id === markerID);
    const objects = marker.objects;
    const index = objects.findIndex(object => object.id === objectID);

    objects[index].name = objectName;
  }
}
