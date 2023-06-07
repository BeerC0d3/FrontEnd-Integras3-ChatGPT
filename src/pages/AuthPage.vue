<template>
  <q-page>
    <router-view v-slot="{ Component }">
      <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </q-page>
</template>

<script setup lang="ts"></script>
