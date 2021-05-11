<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <b-row>
        <b-col cols="10">
          <hr>
          <h4>{{ comment.comment }}<br>

            Likes {{ comment.likes.likes_count }}<br>

            Rating {{ comment.rate }}/5
          </h4>
        </b-col>
        <b-col>
          <hr>
          <b-button variant="outline-light" @click="likeOrUnlike(comment.id)">
            <b-img width="80" :src="require('@/assets/like.svg')"></b-img>
          </b-button>
        </b-col>
      </b-row>
    </div>

    <b-form v-if="isLogged">
      <b-row>
        <b-col cols="2">
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Rating"
                        label-for="rating"></b-form-group>
          <b-form-input list="rating" v-model="rating"></b-form-input>
          <datalist id="rating">
            <option v-for="rate in rates" :key="rate">{{ rate }}</option>
          </datalist>
        </b-col>
        <b-col>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Comment"
                        label-for="comment"></b-form-group>
          <b-input ref="comment" v-model="comment"></b-input>
        </b-col>
      </b-row>
      <b-button @click="sendComment">Send</b-button>
    </b-form>
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
      url: "http://localhost/api/",
      comments: [],
      rates: [1, 2, 3, 4, 5],
      rating: null,
      comment: null,
      isLogged: false
    }
  },
  created() {
    this.checkIfLogged()
    this.getRates()
  },
  methods: {
    getRates: async function () {
      axios.get(this.url + "recipes/" + this.recipeId + "/rates")
          .then((value) => {
            this.comments = value.data.data
          })
    },
    sendComment: async function () {
      let form = {
        "rate": this.rating,
        "comment": this.comment
      }
      await axios.post(this.url + "recipes/" + this.recipeId + "/rates", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      await this.$router.push("/browseRecipes")
    },
    likeOrUnlike: async function (commentId) {
      try {
        await this.likeComment(commentId)
      } catch {
        await this.unlikeComment(commentId)
      }
    },
    likeComment: async function (commentId) {
      await axios.post(this.url + "rates/" + commentId + "/likes", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    },
    unlikeComment: async function (commentId) {
      await axios.delete(this.url + "rates/" + commentId + "/likes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    },
    checkIfLogged: function () {
      if (localStorage.getItem("token") !== null) {
        this.isLogged = true
      }
    }
  },
}
</script>