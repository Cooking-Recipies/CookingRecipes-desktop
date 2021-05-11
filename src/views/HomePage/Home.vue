<template>
  <div class="home">
    <RecipeCarousel/>
    <RandomRecipes/>
  </div>
</template>

<script>
import RecipeCarousel from './RecipeCarousel.vue'
import RandomRecipes from "./RandomRecipes";

export default {
  name: 'Home',
  components: {
    RandomRecipes,
    RecipeCarousel
  }
}
</script>