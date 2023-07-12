import modalHeader from 'components/Tasks/Modals/Shared/ModalHeader.vue'
import modalTaskName from 'components/Tasks/Modals/Shared/ModalTaskName.vue'
import modalDueDate from 'components/Tasks/Modals/Shared/ModalDueDate.vue'
import modalDueTime from 'components/Tasks/Modals/Shared/ModalDueTime.vue'
import modalButtons from 'components/Tasks/Modals/Shared/ModalButtons.vue'

export default {
  components: {
    modalHeader, modalTaskName, modalDueDate, modalDueTime, modalButtons
  },
  methods: {
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
    clearDueTime() {
      this.taskToSubmit.dueTime = ''
    }
  }
}
