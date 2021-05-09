<template>
  <div class="home">
    <RecipeCarousel/>
    <RecipeCardDeck/>
  </div>
</template>

<script>
import RecipeCarousel from './RecipeCarousel.vue'
import RecipeCardDeck from "../Recipes/RecipeCardDeck";

export default {
  name: 'Home',
  components: {
    RecipeCardDeck,
    RecipeCarousel
  }
}
</script>