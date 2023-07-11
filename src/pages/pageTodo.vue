<template>
  <q-page class="q-pa-md">
    <no-tasks
      v-if="!Object.keys(tasksTodo).length"
      @showAddTask="showAddTask = true"
    />

    <tasks-todo
      v-else
      :tasksTodo="tasksTodo"
    />

    <tasks-completed
    v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted"
    />

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
  import { events } from 'boot/events'
  import { mapGetters } from 'vuex'
  import addTask from 'components/Tasks/Modals/AddTask.vue'
  import tasksTodo from 'components/Tasks/TasksTodo.vue'
  import tasksCompleted from 'components/Tasks/TasksCompleted.vue'
  import noTasks from 'components/Tasks/NoTasks.vue'

  export default {
    mounted() {
      events.on('showAddTask', () => { this.showAddTask = true })
    },
    components: {
      addTask, tasksTodo, tasksCompleted, noTasks
    },
    data() {
      return {
        showAddTask: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted'])
    }
  }
</script>
