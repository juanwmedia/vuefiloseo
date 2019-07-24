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

    fb.recursosColeccion.orderBy('cuando', 'desc').onSnapshot(querySnapshot => {
        let recursos = [];
        querySnapshot.forEach(doc => {
           let recurso = doc.data();
           recurso.id = doc.id;
           recursos.push(recurso)
        });
        store.commit('establecerRecursos', recursos);
    })
});

const store = new Vuex.Store({
    state: {
        usuario: null,
        perfil: {},
        recursos: [],
    },
    mutations: {
        establecerUsuario(state, val) {
            state.usuario = val;
        },
        establecerPerfil(state, val) {
            state.perfil = val;
        },
        establecerRecursos(state, val) {
            state.recursos = val;
        }
    },
    actions: {
        obtenerPerfilUsuario({commit, state}) {
            fb.usuariosColeccion.doc(state.usuario.uid).get().then(res => {
                commit('establecerPerfil', res.data());
            }).catch(error =>{
                console.error(error);
            });
        },
        limpiar({commit}) {
            commit('establecerUsuario', null);
            commit('establecerPerfil', {});
        }
    }
});

export default store;
