<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

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
    props: ['task', 'id'],
    data() {
      return {
        taskToSubmit: {}
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask']),
      submitTask() {
        this.updateTask({ id: this.id, updates: this.taskToSubmit })
        this.$emit('close')
      }
    },
    created() {
      this.taskToSubmit = Object.assign({}, this.task)
    }
  }
</script>
