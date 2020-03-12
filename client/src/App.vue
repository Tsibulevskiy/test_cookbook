<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>
<script>
  import appHeader from './components/appHeader'

  export default {
    components: {
      appHeader
    },
    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        })
      })
    }
  }
</script>
<style lang="scss">
  @import 'assets/layout/reset.css';
  #app {
    font-family: 'Roboto', sans-serif;
    min-width: 320px;
    color: #494949;
    min-height: 100vh;
    background-color: #F9F9F9;
    outline: none;
  }
  img{
    max-width: 100%;
    height: auto;
  }
  h5 {
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
  }
  p {
    font-size: 16px;
    margin: 0;
  }

</style>
