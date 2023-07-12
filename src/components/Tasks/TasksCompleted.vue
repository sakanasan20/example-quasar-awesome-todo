<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div class="q-mt-lg">
      <list-header
        bgColor="bg-green-4"
      >
        Completed
      </list-header>

      <q-list
        bordered
        separator
      >
        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
  import listHeader from 'components/Shared/ListHeader.vue'
  import task from 'components/Tasks/Task.vue'

  export default {
    props: ['tasksCompleted'],
    components: {
      listHeader, task
    }
  }
</script>
