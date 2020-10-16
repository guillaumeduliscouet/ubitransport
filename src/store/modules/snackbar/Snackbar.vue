<template>
  <v-snackbar
    v-model="show"
  >
    {{ message }}
    <v-btn
      color="pink"
      text
      @click="show = false"
    >
      Close
    </v-btn>
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
