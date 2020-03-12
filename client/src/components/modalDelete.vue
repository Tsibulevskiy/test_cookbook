<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <h3>Вы действительно хотите удалить рецепт</h3>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-danger" @click.prevent="deleteRecipe()">
                  OK
                </button>
                <button class="btn btn-secondary" @click="cancel">
                  Cancel
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        showModalDelete: false
      }
    },
    props: ['id'],
    mounted() {
      console.log(this.id);
    },
    methods: {
      cancel() {
        this.$emit('close')
      },
      deleteRecipe() {
        axios.delete('http://localhost:5000/api/cookbook/' + this.id , {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        })
          .then(response => {
            console.log(response.data);
            this.$router.push('/cookbook')
          })
      }
    }
  }
</script>

<style scoped>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    max-height: 400px;
    min-width: 300px;
    max-width: 380px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
  .modal-header {
    justify-content: center;
    border-bottom: none;
  }
  .modal-header h3 {
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: #4A4A4A;
    padding: 20px 0 0 0;
  }
  .modal-footer {
    text-align: -webkit-center;
    border-top: none;
    justify-content: center;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
