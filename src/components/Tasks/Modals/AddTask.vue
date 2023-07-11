<template>
  <q-card style="width: 400px; max-width: 80vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn
        flat
        round
        dense
        icon="close"
        v-close-popup
      />
    </q-card-section>

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            class="col"
            outlined
            autofocus
            v-model="taskToSubmit.name"
            label="Task Name"
            :rules="[val => !!val || 'Field is required']"
            ref="name"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.name"
                name="close"
                @click="taskToSubmit.name = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input
            class="col"
            outlined
            v-model="taskToSubmit.dueDate"
            label="Due Date"
            mask="date"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueDate"
                name="close"
                @click="clearDueDateAndDueTime"
                class="cursor-pointer"
              />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div
          v-if="taskToSubmit.dueDate"
          class="row q-mb-sm"
        >
          <q-input
            class="col"
            outlined
            v-model="taskToSubmit.dueTime"
            label="Due Time"
            mask="time"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueTime"
                name="close"
                @click="clearDueTime"
                class="cursor-pointer"
              />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit"
        />
        <q-btn
          label="Reset"
          color="primary"
          type="reset"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
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
      onSubmit() {
        this.$refs.name.validate()
        if (!this.$refs.name.hasError) {
          this.submitTask()
        }
      },
      onReset() {
        this.taskToSubmit.name = ''
        this.clearDueDateAndDueTime()
      },
      submitTask() {
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      },
      clearDueDateAndDueTime() {
        this.taskToSubmit.dueDate = ''
        this.clearDueTime()
      },
      clearDueTime() {
        this.taskToSubmit.dueTime = ''
      }
    }
  }
</script>
