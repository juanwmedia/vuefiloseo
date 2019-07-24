<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Login</h1>
                    <hr>
                    <form @submit.prevent="login">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="correoe" class="input" type="email" placeholder="Correo-e" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-envelope-o"></i>
                            </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input v-model.trim="contrasena" class="input" type="password" placeholder="Contraseña" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-unlock-alt"></i>
                            </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-info" :class="{'is-loading': trabajando}">
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>



                    <hr>
                    <ul>
                        <li>
                            <router-link to="/recuperar">Recuperar contraseña</router-link>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    </section>
</template>

<script>
    const fb = require('../firebase.js');
    export default {
        name: "Login",
        data() {
            return {
                correoe: '',
                contrasena: '',
                trabajando: false,
            }
        },
        methods: {
            login() {
                this.trabajando = true;

                fb.auth.signInWithEmailAndPassword(this.correoe, this.contrasena).then(user => {
                    // guardar la info del usuario (UID)
                    this.$store.commit('establecerUsuario', user.user);

                    // guardar el perfil del usuario
                    this.$store.dispatch('obtenerPerfilUsuario');

                    // lanzar la ruta '/'
                    this.$router.push('/');
                }).catch(error => {
                    console.error(error);
                }).finally(()=> this.trabajando = false);
            }
        }
    }
</script>

<style scoped>

</style>