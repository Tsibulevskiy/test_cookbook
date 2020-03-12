<template>
    <div class="container">
      <div class="recipe">
        <div class="row justify-content-center">
          <div class="col-lg-10 row justify-content-center">
            <h2 class="col-12">{{ recipe.name }}</h2>
            <img :src="'http://localhost:5000/' + recipe.imageSrc" alt="photo">
            <p class="description col-12">{{ recipe.description }}</p>
            <p class="data col-12">{{ recipe.data }}</p>
            <div class="row">
              <router-link class="btn btn-primary" to="/cookbook">Close</router-link>
              <router-link class="btn btn-success" :to="{name: 'changeRecipe', params: { id: $route.params.id }}">Change</router-link>
              <button class="btn btn-danger" @click.prevent="deleteRecipe">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <modal-delete v-if="showModalDelete" @close="showModalDelete = false" :id="$route.params.id"></modal-delete>
    </div>
</template>

<script>
  import axios from 'axios'
  import modalDelete from '../components/modalDelete'

  export default {
    components: {
      modalDelete
    },
    data() {
      return{
        recipe: {},
        showModalDelete: false
      }
    },
    methods: {
      deleteRecipe() {
        this.showModalDelete = true
      }
    },
    created() {
      this.axios.get('http://localhost:5000/api/cookbook/' + this.$route.params.id, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('user-token')
        }
      })
        .then(response => {
          this.recipe = response.data;
        })
    },

  }
</script>

<style scoped lang="scss">
  .recipe {
    background: #F5F6F6;
    border: 1px solid #F0F0F0;
    box-shadow: 0px 2px 30px rgba(174, 174, 174, 0.25);
    padding: 30px;
    & h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 30px;
      padding-bottom: 15px;
    }
    & img {
      margin: 15px;
      border-radius: 8px;
      width: 150px;
      height: 100px;
      max-height: 100px;
      margin: 1rem auto;
      object-fit: contain;
    }
    .description {
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      padding: 15px;
    }
    .data {
      padding: 15px;
    }
    .btn {
      justify-content: center;
      margin-left: 15px;
    }
  }
</style>
