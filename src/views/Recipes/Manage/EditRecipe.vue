<template>
  <b-row align-v="start">
    <b-col>

      <b-form id="container">

        <b-row>
          <b-col>
            <h1>Title</h1>
            <b-input v-model="recipe.title" :value="recipe.title" required></b-input>
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
            <b-input v-model="recipe.number_of_people" :value="recipe.number_of_people" type="number"
                     required></b-input>
          </b-col>
          <b-col>
            <h1>Cooking time</h1>
            <b-input v-model="recipe.preparing_time" :value="recipe.preparing_time"></b-input>
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
              <b-input v-model="recipe.components[0].name" id="ingredient" required></b-input>
            </b-form-group>

            <b-form-group label-cols="2" label="Amount" label-for="amount">
              <b-input v-model="recipe.components[0].quantity" id="amount" required></b-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h1>Steps</h1>
            <b-textarea v-model="recipe.instruction" :value="recipe.instruction" required></b-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedTags"
                :options="tags"
                checked="family"
                name="flavour-1"
            ></b-form-checkbox-group>
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
  name: "EditRecipe",
  data: function () {
    return {
      url: "http://localhost/api/",
      recipe: [],
      categories: [],
      tags: [],
      photos: [],
      photosIds: [],
      selectedTags: [],
      selectedCategory: 1
    }
  },
  created() {
    this.getRecipe()
    this.getCategories()
    this.getTags()
  },
  methods: {
    submitForm: async function () {
      await this.uploadPhotos()
      let form = this.getRecipeForm()
      try {
        await axios.put(this.url + "recipes/" + this.$route.params.id, form, {
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
    getRecipe: async function () {
      const response = await axios.get(this.url + "recipes/" + this.$route.params.id)
      this.recipe = response.data.data
      this.selectedTags = this.recipe.tags
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
        title: this.recipe.title,
        category_id: this.selectedCategory,
        number_of_people: this.recipe.number_of_people,
        preparing_time: this.recipe.preparing_time,
        instruction: this.recipe.instruction,
        components: [{"name": this.recipe.components[0].name, "quantity": this.recipe.components[0].quantity}],
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