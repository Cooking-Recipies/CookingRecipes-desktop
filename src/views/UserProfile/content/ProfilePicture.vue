<template>
  <b-form>
    <h1>Select new profile picture to upload</h1>
    <input type="file" accept="image/*" id="picture" ref="picture" v-on:change="handlePicture($event)"/>
    <b-button @click="updateProfilePicture">Upload</b-button>
  </b-form>

</template>

<script>
import axios from "axios";

export default {
  name: "ProfilePicture",
  data: function () {
    return {
      url: "http://localhost/api/",
      picture: null,
      newPictureId: null
    }
  },
  methods: {
    updateProfilePicture: async function () {
      await this.uploadPhoto()
      await this.changeProfilePicture()
    },
    uploadPhoto: async function () {
      let form = new FormData();
      form.append("image", this.picture)
      const response = await axios.post(this.url + "photos", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      this.newPictureId = response.data.data.photo_id
    },
    changeProfilePicture: async function () {
      let form = {"photo_id": this.newPictureId}

      await axios.put(this.url + "profiles/me", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    },
    handlePicture: function (event) {
      this.picture = event.target.files[0]
    }
  }
}
</script>