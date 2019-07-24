<template>
    <div class="box" :class="{ propio: pertenece }">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <button v-if="pertenece" @click="$emit('eliminar', datos.id)" class="delete is-small is-pulled-right" aria-label="delete"></button>
                    <p>
                        <strong>{{ datos.titulo }}</strong>
                        <br>
                        {{ datos.descripcion | extracto }}
                        <br>
                        <small>{{ datos.nombre }}</small> <small><i> ({{ datos.cuando | fechaHace }})</i></small>
                    </p>
                </div>
                <nav class="level is-pulled-left">
                    <div class="level-left">
                        <a class="level-item" aria-label="reply">
                            <a :href="datos.url" target="_blank" class="button is-link is-small">Visitar</a>
                        </a>
                        <a class="level-item" aria-label="reply">
                            <a @click="$emit('visualizar', true, datos.id)" target="_blank" class="button is-primary is-small">Más info.</a>
                        </a>
                    </div>
                </nav>
                <nav class="level is-pulled-right">
                    <div class="level-right">
                        <a href="#" class="level-item" aria-label="reply">
                            {{ datos.comentarios }} comentario/s
                        </a>
                        <a  href="#" class="level-item" aria-label="like">
                            {{ datos.votos }} voto/s
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    export default {
        name: "RecursoPreview",
        props: ['datos'],
        computed:  {
            ...mapState(['usuario']),
            pertenece() {
                if (!this.usuario)
                    return false;

                return this.usuario.uid === this.datos.userId;
            }
        },
        filters: {
            extracto(valor) {
                return (valor.length < 120) ? valor : `${valor.substring(0, 120)}...`;
            },
            fechaHace(valor) {
                return moment(valor.toDate()).fromNow();
            }
        }
    }
</script>

<style scoped>
    .level.is-pulled-left {
        margin-bottom: 0;
    }

    .propio {
        background-color: #ccc;
    }
</style>