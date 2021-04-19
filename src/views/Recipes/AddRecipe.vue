<template>
  <b-row align-v="start">
    <b-col>
      <input type="file" id="photos" ref="photos" multiple v-on:change="handlePhotos"/>
      <b-button @click="submitPhotos"></b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AddRecipe",
  data: function () {
    return {
      correctPhotos: [],
      approvedExtensions: ["image/png", "image/svg+xml", "image/jpeg"]
    }
  },
  methods: {
    handlePhotos: function () {
      let userPhotos = this.$refs.photos.files
      this.addCorrectPhotos(userPhotos)
    },
    submitPhotos: function () {
      console.log(this.correctPhotos)
    },
    addCorrectPhotos: function (userPhotos) {
      for (let i = 0; i < userPhotos.length; i++) {
        let file = userPhotos[i]
        if (this.isExtensionValid(file.type)) {
          console.log("adding", file.name)
          this.correctPhotos.push(file)
        }
      }
    },
    isExtensionValid: function (mimeExtension) {
      return this.approvedExtensions.includes(mimeExtension);
    }
  }
}
</script>

<style scoped>

</style>