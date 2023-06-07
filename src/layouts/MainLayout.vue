<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout
      view="lHh Lpr lFf"
      class="WAL__layout shadow-3"
      container
      id="q-layout"
    >
      <Header />
      <Drawer />
      <Footer />

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Drawer from '../components/Drawer.vue';

const $q = useQuasar();
const style = computed(() => ({
  height: $q.screen.height + 'px',
}));
</script>
<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 30%
    position: fixed
    top: 0
    width: 100%
    background-color: #35B9EB
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
