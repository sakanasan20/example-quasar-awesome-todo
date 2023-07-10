<template>
  <q-item
    @click="task.completed = !task.completed"
    v-ripple
    clickable
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
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
          <q-icon name="event" size="18px" class="q-mr-xs"/>
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
  </q-item>
</template>

<script>
  export default {
    props: ['task', 'id']
  }
</script>

<style>

</style>
