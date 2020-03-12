<template>
  <div class="home">
    <div class="container">
      <div class="row card-group">
        <div class="col-lg-3 mb-4">
          <div class="card h-100">
            <div class="card-body justify-content-center align-items-center row">
              <router-link to="/cookbook/create" class="btn btn-success">Add recipe</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mb-4" v-for="recipe in cookbook">
          <div class="card">
            <img :src="'http://localhost:5000/' + recipe.imageSrc" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.name }}</h5>
              <p class="card-text">{{ recipe.description }}</p>
              <div class="card-btn row justify-content-around">
                <router-link :to="{ name: 'recipe', params: { id: recipe._id }}" class="btn btn-primary">reed more</router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    components: {},
    computed: {
      cookbook() {
        const cookbook = this.$store.getters.get_cookbook;
        return cookbook
      }
    },
    created() {
      this.$store.dispatch('cookbook');
    },
  }
</script>
<style scoped lang="scss">
  .home {
    .card {
      & img {
        width: 150px;
        height: 100px;
        max-height: 100px;
        margin: 1rem auto;
        object-fit: contain;
      }

      .card-body {
        .card-title {
          text-align: center;
          font-weight: bold;
          height: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .card-text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .card-btn {
          padding-top: 15px;
        }

      }
    }
  }
</style>
