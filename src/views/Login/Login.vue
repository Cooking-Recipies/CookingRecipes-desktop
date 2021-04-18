<template>
  <b-form>
    <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Email" label-for="email">
      <b-form-input size="lg" placeholder="email" id="email" v-model="formEmail" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Password" label-for="password">
      <b-form-input size="lg" placeholder="password" id="password" type="password" v-model="formPassword"
                    required></b-form-input>
    </b-form-group>
    <b-button size="lg" @click="sendLoginRequest">Login</b-button>
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
      url: 'http://localhost/api/'
    }
  },
  async created() {
    await axios.get(this.url + "profiles", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
  },
  methods: {
    sendLoginRequest: async function () {
      let userCredentials = {
        email: this.formEmail,
        password: this.formPassword
      }

      const response = await axios.post(this.url + "login", userCredentials)
      localStorage.setItem("token", response.data.token)
    }
  }
}
</script>

<style scoped>

</style>