<template>
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1' "
    v-ripple
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    v-touch-hold:1000:1="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox
        v-model="task.completed"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike' : task.completed }"
        v-html="searchHighlight(task.name)"
      >
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            v-if="task.dueDate"
            name="event"
            size="18px"
            class="q-mr-xs"
          />
        </div>

        <div class="column">
          <q-item-label
            class="row justify-end"
            caption
          >
            {{ niceDate(task.dueDate) }}
          </q-item-label>

          <q-item-label
            class="row justify-end"
            caption
          >
            {{ taskDueTime }}
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />

        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <editTask
        :task="task"
        :id="id"
        @close="showEditTask = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
  import { date } from 'quasar'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import editTask from 'components/Tasks/Modals/EditTask.vue'

  const { addToDate, formatDate } = date

  export default {
    props: ['task', 'id'],
    components: {
      editTask
    },
    data() {
      return {
        showEditTask: false
      }
    },
    computed: {
      ...mapState('tasks', ['search']),
      ...mapGetters('settings', ['settings']),
      niceDate() {
        return (value) => formatDate(value, 'MMM D')
      },
      searchHighlight() {
        return (value, search = this.search) => {
          let searchRegExp = new RegExp(search, 'ig')
          if (search) {
            return value.replace(searchRegExp, (match) => '<span class="bg-yellow-6">' + match + '</span>')
          }
          return value
        }
      },
      taskDueTime() {
        if (this.settings.show12HourTimeFormat) {
          return formatDate(this.task.dueDate + ' ' + this.task.dueTime, 'h:mmA')
        }
        return this.task.dueTime
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteTask(id)
        })
      },
      showEditTaskModal() {
        this.showEditTask = true
      }
    }
  }
</script>

<style>

</style>
