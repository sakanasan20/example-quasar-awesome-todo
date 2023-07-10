<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      ></task>
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import task from 'components/Tasks/Task.vue'

  export default {
    computed: {
      ...mapGetters('tasks', ['tasks'])
    },
    components: {
      task
    }
  }
</script>
