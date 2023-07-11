<template>
  <q-page class="q-pa-md">
    <q-list
      v-if="Object.keys(tasks).length"
      bordered
      separator
    >
      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      ></task>
    </q-list>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <addTask @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import task from 'components/Tasks/Task.vue'
  import addTask from 'components/Tasks/Modals/AddTask.vue'

  export default {
    data() {
      return {
        showAddTask: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasks'])
    },
    components: {
      task, addTask
    }
  }
</script>
