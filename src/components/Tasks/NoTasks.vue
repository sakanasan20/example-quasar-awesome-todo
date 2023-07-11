<template>
  <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No tasks to do today!
    <template v-slot:action>
      <q-btn
        @click="rootEmit('showAddTask')"
        flat
        color="primary"
        label="Add Task"
      />
    </template>
  </q-banner>
</template>

<script>
  import { events } from 'boot/events'

  export default {
    methods: {
      rootEmit(eventType, eventValue = {}) {
        events.emit(eventType, eventValue)
      }
    }
  }
</script>
