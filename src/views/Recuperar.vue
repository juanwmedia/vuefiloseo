<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Recuperar contraseña</h1>
                    <p class="subtitle">Introduce tu correo-e para iniciar el proceso de recuperación.</p>
                    <hr>
                    <form @submit.prevent="recuperar">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="correoe" class="input" type="email" placeholder="Correo-e" required>
                                <span class="icon is-small is-left">
                                <i class="fa fa-envelope-o"></i>
                            </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-info" :class="{'is-loading': trabajando}">
                                    Recuperar
                                </button>
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
    const fb = require('../firebase.js');
    import Error from '../components/Error';
    import Exito from '../components/Exito';
    export default {
        name: "Recuperar",
        data() {
            return {
                correoe: '',
                trabajando: false,
                mensajeError: '',
                mensajeExito: '',
            }
        },
        methods: {
            recuperar() {
                this.trabajando = true;
                this.mensajeError = this.mensajeExito = '';

                fb.auth.sendPasswordResetEmail(this.correoe).then(()=>{
                    this.mensajeExito = 'Operación realizada correctamente, chequea tu correo.';
                    this.correoe = '';
                    this.redirigir();
                }).catch(error => {
                    console.error(error);
                    this.mensajeError = error.message;
                }).finally(()=> this.trabajando = false);
            },
            redirigir() {
                let timeout = setTimeout(()=>{
                   clearTimeout(timeout);
                   this.$router.push('/login');
                }, 2000);
            }
        },
        components: {
            Error,
            Exito,
        }
    }
</script>

<style scoped>

</style>