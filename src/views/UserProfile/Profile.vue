<template>

  <div>
    <b-row align-v="start">
      <b-col>

        <b-form @submit.prevent="updateProfile">
          <b-row>
            <b-img src="@/assets/user.svg" height="100px"></b-img>
            <b-input v-if="userProfileData" :value="userProfileData.name"></b-input>
          </b-row>

          <b-row>
            <b-textarea v-if="userProfileData" :value="userProfileData.description" cols="200" rows="8"></b-textarea>
          </b-row>

          <b-button type="submit">Update</b-button>
        </b-form>

        <div v-if="errors">
          <b-alert variant="danger" show>{{ errors }}</b-alert>
        </div>

      </b-col>
    </b-row>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data: function () {
    return {
      url: "http://localhost/api/profiles/",
      userProfileData: null,
      errors: "",
    }
  },
  created() {
    this.redirectIfNotLogged()
    this.getProfileInfo()
    this.getUploadedPhotos()
  },
  methods: {
    redirectIfNotLogged: function () {
      let token = localStorage.getItem("token")
      if (!token) {
        this.$router.push("/login")
      }
    },
    getProfileInfo: async function () {
      try {
        const response = await axios.get(this.url + "1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        this.userProfileData = response.data.data
      } catch (error) {
        this.errors = error.response.data.message
      }
    },
    updateProfile: async function () {
      try {
        await axios.put(this.url + "me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        window.location.reload()
      } catch (error) {
        this.errors = error.response.data.message
      }
    },
    getUploadedPhotos: async function () {
      try {
        await axios.get("http://localhost/api/users/me/photos", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
      } catch (error) {
        this.errors = error.response.data.message
      }
    }
  }
}
</script>

<style scoped>

</style>