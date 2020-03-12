<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4 ">
    <a class="navbar-brand" href="#">COOKBOOK</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/cookbook" v-show="isLoggedIn">Cookbook </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/" v-show="!isLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-show="isLoggedIn"
             href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {

    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    },
  }
</script>

<style scoped>

</style>
