<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Registro</h1>
                    <hr>
                    <form @submit.prevent="registro">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="nombre" class="input" type="text" placeholder="Nombre" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="apellidos" class="input" type="text" placeholder="Apellidos" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                            </p>
                        </div>
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
                                <button class="button is-info">
                                    Registro
                                </button>
                            </p>
                        </div>
                    </form>



                    <hr>
                    <ul>
                        <li>
                            <router-link to="/recuperar">Recuperar contraseña.</router-link>
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
        name: "Registro",
        data() {
            return {
                nombre: '',
                apellidos: '',
                correoe: '',
                contrasena: '',
            }
        },
        methods: {
            registro() {

                fb.auth.createUserWithEmailAndPassword(this.correoe, this.contrasena).then(user => {
                    // Guardar los datos (UID) del nuevo usuario
                    this.$store.commit('establecerUsuario', user.user);

                    // Guardarmos la info. de perfil del usuario en su doc
                    fb.usuariosColeccion.doc(user.user.uid).set({
                        nombre: this.nombre,
                        apellidos: this.apellidos,
                        registro: new Date(),
                    }).then(()=>{
                       this.$store.dispatch('obtenerPerfilUsuario');
                       this.$router.push('/');
                    }).catch(error => {
                        console.error(error);
                    });

                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>