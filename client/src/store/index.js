import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('user-token') || '',
    user: {},
    cookbook: localStorage.getItem('cookbook') || '',

  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
    cookbook(state, payload) {
      state.cookbook = payload
    },

  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: "http://localhost:5000/api/auth/login",
          data: user,
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            if (token === '' || token === undefined) {
              localStorage.removeItem('user-token');
              commit('auth_success', token, user);
              resolve(resp);
            } else {
              localStorage.setItem('user-token', token);
              axios.defaults.headers.common['Authorization'] = token;
              commit('auth_success', token, user);
              resolve(resp)
            }
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('user-token');
            reject(err)
          })
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: "http://localhost:5000/api/auth/register",
          data: user,
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            // console.log(resp.data);
            const token = resp.data.auth_token;
            const user = resp.data.user;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.removeItem('user-token');
            resolve(resp)
          })
          .catch(err => {
            console.log(err);
            commit('auth_error', err);
            localStorage.removeItem('user-token');
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('user-token');
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    },
    cookbook(context) {
      axios.get('http://localhost:5000/api/cookbook', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('user-token')
        }
      })
        .then(response => {
          context.commit('cookbook', response.data)
        })
    },

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    get_cookbook: (state) => state.cookbook,
  }
})
