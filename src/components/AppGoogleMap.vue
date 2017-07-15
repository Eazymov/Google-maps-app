<template lang="pug">
  section(id="map")
    div(class="map--canvas" ref="mapCanvas")
    md-dialog-prompt(md-title="Supply a name"
                     md-ok-text="OK"
                     md-cancel-text="CANCEL"
                     @open="markerTitle = ''"
                     @close="createMarkerCallback"
                     v-model="markerTitle"
                     ref="createMarkerDialog")
</template>

<script>
  export default {
    data: () => ({
      map: null,
      markers: [],
      markerTitle: '',
      createMarkerCallback: Function
    }),

    computed: {
      GoogleMap () {
        return this.$store.state.GoogleMap;
      },

      storeMarkers () {
        return this.$store.state.markers;
      },

      createMarkerDialog () {
        return this.$refs.createMarkerDialog;
      },

      currentMapCenter () {
        return this.$store.state.currentMapCenter;
      },

      lastCoords () {
        const Moscow = [55.75, 37.62];
        const savedCoords = localStorage.getItem('lastCoords')
        const coords = savedCoords ? JSON.parse(savedCoords) : Moscow;

        return coords;
      },

      mapCanvas () {
        return this.$refs.mapCanvas;
      }
    },

    methods: {
      initializeMap () {
        const GoogleMap = this.GoogleMap;
        const coords = this.lastCoords;
        const center = new GoogleMap.LatLng(...coords);
        const myOptions = {
          zoom: 10,
          center,
          mapTypeId: GoogleMap.MapTypeId.ROADMAP
        }

        this.map = new GoogleMap.Map(this.mapCanvas, myOptions);
      },

      setMarkers () {
        const GoogleMap = this.GoogleMap;

        this.markers = this.storeMarkers.map(marker => {
          const { id, position, title } = marker;
          const MapMarker = new GoogleMap.Marker({
            id,
            position,
            title
          });

          GoogleMap.event.addListener(MapMarker, 'click', event => {
            this.setActiveMarker(event);
          })

          return MapMarker;
        })

        this.placeMarkers();
      },

      clearMarkers () {
        this.markers.forEach(marker => {
          marker.setMap(null);
        })
      },

      placeMarkers () {
        const { map } = this;

        this.markers.forEach(marker => {
          marker.setMap(map);
        })
      },

      setActiveMarker (marker) {
        const lat = marker.latLng.lat();
        const lng = marker.latLng.lng();
        const coords = { lat, lng };

        this.$store.dispatch('changeActiveMarker', coords);
      },

      addMarker (coords) {
        this.createMarkerCallback = (submit) => {
          if (submit === 'cancel') return;

          const title = this.markerTitle.trim();

          if (title === '') return;

          const lat = coords.lat();
          const lng = coords.lng();
          const id = (Date.now()).toString();
          const objects = [];
          const marker = {
            id,
            position: { lat, lng },
            title,
            objects
          };

          this.$store.dispatch('addMarker', marker);
        }

        this.createMarkerDialog.open();
      }
    },

    mounted () {
      this.initializeMap();
      this.setMarkers();

      this.GoogleMap.event.addListener(this.map, 'click', event => {
        this.addMarker(event.latLng);
      })

      this.GoogleMap.event.addListener(this.map, 'mousedown', event => {
        this.$store.commit('setActiveMarker', null);
      })
    },

    watch: {
      storeMarkers (markers) {
        this.clearMarkers();
        this.setMarkers(markers);
      },

      currentMapCenter (position) {
        this.map.setCenter(position);
      }
    }
  }
</script>

<style lang="sass">
  #map
    width: calc(100% - 300px)
    height: 100%

    .map--canvas
      width: 100%
      height: 100%
</style>
