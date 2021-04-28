<template>
  <b-row align-v="start">
    <b-col>

      <b-form id="container">
        <b-row align-content="center">
          <b-col>
            <h1>Select photos to upload</h1>
            <input type="file" id="photos" ref="photos" multiple v-on:change="handlePhotos"/>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Ingredients</h1>
            <b-textarea v-model="ingredients"></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Steps</h1>
            <b-textarea v-model="steps"></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button @click="submitForm">Upload recipe</b-button>
          </b-col>
        </b-row>
      </b-form>

    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "AddRecipe",
  data: function () {
    return {
      url: "http://localhost/api/",
      correctPhotos: [],
      approvedMimeExtensions: ["image/png", "image/svg+xml", "image/jpeg"],
      ingredients: null,
      steps: null,
    }
  },
  methods: {
    submitForm: async function () {
      let form = this.getRecipeForm()
      await axios.post(this.url + "recipe", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    },
    handlePhotos: function () {
      let userPhotos = this.getUserPhotos()
      this.addCorrectPhotos(userPhotos)
    },
    getUserPhotos: function () {
      return this.$refs.photos.files
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
    },
    getRecipeForm: function () {
      return {
        photos: this.correctPhotos,
        ingredients: this.ingredients,
        steps: this.steps
      }
    }
  }
}
</script>

<style scoped>
#container div {
  padding: 10px;
}
</style>