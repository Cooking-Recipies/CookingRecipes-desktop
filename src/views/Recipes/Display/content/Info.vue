<template>
  <div>
    <h4>
      Servings
      {{ servings }}
      <br>
      Time {{ time }}
    </h4>

    <div>
      <div v-for="(tag, index) in tags" :key="index" id="tags">{{ tag }}</div>
    </div>

    <b-button variant="outline-light">
      <b-img width="100" :src="getLikeImage" @click="likeOrUnlike"></b-img>
    </b-button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Info",
  props: {
    tags: Array,
    servings: String,
    time: Number,
    recipeId: Number
  },
  created() {
    this.checkIfLiked()
  },
  data: function () {
    return {
      image: require("@/assets/like.svg"),
      url: "http://localhost/api/",
      likes: [],
    }
  },
  methods: {
    checkIfLiked: async function () {
      await this.checkIfLoggedLiked()
    },
    checkIfLoggedLiked: async function () {
      const response = await axios.get(this.url + "users/me/likes/recipes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      this.likes = response.data.data
    },
    likeOrUnlike: async function () {
      try {
        await this.likeRecipe()
      } catch (error) {
        await this.unlikeRecipe()
      }
    },
    likeRecipe: async function () {
      await axios.post(this.url + "recipes/" + this.recipeId + "/likes", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    },
    unlikeRecipe: async function () {
      await axios.delete(this.url + "recipes/" + this.recipeId + "/likes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    }
  },
  computed: {
    getLikeImage: function () {
      for (let i = 0; i < this.likes.length; i++) {
        if (parseInt(this.likes[i].recipe_id) === this.recipeId) {
          return require("@/assets/like.svg")
        }
      }
      return require("@/assets/like-white.svg")
    },
  }
}
</script>

<style scoped>
#tags {
  display: inline-block;
  margin-right: 5px;
  background-color: #5bc0de;
  border-radius: 5px;
}
</style>