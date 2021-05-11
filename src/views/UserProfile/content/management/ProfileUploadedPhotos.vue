<template>
  <div>
    <div v-for="picture in pictures" :key="picture">
      <b-img :src="picture.url" height="100"></b-img>
      <b-button variant="danger" @click="deletePicture(picture.photo_id)">X</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileUploadedPhotos",
  created() {
    this.getUploadedPhotos()
  },
  data: function () {
    return {
      pictures: [],
      url: "http://localhost/api/photos/"
    }
  },
  methods: {
    getUploadedPhotos: async function () {
      try {
        const response = await axios.get("http://localhost/api/users/me/photos", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        this.pictures = response.data.data
      } catch (error) {
        this.errors = error.response.data.message
      }
    },
    deletePicture: async function (id) {
      await axios.delete(this.url + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>