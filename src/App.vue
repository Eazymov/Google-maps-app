<template lang="pug">
  div(id="App")
    App-sidebar
    App-google-map
</template>

<script>
  import AppGoogleMap from './components/AppGoogleMap.vue';
  import AppSidebar from './components/AppSidebar.vue';

  export default {
    components: {
      AppGoogleMap,
      AppSidebar
    },

    created () {
      this.$store.commit('loadMarkers');
    }
  }
</script>

<style lang="sass">
  *,
  *::before,
  *::after
    box-sizing: border-box
    outline: none
    padding: 0
    margin: 0

  a
    text-decoration: underline
    color: inherit

  html,
  body
    font-family: Roboto, Noto, Noto sans, sans-serif
    color: rgba(#000, .87)
    min-height: 464px
    font-size: 16px
    height: 100%
    width: 100%

  #App
    display: flex
    height: 100%
    width: 100%
</style>
