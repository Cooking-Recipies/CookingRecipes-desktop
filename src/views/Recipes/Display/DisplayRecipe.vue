<template>
  <b-row align-v="start" class="w-100">
    <b-col cols="12">
      <h1>{{ recipe.title }}</h1>
      <h4>{{ recipe.category }}</h4>
      <hr>

      <b-row>
        <b-col cols="3" id="info">
          <Info :tags="recipe.tags"
                :servings="recipe.preparing_time"
                :time="recipe.number_of_people"
          />
        </b-col>

        <b-col cols="9">
          <h4>Author of the recipe</h4>
            <b-button @click="goToProfile">{{author.name}}</b-button>

          <Steps :ingredients="recipe.components"
                 :steps="recipe.instruction"
          />

          <Photos :photos="recipe.photos"/>
        </b-col>

      </b-row>
    </b-col>

  </b-row>
</template>

<script>
import axios from "axios";
import Info from "./content/Info";
import Steps from "./content/Steps";
import Photos from "./content/Photos";

export default {
  name: "DisplayRecipe",
  components: {Photos, Steps, Info},
  props: {
    title: String,
    category: String,
    tags: Array,
    likes: Number,
  },
  data: function () {
    return {
      recipe: [],
      author: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: async function () {
      await this.getRecipe()
      await this.getAuthorProfile()
    },
    getRecipe: async function () {
      let recipeId = this.$route.params.id
      const response = await axios.get("http://localhost/api/recipes/" + recipeId)
      this.recipe = response.data.data
    },
    getAuthorProfile: async function () {
      const response = await axios.get("http://localhost/api/profiles/" + this.recipe.user_profile_id)
      this.author = response.data.data
    },
    goToProfile: function () {
      this.$router.push({name: "ProfileDisplay", params: { id: this.recipe.user_profile_id } })
    }
  },
}
</script>

<style scoped>
#info {
  border-right: 1px solid rgba(0, 0, 0, .1);
}
</style>