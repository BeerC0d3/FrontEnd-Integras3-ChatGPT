<template>
  <q-page class="fit row wrap justify-center items-center content-center">
    <div class="q-pr-xs self-center">
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </q-page>
</template>

<script setup></script>
