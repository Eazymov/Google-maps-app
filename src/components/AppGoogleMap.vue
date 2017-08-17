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

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';

  const gmaps = window.google.maps;

  @Component
  class AppGoogleMap extends Vue {
    private map: GMap;
    private markers = [];
    private markerTitle = '';
    private createMarkerCallback = Function;
    
    @State('markers') storeMarkers: Marker[];
    @State createMarkerDialog: any;
    @State currentMapCenter: Position;

    @Action changeActiveMarker: Function;

    get lastCoords (): Position {
      const Moscow = [55.75, 37.62];
      const savedCoords = localStorage.getItem('lastCoords')
      const coords = savedCoords ? JSON.parse(savedCoords) : Moscow;

      return coords;
    }

    get mapCanvas () {
      return this.$refs.mapCanvas;
    }

    private initializeMap () {
      const coords: Position = this.lastCoords;
      const center = new gmaps.LatLng(...coords);
      const myOptions = {
        zoom: 10,
        center,
        mapTypeId: gmaps.MapTypeId.ROADMAP
      }

      this.map = new gmaps.Map(this.mapCanvas, myOptions);
    }

    private setMarkers () {
      this.markers = this.storeMarkers.map((marker: Marker) => {
        const { id, position, title } = marker;
        const mapMarker = new gmaps.Marker({
          id,
          position,
          title
        });

        mapMarker.addListener('click', (event: MouseEvent) => {
          this.setActiveMarker(event);
        })

        return mapMarker;
      })

      this.placeMarkers();
    }

    private clearMarkers () {
      this.markers.forEach((marker: Marker) => {
        marker.setMap(null);
      })
    }

    private placeMarkers () {
      const { map } = this;

      this.markers.forEach((marker: Marker) => {
        marker.setMap(map);
      })
    }

    private setActiveMarker (marker: Marker): void {
      const lat = marker.latLng.lat();
      const lng = marker.latLng.lng();
      const coords = { lat, lng };

      this.changeActiveMarker(coords);
    }

    private addMarker (coords: Position) {
      this.createMarkerCallback = (submit): void => {
        if (submit === 'cancel') return;

        const title = this.markerTitle.trim();

        if (title === '') return;

        const lat = coords.lat;
        const lng = coords.lng;
        const id = (Date.now()).toString();
        const objects: any = [];
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

    mounted () {
      this.initializeMap();
      this.setMarkers();

      this.map.addListener('click', (event: google.maps.MouseEvent) => {
        this.addMarker(event.latLng);
      })

      this.map.addListener('mousedown', (event: Event) => {
        this.$store.commit('setActiveMarker', null);
      })
    }

    @Watch
    storeMarkers (markers: Marker[]) {
      this.clearMarkers();
      this.setMarkers();
    }

    @Watch
    currentMapCenter (position: Position) {
      this.map.setCenter(position);
    }
  }

  export default AppGoogleMap;
</script>

<style lang="sass">
  #map
    width: calc(100% - 300px)
    height: 100%

    .map--canvas
      width: 100%
      height: 100%
</style>
