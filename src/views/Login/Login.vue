<template>
    <b-form>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Username" label-for="username">
            <b-form-input size="lg" placeholder="login" id="username" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Password" label-for="password">
            <b-form-input size="lg" placeholder="password" id="password" required></b-form-input>
        </b-form-group>
        <b-button size="lg" type="submit">Login</b-button>
    </b-form>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>