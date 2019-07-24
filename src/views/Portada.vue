<template>
    <section class="section">
        <div class="container">
            <h1 class="title has-text-centered">Los mejores recursos para dominar Vue.js</h1>
            <hr />

            <!-- Stream de recursos -->
            <div class="columns" id="portada">
                <div class="column is-half-tablet">

                    <RecursoPreview :key="recurso.id"
                                    @eliminar="eliminar"
                                    v-for="recurso in recursos"
                                    :datos="recurso">
                    </RecursoPreview>

                    <h1 class="has-text-centered" v-show="!recursos.length">No existen recursos, agrega el primero.</h1>

                </div>

                <!-- Agregar recurso -->
                <div class="column is-offset-1">
                    <section class="section has-background-light">
                        <form @submit.prevent="agregar">
                            <div class="field">
                                <label class="label">Título del recurso</label>
                                <div class="control">
                                    <input v-model.trim="titulo" class="input" type="text" required />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">URL del recurso</label>
                                <div class="control">
                                    <input v-model.trim="url" class="input" type="text" required />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Descripción del recurso</label>
                                <div class="control">
                                    <textarea v-model.trim="descripcion" class="textarea" required></textarea>
                                </div>
                            </div>


                            <div v-if="usuario" class="field is-grouped">
                                <div class="control">
                                    <button type="submit" class="button is-link" :class="{'is-loading': trabajando}">Agregar recurso</button>
                                </div>
                            </div>

                            <p v-else>
                                Para añadir recursos debes <router-link to="/login">autentificarte</router-link> en Vuefilos.
                            </p>

                        </form>

                        <Error v-show="mensajeError" :mensaje="mensajeError"></Error>
                        <Exito @cerrarMensaje="mensajeExito = ''" v-show="mensajeExito" :mensaje="mensajeExito"></Exito>

                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    // @ is an alias to /src
    const fb = require('../firebase.js');
    import Exito from '../components/Exito';
    import Error from '../components/Error';
    import RecursoPreview from '../components/RecursoPreview';
    import { mapState } from 'vuex';
    export default {
        name: 'Portada',
        data() {
            return {
                titulo: '',
                url: '',
                descripcion: '',
                trabajando: false,
                mensajeError: '',
                mensajeExito: ''
            }
        },
        methods: {
            agregar() {
                this.trabajando = true;
                this.mensajeError = '';

                fb.recursosColeccion.add({
                    cuando: new Date(),
                    titulo: this.titulo,
                    url: this.url,
                    descripcion: this.descripcion,
                    userId: this.usuario.uid,
                    nombre: this.perfil.nombre,
                    comentarios: 0,
                    votos: 0,
                }).then(() => {
                    this.mensajeExito = 'Recurso añadido con éxito';
                    this.limpiar();
                }).catch(error => {
                    console.error(error);
                    this.mensajeError = error.message;
                }).finally(()=> this.trabajando = false);
            },
            eliminar(id) {
                this.mensajeError = '';
                fb.recursosColeccion.doc(id).delete()
                    .catch(error => {
                        console.error(error);
                        this.mensajeError = error.message;
                    });
            },
            limpiar() {
                this.titulo = this.descripcion = this.url = '';
            }
        },
        computed: {
            ...mapState(['usuario', 'perfil', 'recursos', 'otrosRecursos']),
        },
        components: {
            Exito,
            Error,
            RecursoPreview,
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 768px) {
        #portada {
            display: flex;
            flex-direction: column-reverse;
        }
    }
</style>
