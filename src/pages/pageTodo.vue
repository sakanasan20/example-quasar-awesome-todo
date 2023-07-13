<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <p
          v-if="search
                && !Object.keys(tasksTodo).length
                && !Object.keys(tasksCompleted).length"
        >No search results.</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <no-tasks
            v-if="!Object.keys(tasksTodo).length
                  && !search
                  && !settings.showTasksInOneList"
            @showAddTask="showAddTask = true"
          />

          <tasks-todo
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo"
          />

          <tasks-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted"
            class="q-mb-xl"
          />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            color="primary"
            size="24px"
            icon="add"
            class="all-pointer-events"
          />
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </template>
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
  import sort from 'components/Tasks/Tools/Sort.vue'

  export default {
    mounted() {
      events.on('showAddTask', () => { this.showAddTask = true })
    },
    components: {
      addTask, tasksTodo, tasksCompleted, noTasks, search, sort
    },
    data() {
      return {
        showAddTask: false
      }
    },
    computed: {
      ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
      ...mapGetters('settings', ['settings']),
      ...mapState('tasks', ['search', 'tasksDownloaded'])
    }
  }
</script>

<style>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
