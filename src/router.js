import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Portada from './views/Portada.vue';
import Perfil from './views/Perfil.vue';
import Login from './views/Login.vue';
import Registro from './views/Registro.vue';
import Recuperar from './views/Recuperar.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'portada',
      component: Portada
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      meta: {
        autorizacion: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        publico: true,
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro,
      meta: {
        publico: true,
      }
    },
    {
      path: '/recuperar',
      name: 'recuperar',
      component: Recuperar,
      meta: {
        publico: true,
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const autorizacion = to.matched.some(destino => destino.meta.autorizacion);
  const publico = to.matched.some(destino => destino.meta.publico);

  const usuarioActual = firebase.auth().currentUser;

  if (autorizacion && !usuarioActual) { // Req auth. y no está registrado
    console.log('Req auth. y no está registrado');
    next('/login');
  } else if(publico && usuarioActual) { // No req. auth y está registrado
    console.log('No req. auth y está registrado');
    next('/');
  } else if(autorizacion && usuarioActual) {// Req. auth y está registrado
    console.log('Req. auth y está registrado');
    next();
  } else { // El resto de combinaciones posibles...
    console.log('// El resto de combinaciones posibles...');
    next();
  }
});



export default router;
