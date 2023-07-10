<template>
  <q-page class="q-pa-md">
    <q-list bordered>
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
  import task from 'components/Tasks/task.vue'

  export default {
    computed: {
      ...mapGetters('tasks', ['tasks'])
    },
    components: {
      task
    }
  }
</script>
