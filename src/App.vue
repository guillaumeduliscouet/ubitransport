<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-btn
        :disabled="$route.name === 'home'"
        icon
        @click="$router.push({ name: 'home' })"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title :to="{ name: 'home' }">Ubitransport employees</v-toolbar-title>
    </v-app-bar>
    <v-main  class="grey lighten-3">
      <v-container>
        <v-sheet
          rounded="lg"
        >
          <router-view />
        </v-sheet>
      </v-container>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/store/modules/snackbar/Snackbar.vue'
export default {
  name: 'App',
  components: {
    Snackbar
  }
}
</script>
