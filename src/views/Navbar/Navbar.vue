<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Main Page</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/addRecipe">Add recipe</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search for a recipe"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <b-img src="@/assets/user.svg" alt="Account"></b-img>
            </template>
            <div v-if="!isLoggedIn">
              <b-dropdown-item to="/login">Sign in</b-dropdown-item>
              <b-dropdown-item to="/register">Register</b-dropdown-item>
            </div>
            <div v-if="isLoggedIn">
              <b-dropdown-item to="/profile">Manage account</b-dropdown-item>
              <b-dropdown-item to="/logout">Logout</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {
      isLoggedIn: false,
    }
  },
  created() {
    let token = localStorage.getItem("token")
    if (token !== null) {
      this.isLoggedIn = true
    }
  }

}
</script>

<style scoped>

</style>