import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('./firebase.js');

Vue.use(Vuex);

// No perder la sesión si se recarga
fb.auth.onAuthStateChanged(user =>{
    if (user) {
        store.commit('establecerUsuario', user);
        store.dispatch('obtenerPerfilUsuario');
    }
});

const store = new Vuex.Store({
    state: {
        usuario: null,
        perfil: {},
    },
    mutations: {
        establecerUsuario(state, val) {

        },
        establecerPerfil(state, val) {

        }
    },
    actions: {
        obtenerPerfilUsuario({commit, state}) {

        }
    }
});

export default store;
