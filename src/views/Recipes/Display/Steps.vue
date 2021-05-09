<template>
  <div>
    <h2>Ingredients</h2>
    <div v-for="(ingredient, index) in ingredients" :key="index">
      <h5>
        {{ ingredient.name }}
        {{ ingredient.quantity }}
      </h5>
    </div>

    <h2>Steps</h2>
    <div id="steps">
      <h5>{{ steps }}</h5>
    </div>

  </div>
</template>

<script>
export default {
  name: "Steps",
  props: {
    ingredients: Array,
    steps: String
  }
}
</script>

<style scoped>
#steps {
  text-align: justify;
}
h2 {
  font-weight: bold;
}
</style>