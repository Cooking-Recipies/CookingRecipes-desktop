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


  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    tags: Array,
    servings: String,
    time: Number
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