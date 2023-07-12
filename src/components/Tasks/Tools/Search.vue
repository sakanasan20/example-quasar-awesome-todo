<template>
  <div class="col">
    <q-input
      v-model="searchField"
      outlined
      label="Search"
    >
      <template v-slot:append>
        <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState('tasks', ['search']),
      searchField: {
        get() {
          return this.search
        },
        set(value) {
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSearch'])
    }
  }
</script>
