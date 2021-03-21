<template>
  <div>
    <h1>Random recipes</h1>
    <b-card-group deck>
      <div v-for="i in 12" :key="i">
        <RecipeCard :title="i"
                    v-bind:image_src="'https://img.grouponcdn.com/deal/3wBGSG4eqSYgxMCfW9MFKTrMYBvh/3w-2048x1229/v1/t600x362.jpg'"
        />
      </div>
    </b-card-group>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue'

export default {
  name: "RecipeCardDeck",
  components: {
    RecipeCard
  }
}
</script>

<style scoped>

</style>