<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      outlined
      autofocus
      v-model="nameValue"
      label="Task Name"
      :rules="[val => !!val || 'Field is required']"
      ref="name"
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          name="close"
          @click="clearNameValue"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
  export default {
    props: ['name'],
    computed: {
      nameValue: {
        get() {
          return this.name
        },
        set(value) {
          this.$emit('update:name', value)
        }
      }
    },
    methods: {
      clearNameValue() {
        this.nameValue = ''
      }
    }
  }
</script>
