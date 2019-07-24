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
                <form>
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" placeholder="Textarea" required></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-info">
                                Comentar
                            </button>
                        </p>
                    </div>
                </form>


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
                trabajando: false,
                votado: true,
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
            }
        },
        filters: {
            fechaHace(valor) {
                return moment(valor.toDate()).fromNow();
            }
        }
    }
</script>

<style scoped>
    .modal-card-foot {
        justify-content: flex-end;
    }
</style>