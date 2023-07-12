<template>
  <div class="col">
    <q-input
      @keyup.esc="searchField = ''"
      v-model="searchField"
      outlined
      label="Search"
      v-select-all
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
  import { selectAll } from 'src/directives/directive-select-all'

  export default {
    directives: {
      selectAll
    },
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
