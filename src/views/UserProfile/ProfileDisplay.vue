<template>
  <b-row>
    <b-col>
      <b-card class="mb-3">
        <b-card-header>{{ profile.name }}</b-card-header>

        <b-card-text>
          {{ profile.description }}
        </b-card-text>
      </b-card>

      <recipe-card v-for="(recipe) in recipes" :key="recipe.recipe_id"
                   :title="recipe.title"
                   :category="recipe.category"
                   :likes="recipe.likes.likes_count"
                   :tags="recipe.tags"
                   :image_src="recipe.photos"
                   :recipe-id="recipe.recipe_id"
      ></recipe-card>

    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import RecipeCard from "../HomePage/RecipeCard";

export default {
  name: "ProfileDisplay",
  components: {RecipeCard},
  created() {
    this.getProfile()
    this.getRecipes()
  },
  data: function () {
    return {
      profile: null,
      url: "http://localhost/api/",
      recipes: []
    }
  },
  methods: {
    getProfile: async function () {
      const response = await axios.get(this.url + "profiles/" + this.$route.params.id)
      this.profile = response.data.data
    },
    getRecipes: async function () {
      const response = await axios.get(this.url + "users/" + this.$route.params.id + "/recipes")
      this.recipes = response.data.data
    }
  }
}
</script>

<style scoped>

</style>