<template>

  <div>
    <b-row align-v="start">
      <b-col>

        <b-row>
          <ProfileInfo/>
        </b-row>

        <b-row>
          <ProfileSettings/>
        </b-row>

        <b-row>
          <ProfileUploadedPhotos/>
        </b-row>

      </b-col>
    </b-row>
  </div>

</template>

<script>
import ProfileInfo from "./content/ProfileInfo";
import ProfileSettings from "./content/ProfileSettings";
import ProfileUploadedPhotos from "./content/ProfileUploadedPhotos";

export default {
  name: "ProfileCard",
  components: {ProfileUploadedPhotos, ProfileSettings, ProfileInfo},
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