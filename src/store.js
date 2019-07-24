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

    // Recibimos comentarios
    fb.comentariosColeccion.orderBy('cuando', 'desc').onSnapshot(querySnapshot => {
       let comentarios = [];
       querySnapshot.forEach(doc => {
          let comentario = doc.data();
          comentario.id = doc.id;
          comentarios.push(comentario);
       });
       store.commit('establecerComentarios', comentarios);
    });

    // Recibimos recursos
    fb.recursosColeccion.orderBy('cuando', 'desc').onSnapshot(querySnapshot => {
        let propio = false;

        // hay alguien conectado y novedades en el stream de recursos
        if (store.state.usuario && querySnapshot.docs.length) {
            propio = (store.state.usuario.uid === querySnapshot.docChanges()[0].doc.data().userId);
        }

        // Hay nuevos recuros y son de otros usuarios
        if (querySnapshot.docChanges().length !== querySnapshot.docs.length
        && querySnapshot.docChanges()[0].type == 'added' && !propio) {

            let recurso = querySnapshot.docChanges()[0].doc.data();
            recurso.id = querySnapshot.docChanges()[0].doc.id;

            // Evitamos duplicados
            if (!store.state.otrosRecursos.some(otro => otro.id === recurso.id)) {
                store.commit('establecerOtros', recurso);
            }
        } else {
            // Son nuestros recursos
            let recursos = [];
            querySnapshot.forEach(doc => {
                let recurso = doc.data();
                recurso.id = doc.id;
                recursos.push(recurso)
            });
            store.commit('establecerRecursos', recursos);
        }
    })
});

const store = new Vuex.Store({
    state: {
        usuario: null,
        perfil: {},
        recursos: [],
        otrosRecursos: [],
        comentarios: [],
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
        },
        establecerComentarios(state, val) {
            state.comentarios = val;
        },
        establecerOtros(state, val) {
            state.otrosRecursos.unshift(val);
        },
        limpiarOtros(state) {
            state.otrosRecursos = [];
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
