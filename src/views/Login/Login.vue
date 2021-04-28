<template>
  <b-form @submit.prevent="sendLoginRequest">
    <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Email" label-for="email">
      <b-form-input size="lg" placeholder="email" id="email" v-model="formEmail" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Password" label-for="password">
      <b-form-input size="lg" placeholder="password" id="password" type="password" v-model="formPassword"
                    required></b-form-input>
    </b-form-group>
    <b-alert variant="danger" v-if="errors" show>{{ errors }}</b-alert>

    <b-button size="lg" type="submit">Login</b-button>
  </b-form>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data: function () {
    return {
      formEmail: null,
      formPassword: null,
      url: "http://localhost/api/",
      errors: "",
    }
  },
  created() {
    this.redirectIfLogged()
  },
  methods: {
    sendLoginRequest: async function () {
      await this.getXSRFCookie()
      await this.login()
    },
    getXSRFCookie: async function () {
      await axios.get("http://localhost/sanctum/csrf-cookie")
    },
    login: async function () {
      try {
        const response = await axios.post(this.url + "login", {
          email: this.formEmail,
          password: this.formPassword
        })
        localStorage.setItem("token", response.data.token)
        window.location.reload()
      } catch (error) {
        this.errors = error.response.data.message
      }
    },
    redirectIfLogged: function () {
      if (localStorage.getItem("token")) {
        this.$router.push("/")
      }
    }
  }
}
</script>

<style scoped>

</style>