<template>
  <b-col cols="4" id="recipe">
    <b-card-group deck>
      <recipe-card v-for="(recipe) in recipes" :key="recipe.recipe_id"
                   :title="recipe.title"
                   :category="recipe.category"
                   :likes="recipe.likes.likes_count"
                   :tags="recipe.tags"
                   :image_src="recipe.photos"
                   :recipe-id="recipe.recipe_id"
      ></recipe-card>
    </b-card-group>
    <b-button @click="fetchNewRecipes(1)">Previous</b-button>
    <b-button @click="fetchNewRecipes(-1)">Next</b-button>
  </b-col>
</template>

<script>
import axios from "axios";
import RecipeCard from "../../HomePage/RecipeCard";

export default {
  name: "BrowseRecipes",
  components: {RecipeCard},
  data: function () {
    return {
      url: "http://localhost/api/",
      recipes: [],
      currentPage: 0,
      pages: 0
    }
  },
  created() {
    this.getRecipes()
  },
  methods: {
    getRecipes: async function () {
      const response = await axios.get(this.url + "recipes")
      this.recipes = response.data.data
      this.pages = response.data.pagination.total_pages
      console.log(response.data.data)
    },
    fetchNewRecipes: async function (page) {
      this.currentPage += page
      const response = await axios.get(this.url + "recipes")
      this.recipes = response.data.data[0]
    }

  }
}
</script>