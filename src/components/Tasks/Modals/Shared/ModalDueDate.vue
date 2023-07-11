<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      outlined
      v-model="dueDateValue"
      label="Due Date"
      mask="date"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueDate"
          name="close"
          @click="clearDueDateValueAndDueTimeValue"
          class="cursor-pointer"
        />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dueDateValue">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  export default {
    props: ['dueDate'],
    computed: {
      dueDateValue: {
        get() {
          return this.dueDate
        },
        set(value) {
          this.$emit('update:dueDate', value)
        }
      }
    },
    methods: {
      clearDueDateValue() {
        this.dueDateValue = ''
      },
      clearDueDateValueAndDueTimeValue() {
        this.clearDueDateValue()
        this.$emit('clearDueTime')
      }
    }
  }
</script>
