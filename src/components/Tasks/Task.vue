<template>
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1' "
    v-ripple
    clickable
  >
    <q-item-section side top>
      <q-checkbox
        v-model="task.completed"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike' : task.completed }">
        {{ task.name }}
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
            {{ task.dueDate }}
          </q-item-label>

          <q-item-label
            class="row justify-end"
            caption
          >
            {{ task.dueTime }}
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
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
  import { mapActions } from 'vuex'
  import editTask from 'components/Tasks/Modals/EditTask.vue'

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
      }
    }
  }
</script>

<style>

</style>
