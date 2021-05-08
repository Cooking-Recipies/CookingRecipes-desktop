<template>
  <b-row>
    <b-col
           id="recipe"
           :items="recipes"
           :per-page="getPerPage"
           :current-page="currentPage"
    >

      <b-card-group v-model="recipes" deck>
        <recipe-card v-for="(recipe) in recipes" :key="recipe.recipe_id"
                     :title="recipe.title"
                     :category="recipe.category"
                     :likes="recipe.likes.likes_count"
                     :tags="recipe.tags"
                     :image_src="recipe.photos"
                     :recipe-id="recipe.recipe_id"
        ></recipe-card>
      </b-card-group>
      <b-pagination
          v-model="currentPage"
          :total-rows="getRows"
          :per-page="getPerPage"
          aria-controls="recipe"
      ></b-pagination>
    </b-col>
  </b-row>
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
      paginationData: [],
      currentPage: 1,
      perPage: 0,
    }
  },
  created() {
    this.getRecipes()
  },
  methods: {
    getRecipes: async function () {
      const response = await axios.get(this.url + "recipes")
      this.recipes = response.data.data
      this.paginationData = response.data.pagination
    },
  },
  computed: {
    getRows: function () {
      return this.recipes.length
    },
    getTotalPages: function () {
      return this.paginationData.total_pages
    },
    getPerPage: function () {
      return this.paginationData.per_page
    },
  }
}
</script>