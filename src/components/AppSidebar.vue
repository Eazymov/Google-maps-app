<template lang="pug">
  md-whiteframe(md-elevation="6" id="sidebar")
    md-input-container(class="markers--filter")
      md-icon search
      md-input(placeholder="Search for marker"
               v-model="filter"
               type="text")

    ul(class="markers--list")
      li(v-if="!filteredMarkers.length"
         class="marker__no--markers--label") No markers yet
      li(v-else
         v-for="(marker, index) in filteredMarkers"
         class="marker"
         :key="index"
         :class="{ active: activeMarker && activeMarker.id === marker.id }")
        input(class="marker__title"
              v-model="marker.title"
              oninput="this.nextElementSibling.style.opacity = 1"
              onblur="this.nextElementSibling.style.opacity = 0"
              @change="updateMarker(marker)"
              @click.self="setActiveMarker(marker)")
        md-icon(class="marker__edit--icon") edit

        md-button(class="md-icon-button marker__delete--btn md-dense"
                  @click="deleteMarker(marker.id)")
          md-icon close

    App-marker-objects
</template>

<script>
  import AppMarkerObjects from './AppMarkerObjects.vue';

  export default {
    components: {
      AppMarkerObjects
    },

    data: () => ({
      filter: ''
    }),

    computed: {
      markers () {
        return this.$store.state.markers;
      },

      activeMarker () {
        return this.$store.state.activeMarker;
      },

      filteredMarkers () {
        const filter = this.filter;

        return this.markers
          .filter(marker => marker.title.match(filter));
      }
    },

    methods: {
      deleteMarker (id) {
        this.$store.dispatch('deleteMarker', id);
      },

      updateMarker (marker) {
        const { id, title } = marker;
        const updates = {
          id,
          property: 'title',
          value: title
        };

        this.$store.dispatch('updateMarker', updates);
      },

      setActiveMarker (marker) {
        const { lat, lng } = marker.position;
        const coords = { lat, lng };

        this.$store.dispatch('changeActiveMarker', coords);
        this.$store.commit('setMapCenter', coords);
      }
    }
  }
</script>

<style lang="sass">
  #sidebar
    border-right: 1px solid #2196f3
    flex-direction: column
    display: flex
    height: 100%
    width: 300px

    .markers--filter
      font-family: inherit
      padding: 9px 11px
      margin: 0

    .markers--list
      height: calc(58vh - 70px)
      overflow-x: hidden
      min-height: 200px
      list-style: none
      overflow-y: auto
      flex-grow: 1
      .marker
        transition: all .3s, border-width .1s
        border-bottom: 1px solid #ddd
        position: relative
        margin-top: 0
        &:hover
          background-color: #f5f5f5
        &.active
          border: solid #2196f3
          border-width: 0 0 1px 7px
          color: #2196f3

        &__no--markers--label
          text-align: center
          line-height: 40px
          font-weight: 400
          font-size: 16px

        &__edit--icon
          color: rgba(#000, .54)
          position: absolute
          margin-left: 10px
          transition: .2s
          opacity: 0
          left: 1px
          top: 5px

        &__title
          background-color: transparent
          padding: 0 50px 0 40px
          font-family: inherit
          line-height: 37px
          font-weight: 400
          display: inline
          font-size: 14px
          width: 100%
          border: 0

        &__delete--btn
          color: rgba(#000, .54)
          position: absolute
          transition: .2s
          cursor: pointer
          right: 3px
          top: 3px
          &:hover
            color: #f44336
</style>
