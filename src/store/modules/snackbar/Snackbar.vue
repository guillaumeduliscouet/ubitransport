<template>
  <v-snackbar
    v-model="show"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    show: {
      get () {
        return this.$store.state.snackbar.show
      },
      set (val) {
        if (val) return
        this.$store.dispatch('snackbar/hide')
      }
    },
    message () {
      return this.$store.state.snackbar.message
    }
  }
}
</script>
