<template>
  <b-form @submit.prevent="onSubmit">

    <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Name" label-for="name">
      <b-form-input size="md" id="name" v-model="name" required></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Email" label-for="email">
      <b-form-input size="md" id="email" v-model="email" required></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Password" label-for="password">
      <b-form-input size="md" id="password" type="password" v-model="password" required></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Password confirmation"
                  label-for="password_conf">
      <b-form-input size="md" id="password_conf" type="password" v-model="password_confirmation"
                    required></b-form-input>
    </b-form-group>

      <ul v-if="errors">
        <b-alert variant="danger" v-model="isAlertShown" dismissible>
        <li v-for="(error, index) in errors" :key="index">{{ error[0] }}</li>
        </b-alert>
      </ul>

    <b-button size="lg" type="submit">Register</b-button>

  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data: function () {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      url: "http://localhost/api/",
      errors: [],
      isAlertShown: false
    }
  },
  methods: {
    onSubmit: async function () {
      let form = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      try {
        await axios.post(this.url + "register", form)
        await this.$router.push("/login")
      } catch (error) {
        this.errors = error.response.data.data
        this.isAlertShown = true
      }

    }
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>