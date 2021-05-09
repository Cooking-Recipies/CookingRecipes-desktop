<template>
  <b-col>
    <b-form>
      <b-form-group label-cols="2" label="Password">
        <b-input type="password" v-model="password"></b-input>
      </b-form-group>

      <b-button variant="danger" @click="deleteAccount">Delete account</b-button>
    </b-form>
  </b-col>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountDelete",
  data: function () {
    return {
      password: null,
      url: "http://localhost/api/"
    }
  },
  methods: {
    deleteAccount: async function () {
      let form = {}
      console.log(form)
      await axios.delete(this.url + "users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          "password": this.password
        }
      })
      localStorage.clear()
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>