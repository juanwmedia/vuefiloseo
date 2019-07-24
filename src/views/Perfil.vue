<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Perfil</h1>
                    <hr>
                    <form @submit.prevent="actualizar">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="nombre" class="input" type="text" :placeholder="perfil.nombre">
                                <span class="icon is-small is-left">
						<i class="fa fa-user"></i>
						</span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="apellidos" class="input" type="text" :placeholder="perfil.apellidos">
                                <span class="icon is-small is-left">
						<i class="fa fa-user"></i>
						</span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="correoe" class="input" type="email" :placeholder="usuario.email">
                                <span class="icon is-small is-left">
						<i class="fa fa-envelope-o"></i>
						</span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input v-model.trim="contrasena" class="input" type="password" placeholder="Nueva contraseña">
                                <span class="icon is-small is-left">
						<i class="fa fa-unlock-alt"></i>
						</span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button :disabled="!hayCambios" class="button is-info" :class="{ 'is-loading': trabajando}">
                                    Actualizar </button>
                            </p>
                        </div>
                    </form>

                    <Error v-show="mensajeError" :mensaje="mensajeError"></Error>
                    <Exito @cerrarMensaje="mensajeExito = ''" v-show="mensajeExito" :mensaje="mensajeExito"></Exito>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Exito from '../components/Exito';
    import Error from '../components/Error';
    import { mapState } from 'vuex';
    const fb = require('../firebase.js');
    export default {
        name: 'Perfil',
        data() {
            return {
                nombre: '',
                apellidos: '',
                correoe: '',
                contrasena: '',
                trabajando: false,
                mensajeExito: '',
                mensajeError: ''
            }
        },
        methods: {
            actualizar() {
                this.trabajando = true;
                this.mensajeExito = this.mensajeError = '';
                this.promesas = [];

                let usuario = fb.auth.currentUser;

                // Nombre y apellidos
                if (this.nombre.length || this.apellidos.length) {
                    let cambios = {};

                    if (this.nombre.length) {
                        cambios.nombre = this.nombre;
                    }

                    if (this.apellidos.length) {
                        cambios.apellidos = this.apellidos
                    }

                    let promesa = fb.usuariosColeccion.doc(this.usuario.uid).update(cambios).then(()=> {
                        fb.recursosColeccion.where('userId', '==', this.usuario.uid).get().then(docs => {
                           docs.forEach(doc => {
                              fb.recursosColeccion.doc(doc.id).update({
                                  nombre: this.nombre,
                              });
                           });
                        });
                        fb.comentariosColeccion.where('usuarioId', '==', this.usuario.uid).get().then(docs => {
                            docs.forEach(doc => {
                                fb.comentariosColeccion.doc(doc.id).update({
                                    nombre: this.nombre,
                                });
                            });
                        });
                    });

                    this.promesas.push(promesa);
                }

                // Correoe
                if (this.correoe.length) {
                    let promesa = usuario.updateEmail(this.correoe);
                    this.promesas.push(promesa);
                }

                // Contraseña
                if (this.contrasena.length) {
                    let promesa = usuario.updatePassword(this.contrasena);
                    this.promesas.push(promesa);
                }

                if (this.promesas.length) {
                    Promise.all(this.promesas).then(() => {
                        this.$store.dispatch('obtenerPerfilUsuario');
                        this.mensajeExito = 'Perfil actualizado';
                    }).catch(error => {
                        console.error(error);
                        this.mensajeError = error.message;
                    }).finally(() => this.trabajando = false);
                }

            }
        },
        computed: {
            ...mapState(['usuario', 'perfil']),
            hayCambios() {
                return (this.nombre.length || this.apellidos.length || this.correoe.length || this.contrasena.length);
            }
        },
        components: {
            Exito,
            Error,
        }
    }
</script>
