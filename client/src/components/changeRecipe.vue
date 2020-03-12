<template>
  <div class="addRecipe">
    <div class="container">
      <h2 class="text-center">Редактируйте рецепт</h2>
      <div class="row justify-content-center align-items-center">
        <form>
          <fieldset >
            <div class="form-group">
              <label for="nameRecipe">Измените название рецепта</label>
              <input type="text"
                     class="form-control"
                     name="nameRecipe" ref="nameRecipe"
                     v-model="recipe.name"
                     id="nameRecipe">
            </div>
            <div class="form-group">
              <label for="descriptionRecipe">Описание</label>
              <textarea class="form-control"
                        id="descriptionRecipe"
                        name="descriptionRecipe" ref="descriptionRecipe"
                        v-model="recipe.description"
                        rows="8"></textarea>
            </div>
            <div class="form-group">
              <label for="imageRecipe">Фото рецепта
                <input type="file"
                       class="form-control-file"
                       @change="onFileChange" ref="file"
                       id="imageRecipe">
              </label>
              <div>
                <img class="image-preview" v-show="imageSrc" :src="imageSrc" alt="photo">
                <img :src="'http://localhost:5000/' + recipe.imageSrc" alt="foto">
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-success mr-2"
                      @click.prevent="addRecipe()">Сохранить</button>
              <router-link class="btn btn-primary" to="/cookbook">Close</router-link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        nameRecipe: '',
        descriptionRecipe: '',
        imageSrc: '',
        recipe: ''
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
    mounted() {

    },
    methods: {
      onFileChange() {
        this.file = this.$refs.file.files[0];
        console.log(this.imageSrc);
        let input = event.target;

        if (input.files && input.files[0]) {
          let reader = new FileReader();
          let vm = this;

          reader.onload = function (e) {
            vm.imageSrc = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      addRecipe() {
        const data = new FormData;
        data.append('name', this.$refs.nameRecipe.value);
        data.append('description', this.$refs.descriptionRecipe.value);
        data.append('image', this.file);
        axios.patch("http://localhost:5000/api/cookbook/" + this.$route.params.id, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": localStorage.getItem('user-token')
          }
        })
          .then(response => {
            this.$router.go(-1);
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          });
      }

    }
  }
</script>

<style scoped lang="scss">
  .addRecipe {
    background: #F5F6F6;
    border: 1px solid #F0F0F0;
    box-shadow: 0px 2px 30px rgba(174, 174, 174, 0.25);
    padding: 30px;
    & h2 {
      font-size: 24px;
      font-weight: 700;
      line-height: 28px ;
      padding-bottom: 15px;
    }
    .form-group {
      & label {
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
        padding: 15px 0 0;
      }

      & input, textarea {
        background: #F5F6F6;
        color: #8F8F8F;
        font-size: 13px;
        line-height: 17px;
        margin-bottom: 3px;
      }
    }
    & img {
      width: 150px;
      height: 100px;
      max-height: 100px;
      margin: 1rem auto;
      object-fit: contain;
    }
  }
</style>
