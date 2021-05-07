<template>
  <b-row align-v="center" class="w-100">

    <b-col>
      <label>Followers</label>
      {{ followers.length }}
    </b-col>

    <b-col>
      <label>Following</label>
      {{ following.length }}
    </b-col>

  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileSocial",
  created() {
    this.getFollowers()
    this.getFollowings()
  },
  data: function () {
    return {
      followers: 0,
      following: 0,
      url: "http://localhost/api/users/me/"
    }
  },
  methods: {
    getFollowers: async function () {
      const response = await axios.get(this.url + "followers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      this.followers = response.data.data
    },
    getFollowings: async function () {
      const response = await axios.get(this.url + "followings", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      this.following = response.data.data
    }
  }
}
</script>

<style scoped>

</style>