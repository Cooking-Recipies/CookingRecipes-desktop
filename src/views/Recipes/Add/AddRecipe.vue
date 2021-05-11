<template>
  <b-row align-v="start">
    <b-col>

      <b-form id="container">

        <b-row>
          <b-col>
            <h1>Title</h1>
            <b-input v-model="title" required></b-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Select category</h1>
            <b-dropdown id="dropdown-1" :text="categories[0].name" class="m-md-2">
              <b-dropdown-item-button v-for="category in categories" :key="category.id"
                                      @click="setCategory(category.id)">{{ category.name }}
              </b-dropdown-item-button>
            </b-dropdown>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="5">
            <h1>Servings</h1>
            <b-input v-model="servings" type="number" required></b-input>
          </b-col>
          <b-col>
            <h1>Cooking time</h1>
            <b-input v-model="cookingTime"></b-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Select photos to upload</h1>
            <input accept="image/*" type="file" id="photos" ref="photos" multiple v-on:change="handlePhotos"/>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Ingredients</h1>
            <b-form-group label-cols="2" label="Ingredient" label-for="ingredient">
              <b-input v-model="ingredient" id="ingredient" required></b-input>
            </b-form-group>

            <b-form-group label-cols="2" label="Amount" label-for="amount">
              <b-input v-model="ingredientAmount" id="amount" required></b-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Steps</h1>
            <b-textarea v-model="steps" required></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedTags"
                :options="tags"
                name="flavour-1"
            ></b-form-checkbox-group>
          </b-col>
        </b-row>


        <ul v-if="errors">
          <b-alert variant="danger" v-model="isAlertShown" dismissible>
            <li v-for="(message, error) in errors" :key="error">{{ message[0] }}</li>
          </b-alert>
        </ul>
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
      title: null,
      servings: null,
      cookingTime: null,
      ingredient: null,
      ingredientAmount: null,
      steps: null,
      photos: [],
      photosIds: [],
      categories: [],
      tags: [],
      selectedTags: [],
      selectedCategory: 1,
      isAlertShown: false,
      errors: []
    }
  },
  created() {
    this.getCategories()
    this.getTags()
  },
  methods: {
    submitForm: async function () {
      await this.uploadPhotos()
      let form = this.getRecipeForm()
      try {
        await axios.post(this.url + "recipes", form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        await this.$router.push('/userRecipes')
      } catch (error) {
        this.isAlertShown = true
        this.errors = error.response.data.data
      }
    },
    uploadPhotos: async function () {
      for (let i = 0; i < this.photos.length; i++) {
        let photoForm = new FormData()
        photoForm.append("image", this.photos[i])
        const response = await axios.post(this.url + "photos", photoForm, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        this.photosIds.push(response.data.data.photo_id)
      }
    },
    handlePhotos: function (event) {
      this.photos = event.target.files
    },
    getRecipeForm: function () {
      return {
        title: this.title,
        category_id: this.selectedCategory,
        number_of_people: this.servings,
        preparing_time: this.cookingTime,
        instruction: this.steps,
        components: [{"name": this.ingredient, "quantity": this.ingredientAmount}],
        photos: this.photosIds,
        tags: this.selectedTags
      }
    },
    getCategories: async function () {
      const response = await axios.get(this.url + "categories")
      this.categories = response.data.data
    },
    getTags: async function () {
      const response = await axios.get(this.url + "tags")
      this.tags = response.data.data
    },
    setCategory: function (categoryId) {
      this.selectedCategory = categoryId
    },
  }
}
</script>

<style scoped>
#container div {
  padding: 10px;
}

li {
  list-style-type: none;
}
</style>