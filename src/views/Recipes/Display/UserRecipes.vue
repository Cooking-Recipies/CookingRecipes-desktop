<template>
  <b-row>
    <b-col id="recipe"
           :items="recipes"
           :per-page="getPerPage"
           :current-page="currentPage">
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
  name: "UserRecipes",
  components: {RecipeCard},
  data: function () {
    return {
      url: "http://localhost/api/",
      recipes: [],
      paginationData: [],
      currentPage: 1,
      profileId: null
    }
  },
  async created() {
    await this.getProfileId()
    await this.getRecipesById()
  },
  methods: {
    getProfileId: async function () {
      const response = await axios.get(this.url + "profiles/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      this.profileId = response.data.data.profile_id
    },
    getRecipesById: async function () {
      const response = await axios.get(this.url + "users/" + this.profileId + "/recipes")
      this.recipes = response.data.data
      this.paginationData = response.data.pagination
    },
  },
  computed: {
    getRows: function () {
      return this.recipes.length
    },
    getPerPage: function () {
      return this.paginationData.per_page
    },
  }
}
</script>

<style scoped>

</style>