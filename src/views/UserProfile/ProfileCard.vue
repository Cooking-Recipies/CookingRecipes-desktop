<template>

  <div>
    <b-row align-v="start">
      <b-col>

        <b-row>
          <ProfileInfo/>
          <ProfileSocial/>
        </b-row>

        <b-row>
          <ProfileSettings/>
        </b-row>

      </b-col>
    </b-row>
  </div>

</template>

<script>
import ProfileInfo from "./content/ProfileInfo";
import ProfileSettings from "./content/ProfileSettings";
import ProfileSocial from "./content/ProfileSocial";

export default {
  name: "ProfileCard",
  components: {ProfileSocial, ProfileSettings, ProfileInfo},
  created() {
    this.redirectIfNotLogged()
  },
  methods: {
    redirectIfNotLogged: function () {
      let token = localStorage.getItem("token")
      if (!token) {
        this.$router.push("/login")
      }
    },
  }
}
</script>

<style scoped>

</style>