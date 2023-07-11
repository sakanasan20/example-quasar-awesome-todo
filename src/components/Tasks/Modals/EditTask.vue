<template>
  <q-card style="width: 400px; max-width: 80vw;">
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
  import modalHeader from 'components/Tasks/Modals/Shared/ModalHeader.vue'
  import modalTaskName from 'components/Tasks/Modals/Shared/ModalTaskName.vue'
  import modalDueDate from 'components/Tasks/Modals/Shared/ModalDueDate.vue'
  import modalDueTime from 'components/Tasks/Modals/Shared/ModalDueTime.vue'
  import modalButtons from 'components/Tasks/Modals/Shared/ModalButtons.vue'

  export default {
    mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
    },
    props: ['task', 'id'],
    components: {
      modalHeader, modalTaskName, modalDueDate, modalDueTime, modalButtons
    },
    data() {
      return {
        taskToSubmit: {}
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask']),
      onSubmit() {
        this.$refs.modalTaskName.$refs.name.validate()
        if (!this.$refs.modalTaskName.name.hasError) {
          this.submitTask()
        }
      },
      onReset() {
        this.taskToSubmit.name = ''
        this.taskToSubmit.dueTime = ''
        this.taskToSubmit.dueDate = ''
      },
      submitTask() {
        this.updateTask({ id: this.id, updates: this.taskToSubmit })
        this.$emit('close')
      },
      clearDueTime() {
        this.taskToSubmit.dueTime = ''
      }
    }
  }
</script>
