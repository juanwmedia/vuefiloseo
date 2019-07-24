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
                <button class="button is-danger">Votar recurso</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    export default {
        name: "Recurso",
        created() {
            this.indice = this.recursos.findIndex(recurso => recurso.id === this.id);
            this.recurso = this.recursos[this.indice];
        },
        data() {
            return {
                indice: null,
                recurso: {},
            }
        },
        props: ['id'],
        computed: {
            ...mapState(['usuario', 'recursos', 'perfil'])
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