<template lang="pug">
  md-whiteframe(id="related--objects--component")
    h3(v-if="!activeMarker" class="title") Select a marker
    div(v-else id="related--objects--box")
      h3(class="title") Related objects ({{ marker.objects.length }})

      form(@submit.prevent="addObject")
        md-input-container(class="add--object--field")
          md-input(type="text" v-model="name" placeholder="Add an object")
          md-icon(@click.native="addObject" class="add--object--btn") add

      ul(class="objects--list")
        li(class="object" v-for="object in marker.objects")
         input(class="object__title"
               v-model="object.name"
               oninput="this.nextElementSibling.style.opacity = 1"
               onblur="this.nextElementSibling.style.opacity = 0"
               @change="handleUpdateObject(object.id, object.name)")
         md-icon(class="object__edit--icon") edit

         md-button(class="md-icon-button object__delete--btn md-dense"
                   @click="handleDeleteObject(object.id)")
           md-icon close
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';

  @Component
  class AppMarkerObjects extends Vue {
    private name: string = '';

    @State activeMarker: Marker;

    @Action addMarkerObject: Function;
    @Action updateObject: Function;
    @Action deleteObject: Function;

    private addObject () {
      const name: string = this.name.trim();

      if (!name.length) return;

      const markerID: string = this.activeMarker.id;
      const id: string = (Date.now()).toString();
      const object = {
        id,
        name
      };

      this.addMarkerObject({ markerID, object });

      this.name = '';
    }

    private handleUpdateObject (id: string, name: string) {
      const markerID = this.activeMarker.id;
      const objectID = id;
      const objectName = name.trim();
      const params = {
        markerID,
        objectID,
        objectName
      };

      this.updateObject(params);
    }

    private handleDeleteObject (id: string) {
      const markerID = this.activeMarker.id;
      const objectID = id;

      this.deleteObject({ markerID, objectID });
    }
  }

  export default AppMarkerObjects;
</script>

<style lang="sass">
  #related--objects--component
    border: 2px solid #2196f3
    flex-direction: row
    border-radius: 3px
    min-height: 200px
    padding: 8px 0
    flex-grow: 1
    height: 42vh
    margin: 7px

    .title
      color: rgba(#000, .87)
      font-weight: 500
      font-size: 1rem
      padding: 0 14px
      display: block

    #related--objects--box
      height: 100%
      .add--object--field
        padding: 12px 15px 2px
        margin: 0 0 10px

        .add--object--btn
          cursor: pointer

      .objects--list
        height: calc(100% - 76px)
        list-style: none
        overflow-y: auto

        .object
          position: relative
          padding: 0 35px

          &__edit--icon
            color: rgba(#000, .54)
            position: absolute
            margin-left: 10px
            transition: .2s
            opacity: 0
            left: -2px
            top: 5px

          &__title
            border: none
            background-color: transparent
            border-bottom: 1px solid #bbb
            font-family: inherit
            line-height: 32px
            font-size: .85rem
            transition: .2s
            padding: 0 8px
            display: block
            width: 100%
            &:focus
              border-color: #2196f3

          &__delete--btn
            color: rgba(#000, .54)
            position: absolute
            transition: .2s
            cursor: pointer
            right: -4px
            top: 0
            &:hover
              color: #f44336
</style>
