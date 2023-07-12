<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
    </div>

    <p
      v-if="search
            && !Object.keys(tasksTodo).length
            && !Object.keys(tasksCompleted).length"
    >No search results.</p>

    <no-tasks
      v-if="!Object.keys(tasksTodo).length && !search"
      @showAddTask="showAddTask = true"
    />

    <tasks-todo
      v-if="Object.keys(tasksTodo).length"
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
  import { mapGetters, mapState } from 'vuex'
  import addTask from 'components/Tasks/Modals/AddTask.vue'
  import tasksTodo from 'components/Tasks/TasksTodo.vue'
  import tasksCompleted from 'components/Tasks/TasksCompleted.vue'
  import noTasks from 'components/Tasks/NoTasks.vue'
  import search from 'components/Tasks/Tools/Search.vue'

  export default {
    mounted() {
      events.on('showAddTask', () => { this.showAddTask = true })
    },
    components: {
      addTask, tasksTodo, tasksCompleted, noTasks, search
    },
    data() {
      return {
        showAddTask: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
      ...mapState('tasks', ['search'])
    }
  }
</script>
