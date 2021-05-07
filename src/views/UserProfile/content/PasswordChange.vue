<template>
  <b-form>

    <b-form-group label="Current password" label-cols="2">
      <b-input type="password" v-model="currentPassword"></b-input>
    </b-form-group>

    <b-form-group label="New password" label-cols="2">
      <b-input type="password" v-model="newPassword"></b-input>
    </b-form-group>

    <b-form-group label="New password confirmation" label-cols="2">
      <b-input type="password" v-model="newConfirmation"></b-input>
    </b-form-group>

    <b-button @click="changePassword">Change</b-button>

  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "PasswordChange",
  data: function () {
    return {
      url: "http://localhost/api/",
      currentPassword: null,
      newPassword: null,
      newConfirmation: null,
    }
  },
  methods: {
    changePassword: async function () {
      let form = this.getForm()

      await axios.put(this.url + "users/me/change-password", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      window.location.reload()
    },
    getForm: function () {
      return {
        "current_password": this.currentPassword,
        "password": this.newPassword,
        "password_confirmation": this.newConfirmation
      }
    }
  }
}
</script>

<style scoped>

</style>