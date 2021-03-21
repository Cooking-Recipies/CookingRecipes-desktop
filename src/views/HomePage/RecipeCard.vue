<template>
  <b-card-group deck>
    <b-card
        title="Title of the recipe"
        :img-src="image_src"
        img-alt="Image"
        img-top
        style="width: 24rem;"
        class="mb-2"
    >
      <b-card-text>
        Some quick example text briefly describing a recipe. This is example #{{ title }}
      </b-card-text>

      <b-button href="#" variant="info">Go to the recipe page</b-button>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    title: String,
    description: Text,
    likes: String,
    image_src: String
  }
}
</script>

<style scoped>

</style>