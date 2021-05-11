<template>
  <div>

    <b-form @submit.prevent="updateProfile">
      <b-row align-v="center">
        <b-col>
          <b-img :src="userProfilePicture" height="100px"></b-img>

        </b-col>

        <b-col>
          <b-button @click="$router.push('/profilePicture')">
            Change profile picture
          </b-button>

        </b-col>

        <b-col>
          <b-button @click="$router.push('/profileUploadedPhotos')">
            See your uploaded photos
          </b-button>

        </b-col>
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
      userProfilePicture: "",
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
        this.userProfilePicture = response.data.data.photo.url
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