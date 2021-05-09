<template>
  <div>
    <b-row>
      <b-col>
        <div v-for="comment in comments" :key="comment.id">
          <h4>{{ comment.comment }}<br>

            Likes {{ comment.likes.likes_count }}<br>

            Rating {{ comment.rate }}/5
          </h4>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comments",
  props: {
    recipeId: Number,
  },
  data: function () {
    return {
      url: "http://localhost/api/recipes/",
      comments: []
    }
  },
  created() {
    this.getRates()
  },
  methods: {
    getRates: async function () {
      // eslint-disable-next-line no-unused-vars
      const response = axios.get(this.url + this.recipeId + "/rates")
          .then((value) => {
            this.comments = value.data.data
          })
      console.log("com", response)
    }
  }
}
</script>

<style scoped>

</style>