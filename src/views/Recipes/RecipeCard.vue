<template>
  <b-card-group deck>
    <b-card
        :title="title"
        :img-src="image"
        :img-alt="title"
        img-top
        style="width: 24rem;"
        class="mb-2"
    >
      <b-card-text>
        {{ category }}
      </b-card-text>

      <b-card-body v-if="hasLikes">
        <b-img src="@/assets/like.svg" height="25"></b-img>
        {{ likes }}
      </b-card-body>

      <b-card-footer v-for="(tag, index) in tags" :key="index">
        <b-row>
          <b-col>
            {{ tag }}
          </b-col>
        </b-row>
      </b-card-footer>

      <b-button @click="goToRecipePage" variant="info">Go to the recipe page</b-button>
      <div v-if="isOwner">
        <b-button @click="editRecipe" variant="warning">Edit recipe</b-button>
        <b-button @click="deleteRecipe" variant="danger">Delete recipe</b-button>
      </div>
    </b-card>
  </b-card-group>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipeCard",
  props: {
    title: String,
    category: String,
    likes: Number,
    image: String,
    tags: Array,
    recipeId: Number,
    authorId: String,
    hasLikes: String,
    isOwner: Boolean
  },
  methods: {
    goToRecipePage: function () {
      this.$router.push({name: "DisplayRecipe", params: {id: this.recipeId}})
    },
    editRecipe: function () {
      this.$router.push({name: "EditRecipe", params: {id: this.recipeId}})
    },
    deleteRecipe: async function () {
      await axios.delete("http://localhost/api/recipes/" + this.recipeId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      window.location.reload()
    },
  }
}
</script>