<template>
  <div class="container form">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <h2>{{type?'Sign in': 'Sign up'}}</h2>
        <div class="form-container" v-show="!type">
          <ValidationObserver ref="form" v-slot="{ validate }">
            <form class="needs-validation "  @submit.prevent="register">
              <div class="form-row">
                <div class="col-md-12 input-container ">
                  <ValidationProvider :bails="false" mode="passive" name="registerEmail"
                                      rules="required|email"
                                      v-slot="{ valid, errors }">
                    <label for="registerEmail">Email</label>
                    <input  type="email"
                            class="form-control"
                            id="registerEmail"
                            v-model="email"
                            :state="errors[0] ? false : (valid ? true : null)"
                            placeholder="Enter your email">
                    <span class="validateText">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-12 input-container ">
                  <ValidationProvider :bails="false" mode="passive" name="registerPassword"
                                      rules="required|min:6"
                                      v-slot="{ valid, errors }">
                    <label for="registerPassword">Password</label>
                    <input  type="password"
                            class="form-control"
                            id="registerPassword"
                            v-model="password"
                            :state="errors[0] ? false : (valid ? true : null)"
                            placeholder="Enter your password">
                    <span class="validateText">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary"
                        v-on:click.prevent=" register() ">Register
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="form-container" v-show="type">
          <ValidationObserver ref="form"  v-slot="{validate}" >
            <form class=""  @submit.prevent="login">
              <div class="form-row">
                <div class="col-md-12 input-container ">
                  <ValidationProvider :bails="false" mode="passive" name="loginEmail"
                                      rules="required|email"
                                      v-slot="{ valid, errors }">
                    <label for="registerEmail">Email</label>
                    <input  type="email"
                            class="form-control"
                            id="loginEmail"
                            v-model="email"
                            :state="errors[0] ? false : (valid ? true : null)"
                            placeholder="Enter your email">
                    <span class="validateText">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-12 input-container ">
                  <ValidationProvider  name="loginPassword" mode="passive"
                                       rules="required|min:6 "
                                       v-slot="{ valid, errors }">
                    <label for="loginPassword">Password</label>
                    <input  type="password"
                            class="form-control"
                            id="loginPassword"
                            v-model="password"
                            :state="errors[0] ? false : (valid ? true : null)"
                            placeholder="Enter your password">
                    <span class="validateText">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary"
                        v-on:click.prevent=" login()">Sign in
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <a class="text-center" v-on:click.prevent="type=!type">
          {{type?'Have no account yet? Sign up ' : 'Already have an account? Sign in'}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {ValidationProvider, ValidationObserver} from "vee-validate";

  export default {
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data() {
      return {
        type: 'Sign in',
        email: "",
        password: "",
        error: '',
      }
    },
    computed: {
      authStatus() {
        const authStatus = this.$store.getters.authStatus;
        return authStatus
      },
    },
    methods: {
      register() {
        let data = {
          "email": this.email,
          "password": this.password,
        };
        this.$store.dispatch('register', data)
          .then(response => {
            console.log(response.data);
            if (localStorage.getItem('user-token') != null) {
              this.$emit('loggedIn');
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push('/');
              }
            }
            if (response.data.success) {
              this.type = 'Sign in'
            }

          })
          .catch(err => console.log(err))
      },
      login() {
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('login', data)
          .then((resp) => {
            this.error = resp.data.error;
            if (localStorage.getItem('user-token') != null) {
              this.$emit('loggedIn');
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push('/cookbook')
              }
            }

          })
          .catch(err => console.log(err));

      },
    }
  }
</script>

<style scoped lang="scss">
  .form {
    border: 1px solid #F0F0F0;
    box-shadow: 0px 2px 30px rgba(174, 174, 174, 0.25);
    min-width: 300px;
    height: 400px;
    max-width: 600px;
    & h2 {
      font-size: 30px;
      font-weight: 600;
      line-height: 36px;
      text-align: center;
      padding: 30px;
      }
    .form-container {
      & label {
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
        padding: 15px 0 0 ;
      }
      & input {
        background: #F5F6F6;
        color: #8F8F8F;
        border: none;
        outline: none;
        height: 40px;
        font-size: 13px;
        line-height: 17px;
        margin-bottom: 3px;
      }
      & button {
        margin: 30px;
      }

    }
    & a {
      font-size: 13px;
      line-height: 17px;
    }
  }
</style>
