<template>
  <q-card>
    <modal-header>Add Task</modal-header>

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-card-section class="q-pt-none">
        <modal-task-name
          v-model:name="taskToSubmit.name"
          ref="modalTaskName"
        />

        <modal-due-date
          v-model:dueDate="taskToSubmit.dueDate"
          @clearDueTime="clearDueTime"
        />

        <modal-due-time
          v-if="taskToSubmit.dueDate"
          v-model:dueTime="taskToSubmit.dueTime"
        />
      </q-card-section>

      <q-card-actions align="right">
        <modal-buttons></modal-buttons>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

  export default {
    mixins: [mixinAddEditTask],
    data() {
      return {
        taskToSubmit: {
          name: '',
          dueDate: '',
          dueTime: '',
          completed: false,
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      submitTask() {
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      }
    }
  }
</script>
