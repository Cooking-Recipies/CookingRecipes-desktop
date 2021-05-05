<template>
  <div>
    <b-form @submit.prevent="updateProfile">
      <b-row>
        <b-img src="@/assets/user.svg" height="100px"></b-img>
        <b-input v-if="userProfileData" :value="userProfileData.name" v-model="userProfileData.name"></b-input>
      </b-row>

      <b-row>
        <b-textarea v-if="userProfileData" :value="userProfileData.description" v-model="userProfileData.description"
                    cols="200" rows="8"></b-textarea>
      </b-row>

      <b-button type="submit">Update</b-button>
    </b-form>

    <div v-if="errors">
      <b-alert variant="danger" show>{{ errors }}</b-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileInfo",
  data: function () {
    return {
      url: "http://localhost/api/profiles/",
      userProfileData: null,
      errors: "",
    }
  },
  created() {
    this.getProfileInfo()
  },
  methods: {
    getProfileInfo: async function () {
      try {
        const response = await axios.get(this.url + "me", {
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
      let form = this.getForm()
      try {
        await axios.put(this.url + "me", form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            //"X-XSRF-TOKEN": document.cookie.split("=")[1]
          }
        })
        window.location.reload()
      } catch (error) {
        this.errors = error.response.data.message
      }
    },
    getForm: function () {
      return {
        "name": this.userProfileData.name,
        "description": this.userProfileData.description,
      }
    }
  }
}
</script>

<style scoped>

</style>