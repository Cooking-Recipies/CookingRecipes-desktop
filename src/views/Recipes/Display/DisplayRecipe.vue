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
          <Steps :ingredients="recipe.components"
                 :steps="recipe.instruction"
          />

        </b-col>

      </b-row>
    </b-col>

  </b-row>
</template>

<script>
import axios from "axios";
import Info from "./Info";
import Steps from "./Steps";

export default {
  name: "DisplayRecipe",
  components: {Steps, Info},
  props: {
    title: String,
    category: String,
    tags: Array,
    likes: Number
  },
  data: function () {
    return {
      recipe: []
    }
  },
  created() {
    let recipeId = this.$route.params.id
    this.getRecipe(recipeId)
  },
  methods: {
    getRecipe: async function (id) {
      const response = await axios.get("http://localhost/api/recipes/" + id)
      this.recipe = response.data.data
      console.log(this.recipe)
    }
  }
}
</script>

<style scoped>

#info {
  border-right: 1px solid rgba(0, 0, 0, .1);
}
</style>