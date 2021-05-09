<template>
  <div id="photos">
    <b-img v-for="(photo, index) in photos" :key="index" :src="photo.url" height="400"></b-img>
  </div>
</template>

<script>
export default {
  name: "Photos",
  props: {
    photos: Array,
  }
}
</script>

<style scoped>
#photos {
  display: inline-block;
}
</style>