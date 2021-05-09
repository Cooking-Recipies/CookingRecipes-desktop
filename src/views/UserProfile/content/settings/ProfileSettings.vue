<template>
  <b-col>
    <PasswordChange/>
    <AccountDelete/>
  </b-col>
</template>

<script>
import PasswordChange from "./PasswordChange";
import AccountDelete from "./AccountDelete";
export default {
  name: "ProfileSettings",
  components: {AccountDelete, PasswordChange}
}
</script>

<style scoped>

</style>