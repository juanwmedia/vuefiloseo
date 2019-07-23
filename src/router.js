import Vue from 'vue';
import Router from 'vue-router';
import Portada from './views/Portada.vue';
import Perfil from './views/Perfil.vue';
import Login from './views/Login.vue';
import Registro from './views/Registro.vue';
import Recuperar from './views/Recuperar.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'portada',
      component: Portada
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro,
    },
    {
      path: '/recuperar',
      name: 'recuperar',
      component: Recuperar
    }
  ]
})
