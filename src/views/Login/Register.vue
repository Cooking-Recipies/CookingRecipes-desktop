<template>
    <b-form>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Username" label-for="username">
            <b-form-input size="md" id="username" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Password" label-for="password">
            <b-form-input size="md" id="password" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Password confirmation"
                      label-for="password_conf">
            <b-form-input size="md" id="password_conf" required></b-form-input>
        </b-form-group>
        <b-button size="lg" type="submit">Register</b-button>
    </b-form>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>