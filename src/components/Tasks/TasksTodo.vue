<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <list-header
        bgColor="bg-orange-4"
        v-if="!settings.showTasksInOneList"
      >
        Todo
      </list-header>

      <q-list
        bordered
        separator
      >
        <task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import listHeader from 'components/Shared/ListHeader.vue'
  import task from 'components/Tasks/Task.vue'

  export default {
    props: ['tasksTodo'],
    components: {
      listHeader, task
    },
    computed: {
      ...mapGetters('settings', ['settings'])
    }
  }
</script>
