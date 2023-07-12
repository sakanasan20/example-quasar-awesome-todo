<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <div class="row q-mb-md">
      <q-banner
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        class="col"
      >
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>

        <span class="text-capitalize">{{ tab }}</span> to access to your Todos anywhere!
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[ val => isEmail(val) || 'Please enter a valid email']"
        ref="email"
        outlined
        stack-label
        lazy-rules
        class="col"
        label="Email"
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
        ref="password"
        outlined
        stack-label
        lazy-rules
        label="Password"
        type="password"
        class="col"
      />
    </div>

    <div class="row q-mb-md">
      <q-space />

      <q-btn
        color="primary"
        :label="tab"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
  export default {
    props: ['tab'],
    data() {
      return {
        formData: {
            email: '',
            password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.email.validate()
        this.$refs.password.validate()
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          if (this.tab == 'login') {
            console.log('login')
          } else {
            console.log('register')
          }
        }
      },
      isEmail(email) {
        let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegExp.test(String(email).toLowerCase())
      }
    }
  }
</script>
