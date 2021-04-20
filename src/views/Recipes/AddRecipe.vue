<template>
  <b-row align-v="start">
    <b-col>

      <b-form id="container">
        <b-row align-content="center">
          <b-col>
            <h1>Select photos to upload</h1>{{"\n"}}
            <input type="file" id="photos" ref="photos" multiple v-on:change="handlePhotos"/>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Ingredients</h1>
            <b-textarea></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Steps</h1>
            <b-textarea></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button @click="submitPhotos">Upload recipe</b-button>
          </b-col>
        </b-row>
      </b-form>

    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AddRecipe",
    data: function () {
      return {
        correctPhotos: [],
        approvedMimeExtensions: ["image/png", "image/svg+xml", "image/jpeg"]
      }
    },
    methods: {
      submitPhotos: function () {
        console.log(this.correctPhotos)
    },
    handlePhotos: function () {
      let userPhotos = this.$refs.photos.files
      this.addCorrectPhotos(userPhotos)
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
      return this.approvedMimeExtensions.includes(mimeExtension)
    }
  }
}
</script>

<style scoped>
#container div {
  padding: 10px;
}
</style>