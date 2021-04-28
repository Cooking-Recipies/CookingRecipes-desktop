<template>
  <div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileUploadedPhotos",
  created() {
    this.getUploadedPhotos()
  },
  methods: {
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
    },
  }
}
</script>

<style scoped>

</style>