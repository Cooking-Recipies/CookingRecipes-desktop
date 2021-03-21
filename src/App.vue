<template>
  <div id="app">
    <navbar/>
    <b-container>
      <b-row class="vh-100 text-center" align-v="center">
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import Navbar from "./views/Navbar/Navbar";

export default {
  components: {Navbar}
}
</script>