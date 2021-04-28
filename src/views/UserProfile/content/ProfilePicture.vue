<template>
  <div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilePicture",
  data: function () {
    return {
      url: "http://localhost/api/"
    }
  },
  methods: {
    uploadPhotos: async function () {
      try {
        await axios.post(this.url + "profiles/me")
      } catch (error) {
        this.errors = error.response.data.message
      }
    }
  }
}
</script>

<style scoped>

</style>