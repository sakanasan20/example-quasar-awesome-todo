<template>
  <div>
    <list-header
      bgColor="bg-orange-4"
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
</template>

<script>
  import listHeader from 'components/Shared/ListHeader.vue'
  import task from 'components/Tasks/Task.vue'

  export default {
    props: ['tasksTodo'],
    components: {
      listHeader, task
    }
  }
</script>
