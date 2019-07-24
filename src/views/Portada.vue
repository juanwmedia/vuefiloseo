<template>
    <section class="section">

        <Recurso @visualizar="visualizar" v-if="recursoVisible" :id="recursoId"></Recurso>

        <div class="container">
            <h1 class="title has-text-centered">Los mejores recursos para dominar Vue.js</h1>
            <hr />

            <!-- Stream de recursos -->
            <div class="columns" id="portada">
                <div class="column is-half-tablet">

                    <transition name="fade">
                        <div @click="mostrarOtros" v-if="otrosRecursos.length" class="notification is-info" id="aviso-nuevos">
                            <p>
                                Se han agregado <strong>{{ otrosRecursos.length }} nuevo/s recurso/s</strong>.<br>
                                <a>Haz click aquí para verlos</a>.
                            </p>
                        </div>
                    </transition>

                    <RecursoPreview :key="recurso.id"
                                    @visualizar="visualizar"
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

                    <!-- TOP -->
                    <section class="section">
                        <h2>TOP Recursos</h2>
                        <hr>
                        <div v-for="top in topRecursos" :key="top.id" class="box">
                            <article class="media">
                                <div class="media-content">
                                    <div class="content top">
                                        <p>
                                            <a @click="visualizar(true, top.id)">
                                                <strong>{{ top.titulo }}</strong>
                                                <br>
                                                <small>{{ top.votos }} voto/s</small>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
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
    import Recurso from '../components/Recurso';
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
                mensajeExito: '',
                recursoId: null,
                recursoVisible: false,
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
            },
            visualizar(estado, id) {
                if (id) {
                    this.recursoId = id;
                }
                this.recursoVisible = estado;
            },
            mostrarOtros() {
                this.$store.commit('establecerRecursos', this.otrosRecursos.concat(this.recursos));
                this.$store.commit('limpiarOtros');
            }
        },
        computed: {
            ...mapState(['usuario', 'perfil', 'recursos', 'otrosRecursos', 'topRecursos']),
        },
        components: {
            Exito,
            Error,
            RecursoPreview,
            Recurso,
        }
    }
</script>

<style scoped>
    #aviso-nuevos {
        animation: salto 0.5s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
    }

    .top a {
        color: inherit;
    }

    @keyframes salto {
        from { transform: translateY(0); }
        to   { transform: translateY(10px); }
    }

    @media screen and (max-width: 768px) {
        #portada {
            display: flex;
            flex-direction: column-reverse;
        }
    }
</style>
