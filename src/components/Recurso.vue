<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card" >
            <header class="modal-card-head">
                <p class="modal-card-title">{{ recurso.titulo }}</p>
                <button @click="$emit('visualizar', false)" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <p>
                    {{ recurso.descripcion }}
                </p>
                <br>
                <p class="has-text-right">
                    <small>{{ recurso.nombre }}</small> <small><i> ({{ recurso.cuando | fechaHace }})</i></small>
                </p>
                <hr>

                <!-- Comentarios -->
                <h2 class="subtitle">Comentarios</h2>
                <form @submit.prevent="comentar">
                    <div class="field">
                        <div class="control">
                            <textarea v-model.trim="comentario" class="textarea" placeholder="Textarea" required></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button v-if="usuario" :disabled="!comentario.length" class="button is-info" :class="{ 'is-loading': trabajando }">
                                Comentar
                            </button>
                            <span v-else>
                                Para comentar debes estar <router-link to="/registro">registrado</router-link>.
                            </span>
                        </p>
                    </div>
                </form>

                <Error v-show="mensajeError" :mensaje="mensajeError"></Error>
                <Exito @cerrarMensaje="mensajeExito = ''" v-show="mensajeExito" :mensaje="mensajeExito"></Exito>

            </section>
            <footer class="modal-card-foot">
                <span v-if="!usuario">
                    <router-link to="/registro">Regístrate</router-link> para poder votar.
                </span>

                <span v-else-if="votado">
                    Voto registrado.
                </span>

                <button v-else @click="votar" class="button is-danger" :class="{ 'is-loading': trabajando }">Votar recurso</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    import Exito from '../components/Exito';
    import Error from '../components/Error';
    const fb = require('../firebase.js');
    export default {
        name: "Recurso",
        created() {
            this.indice = this.recursos.findIndex(recurso => recurso.id === this.id);
            this.recurso = this.recursos[this.indice];

            if (this.usuario) {
                let votoId = this.usuario.uid + '_' + this.recurso.id;
                fb.votosColeccion.doc(votoId).get().then(doc => {
                   if (!doc.exists) {
                       this.votado = false;
                   }
                });
            }
        },
        data() {
            return {
                indice: null,
                recurso: {},
                comentario: '',
                trabajando: false,
                votado: true,
                mensajeError: '',
                mensajeExito: '',
            }
        },
        props: ['id'],
        computed: {
            ...mapState(['usuario', 'recursos', 'perfil'])
        },
        methods: {
            votar() {
                this.trabajando = true;

                let votoId = this.usuario.uid + '_' + this.recurso.id;

                fb.votosColeccion.doc(votoId).set({
                   recursoId: this.recurso.id,
                   usuarioId: this.usuario.uid,
                }).then(() =>{
                    fb.recursosColeccion.doc(this.recurso.id).update({
                       votos: this.recurso.votos + 1,
                    }).then(()=> {
                        this.votado = true;
                    }).catch(error => {
                        console.error(error);
                    });
                }).catch(error => {
                    console.error(error);
                }).finally(() => this.trabajando = false);
            },
            comentar() {
                this.trabajando = true;
                this.mensajeExito = this.mensajeError = '';

                fb.comentariosColeccion.add({
                    cuando: new Date(),
                    comentario: this.comentario,
                    recursoId: this.id,
                    usuarioId: this.usuario.uid,
                    nombre: this.perfil.nombre,
                }).then(()=>{
                    fb.recursosColeccion.doc(this.id).update({
                        comentarios: this.recurso.comentarios + 1,
                    }).then(() => {
                        this.mensajeExito = 'Comentario añadido con éxito';
                        this.comentario = '';
                    }).catch(error => {
                        console.error(error);
                        this.mensajeError = error.message;
                    });
                }).catch(error => {
                    console.error(error);
                    this.mensajeError = error.message;
                }).finally(() => this.trabajando = false);
            }
        },
        filters: {
            fechaHace(valor) {
                return moment(valor.toDate()).fromNow();
            }
        },
        components: {
            Exito,
            Error,
        }
    }
</script>

<style scoped>
    .modal-card-foot {
        justify-content: flex-end;
    }
</style>