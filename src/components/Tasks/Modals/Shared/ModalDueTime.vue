<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      outlined
      v-model="dueTimeValue"
      label="Due Time"
      mask="time"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueTime"
          name="close"
          @click="clearDueTimeValue"
          class="cursor-pointer"
        />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dueTimeValue">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  export default {
    props: ['dueTime'],
    computed: {
      dueTimeValue: {
        get() {
          return this.dueTime
        },
        set(value) {
          this.$emit('update:dueTime', value)
        }
      }
    },
    methods: {
      clearDueTimeValue() {
        this.dueTimeValue = ''
      }
    }
  }
</script>
