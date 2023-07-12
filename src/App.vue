<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('settings', ['getSettings'])
  },
  mounted() {
    this.getSettings()
  }
}
</script>
