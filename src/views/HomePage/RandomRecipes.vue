<template>
  <div>
    <h1>Random recipes</h1>
    <b-card-group deck>
      <recipe-card v-for="(recipe, index) in recipes" :key="index"
                   :title="recipe.title"
                   :category="recipe.category"
                   :tags="recipe.tags"
                   :image_src="recipe.photos"
                   :recipe-id="currentRecipeId"
      ></recipe-card>
    </b-card-group>
  </div>
</template>

<script>
import RecipeCard from '../Recipes/RecipeCard.vue'
import axios from "axios";

export default {
  name: "RandomRecipes",
  components: {
    RecipeCard
  },
  data: function () {
    return {
      url: "http://localhost/api/recipes/",
      recipes: [],
      recipesCount: 12,
      currentRecipeId: null,
    }
  },
  created() {
    this.getRandomRecipes()
  },
  methods: {
    getRandomRecipes: function () {
      let setOfIds = this.generateSetOfIds()
      for (let recipeId of setOfIds) {
        this.getRecipe(recipeId)
      }
    },
    getRecipe: async function (id) {
      const response = await axios.get(this.url + id)
      this.recipes.push(response.data.data)
      this.currentRecipeId = id
    },
    generateSetOfIds: function () {
      let ids = new Set()
      while (ids.size < 12) {
        ids.add(Math.floor(Math.random() * (50 - 1) + 1))
      }
      return ids
    }
  }
}
</script>