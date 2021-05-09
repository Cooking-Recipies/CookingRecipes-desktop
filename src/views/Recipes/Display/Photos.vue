<template>
  <div id="photos">
    <b-img v-for="(photo, index) in photos" :key="index" :src="photo"></b-img>
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